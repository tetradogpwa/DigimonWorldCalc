/**
 * calculator.ts
 *
 * Pure business logic for the Digimon evolution calculator.
 * No DOM dependencies — safe to use in any environment (browser, Node, tests).
 */

import { Stats, BonusStats, DigimonLevel } from "./types";
import { Digimon } from "./digimon";
import { EvolutionRequirements } from "./evolutionRequirements";
import { EvolutionPath } from "./evolutionPaths";
import {
  StatsGainResult,
  RequirementStatus,
  EvolutionResult,
  PriorityEntry,
  PriorityTableResult,
} from "./types";
import { DIGIMONS } from "./digimonData";
import { EVOLUTION_PATHS } from "./evolutionPaths";

// ─── Lookup helpers ───────────────────────────────────────────────────────────

export function getDigimon(name: string): Digimon {
  const d = DIGIMONS[name];
  if (!d) throw new Error(`Unknown Digimon: "${name}"`);
  return d;
}

export function getEvolutionPath(name: string): EvolutionPath {
  const p = EVOLUTION_PATHS[name];
  if (!p) throw new Error(`No evolution path for: "${name}"`);
  return p;
}

export function getAllDigimonNames(): string[] {
  return Object.keys(DIGIMONS);
}

// ─── Special evolutions ───────────────────────────────────────────────────────

const SPECIAL_EVOLUTIONS: Record<string, string> = {
  Devimon:   "Lose a battle with your Angemon while having <50% discipline and you'll have a chance to evolve into Devimon.",
  Numemon:   "Make sure you have no other evolution enabled and you'll evolve into Numemon after 96h on the Rookie level.",
  Sukamon:   "Fill your virus bar by pooping on the ground.",
  Nanimon:   "Bring happiness and discipline to 0 and scold your Digimon. The easiest way is praising/scolding and then reducing the last bit of discipline by overfeeding. The fly/flower condition will increase your happiness and prevents this evolution!",
  Vademon:   "Make sure you have no other evolution enabled and you can evolve into Vademon when praising/scolding your Digimon after 240h on the Champion level.",
  Kunemon:   "Sleep in Kunemon's bed and you'll have a chance to evolve into Kunemon.",
};

export function isSpecialEvolution(name: string): boolean {
  return name in SPECIAL_EVOLUTIONS;
}

export function getSpecialEvolutionMessage(name: string): string | undefined {
  return SPECIAL_EVOLUTIONS[name];
}

// ─── Stats gain ───────────────────────────────────────────────────────────────

export function calculateStatsGain(targetName: string, currentStats: Stats): StatsGainResult {
  return getDigimon(targetName).getStatsGains(currentStats);
}

// ─── Requirement status ───────────────────────────────────────────────────────

export function getRequirementStatus(
  targetName: string,
  stats: Stats,
  care: number,
  weight: number,
  bonus: BonusStats
): RequirementStatus {
  const req = getDigimon(targetName).requirements;
  const statsOk  = req.fulfillStats(stats);
  const careOk   = req.fulfillCare(care);
  const weightOk = req.fulfillWeight(weight);
  const bonusOk  = req.fulfillBonus(bonus);

  const count = [statsOk, careOk, weightOk, bonusOk].filter(Boolean).length;

  return { stats: statsOk, care: careOk, weight: weightOk, bonus: bonusOk, overall: count >= 3 };
}

// ─── Evolution check ──────────────────────────────────────────────────────────

