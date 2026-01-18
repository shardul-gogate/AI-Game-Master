import { QuestStatusEnum } from "./enums";

export function buildAIPrompt(messages, quests, plotPoints, gameState) {
  // Get last 4500 words of context
  const allMessages = messages.slice(0, -1);
  let wordCount = 0;
  const contextMessagesList = [];

  for (let i = allMessages.length - 1; i >= 0; i--) {
    const message = allMessages[i].trim();
    if (!message) continue;

    const words = message.split(/\s+/);
    const messageWordCount = words.length;

    if (wordCount < 4500) {
      contextMessagesList.unshift(message);
      wordCount += messageWordCount;
    } else {
      break;
    }
  }
  const contextMessages = contextMessagesList.join(" ");

  const latestInput = messages
    .slice(-1)[0]
    .trim();

  const activeQuestsText = quests
    .filter(quest => quest.status === QuestStatusEnum.ACTIVE && (quest.sample === undefined || !quest.sample))
    .map(quest => {
      const objectives = quest.objectives
        .map(objective => `${objective.name} - [${objective.completed ? "done" : "pending"}]`)
        .join(", ");
      return `Quest: ${quest.name} (Status: ${quest.status})
      Description: ${quest.description}
      Objectives: ${objectives}`;
    })
    .join("\n");

  const otherQuestsText = quests
    .filter(quest => quest.status !== QuestStatusEnum.ACTIVE && (quest.sample === undefined || !quest.sample))
    .map(quest => {
      return `Quest: ${quest.name} (Status: ${quest.status})
      Description: ${quest.description}`;
    })
    .join("\n");

  const textToScan = contextMessages + "\n" + latestInput + "\n" + activeQuestsText;
  const triggeredPlotPoints = plotPoints
    .filter(plotPoint => (plotPoint.sample === undefined || !plotPoint.sample))
    .filter(plotPoint =>
      plotPoint.triggers.some(trigger => {
        const pattern = new RegExp(`\\b${trigger}\\b`, "i"); // word boundary, case-insensitive
        return pattern.test(textToScan);
      })
    );
  console.log("# of Triggered Plot Points:", triggeredPlotPoints.length);
  const plotPointText = triggeredPlotPoints.map(plotPoint => `- ${plotPoint.description}`).join("\n");

  const prompt = `
  ${activeQuestsText ? `\nActive Quests:
  ${activeQuestsText}` : ''}
  ${otherQuestsText ? `\nOther Quests:
  ${otherQuestsText}` : ''}
  ${plotPointText ? `\nRelevant Context:
  ${plotPointText}` : ''}
  Current Day and Date: ${gameState.dayAndDate}
  Current Time of Day: ${gameState.timeOfDay}
  Story: ${contextMessages}
  Prompt: ${latestInput}
  `;
  console.log(prompt);
  return prompt;
}