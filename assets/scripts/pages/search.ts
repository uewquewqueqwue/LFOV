import {
  checkAndPasteNote,
  createCards,
  linkUrlAndSearchBar,
} from "../utils";
import { EngineHandler, Engines } from "../classes";

// MAIN

export function search(lainCenter: string) {
  // main function bruh

  linkUrlAndSearchBar();
  checkAndPasteNote();

  window.addEventListener("load", () => {
    (<HTMLImageElement>document.getElementById("lainCenter")).src = lainCenter;
  });

  // base init
  const handler: EngineHandler = new EngineHandler(),
    engines: Engines = new Engines(handler);

  engines.createEngines();
  createCards();
  handler.handleRequestRefreshCardsAndUrl();
  handler.handleScrollForSearchBar();
}
