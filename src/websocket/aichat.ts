import { OpenAI } from "openai";
import { WebSocketServer } from "ws";
import { Express } from "express";
import moment from "moment";

// db and tables
import db from "../db/db";
import { eq } from "drizzle-orm";
import { conversationsTable, messagesTable } from "../db/schemas/conversations";

// prompts
import { getTitlePrompt } from "./chatprompts";

// types
type MessageObjectType = {
  message: string;
  chatId: string;
};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAI_ORGANIZATION,
  project: process.env.OPENAI_PROJECT_ID,
});

export const enableAIChat = (server: ReturnType<Express["listen"]>) => {
  // Set up WebSocket server
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws) => {
    console.log("New client connected");

    // Handle messages from clients
    ws.on("message", async (message) => {
      try {
        const messageObject: MessageObjectType = JSON.parse(message.toString());
        const userMessage = messageObject.message;
        const chatId = messageObject.chatId;
        console.log(`Received: ${userMessage}`);

        // insert user's message
        await db.insert(messagesTable).values({
          user_id: 1, // TODO: SET THIS TO THE CURRENT USER (ID OBTAINED THRU AUTH)
          content: userMessage,
          conversation_id: chatId,
        });

        // TODO: figure out how to add images
        const stream = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: userMessage }],
          stream: true,
        });

        let finalResponse = "";
        for await (const chunk of stream) {
          const content = chunk.choices[0]?.delta?.content || "";
          finalResponse += content;

          process.stdout.write(content);
          // Respond to the client
          ws.send(content);
        }
        // insert generated message
        await db.insert(messagesTable).values({
          content: finalResponse,
          conversation_id: chatId,
          created_at: moment().add(1, "millisecond").toDate(),
        });

        // generate a title if there is no title
        const conversation = await db
          .select()
          .from(conversationsTable)
          .where(eq(conversationsTable.id, chatId))
          .limit(1);
        if (!conversation[0].title) {
          const generatedTitle = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
              { role: "user", content: getTitlePrompt(finalResponse) },
            ],
            stream: false,
          });
          await db
            .update(conversationsTable)
            .set({
              title: generatedTitle.choices[0].message.content,
            })
            .where(eq(conversationsTable.id, chatId));
        }

        ws.send("---done---");
      } catch (error) {
        console.error("Error handling message:", error);
        ws.send("Error processing your request.");
      }
    });

    // Handle disconnection
    ws.on("close", () => {
      console.log("Client disconnected");
    });
  });
};
