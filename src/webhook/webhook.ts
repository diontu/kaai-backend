import express from "express";
import { Webhook } from "svix"; // Clerk uses Svix for webhook verification
import db from "../db/db";
import { usersTable } from "../db/schemas/users";

const router = express.Router();

const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET!;

router.post("/", async (req: any, res: any) => {
  const headers = req.headers as Record<string, string>;
  const payload = req.body;

  // Verify webhook signature
  const wh = new Webhook(WEBHOOK_SECRET);
  let event;
  try {
    event = wh.verify(payload, headers);
  } catch (err) {
    console.error("Webhook verification failed", err);
    return res.status(400).json({ error: "Invalid webhook signature" });
  }

  const eventType = (event as any).type;
  const userData = (event as any).data;

  if (eventType === "user.created" || eventType === "user.updated") {
    try {
      await db
        .insert(usersTable)
        .values({
          id: userData.id,
          email: userData.email_addresses[0]?.email_address || "",
          name: `${userData.first_name || ""} ${
            userData.last_name || ""
          }`.trim(),
        })
        .onDuplicateKeyUpdate({
          set: {
            email: userData.email_addresses[0]?.email_address || "",
            name: `${userData.first_name || ""} ${
              userData.last_name || ""
            }`.trim(),
          },
        });

      return res.json({ success: true });
    } catch (error) {
      console.error("Database error:", error);
      return res.status(500).json({ error: "Database error" });
    }
  }

  res.json({ success: true });
});

export default router;
