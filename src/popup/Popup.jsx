import { useState, useEffect } from "react";
import "./popup.css";

export default function Popup() {
  const [apiKey, setApiKey] = useState("");
  const [model, setModel] = useState("gemini-2.5-flash");

  useEffect(() => {
    chrome.storage.local.get(["apiKey", "model"], (res) => {
      if (res.apiKey) setApiKey(res.apiKey);
      if (res.model) setModel(res.model);
    });
  }, []);

  const save = () => {
    chrome.storage.local.set({ apiKey, model }, () => {
      alert("Saved!");
    });
  };

  return (
    <div className="container">
      <h2>LeetCode Whisper</h2>

      <select value={model} onChange={(e) => setModel(e.target.value)}>
        <option value="gemini-2.5-flash">gemini-2.5-flash</option>
      </select>

      <input
        type="password"
        placeholder="API Key"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
      />

      <button onClick={save}>Save</button>
    </div>
  );
}