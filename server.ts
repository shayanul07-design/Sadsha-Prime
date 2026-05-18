import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

let aiClient: GoogleGenAI | null = null;

function getAIClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("GEMINI_API_KEY is missing. AI features will be unavailable.");
      return null;
    }
    aiClient = new GoogleGenAI({ 
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Gemini AI Coaching Endpoint
  app.post("/api/ai/coach", async (req, res) => {
    try {
      const ai = getAIClient();
      if (!ai) {
        throw new Error("AI service not initialized. Check API key configuration.");
      }

      const { messages, userData } = req.body;
      
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: messages,
        config: {
          systemInstruction: `You are Sadsha AI (Version 4.0.2), an elite world-class fitness and lifestyle coach. 
          
          MISSION:
          Optimize user performance, body composition, and mental discipline. You are direct, data-driven, yet motivating like a high-stakes athletic director.
          
          USER CONTEXT:
          Tier: ${userData?.tier || 'Free'}
          Goal: ${userData?.goal || 'Not specified'}
          Stats: ${JSON.stringify(userData?.stats || {})}
          
          PERSONALITY:
          - Use technical terms (hypertrophy, neural drive, hypertrophy mechanics, metabolic stress).
          - Be encouraging but hold them accountable ("Discipline is the only variable").
          - Use a futuristic, high-performance tone.
          - Refer to advice as "Protocols" or "Logic".
          
          TIER DIFFERENCES:
          - FREE: Basic guidance, motivation, and caloric principles. Keep it high-level.
          - GOLD: More detailed workout logic and macro suggestions.
          - PLATINUM: Include "Skin Forge" skincare advice and advanced form tips. Very technical.
          - DIAMOND: Elite 1-on-1 style responses. Extremely detailed, personal, includes "Follicle Mastery" hair care and high-level biohacking (sleep staging, HRV optimization).
          
          CAPABILITIES:
          - Handling specific issues: PCOS, Skinny fat, Home workout limited equipment, Bulking/Cutting plateaus.
          - Language: Respond in the language the user speaks (Hindi, Bengali, Tamil, Telugu, etc.) if requested, otherwise default to English. 
          
          Always remind them that you are an AI coach and for medical conditions, they should consult a doctor.`,
        },
      });

      res.json({ text: response.text });
    } catch (error) {
      console.error("AI Coach Error:", error);
      res.status(500).json({ error: "Neural link failure. Check your connection or upgrade to a higher tier for priority access." });
    }
  });

  // Mock Payment Session (for high conversion pricing demo)
  app.post("/api/payments/create-session", async (req, res) => {
    const { tier, duration } = req.body;
    // In a real app, integrate Razorpay or Stripe here
    res.json({ 
      sessionId: `mock_${Math.random().toString(36).substr(2, 9)}`,
      success: true,
      message: `Simulated ${tier} subscription created for ${duration} months.`
    });
  });

  // Vite middleware for development
  const isProduction = process.env.NODE_ENV === "production" || process.env.VITE_PROD === "true";

  if (!isProduction) {
    try {
      console.log("Starting in Development Mode (Vite Middleware)...");
      const { createServer: createViteServer } = await import("vite");
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: "spa",
      });
      app.use(vite.middlewares);
    } catch (e) {
      console.error("Failed to start Vite dev server:", e);
    }
  } else {
    console.log("Starting in Production Mode...");
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Sadsha Prime server running on http://localhost:${PORT}`);
  });
}

startServer();
