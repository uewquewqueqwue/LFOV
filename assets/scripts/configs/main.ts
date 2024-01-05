// default main consts

import { textEngines } from "./textEngines";
import { pictureAndImageEngines } from "./picAndImgEngines";
import { iconAndVectorEngines } from "./iconAndVecEngines";

// initial list of selected search engines
export let selectedEngines: string[] = ["google", "duckduckgo", "bing"];

export const cardsSelector: Element | null = document.querySelector(".cards"),
  enginesSelector: Element | null = document.querySelector(".engines");

export const svgValues = {
  magnifier: {
    id: "#magnifier",
    size: [14, 14],
  },
  arrow: {
    id: "#arrow",
    size: [24, 24],
  },
  arrowDown: {
    id: "#arrowDown",
    size: [30, 15],
  },
};

export const enginesSlice = { start: 0, end: 6 };

export const xlinks = {
  xmlns: "http://www.w3.org/2000/svg",
  xlink: "http://www.w3.org/1999/xlink",
};

export const regionRestrict = {
  name: "Note",
  value: ` - your region has been auto-defined as,
    which means that some search engines do not work for you, you will see the corresponding badge
    on them A/D (access is denied)`,
};

export const enginesRegionRestrictions: {[index: string]: string[]} = {
  ru: ["aol", "dogpile", "qwant", "excite", "metacrawler"],
};

export const budges = {
  accessDenied: {
    name: "budge--accessDenied",
    value: "A/D",
  },
};

export const engines: Object[] = [
  textEngines,
  pictureAndImageEngines,
  iconAndVectorEngines,
];

export const unpackEngines: {[index: string]: any} = { // bruh type
  ...textEngines,
  ...pictureAndImageEngines,
  ...iconAndVectorEngines,
};

export const visualTypeEngines: string[] = [
  "text",
  "pictures and images",
  "icons and vectors",
];
