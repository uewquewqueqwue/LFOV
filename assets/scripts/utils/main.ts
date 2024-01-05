import { Card } from "../classes";
import {
  xlinks,
  selectedEngines,
  cardsSelector,
  unpackEngines,
} from "../configs";
import { Region } from "../interfaces";
import { enginesRegionRestrictions, regionRestrict } from "../configs";

// CREATE
export function createSvgFromSvgsprite(
  svgId: string,
  viewBox: number[]
): HTMLElement {
  const svgElement: Element = document.createElementNS(xlinks.xmlns, "svg"),
    useElement: Element = document.createElementNS(xlinks.xmlns, "use"),
    [width, height] = viewBox;

  useElement.setAttributeNS(xlinks.xlink, "href", svgId);

  svgElement.setAttributeNS(null, "viewbox", `0 0 ${width} ${height}`);
  svgElement.setAttributeNS(null, "width", String(width));
  svgElement.setAttributeNS(null, "height", String(height));
  svgElement.append(useElement);

  return <HTMLElement>svgElement; // or svgElement as HTMLElement
}

export function createNote(title: string, text: string): void {
  const parent: Element | null = document.querySelector(".upper"),
    noteElement: HTMLDivElement = document.createElement("div"),
    titleElement: HTMLSpanElement = document.createElement("span"),
    textElement: HTMLSpanElement = document.createElement("span");

  titleElement.classList.add("note-title");
  titleElement.textContent = `#${title}`;

  textElement.classList.add("note-text");
  textElement.textContent = text;

  noteElement.classList.add("note");
  noteElement.append(titleElement, textElement);

  parent?.insertBefore(noteElement, document.querySelector(".engines"));
}

// GET
export function getUserRequest(): string {
  // get and return user request or "N/D" if value is not defined

  // const request: string = (<HTMLInputElement>document.getElementById("search"))
  //   .value ?? "N/D";

  // const inputElement = document.getElementById("search") as HTMLInputElement;
  // const request: string = inputElement.value ?? "N/D";

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const searchQuery = urlParams.get("q");

  return searchQuery;
}

export function getUserRegion(): Region {
  /* 
    get and return user region on format 
    { originalValue, lowerCaseValue } or "undined"
  */

  const regionSelector: HTMLElement | null =
      document.querySelector(".informers-region"),
    originalValue = regionSelector?.innerText ?? "undefined",
    lowerCaseValue = originalValue.toLowerCase();

  return { originalValue, lowerCaseValue };
}

export function createCards(): void {
  selectedEngines.forEach((el) => {
    cardsSelector?.append(new Card(unpackEngines[el]).createCard());
  });
}

export function checkRequest(request: string): boolean {
  return request.length > 0;
}

export function changeUrl(newRequest: string) {
  history.pushState(null, "", "/search/?q=" + encodeURIComponent(newRequest));
}

export function linkUrlAndSearchBar() {
  // get params on request
  const searchQuery = getUserRequest();

  // change value on search-bar
  const searchInput = document.getElementById("search") as HTMLInputElement;
  searchInput.value = searchQuery;
}

export function checkAndPasteNote() {
  const { lowerCaseValue } = getUserRegion();

  if (enginesRegionRestrictions[lowerCaseValue]) {
    createNote(regionRestrict.name, regionRestrict.value);
  }
}
