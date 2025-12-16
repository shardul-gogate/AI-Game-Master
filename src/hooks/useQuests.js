import { useState, useEffect } from "react";

export function useQuests() {
  const [quests, setQuests] = useState([]);

  useEffect(() => {
    fetch("/api/quests")
      .then((res) => res.json())
      .then((data) => setQuests(data))
      .catch((err) => console.error("Error loading quests:", err));
  }, []);

  const addNewQuest = () => {
    setQuests(prev => [
      ...prev,
      { name: "", status: "Inactive", objectives: [] }
    ]);
  };

  const updateQuest = (index, updatedQuest) => {
    const newQuests = [...quests];
    newQuests[index] = updatedQuest;
    setQuests(newQuests);

    fetch("/api/quests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newQuests),
    }).catch(err => console.error("Error saving quests:", err));
  };

  return { quests, addNewQuest, updateQuest };
}