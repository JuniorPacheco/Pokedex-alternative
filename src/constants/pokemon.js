const colorByType = {
  normal: "bg-[#BCBCAC]",
  fighting: "bg-[#BC5442]",
  flying: "bg-[#669AFF]",
  poison: "bg-[#AB549A]",
  ground: "bg-[#DEBC54]",
  rock: "bg-[#BCAC66]",
  bug: "bg-[#ABBC1C]",
  ghost: "bg-[#6666BC]",
  steel: "bg-[#ABACBC]",
  fire: "bg-[#FF421C]",
  water: "bg-[#2F9AFF]",
  grass: "bg-[#78CD54]",
  electric: "bg-[#FFCD30]",
  psychic: "bg-[#FF549A]",
  ice: "bg-[#78DEFF]",
  dragon: "bg-[#7866EF]",
  dark: "bg-[#785442]",
  fairy: "bg-[#FFACFF]",
  unknown: "",
  shadow: "",
};

const colorByStat = {
  hp: "bg-[#DF2140]",
  attack: "bg-[#FF994D]",
  defense: "bg-[#eecd3d]",
  "special-attack": "bg-[#85DDFF]",
  "special-defense": "bg-[#96da83]",
  speed: "bg-[#FB94A8]",
  total: "bg-[#7195DC]",
};

const newTextStats = {
  hp: "HP",
  attack: "ATK",
  defense: "DEF",
  "special-attack": "SpA",
  "special-defense": "SpD",
  speed: "SPD",
  total: "TOT",
};

export { colorByType, colorByStat, newTextStats };
