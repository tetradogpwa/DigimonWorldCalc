// ─── Enums ────────────────────────────────────────────────────────────────────

export enum DigimonLevel {
  Fresh = 0,
  InTraining = 1,
  Rookie = 2,
  Champion = 3,
  Ultimate = 4,
}

// ─── Stats ────────────────────────────────────────────────────────────────────

export interface Stats {
  hp: number;
  mp: number;
  offense: number;
  defense: number;
  speed: number;
  brains: number;
}

export interface BonusStats {
  current: string;
  happiness: number;
  discipline: number;
  techniques: number;
  battles: number;
}

// ─── Evolution Requirements ───────────────────────────────────────────────────

export interface EvolutionRequirementsData {
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
}

// ─── Digimon ──────────────────────────────────────────────────────────────────

export interface DigimonData {
  name: string;
  level: DigimonLevel;
  statsGains: Stats;
  requirements: EvolutionRequirementsData;
}

// ─── Calculator Results ───────────────────────────────────────────────────────

export interface StatsGainResult {
  hp: number;
  mp: number;
  offense: number;
  defense: number;
  speed: number;
  brains: number;
}

export interface RequirementStatus {
  stats: boolean;
  care: boolean;
  weight: boolean;
  bonus: boolean;
  overall: boolean;
}

export interface EvolutionResult {
  canEvolve: boolean;
  meetsRequirements: boolean;
  requirementStatus: RequirementStatus;
  isSpecialEvolution: boolean;
  specialMessage?: string;
  suggestedPaths?: string[];
}

export interface PriorityEntry {
  name: string;
  score: number;
  enabled: boolean;
  requirementStatus: RequirementStatus;
  isSpecial: boolean;
}

export interface PriorityTableResult {
  entries: PriorityEntry[];
  prioritized?: string;
}