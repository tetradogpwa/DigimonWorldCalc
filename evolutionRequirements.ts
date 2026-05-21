import { Stats, BonusStats, EvolutionRequirementsData } from "./types";

export class EvolutionRequirements implements EvolutionRequirementsData {
  requiredStats: Stats;
  care: number;
  weight: number;
  happiness: number;
  discipline: number;
  techs: number;
  battles: number;
  minBattles: boolean;
  minCare: boolean;
  digimonBonus?: string;

  constructor(
    hp: number, mp: number,
    offense: number, defense: number,
    speed: number, brains: number,
    care: number, weight: number,
    discipline: number, happiness: number,
    battles: number, techs: number,
    minCare: boolean, minBattles: boolean,
    digimonBonus?: string
  ) {
    this.requiredStats = { hp, mp, offense, defense, speed, brains };
    this.care = care;
    this.weight = weight;
    this.happiness = happiness;
    this.discipline = discipline;
    this.techs = techs;
    this.battles = battles;
    this.minBattles = minBattles;
    this.minCare = minCare;
    this.digimonBonus = digimonBonus;
  }

  fulfillStats(stats: Stats): boolean {
    for (const key of Object.keys(this.requiredStats) as (keyof Stats)[]) {
      if (this.requiredStats[key] !== 0 && this.requiredStats[key] > stats[key]) {
        return false;
      }
    }
    return true;
  }

  fulfillCare(care: number): boolean {
    return this.minCare ? care <= this.care : care >= this.care;
  }

  fulfillWeight(weight: number): boolean {
    return (this.weight - 5) <= weight && (this.weight + 5) >= weight;
  }

  fulfillBonus(bonus: BonusStats): boolean {
    if (this.digimonBonus !== undefined && bonus.current === this.digimonBonus) return true;
    if (this.techs !== 0 && bonus.techniques >= this.techs) return true;
    if (this.discipline !== 0 && bonus.discipline >= this.discipline) return true;
    if (this.happiness !== 0 && bonus.happiness >= this.happiness) return true;

    if (this.battles >= 0) {
      if (this.minBattles && this.battles >= bonus.battles) return true;
      if (!this.minBattles && this.battles <= bonus.battles) return true;
    }

    return false;
  }

  /** Returns a cumulative average of required stats (normalized) for priority scoring. */
  calculatePriorityValue(stats: Stats, carryStat: number, carryCount: number): number {
    let statsSum = carryStat;
    let statsCounter = carryCount;

    for (const key of Object.keys(this.requiredStats) as (keyof Stats)[]) {
      const required = this.requiredStats[key];
      const current = stats[key];
      if (required !== 0 && !isNaN(current)) {
        statsSum += current / (key === "hp" || key === "mp" ? 10 : 1);
        statsCounter++;
      }
    }

    const score = Math.floor(statsSum / statsCounter);
    return isNaN(score) ? 0 : score;
  }

  requiredStatCount(): number {
    return (Object.keys(this.requiredStats) as (keyof Stats)[])
      .filter(key => this.requiredStats[key] !== 0)
      .length;
  }
}