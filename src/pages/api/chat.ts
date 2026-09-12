import { NextApiRequest, NextApiResponse } from "next";
import { retrieveContext } from "../../data";

export type Message = {
  role: "user" | "assistant";
  content: string;
};

const SYSTEM_PROMPT = `You are a warm, non-judgmental daily wellness companion called "Mental Health Companion". Your role is to support journaling, mood check-ins, grounding/breathing exercises, and CBT-style reflection — not to diagnose, treat, or replace professional mental health care.

Rules:
- Always respond with empathy first, before any technique or suggestion.
- Only use the grounding exercises, breathing exercises, journaling prompts, affirmations, and CBT reframes provided in your reference data. Do not invent clinical techniques, statistics, or medical claims.
- Never diagnose a condition or name a disorder the user hasn't already named themselves.
- If the user expresses hopelessness, self-harm, suicidal thoughts, or intent to harm others, immediately follow the Crisis Response Protocol — do not attempt to handle this with journaling prompts or breathing exercises alone.
- Keep responses conversational and short unless the user asks for more depth.
- Remind the user occasionally, gently and only when relevant, that you are a supportive tool and not a substitute for a therapist or doctor.
- Use a warm, gentle, and calm tone throughout.
- When sharing exercises, format them clearly with steps.
- When the user seems distressed, validate their feelings before offering any tools.`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ role: "assistant", content: "Method not allowed" });
  }

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({
      role: "assistant",
      content: "Missing Gemini API key. Please add GEMINI_API_KEY to your environment variables.",
    });
  }

  try {
    const { message } = req.body;

    if (!message || !Array.isArray(message)) {
      return res.status(400).json({
        role: "assistant",
        content: "Invalid format",
      });
    }

    // Get the latest user message for retrieval
    const latestUserMessage = [...message].reverse().find((m: Message) => m.role === "user");
    let contextBlock = "";
    let isCrisis = false;

    if (latestUserMessage) {
      const retrieved = retrieveContext(latestUserMessage.content);
      isCrisis = retrieved.some((r) => r.isCrisis);

      if (retrieved.length > 0) {
        contextBlock = "\n\n--- REFERENCE DATA FOR THIS TURN (use this to inform your response) ---\n" +
          retrieved.map((r) => `[${r.category}]\n${r.data}`).join("\n\n") +
          "\n--- END REFERENCE DATA ---";

        if (isCrisis) {
          contextBlock += "\n\n⚠️ CRISIS DETECTED: Follow the Crisis Response Protocol above. Surface crisis resources. Do NOT attempt therapy. Keep your response calm, short, and direct the user to professional help immediately. Include these resources:\n- Emergency Services: Call your local emergency number\n- International Association for Suicide Prevention: https://www.iasp.info/resources/Crisis_Centres/\n- Crisis Text Line: Text HOME to 741741 (US) or find your local service\n- Befrienders Worldwide: https://www.befrienders.org/";
        }
      }
    }

    // Build the messages for Gemini
    const systemInstruction = SYSTEM_PROMPT + contextBlock;

    // Convert messages to Gemini format
    const geminiContents = message
      .filter((m: Message) => m.role !== "system")
      .map((m: Message) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      }));

    // Call Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: systemInstruction }],
          },
          contents: geminiContents,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1024,
            topP: 0.9,
          },
          safetySettings: [
            { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
            { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
            { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
            { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
          ],
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Gemini API error:", errorData);
      return res.status(500).json({
        role: "assistant",
        content: "I'm having trouble connecting right now. Please try again in a moment. 💙",
      });
    }

    const data = await response.json();
    const botText =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I'm here for you. Could you tell me a bit more about how you're feeling? 💙";

    // If crisis detected, append resources to the response
    let finalResponse = botText;
    if (isCrisis && !botText.includes("crisis") && !botText.includes("emergency")) {
      finalResponse += "\n\n🆘 **Crisis Resources:**\n- Emergency Services: Call your local emergency number\n- Crisis Text Line: Text HOME to 741741\n- Befrienders Worldwide: befrienders.org\n- IASP Crisis Centres: iasp.info/resources/Crisis_Centres/";
    }

    res.status(200).json({
      role: "assistant",
      content: finalResponse,
      ...(isCrisis ? { isCrisis: true } : {}),
    });
  } catch (error) {
    console.error("API error:", error);
    res.status(500).json({
      role: "assistant",
      content: "Something went wrong on my end. I'm still here — please try again. 💙",
    });
  }
}
