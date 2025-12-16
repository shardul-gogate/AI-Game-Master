import { useState, useEffect } from "react";

export function useStoryCards() {
  const [storyCards, setStoryCards] = useState([]);

  useEffect(() => {
    fetch("/api/storycards")
      .then((res) => res.json())
      .then((data) => setStoryCards(data))
      .catch((err) => console.error("Error loading story cards:", err));
  }, []);

  const addNewStoryCard = () => {
    setStoryCards(prev => [
      ...prev,
      { description: "", triggers: [] }
    ]);
  };

  const updateStoryCard = (index, updatedCard) => {
    const newCards = [...storyCards];
    newCards[index] = updatedCard;
    setStoryCards(newCards);

    fetch("/api/storycards", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCards),
    }).catch(err => console.error("Error saving story cards:", err));
  };

  return { storyCards, addNewStoryCard, updateStoryCard };
}