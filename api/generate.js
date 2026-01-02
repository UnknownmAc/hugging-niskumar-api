export const config = { runtime: 'edge' };

export default async function handler(req) {
  const { prompt } = await req.json();

  // We use the 'v1/chat/completions' style which is standard for Qwen
  const response = await fetch(
    "https://router.huggingface.co/models/Qwen/Qwen2.5-72B-Instruct/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.HF_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "Qwen/Qwen2.5-72B-Instruct",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 500
      }),
    }
  );

  const data = await response.json();
  
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' }
  });
}