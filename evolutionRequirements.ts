import { Stats, BonusStats, EvolutionRequirementsData, DigimonNames } from "./types";

export class EvolutionRequirements implements EvolutionRequirementsData {
  requiredStats: Stats;
  care: number;
  weight: number;
  happiness: number;
  discipline: number;
  techs: number;
  battles: number;


  constructor(
    public readonly Hp: number, public readonly Mp: number,
    public readonly Offense: number, public readonly Defense: number,
    public readonly Speed: number, public readonly Brains: number,
    public readonly Care: number, public readonly Weight: number,
    public readonly Discipline: number, public readonly Happiness: number,
    public readonly Battles: number, public readonly Techs: number,
    public readonly MinCare: boolean, public readonly MinBattles: boolean,
    public readonly DigimonBonus?: keyof typeof DigimonNames
  ) {
    this.requiredStats = { hp:this.Hp, mp:this.Mp, offense:this.Offense, defense:this.Defense, speed:this.Speed, brains:this.Brains };
    this.care = this.Care;
    this.weight = this.Weight;
    this.happiness = this.Happiness;
    this.discipline = this.Discipline;
    this.techs = this.Techs;
    this.battles = this.Battles;
   
  }
  reset(){
        this.care = this.Care;
    this.weight = this.Weight;
    this.happiness = this.Happiness;
    this.discipline = this.Discipline;
    this.techs = this.Techs;
    this.battles = this.Battles;
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
    return this.MinCare ? care <= this.care : care >= this.care;
  }

  fulfillWeight(weight: number): boolean {
    return (this.weight - 5) <= weight && (this.weight + 5) >= weight;
  }

  fulfillBonus(bonus: BonusStats): boolean {
    let isOk=false;
    if (this.DigimonBonus !== undefined && bonus.current === this.DigimonBonus) isOk=true;
    else if (this.techs !== 0 && bonus.techniques >= this.techs) isOk=true;
    else if (this.discipline !== 0 && bonus.discipline >= this.discipline) isOk=true;
    else if (this.happiness !== 0 && bonus.happiness >= this.happiness) isOk=true;

    else if (this.battles >= 0) {
      if (this.MinBattles && this.battles >= bonus.battles) isOk=true;
      else if (!this.MinBattles && this.battles <= bonus.battles) isOk=true;
    }

    return isOk;
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