export function checkEvolution(
  currentName: string,
  targetName: string,
  stats: Stats,
  care: number,
  weight: number,
  bonus: BonusStats
): EvolutionResult {
  const path = getEvolutionPath(currentName);
  const canEvolve = path.canEvolveTo(targetName);

  if (!canEvolve) {
    const paths = path.getPaths(targetName, getEvolutionPath);
    return {
      canEvolve: false,
      meetsRequirements: false,
      requirementStatus: { stats: false, care: false, weight: false, bonus: false, overall: false },
      isSpecialEvolution: isSpecialEvolution(targetName),
      specialMessage: getSpecialEvolutionMessage(targetName),
      suggestedPaths: paths.length > 0 ? paths : undefined,
    };
  }

  const reqStatus = getRequirementStatus(targetName, stats, care, weight, bonus);

  return {
    canEvolve: true,
    meetsRequirements: reqStatus.overall,
    requirementStatus: reqStatus,
    isSpecialEvolution: isSpecialEvolution(targetName),
    specialMessage: getSpecialEvolutionMessage(targetName),
  };
}

// ─── Priority table ───────────────────────────────────────────────────────────

export function getPriorityTable(
  currentName: string,
  stats: Stats,
  care: number,
  weight: number,
  bonus: BonusStats
): PriorityTableResult {
  const current = getDigimon(currentName);
  const targets = getEvolutionPath(currentName).targets;

  const enabled: Record<string, boolean> = {};
  for (const name of targets) {
    enabled[name] = getDigimon(name).fulfillsRequirements(stats, care, weight, bonus);
  }

  const scores: Record<string, number> = {};

  if (current.level === DigimonLevel.InTraining) {
    // For In-Training, score = highest normalized stat matching a requirement
    for (const name of targets) {
      scores[name] = 0;
      const req = getDigimon(name).requirements.requiredStats;
      for (const key of Object.keys(req) as (keyof Stats)[]) {
        const val = stats[key] / (key === "hp" || key === "mp" ? 10 : 1);
        if (req[key] !== 0 && val > scores[name]) {
          scores[name] = Math.floor(val);
        }
      }
    }
  } else {
    let carryStat = 0;
    let carryCount = 0;
    let maxStat = 0;

    for (const name of targets) {
      if (!enabled[name]) {
        scores[name] = 0;
        continue;
      }

      carryStat = getDigimon(name).requirements.calculatePriorityValue(stats, carryStat, carryCount);
      carryCount += getDigimon(name).requirements.requiredStatCount();
      scores[name] = carryStat;

      if (carryStat > maxStat) {
        maxStat = carryStat;
        carryStat = 0;
        carryCount = 0;
      }
    }
  }

  const entries: PriorityEntry[] = targets.map(name => ({
    name,
    score: scores[name] ?? 0,
    enabled: enabled[name] ?? false,
    requirementStatus: getRequirementStatus(name, stats, care, weight, bonus),
    isSpecial: isSpecialEvolution(name),
  }));

  const prioritized = current.level === DigimonLevel.InTraining
    ? getPrioritizedRookie(stats, enabled, entries)
    : getPrioritizedDigimon(scores, enabled, entries);

  return { entries, prioritized };
}

// ─── Priority helpers (internal) ──────────────────────────────────────────────

function getPrioritizedRookie(
  stats: Stats,
  enabled: Record<string, boolean>,
  entries: PriorityEntry[]
): string | undefined {
  let best: string | undefined;
  let highest = -1;

  for (const key of Object.keys(stats) as (keyof Stats)[]) {
    const val = stats[key] / (key === "hp" || key === "mp" ? 10 : 1);
    if (val > highest) {
      highest = val;
      for (const entry of entries) {
        if (isSpecialEvolution(entry.name) || !enabled[entry.name]) continue;
        const req = getDigimon(entry.name).requirements.requiredStats;
        if (req[key] !== 0) {
          best = entry.name;
          break;
        }
      }
    }
  }

  return best;
}

function getPrioritizedDigimon(
  scores: Record<string, number>,
  enabled: Record<string, boolean>,
  entries: PriorityEntry[]
): string | undefined {
  let best: string | undefined;

  for (const entry of entries) {
    if (isSpecialEvolution(entry.name) || !enabled[entry.name]) continue;
    if (best === undefined || scores[entry.name] > scores[best]) {
      best = entry.name;
    }
  }

  return best;
}