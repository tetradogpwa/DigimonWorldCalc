import {getAllDigimonNames,getDigimon} from "./calculator";


const names=getAllDigimonNames();
const digimon=getDigimon(names[0]);


const evolutions=digimon.targets;