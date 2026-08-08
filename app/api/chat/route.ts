import { streamText, convertToModelMessages, type UIMessage } from "ai";
export const maxDuration = 60;
const ALLOWED_MODELS = [
  "deepseek/deepseek-v4-flash",
  "alibaba/qwen3.6-27b",
  "google/gemma-4-31b-it",
  "xiaomi/mimo-v2.5",
  "zai/glm-5.1",
  "moonshotai/kimi-k2.6",
];
const SYSTEM = `أنت مساعد ذكاء اصطناعي على الموقع الشخصي لمشعل الفيصل.
أجب بالعربية الفصحى بشكل افتراضي، واستخدم الإنجليزية للمصطلحات التقنية.
كن مباشرًا ومفيدًا وواضحًا. إذا كتب المستخدم بالإنجليزية، أجب بالإنجليزية.`;
export async function POST(req: Request) {
  const {
    messages,
    model,
  }: { messages: UIMessage[]; model?: string } = await req.json();
  const selected =
    model && ALLOWED_MODELS.includes(model) ? model : ALLOWED_MODELS[0];
  const fallbacks = ALLOWED_MODELS.filter((m) => m !== selected).slice(0, 2);
  const result = streamText({
    model: selected,
    system: SYSTEM,
    messages: convertToModelMessages(messages),
    providerOptions: {
      gateway: {
        models: fallbacks,
      },
    },
  });
  return result.toUIMessageStreamResponse({
    onError: (error) => {
      const msg = error instanceof Error ? error.message : String(error);
      if (msg.includes("rate-limited") || msg.includes("rate_limit")) {
        return "وصلنا حد الاستخدام المجاني مؤقتًا، انتظر دقيقة أو جرّب نموذجًا آخر من القائمة.";
      }
      if (msg.includes("Free tier")) {
        return "هذا النموذج غير متاح على الخطة المجانية، جرّب نموذجًا آخر من القائمة.";
      }
      if (msg.includes("not found")) {
        return "النموذج غير موجود في البوابة، جرّب نموذجًا آخر.";
      }
      return "تعذّر الاتصال بالنموذج. جرّب مرة أخرى أو بدّل النموذج.";
    },
  });
}
