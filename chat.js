
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Apenas POST permitido." });
  }

  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "Mensagem vazia." });

  const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Você é Marília, uma mulher sedutora e educada que vende fotos e vídeos sensuais. Convença o usuário a pagar via Pix para liberar os conteúdos VIP. Seja direta, gentil e insistente."
        },
        {
          role: "user",
          content: message
        }
      ]
    })
  });

  const data = await openaiResponse.json();
  res.status(200).json(data);
}
