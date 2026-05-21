// ─── Enums ────────────────────────────────────────────────────────────────────

export enum DigimonLevel {
  Fresh,
  InTraining,
  Rookie,
  Champion,
  Ultimate,
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
  MinBattles: boolean;
  MinCare: boolean;
  DigimonBonus?: string;
}

// ─── Digimon ──────────────────────────────────────────────────────────────────

export interface DigimonData {
  name: string;
  level: keyof typeof DigimonLevel;
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
  name: keyof typeof DigimonNames;
  score: number;
  enabled: boolean;
  requirementStatus: RequirementStatus;
  isSpecial: boolean;
}

export interface PriorityTableResult {
  entries: PriorityEntry[];
  prioritized?: string;
}


export enum DigimonNames{
    Agumon,
Airdramon,
Andromon,
Angemon,
Bakemon,
Betamon,
Birdramon,
Biyomon,
Botamon,
Centarumon,
Coelamon,
Devimon,
Digitamamon,
Drimogemon,
Elecmon,
Etemon,
Frigimon,
Gabumon,
Garurumon,
Giromon,
Greymon,
'H-Kabuterimon',
Kabuterimon,
Kokatorimon,
Koromon,
Kunemon,
Kuwagamon,
Leomon,
Mamemon,
Megadramon,
MegaSeadramon,
Meramon,
MetalGreymon,
MetalMamemon,
Mojyamon,
Monochromon,
Monzaemon,
Nanimon,
Ninjamon,
Numemon,
Ogremon,
Palmon,
Patamon,
Penguinmon,
Phoenixmon,
Piximon,
Poyomon,
Punimon,
Seadramon,
Shellmon,
SkullGreymon,
Sukamon,
Tanemon,
Tokomon,
Tsunomon,
Tyrannomon,
Unimon,
Vademon,
Vegiemon,
Whamon,
Yuramon,
}