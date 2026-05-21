import { Stats, BonusStats, DigimonLevel, DigimonNames } from "./types";
import { EvolutionRequirements } from "./evolutionRequirements";
import { EVOLUTION_PATHS } from "./evolutionPaths";
import { getDigimon } from "./calculator";

export class Digimon {
  name: keyof typeof DigimonNames;
  level:keyof typeof DigimonLevel;
  statsGains: Stats;
  requirements: EvolutionRequirements;

  constructor(
    name: keyof typeof DigimonNames,
    level:keyof typeof DigimonLevel,
    statsGains: Stats,
    requirements: EvolutionRequirements
  ) {
    this.name = name;
    this.level = level;
    this.statsGains = statsGains;
    this.requirements = requirements;
  }

  get targets(){
    return Array.from(EVOLUTION_PATHS[this.name].targets).map(getDigimon)
  }

  get srcPictureGif(){
    return `./imgs/${this.name}.gif`
  }
  get srcPicturePng(){
    return `./imgs/${this.name}.png`
  }
  /**
   * Calculates the stats gained on next training session.
   * If current stat already meets the gain cap, returns 10% of the cap.
   * Otherwise returns half the remaining gap.
   */
  getStatsGains(currentStats: Stats): Stats {
    const result = {} as Stats;

    for (const key of Object.keys(this.statsGains) as (keyof Stats)[]) {
      const cap = this.statsGains[key];
      const current = currentStats[key];
      result[key] =
        current >= cap
          ? Math.floor(cap * 0.1)
          : Math.floor((cap - current) / 2);
    }

    return result;
  }

  /**
   * Returns true if at least 3 of the 4 requirement groups are fulfilled.
   */
  fulfillsRequirements(
    stats: Stats,
    care: number,
    weight: number,
    bonus: BonusStats
  ): boolean {
    const req = this.requirements;
    const fulfilled = [
      req.fulfillStats(stats),
      req.fulfillCare(care),
      req.fulfillWeight(weight),
      req.fulfillBonus(bonus),
    ].filter(Boolean).length;

    return fulfilled >= 3;
  }
}