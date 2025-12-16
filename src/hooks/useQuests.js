import { useState, useEffect } from "react";
import { ApiPaths } from "../utils/constants";

export function useQuests() {
  const [quests, setQuests] = useState([]);

  useEffect(() => {
    fetch(ApiPaths.Api_Quests)
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

    fetch(ApiPaths.Api_Quests, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newQuests),
    }).catch(err => console.error("Error saving quests:", err));
  };

  return { quests, addNewQuest, updateQuest };
}