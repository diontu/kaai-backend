import { OpenAI } from "openai";
import { WebSocketServer } from "ws";

import { Express } from "express";

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
        const userMessage = message.toString();
        console.log(`Received: ${userMessage}`);

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
        // TODO: insert the final response into the database
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
