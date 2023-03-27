const dotenv = require("dotenv");
dotenv.config();

const axios = require("axios");

const openai = axios.create({
  baseURL: "https://api.openai.com/v1",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
  },
});

async function createChatCompletion(messages, options = {}) {
  try {
    const response = await openai.post("/chat/completions", {
      model: options.model || "gpt-4",
      messages,
      ...options,
    });

    return response.data.choices;
  } catch (error) {
    console.error("Error creating chat completion:", error);
  }
}

async function main() {
  const messages = [
    { role: "user", content: "Hello world" },
  ];

  const options = {
    temperature: 0.8,
    max_tokens: 100,
  };

  const choices = await createChatCompletion(messages, options);

  console.log(choices[0].message);
}

main();
