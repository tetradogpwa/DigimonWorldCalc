import { DigimonNames } from "./types";

export class EvolutionPath {
  targets: Set<keyof typeof DigimonNames>;

  constructor(targets: (keyof typeof DigimonNames)[]) {
    this.targets = new Set(targets);
  }

  canEvolveTo(digimon: keyof typeof DigimonNames): boolean {
    return this.targets.has(digimon);
  }

  /**
   * Returns a flat list of formatted evolution path strings leading to `digimon`.
   * E.g. ["Greymon -> MetalGreymon"]
   */
  getPaths(digimon: keyof typeof DigimonNames, getPath: (name: keyof typeof DigimonNames) => EvolutionPath): string[] {
    if (this.canEvolveTo(digimon)) return [digimon];

    const paths: string[] = [];

    for (const target of this.targets) {
      const subPaths = getPath(target).getPaths(digimon, getPath);
      for (const sub of subPaths) {
        paths.push(`${target} -> ${sub}`);
      }
    }

    return paths;
  }
}

// ─── Registry ─────────────────────────────────────────────────────────────────

export const EVOLUTION_PATHS: Record<string, EvolutionPath> = {
  Botamon:       new EvolutionPath(["Koromon", "Sukamon"]),
  Poyomon:       new EvolutionPath(["Tokomon", "Sukamon"]),
  Punimon:       new EvolutionPath(["Tsunomon", "Sukamon"]),
  Yuramon:       new EvolutionPath(["Tanemon", "Sukamon"]),
  Koromon:       new EvolutionPath(["Agumon", "Gabumon", "Kunemon", "Sukamon"]),
  Tokomon:       new EvolutionPath(["Patamon", "Biyomon", "Kunemon", "Sukamon"]),
  Tsunomon:      new EvolutionPath(["Elecmon", "Penguinmon", "Kunemon", "Sukamon"]),
  Tanemon:       new EvolutionPath(["Palmon", "Betamon", "Kunemon", "Sukamon"]),
  Agumon:        new EvolutionPath(["Greymon", "Meramon", "Birdramon", "Centarumon", "Monochromon", "Tyrannomon", "Numemon", "Nanimon", "Sukamon"]),
  Gabumon:       new EvolutionPath(["Centarumon", "Monochromon", "Drimogemon", "Tyrannomon", "Ogremon", "Garurumon", "Numemon", "Nanimon", "Sukamon"]),
  Patamon:       new EvolutionPath(["Drimogemon", "Tyrannomon", "Ogremon", "Leomon", "Angemon", "Unimon", "Numemon", "Nanimon", "Sukamon"]),
  Elecmon:       new EvolutionPath(["Leomon", "Angemon", "Bakemon", "Kokatorimon", "Numemon", "Nanimon", "Sukamon"]),
  Biyomon:       new EvolutionPath(["Birdramon", "Airdramon", "Kokatorimon", "Unimon", "Kabuterimon", "Numemon", "Nanimon", "Sukamon"]),
  Kunemon:       new EvolutionPath(["Bakemon", "Kabuterimon", "Kuwagamon", "Vegiemon", "Numemon", "Nanimon", "Sukamon"]),
  Palmon:        new EvolutionPath(["Kuwagamon", "Vegiemon", "Ninjamon", "Whamon", "Coelamon", "Numemon", "Nanimon", "Sukamon"]),
  Betamon:       new EvolutionPath(["Seadramon", "Whamon", "Shellmon", "Coelamon", "Numemon", "Nanimon", "Sukamon"]),
  Penguinmon:    new EvolutionPath(["Whamon", "Shellmon", "Garurumon", "Frigimon", "Mojyamon", "Numemon", "Nanimon", "Sukamon"]),
  Greymon:       new EvolutionPath(["MetalGreymon", "SkullGreymon", "Vademon", "Sukamon"]),
  Meramon:       new EvolutionPath(["MetalGreymon", "Andromon", "Vademon", "Sukamon"]),
  Birdramon:     new EvolutionPath(["Phoenixmon", "Vademon", "Sukamon"]),
  Centarumon:    new EvolutionPath(["Andromon", "Giromon", "Vademon", "Sukamon"]),
  Monochromon:   new EvolutionPath(["MetalGreymon", "MetalMamemon", "Vademon", "Sukamon"]),
  Drimogemon:    new EvolutionPath(["MetalGreymon", "Vademon", "Sukamon"]),
  Tyrannomon:    new EvolutionPath(["MetalGreymon", "Megadramon", "Vademon", "Sukamon"]),
  Devimon:       new EvolutionPath(["SkullGreymon", "Megadramon", "Vademon", "Sukamon"]),
  Ogremon:       new EvolutionPath(["Andromon", "Giromon", "Vademon", "Sukamon"]),
  Leomon:        new EvolutionPath(["Andromon", "Mamemon", "Vademon", "Sukamon"]),
  Angemon:       new EvolutionPath(["Andromon", "Phoenixmon", "Devimon", "Vademon", "Sukamon"]),
  Bakemon:       new EvolutionPath(["SkullGreymon", "Giromon", "Vademon", "Sukamon"]),
  Airdramon:     new EvolutionPath(["Megadramon", "Phoenixmon", "Vademon", "Sukamon"]),
  Kokatorimon:   new EvolutionPath(["Phoenixmon", "Piximon", "Vademon", "Sukamon"]),
  Unimon:        new EvolutionPath(["Giromon", "Phoenixmon", "Vademon", "Sukamon"]),
  Kabuterimon:   new EvolutionPath(["H-Kabuterimon", "MetalMamemon", "Vademon", "Sukamon"]),
  Kuwagamon:     new EvolutionPath(["H-Kabuterimon", "Piximon", "Vademon", "Sukamon"]),
  Vegiemon:      new EvolutionPath(["Piximon", "Vademon", "Sukamon"]),
  Ninjamon:      new EvolutionPath(["Piximon", "MetalMamemon", "Mamemon", "Vademon", "Sukamon"]),
  Seadramon:     new EvolutionPath(["Megadramon", "MegaSeadramon", "Vademon", "Sukamon"]),
  Whamon:        new EvolutionPath(["MegaSeadramon", "Mamemon", "Vademon", "Sukamon"]),
  Shellmon:      new EvolutionPath(["H-Kabuterimon", "MegaSeadramon", "Vademon", "Sukamon"]),
  Coelamon:      new EvolutionPath(["MegaSeadramon", "Vademon", "Sukamon"]),
  Garurumon:     new EvolutionPath(["SkullGreymon", "MegaSeadramon", "Vademon", "Sukamon"]),
  Frigimon:      new EvolutionPath(["MetalMamemon", "Mamemon", "Vademon", "Sukamon"]),
  Mojyamon:      new EvolutionPath(["SkullGreymon", "Mamemon", "Vademon", "Sukamon"]),
  Numemon:       new EvolutionPath(["Monzaemon", "Vademon", "Sukamon"]),
  Sukamon:       new EvolutionPath(["Etemon", "Vademon"]),
  Nanimon:       new EvolutionPath(["Digitamamon", "Vademon", "Sukamon"]),
  MetalGreymon:  new EvolutionPath(["Sukamon"]),
  Andromon:      new EvolutionPath(["Sukamon"]),
  SkullGreymon:  new EvolutionPath(["Sukamon"]),
  Megadramon:    new EvolutionPath(["Sukamon"]),
  Giromon:       new EvolutionPath(["Sukamon"]),
  Phoenixmon:    new EvolutionPath(["Sukamon"]),
  "H-Kabuterimon": new EvolutionPath(["Sukamon"]),
  Piximon:       new EvolutionPath(["Sukamon"]),
  MetalMamemon:  new EvolutionPath(["Sukamon"]),
  Mamemon:       new EvolutionPath(["Sukamon"]),
  MegaSeadramon: new EvolutionPath(["Sukamon"]),
  Monzaemon:     new EvolutionPath(["Sukamon"]),
  Vademon:       new EvolutionPath([]),
  Digitamamon:   new EvolutionPath(["Sukamon"]),
  Etemon:        new EvolutionPath([]),
};