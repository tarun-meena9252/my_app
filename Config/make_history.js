export function buildGeminiHistory(prompt, response) {
  return [
    {
      role: "user",
      parts: [{ text : prompt }]
    },
    {
      role: "model",
      parts: [{ text : response }]
    }
  ];
}