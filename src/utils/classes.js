import { QuestStatusEnum } from "./enums";

export class PlotPoint {
  constructor(description = "", triggers = []) {
    this.description = description;
    this.triggers = triggers; // array of strings
  }
}

export class QuestObjective {
  constructor(name = "", completed = false) {
    this.name = name;
    this.completed = completed;
  }
}

export class Quest {
  constructor(objectives = [], status = QuestStatusEnum.INACTIVE) {
    this.objectives = objectives; // array of QuestObjective
    this.status = status; // one of QuestStatusEnum
  }
}
