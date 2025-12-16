import { useState, useEffect } from "react";

function buildAIPrompt(messages, quests, storyCards, gameState) {
  const contextMessages = messages
    .slice(-15, -1) // take last 15 messages excluding the latest input
    .map(message => message.trim())
    .join(" ");

  const latestInput = messages
    .slice(-1)[0]
    .trim();

  // Include all quests
  const questText = quests
    .filter(quest => quest.status === "Active")
    .map(quest => {
      const objectives = quest.objectives
        .map(objective => `${objective.name} - [${objective.completed ? "done" : "pending"}]`)
        .join(", ");
      return `Quest: ${quest.name} (Status: ${quest.status}) - Description: ${quest.description} - Objectives: ${objectives}`;
    })
    .join("\n");

  // Scan for triggered StoryCards
  const textToScan = contextMessages + "\n" + latestInput + "\n" + questText;
  const triggeredCards = storyCards.filter(card =>
    card.triggers.some(trigger => {
      const pattern = new RegExp(`\\b${trigger}\\b`, "i"); // word boundary, case-insensitive
      return pattern.test(textToScan);
    })
  );
  console.log("# of Triggered Story Cards:", triggeredCards.length);
  const storyCardText = triggeredCards.map(card => `- ${card.description}`).join("\n");

  // Build final prompt
  const prompt = `
  Story Context:
  ${contextMessages}

  Active Quests:
  ${questText || "None"}

  Relevant Plot Elements:
  ${storyCardText || "None"}

  In-game Date and Time:
  ${gameState.date || "<unknown>"}, ${gameState.day || "<unknown>"}, ${gameState.timeOfDay || "<unknown>"}

  Player Input:
  ${latestInput}
  `;
  console.log("Prompt : ", prompt)
  return prompt;
}

export function useChat(quests, storyCards, gameState) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState("MistralRP");

  useEffect(() => {
    fetch("/api/history")
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch((err) => console.error("Error loading history:", err));
  }, []);

  async function generate(currentMessages) {
    setLoading(true);
    try {
      const resp = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: buildAIPrompt(currentMessages, quests, storyCards, gameState),
          model: model,
        }),
      });
      const data = await resp.json();
      setMessages(m => [...m, data?.message || "No response"]);
    } catch (e) {
      setMessages(m => [...m, "Error: " + e.message]);
    } finally {
      setLoading(false);
    }
  }

  const saveHistory = () => {
    fetch("/api/history", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(messages),
    }).catch(err => console.error("Error saving history:", err));
  };

  const eraseLastMessage = () => setMessages(m => m.slice(0, -1));
  const retry = () => generate(messages.slice(0, -1));
  const continueChat = () => generate(messages);
  const send = (prompt) => setMessages(m => [...m, prompt]);

  return { messages, setMessages, loading, model, setModel, saveHistory, eraseLastMessage, retry, continueChat, send };
}