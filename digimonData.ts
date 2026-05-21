import { DigimonLevel, DigimonNames } from "./types";
import { Digimon } from "./digimon";
import { EvolutionRequirements } from "./evolutionRequirements";

// Helper to build Stats objects inline with positional args for brevity
const s = (hp: number, mp: number, offense: number, defense: number, speed: number, brains: number) =>
  ({ hp, mp, offense, defense, speed, brains });

// prettier-ignore
const AllDigimon = [
  new Digimon("Agumon",        "Rookie",     s(1000,500,100,50,50,50),     new EvolutionRequirements(10,10,1,0,0,0,     0,15,  0,0,   -1,0,  false,false,"Koromon")),
  new Digimon("Airdramon",     "Champion",   s(1500,2000,150,150,200,200), new EvolutionRequirements(0,1000,0,0,100,100, 1,30,  90,0,  -1,35, true, false)),
  new Digimon("Andromon",      "Ultimate",   s(4000,6000,400,600,400,600), new EvolutionRequirements(2000,4000,200,400,200,400, 5,40,95,0,30,30,true,false)),
  new Digimon("Angemon",       "Champion",   s(1500,2000,150,150,150,250), new EvolutionRequirements(0,1000,0,0,0,100,   0,20,  0,0,   -1,35, true, false,"Patamon")),
  new Digimon("Bakemon",       "Champion",   s(1500,2500,150,100,150,100), new EvolutionRequirements(0,1000,0,0,0,0,     3,20,  0,50,  -1,28, false,false)),
  new Digimon("Betamon",       "Rookie",     s(1000,500,50,100,50,50),     new EvolutionRequirements(10,10,0,1,0,0,     0,15,  0,0,   -2,0,  false,false,"Tanemon")),
  new Digimon("Birdramon",     "Champion",   s(1500,1500,150,100,250,150), new EvolutionRequirements(0,0,0,0,100,0,      3,20,  0,0,   -1,35, false,false,"Biyomon")),
  new Digimon("Biyomon",       "Rookie",     s(500,1000,50,50,100,50),     new EvolutionRequirements(0,10,0,1,1,0,      0,15,  0,0,   -2,0,  false,false,"Tokomon")),
  new Digimon("Botamon",       "Fresh",      s(0,0,0,0,0,0),               new EvolutionRequirements(0,0,0,0,0,0,       0,0,   0,0,   -1,0,  false,false)),
  new Digimon("Centarumon",    "Champion",   s(1500,1500,150,150,150,250), new EvolutionRequirements(0,0,0,0,0,100,      3,30,  60,0,  -1,28, true, false)),
  new Digimon("Coelamon",      "Champion",   s(1500,1500,150,200,150,150), new EvolutionRequirements(0,0,0,100,0,0,      3,30,  0,0,   5,35,  false,true)),
  new Digimon("Devimon",       "Champion",   s(0,0,0,0,0,0),               new EvolutionRequirements(0,0,0,0,0,0,       0,0,   0,0,   -1,0,  false,false)),
  new Digimon("Digitamamon",   "Ultimate",   s(5000,5000,600,600,600,500), new EvolutionRequirements(3000,3000,400,400,400,300, 0,10,0,0,100,49,true,false)),
  new Digimon("Drimogemon",    "Champion",   s(1500,1500,250,150,150,150), new EvolutionRequirements(0,0,100,0,0,0,      3,40,  0,50,  -1,28, false,false)),
  new Digimon("Elecmon",       "Rookie",     s(500,500,100,50,100,50),     new EvolutionRequirements(10,0,1,0,1,0,      0,15,  0,0,   -2,0,  false,false,"Tsunomon")),
  new Digimon("Etemon",        "Ultimate",   s(4000,5000,600,400,600,500), new EvolutionRequirements(2000,3000,400,200,400,300, 0,15,0,0,50,49,true,false)),
  new Digimon("Frigimon",      "Champion",   s(1500,2000,100,150,150,200), new EvolutionRequirements(0,1000,0,0,0,100,   5,30,  0,50,  -1,28, true, false)),
  new Digimon("Gabumon",       "Rookie",     s(500,500,50,100,100,50),     new EvolutionRequirements(0,0,0,1,1,1,       0,15,  0,0,   -2,0,  false,false,"Koromon")),
  new Digimon("Garurumon",     "Champion",   s(1500,1500,150,200,150,150), new EvolutionRequirements(0,1000,0,0,100,0,   1,30,  90,0,  -1,28, true, false)),
  new Digimon("Giromon",       "Ultimate",   s(3000,3000,600,600,500,600), new EvolutionRequirements(0,0,400,0,300,400,  15,5,  0,95,  100,35,false,false)),
  new Digimon("Greymon",       "Champion",   s(2000,1500,200,200,200,200), new EvolutionRequirements(0,0,100,100,100,100, 1,30, 90,0,  -1,35, true, false)),
  new Digimon("H-Kabuterimon", "Ultimate", s(5000,5000,500,500,500,500), new EvolutionRequirements(7000,0,400,600,400,0, 5,55,0,0,0,40,true,true)),
  new Digimon("Kabuterimon",   "Champion",   s(2000,1500,200,200,200,100), new EvolutionRequirements(1000,1000,100,0,100,0, 1,30,0,0,-1,35,true,false,"Kunemon")),
  new Digimon("Kokatorimon",   "Champion",   s(2500,1500,100,150,150,150), new EvolutionRequirements(1000,0,0,0,0,0,     3,30,  0,0,   -1,28, false,false,"Biyomon")),
  new Digimon("Koromon",       "InTraining", s(0,0,0,0,0,0),               new EvolutionRequirements(0,0,0,0,0,0,       0,0,   0,0,   -1,0,  false,false)),
  new Digimon("Kunemon",       "Rookie",     s(1000,1000,50,50,50,50),     new EvolutionRequirements(0,0,0,0,0,0,       0,0,   0,0,   -1,0,  false,false)),
  new Digimon("Kuwagamon",     "Champion",   s(2000,2000,200,150,200,100), new EvolutionRequirements(1000,1000,100,0,100,0, 5,30,0,0,-1,28,false,false,"Kunemon")),
  new Digimon("Leomon",        "Champion",   s(1500,1500,250,150,200,200), new EvolutionRequirements(0,0,100,0,100,100,  1,20,  0,0,   10,35, true, false)),
  new Digimon("Mamemon",       "Ultimate",   s(3000,3000,600,500,500,600), new EvolutionRequirements(0,0,400,300,300,400, 15,5, 0,90,  -1,25, false,false)),
  new Digimon("Megadramon",    "Ultimate",   s(6000,6000,600,500,600,500), new EvolutionRequirements(3000,5000,500,300,400,400, 10,55,0,0,30,30,true,false)),
  new Digimon("MegaSeadramon", "Ultimate",   s(3000,6000,600,600,300,600), new EvolutionRequirements(0,4000,500,400,0,400, 5,30,0,0,0,40,true,true)),
  new Digimon("Meramon",       "Champion",   s(1000,1500,250,150,150,150), new EvolutionRequirements(0,0,100,0,0,0,      5,20,  0,0,   10,28, false,false)),
  new Digimon("MetalGreymon",  "Ultimate",   s(5000,5000,500,500,500,500), new EvolutionRequirements(4000,3000,500,500,300,300, 10,65,95,0,30,30,true,false)),
  new Digimon("MetalMamemon",  "Ultimate",   s(3000,3000,600,600,600,500), new EvolutionRequirements(0,0,500,400,400,400, 15,10,0,95,-1,30,true,false)),
  new Digimon("Mojyamon",      "Champion",   s(2000,1500,150,150,150,150), new EvolutionRequirements(1000,0,0,0,0,0,     5,20,  0,0,   5,28,  false,true)),
  new Digimon("Monochromon",   "Champion",   s(2000,1500,150,250,150,200), new EvolutionRequirements(1000,0,0,100,0,100,  3,40,  0,0,   5,35,  true, true)),
  new Digimon("Monzaemon",     "Ultimate",   s(5000,5000,500,500,500,500), new EvolutionRequirements(3000,3000,300,300,300,300, 0,40,0,0,50,49,true,false)),
  new Digimon("Nanimon",       "Champion",   s(0,0,0,0,0,0),               new EvolutionRequirements(0,0,0,0,0,0,       0,0,   0,0,   -1,0,  false,false)),
  new Digimon("Ninjamon",      "Champion",   s(1500,2000,200,150,200,150), new EvolutionRequirements(0,1000,100,0,100,0, 1,10,  0,0,   15,35, true, false)),
  new Digimon("Numemon",       "Champion",   s(0,0,0,0,0,0),               new EvolutionRequirements(0,0,0,0,0,0,       0,0,   0,0,   -1,0,  false,false)),
  new Digimon("Ogremon",       "Champion",   s(2500,1000,250,150,150,100), new EvolutionRequirements(1000,0,100,0,0,0,   5,30,  0,0,   15,35, false,false)),
  new Digimon("Palmon",        "Rookie",     s(500,1000,50,50,50,100),     new EvolutionRequirements(0,10,0,0,1,1,      0,15,  0,0,   -2,0,  false,false,"Tanemon")),
  new Digimon("Patamon",       "Rookie",     s(500,500,100,50,50,100),     new EvolutionRequirements(10,0,1,0,0,1,      0,15,  0,0,   -2,0,  false,false,"Tokomon")),
  new Digimon("Penguinmon",    "Rookie",     s(500,500,50,100,50,100),     new EvolutionRequirements(0,10,0,1,0,1,      0,15,  0,0,   -2,0,  false,false,"Tsunomon")),
  new Digimon("Phoenixmon",    "Ultimate",   s(6000,6000,400,400,600,600), new EvolutionRequirements(4000,4000,0,0,400,600, 3,30,100,0,0,40,true,true)),
  new Digimon("Piximon",       "Ultimate",   s(3000,3000,500,500,600,600), new EvolutionRequirements(0,0,300,300,400,400, 15,5, 0,95,  -1,25, false,false)),
  new Digimon("Poyomon",       "Fresh",      s(0,0,0,0,0,0),               new EvolutionRequirements(0,0,0,0,0,0,       0,0,   0,0,   -1,0,  false,false)),
  new Digimon("Punimon",       "Fresh",      s(0,0,0,0,0,0),               new EvolutionRequirements(0,0,0,0,0,0,       0,0,   0,0,   -1,0,  false,false)),
  new Digimon("Seadramon",     "Champion",   s(2000,2000,150,150,100,150), new EvolutionRequirements(1000,1000,0,0,0,0,  3,30,  0,0,   5,28,  false,true)),
  new Digimon("Shellmon",      "Champion",   s(2000,1500,150,250,100,100), new EvolutionRequirements(1000,0,0,100,0,0,   5,40,  0,0,   -1,35, false,false,"Betamon")),
  new Digimon("SkullGreymon",  "Ultimate",   s(5000,5000,600,600,400,400), new EvolutionRequirements(4000,6000,400,400,200,500, 10,30,0,0,40,45,false,false)),
  new Digimon("Sukamon",       "Champion",   s(0,0,0,0,0,0),               new EvolutionRequirements(0,0,0,0,0,0,       0,0,   0,0,   -1,0,  false,false)),
  new Digimon("Tanemon",       "InTraining", s(0,0,0,0,0,0),               new EvolutionRequirements(0,0,0,0,0,0,       0,0,   0,0,   -1,0,  false,false)),
  new Digimon("Tokomon",       "InTraining", s(0,0,0,0,0,0),               new EvolutionRequirements(0,0,0,0,0,0,       0,0,   0,0,   -1,0,  false,false)),
  new Digimon("Tsunomon",      "InTraining", s(0,0,0,0,0,0),               new EvolutionRequirements(0,0,0,0,0,0,       0,0,   0,0,   -1,0,  false,false)),
  new Digimon("Tyrannomon",    "Champion",   s(2000,1500,150,200,150,150), new EvolutionRequirements(1000,0,0,100,0,0,   5,30,  0,0,   5,28,  true, true)),
  new Digimon("Unimon",        "Champion",   s(2000,1500,150,150,200,150), new EvolutionRequirements(1000,0,0,0,100,0,   3,30,  0,0,   10,35, true, false)),
  new Digimon("Vademon",       "Ultimate",   s(5000,5000,500,500,500,500), new EvolutionRequirements(0,0,0,0,0,0,       0,0,   0,0,   -1,0,  false,false)),
  new Digimon("Vegiemon",      "Champion",   s(1500,2000,100,150,150,100), new EvolutionRequirements(0,1000,0,0,0,0,     5,10,  0,50,  -1,21, false,false)),
  new Digimon("Whamon",        "Champion",   s(2500,1500,100,150,100,200), new EvolutionRequirements(1000,0,0,0,0,100,   5,40,  60,0,  -1,28, true, false)),
  new Digimon("Yuramon",       "Fresh",      s(0,0,0,0,0,0),               new EvolutionRequirements(0,0,0,0,0,0,       0,0,   0,0,   -1,0,  false,false)),
];

export const Digimons: Record<keyof typeof DigimonNames, Digimon>={} as any;
export const DigimonByLevel:Record<keyof typeof DigimonLevel,Digimon[]>={} as any;
AllDigimon.forEach(a=>Digimons[a.name]=a);

for(let category of Object.keys(DigimonLevel).filter(r=>isNaN(Number(r)))){
    (DigimonByLevel as any)[category]=AllDigimon.filter(r=>r.level === category);
}

