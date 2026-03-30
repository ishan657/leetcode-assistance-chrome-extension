/* global chrome */

const callGemini = async (prompt, apiKey, model) => {
  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    const data = await res.json();

    console.log("Gemini response:", data);

    return data?.candidates?.[0]?.content?.parts?.[0]?.text || "⚠️ No response";
  } catch (err) {
    console.error("Gemini error:", err);
    return "❌ API error";
  }
};

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "CHAT") {
    chrome.storage.local.get(["apiKey", "model"], async (res) => {

      if (!res.apiKey) {
        sendResponse({ reply: "⚠️ Add API key in popup first" });
        return;
      }

      // ✅ FIXED VARIABLES
      const { title, description, difficulty, number } = msg.question || {};
      const historyText = (msg.history || [])
        .map(m => `${m.role}: ${m.text}`)
        .join("\n");

      const prompt = `
You are a senior DSA mentor helping a student.

------------------------
SMART RESPONSE RULES:
------------------------
- Default → SHORT answers (4–6 lines)
- If user asks for "code", "full solution", "complete code":
  → GIVE full clean code

------------------------
STYLE:
------------------------
- Use bullet points
- Keep it human-friendly
- Avoid long paragraphs

------------------------
CODE RULES:
------------------------
- Always format code properly
- Use indentation + spacing
- Wrap in triple backticks with language

Example:
\`\`\`java
public class Solution {
    public int solve() {
        return 0;
    }
}
\`\`\`

------------------------
DEBUGGING:
------------------------
- If user gives code → point mistakes briefly
- Suggest fixes (don’t rewrite everything unless asked)

------------------------
PROBLEM:
------------------------
${msg.question?.title || ""}
${msg.question?.description || ""}

------------------------
USER CODE:
------------------------
${msg.code || "No code provided"}

------------------------
USER MESSAGE:
------------------------
${msg.userMessage || ""}

------------------------
FINAL:
------------------------
Be like a helpful senior, not a textbook.
`;

      const reply = await callGemini(prompt, res.apiKey, res.model);
      sendResponse({ reply });
    });

    return true;
  }
});