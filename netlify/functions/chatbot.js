import fetch from "node-fetch";

export async function handler(event, context) {
  try {
    const body = JSON.parse(event.body);
    // 确保 messages 数组不为空，添加默认系统提示
    const messages = body.messages || [];
    if (!messages.find(m => m.role === "system")) {
      messages.unshift({
        role: "system",
        content: "Vous êtes un assistant d'assurance pour insuranceqc.ca. Répondez en français par défaut, ou selon la langue spécifiée dans le message."
      });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: messages
      })
    });

    if (!response.ok) throw new Error(`OpenAI API error! Status: ${response.status}`);
    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    console.error("Function error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
}