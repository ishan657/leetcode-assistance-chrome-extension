# 🚀 LeetCode Whisper – AI Coding Assistant Chrome Extension

LeetCode Whisper is a **Chrome Extension powered by AI (Gemini/OpenAI)** that helps you solve coding problems across multiple platforms like:

* 🟡 LeetCode
* 🟢 GeeksforGeeks
* 🔵 Codeforces

It acts like a **DSA mentor**, guiding you with hints, debugging help, and clean code — instead of just giving answers.

---

## ✨ Features

* 🤖 Floating **“Ask AI” assistant** on problem pages
* 💬 Interactive **chat-based interface**
* 🧠 Context-aware responses (auto-detects problem details)
* 🛠️ Paste your code → get **debugging guidance**
* 🔁 Convert code between languages (C++ → Java, etc.)
* 🧾 Persistent **chat history**
* 🎯 Works across multiple coding platforms

---

## 🖼️ Screenshots

> Add your screenshots below 👇

### 🔹 Extension UI

<img width="310" height="200" alt="Screenshot 2026-03-31 010331" src="https://github.com/user-attachments/assets/c6e61e09-b39d-4b5d-ba53-7293942816f5" />


### 🔹 Chat Assistant

<img width="300" height="400" alt="Screenshot 2026-03-31 010056" src="https://github.com/user-attachments/assets/a0796616-e2ae-4c91-83c4-5149f7a8e9fc" />

---

## ⚙️ Tech Stack

* React.js
* CRXJS (Chrome Extension tooling)
* Vite
* Gemini API (Google AI)
* Chrome Extension APIs

---

## 🔑 Getting Your API Key

You can use **Gemini API (recommended)**:

1. Go to: https://aistudio.google.com/app/apikey
2. Sign in with your Google account
3. Click **“Create API Key”**
4. Copy the key

---

## 🛠️ Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/leetcode-whisper.git
cd leetcode-whisper
```

---

### 2️⃣ Install dependencies

```bash
npm install
```

---

### 3️⃣ Build the extension

```bash
npm run build
```

---

### 4️⃣ Load extension in Chrome

1. Open Chrome
2. Go to:

```
chrome://extensions/
```

3. Enable **Developer Mode** (top right)
4. Click **Load unpacked**
5. Select the `dist/` folder

---

### 5️⃣ Add your API Key

* Click the extension icon
* Enter your API key
* Save

---

## 🚀 How to Use

1. Open any problem on:

   * LeetCode / GFG / Codeforces

2. You’ll see a floating **🤖 button**

3. Click it → Chat opens

4. Ask things like:

   * “Give me a hint”
   * “Explain approach”
   * “Fix my code”
   * “Convert this to Java”

---

## 🧠 Example Use Cases

* Learn problem-solving step-by-step
* Debug your own solution
* Understand optimal approaches
* Convert between programming languages

---

## 📌 Project Structure

```
src/
 ├── background/     # AI logic
 ├── content/        # Injected UI + chat
 ├── popup/          # Extension settings
 └── main.jsx        # React entry

manifest.json        # Chrome extension config
vite.config.js       # CRXJS config
```

---

## 🔥 Why This Project?

This project demonstrates:

* Chrome Extension Development (Manifest V3)
* DOM scraping & content scripts
* AI integration with real-time context
* Prompt engineering for structured responses
* State management using chrome.storage

---

## 🧑‍💻 Replacing Your Old Project (Important)

If you already had a previous version:

### Option 1 (Recommended)

Replace your repo completely:

```bash
rm -rf old-project
git clone this-project
```

---

### Option 2 (Manual Replace)

* Delete old:

  * TypeScript files
  * old manifest
  * old background/content scripts

* Replace with:

  * New `src/` folder
  * New `manifest.json`
  * New `vite.config.js`

---

## 🚀 Future Improvements

* ✨ Syntax highlighting (like VS Code)
* ⚡ Streaming AI responses
* 🧠 Auto-detect code from editor
* 🎨 Better UI with Tailwind

---

## 🤝 Contributing

Feel free to fork and improve this project!

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!

---
