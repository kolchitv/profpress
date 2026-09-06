import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // AI-powered Massar & Pedagogical Remark Generator
  app.post("/api/generate-remarks", async (req, res) => {
    try {
      const { studentName, subject, score, maxScore = 10, level, tone = "encouraging", language = "ar" } = req.body;
      const normalizedScore = Number(score) || 0;
      const ratio = normalizedScore / (Number(maxScore) || 10);

      const ai = getGeminiClient();
      if (!ai) {
        // High-quality fallback rule-based generation if no API key
        let fallbackAr = "";
        let fallbackFr = "";

        if (ratio >= 0.9) {
          fallbackAr = `نتائج ممتازة تدل على استيعاب عميق واجتهاد متواصل في مادة ${subject || "المادة"}. هنيئاً لك وإلى الأمام دائماً.`;
          fallbackFr = `Excellent travail! Très bonne maîtrise des compétences en ${subject || "la matière"}. Félicitations!`;
        } else if (ratio >= 0.75) {
          fallbackAr = `مستوى جيد جداً ومشاركة متميزة. يرجى الاستمرار على نفس النهج لتحقيق نتائج أفضل.`;
          fallbackFr = `Très bon travail et participation active. Continuez ainsi!`;
        } else if (ratio >= 0.6) {
          fallbackAr = `مستوى حسن ومجهود مشكور. يحتاج لمزيد من التركيز والدقة في التطبيقات الكتابية.`;
          fallbackFr = `Bon travail dans l'ensemble. Des efforts réguliers permettront d'exceller encore plus.`;
        } else if (ratio >= 0.5) {
          fallbackAr = `مستوى متوسط. الكفايات الأساسية في طور الاكتساب، ينصح بتكثيف المراجعة المنزلية.`;
          fallbackFr = `Résultats moyens. Les compétences de base sont en voie d'acquisition. Travaillez avec plus de régularité.`;
        } else {
          fallbackAr = `تعثرات في المكتسبات الأساسية. يحتاج إلى دعم استدراكي مكثف والمتابعة المستمرة في البيت والمدرسة.`;
          fallbackFr = `Des difficultés persistantes. Un soutien pédagogique régulier et un suivi renforcé sont indispensables.`;
        }

        return res.json({
          remarkAr: fallbackAr,
          remarkFr: fallbackFr,
          source: "built-in",
        });
      }

      const prompt = `أنت خبير بيداغوجي ومفتش تربوي بالتعليم الابتدائي المغربي ونظام مسار (Massar) ومدارس الريادة.
المطلوب توليد 3 خيارات لملاحظات وتقديرات دفتر النتائج/نظام مسار للتلميذ باللغة العربية والفرنسية:
- اسم التلميذ: ${studentName || "التلميذ(ة)"}
- المادة / المكون: ${subject || "المواد المدمجة"}
- النقطة المحصل عليها: ${normalizedScore} من ${maxScore}
- المستوى الدراسي: ${level || "التعليم الابتدائي"}
- نبرة الملاحظة: ${tone} (بيداغوجية، محفزة، دقيقة، خالية من التجريح)

أجب بصيغة JSON فقط بالتنسيق التالي:
{
  "options": [
    {
      "ar": "ملاحظة مركزة وموجزة متوافقة مع خانة مسار",
      "fr": "Appréciation concise en français pour Massar",
      "type": "رسمية / موجزة"
    },
    {
      "ar": "ملاحظة تشجيعية وتوجيهية مفصلة",
      "fr": "Appréciation encourageante et détaillée",
      "type": "تشجيعية"
    },
    {
      "ar": "ملاحظة تركز على خطة الدعم والمعالجة",
      "fr": "Appréciation axée sur le soutien pédagogique",
      "type": "علاجية"
    }
  ]
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.7,
        },
      });

      const responseText = response.text || "{}";
      const parsed = JSON.parse(responseText);
      return res.json({
        ...parsed,
        source: "gemini",
      });
    } catch (err: any) {
      console.error("Error generating remarks:", err);
      return res.status(500).json({ error: "فشل في توليد الملاحظات، يرجى المحاولة لاحقاً." });
    }
  });

  // AI Support & Remediation Suggestion for Pioneer Schools (روائز الدعم وخطة المعالجة)
  app.post("/api/generate-remediation", async (req, res) => {
    try {
      const { subject, difficulty, gradeLevel } = req.body;
      const ai = getGeminiClient();

      if (!ai) {
        return res.json({
          activities: [
            "أنشطة النمذجة والممارسة الموجهة وفق مبادئ التعليم الصريح (Enseignement explicite).",
            "بطاقات المران والتكرار المتباعد لتثبيت التعلمات الأساسية.",
            "العمل في مجموعات مرنة غير متجانسة للدعم بالنظير وتصحيح التمثل الخاطئ.",
          ],
          source: "built-in",
        });
      }

      const prompt = `اقترح 3 أنشطة دعم بيداغوجية سريعة قابلة للتطبيق داخل القسم لأستاذ التعليم الابتدائي بالمغرب (مدرسة الريادة):
المادة: ${subject}
نوع التعثر: ${difficulty}
المستوى: ${gradeLevel}
أجب بـ JSON: {"activities": ["نشاط 1", "نشاط 2", "نشاط 3"]}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.7,
        },
      });

      const parsed = JSON.parse(response.text || "{}");
      return res.json({ ...parsed, source: "gemini" });
    } catch (err: any) {
      console.error("Error in remediation generation:", err);
      return res.status(500).json({ error: "فشل التوليد" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Teacher Documents App running at http://localhost:${PORT}`);
  });
}

startServer();
