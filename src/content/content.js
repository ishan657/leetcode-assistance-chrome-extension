/* global chrome */

// Floating Button
const btn = document.createElement("div");
btn.innerText = "🤖";
Object.assign(btn.style, {
  position: "fixed",
  bottom: "20px",
  right: "20px",
  background: "#22c55e",
  color: "white",
  padding: "12px",
  borderRadius: "50%",
  cursor: "pointer",
  zIndex: "9999",
});
document.body.appendChild(btn);

// Chat Box
const chat = document.createElement("div");
Object.assign(chat.style, {
  position: "fixed",
  bottom: "80px",
  right: "20px",
  width: "340px",
  height: "450px",
  background: "#0f172a",
  borderRadius: "12px",
  display: "none",
  flexDirection: "column",
  zIndex: "9999",
});

chat.innerHTML = `
<div style="
  padding:10px;
  font-weight:600;
  border-bottom:1px solid #1e293b;
  background:#020617;
">
  🤖 LeetCode Whisper
</div>

<div id="msgs" style="
  flex:1;
  overflow:auto;
  padding:10px;
  display:flex;
  flex-direction:column;
  gap:8px;
"></div>

<div style="padding:8px; border-top:1px solid #1e293b;">

  <textarea id="code" placeholder="Paste your code (optional)..."
    style="
      width:100%;
      height:55px;
      background:#020617;
      color:white;
      border:1px solid #1e293b;
      border-radius:8px;
      padding:6px;
      margin-bottom:6px;
      resize:none;
    "></textarea>

  <input id="inp" placeholder="Ask for hint, approach, or full code..."
    style="
      width:100%;
      padding:10px;
      border-radius:8px;
      border:1px solid #1e293b;
      background:#020617;
      color:white;
      outline:none;
    " />
</div>
`;

document.body.appendChild(chat);

btn.onclick = () => {
  chat.style.display = chat.style.display === "none" ? "flex" : "none";
};

// MULTI PLATFORM GET PROBLEM
const getProblem = () => {
  const url = window.location.href;

  if (url.includes("leetcode")) {
    return {
      platform: "LeetCode",
      title: document.querySelector('[data-cy="question-title"]')?.innerText,
      description: document.querySelector(
        '[data-track-load="description_content"]',
      )?.innerText,
      difficulty: [...document.querySelectorAll("div")]
        .map((el) => el.innerText)
        .find((t) => ["Easy", "Medium", "Hard"].includes(t)),
    };
  }

  if (url.includes("geeksforgeeks")) {
    return {
      platform: "GFG",
      title: document.querySelector("h1")?.innerText,
      description: document.querySelector(".problem-statement")?.innerText,
      difficulty: "Unknown",
    };
  }

  if (url.includes("codeforces")) {
    return {
      platform: "Codeforces",
      title: document.querySelector(".title")?.innerText,
      description: document.querySelector(".problem-statement")?.innerText,
      difficulty: "Unknown",
    };
  }

  return {};
};

const msgs = chat.querySelector("#msgs");
const inp = chat.querySelector("#inp");
const codeBox = chat.querySelector("#code");

const format = (text) => {
  return text.replace(/```(\w+)?([\s\S]*?)```/g, (_, lang, code) => {
    return `
      <pre style="
        background:#020617;
        padding:10px;
        border-radius:8px;
        overflow:auto;
        margin-top:5px;
        font-size:12px;
        border:1px solid #1e293b;
      ">
${code}
      </pre>
    `;
  });
};

const render = (history) => {
  msgs.innerHTML = "";

  history.forEach((m) => {
    const wrapper = document.createElement("div");
    const bubble = document.createElement("div");

    const isUser = m.role === "You";

    // Wrapper (alignment)
    wrapper.style.display = "flex";
    wrapper.style.justifyContent = isUser ? "flex-end" : "flex-start";

    // Bubble styling
    bubble.style.maxWidth = "75%";
    bubble.style.padding = "10px 12px";
    bubble.style.borderRadius = "16px";
    bubble.style.fontSize = "13px";
    bubble.style.lineHeight = "1.4";
    bubble.style.whiteSpace = "pre-wrap";
    bubble.style.wordBreak = "break-word";
    bubble.style.marginBottom = "6px";

    // Colors
    if (isUser) {
      bubble.style.background = "#2563eb";
      bubble.style.color = "white";
      bubble.style.borderBottomRightRadius = "4px";
    } else {
      bubble.style.background = "#1e293b";
      bubble.style.color = "#e2e8f0";
      bubble.style.borderBottomLeftRadius = "4px";
    }

    // Content (with formatting)
    bubble.innerHTML = format(m.text);

    wrapper.appendChild(bubble);
    msgs.appendChild(wrapper);
  });

  // Auto scroll
  msgs.scrollTop = msgs.scrollHeight;
};

const load = async () =>
  (await chrome.storage.local.get("chatHistory")).chatHistory || [];
const save = async (h) => chrome.storage.local.set({ chatHistory: h });

load().then(render);

inp.addEventListener("keypress", async (e) => {
  if (e.key === "Enter") {
    const text = inp.value;
    inp.value = "";

    let history = await load();

    // ✅ 1. Add user message
    history.push({ role: "You", text });

    // ✅ 2. Render immediately (FIX)
    render(history);

    const problem = getProblem();

    // ✅ 3. Call AI
    chrome.runtime.sendMessage(
      {
        type: "CHAT",
        userMessage: text,
        code: codeBox.value,
        question: problem,
        history,
      },
      async (res) => {
        // ✅ 4. Add AI reply
        history.push({ role: "AI", text: res.reply });

        await save(history);

        // ✅ 5. Render again
        render(history);

        // ✅ Auto scroll
        msgs.scrollTop = msgs.scrollHeight;
      },
    );
  }
});
