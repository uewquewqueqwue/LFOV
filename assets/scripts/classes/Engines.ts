import {
  selectedEngines,
  svgValues,
  enginesSlice,
  enginesSelector,
  unpackEngines,
  engines,
  visualTypeEngines
} from "../configs";
import { createSvgFromSvgsprite } from "../utils";
import { EngineHandler } from "./EngineHandler";
import { ConfigEngine } from "../interfaces";

// ENGINES
export class Engines {
  private readonly handler: EngineHandler;
  // private readonly request: string = getUserRequest();

  constructor(handler: EngineHandler) {
    this.handler = handler;
  }

  createClearElement(itemElement: HTMLDivElement): HTMLDivElement {
    // return clear button

    const clearElement: HTMLDivElement = document.createElement("div"),
      clearVrbElement: HTMLSpanElement = document.createElement("span"),
      clearBtnElement: HTMLSpanElement = document.createElement("span");

    clearVrbElement.textContent = "|"
    clearVrbElement.classList.add("engines-clear-vrb");
    
    clearBtnElement.textContent = "clear"
    clearBtnElement.classList.add("engines-clear-btn");
  
    clearElement.classList.add("engines-clear");
    clearElement.append(clearVrbElement, clearBtnElement);
    clearElement.addEventListener("click", () =>
      this.clearSelectedEngines(itemElement)
    );

    return clearElement;
  }

  private clearSelectedEngines(itemElement: HTMLDivElement): void {
    // get key
    const key = itemElement.dataset.key;

    // get all selected types which are equal current
    const selectedTypes = selectedEngines.filter(
      (engine) => unpackEngines[engine]?.typeEngine === key
    );

    selectedTypes.forEach((selectedEngine) => {
      // remove card and engine selected
      this.handler.removeEngine(
        <HTMLElement>document.querySelector(`[data-key="${selectedEngine}"]`),
        unpackEngines[selectedEngine]
      );
    });

    // remove clear button
    itemElement.querySelector(".engines-clear")?.remove();
  }

  private createVisualType(visualTypeEngine: string): HTMLDivElement {
    // return html visual type engine

    const typeElement: HTMLDivElement = document.createElement("div"),
    typeTitleElement: HTMLSpanElement = document.createElement("span");

    typeTitleElement.classList.add("engines-type-title");
    typeTitleElement.textContent = `${visualTypeEngine} engines`;

    typeElement.classList.add("engines-type");
    typeElement.append(typeTitleElement);

    return typeElement;
  }

  private createEnginesItem(
    typeEngineElement: string,
    elements: HTMLElement[]
  ): HTMLDivElement {
    // return item on engines list

    const itemElement: HTMLDivElement = document.createElement("div"),
    visualTypeElement: HTMLDivElement = this.createVisualType(typeEngineElement);

    itemElement.classList.add("engines-item");
    itemElement.dataset.key = typeEngineElement;
    
    const isAnySelected = selectedEngines.some((selectedEngine) => {
      const isMatch: boolean =
      typeEngineElement === unpackEngines[selectedEngine].typeEngine;
      
      return isMatch;
    });
    
    if (isAnySelected) {
      const clearElement = this.createClearElement(itemElement);
      visualTypeElement.append(clearElement);
    }
    itemElement.append(visualTypeElement, ...elements);

    return itemElement;
  }

  private createEngine(engine: ConfigEngine): HTMLDivElement {
    // return completed engine

    const engineElement: HTMLDivElement = document.createElement("div");

    engineElement.classList.add("engine");
    engineElement.textContent = engine.name;
    engineElement.dataset.key = engine.key;
    engineElement.addEventListener("click", (event) =>
      this.handler.handleEngine(event, engine)
    );

    if (selectedEngines.includes(engine.key)) {
      engineElement.classList.add("engine--selected");
    }

    return engineElement;
  }

  private createRawEnginesList(
    engines: {[index: string]: any}, // bruh type
    slice: number[],
    cssId?: string,
    cssClass: string = "visible"
  ): HTMLDivElement {
    // return raw engine list

    const listEnginesElement: HTMLDivElement = document.createElement("div");

    if (cssId) {
      listEnginesElement.id = cssId;
    }

    listEnginesElement.classList.add(
      "engines-list",
      `engines-list--${cssClass}`
    );

    Object.keys(engines)
      .slice(...slice)
      .forEach((el) => {
        listEnginesElement.append(this.createEngine(engines[el]));
      });

    return listEnginesElement;
  }

  private createRawEnginesListToggle(
    el: Object,
    typeEngine: string,
    maxLength: number
  ): HTMLDivElement {
    // return toggle raw engine list

    return this.createRawEnginesList(
      el,
      [enginesSlice.end, maxLength],
      `enginesToggle${typeEngine}`,
      "invisible"
    );
  }

  private createArrowToggle(typeEngine: string): HTMLElement {
    const svgToggleELement: HTMLElement = createSvgFromSvgsprite(
      svgValues.arrowDown.id,
      svgValues.arrowDown.size
    );

    svgToggleELement.classList.add("engines-toggle");
    svgToggleELement.addEventListener("click", (event) =>
      this.handler.handleCLickOnArrow(event, typeEngine)
    );

    return svgToggleELement;
  }

  private createEnginesList(el: Object): HTMLElement[] {
    // return engines list

    const listEngines: HTMLElement[] = [
        this.createRawEnginesList(el, [enginesSlice.start, enginesSlice.end]),
      ],
      elKeys: string[] = Object.keys(el),
      maxLength: number = elKeys.length;

    if (maxLength > enginesSlice.end) {
      const typeEngine: string = unpackEngines[elKeys[0]].typeEngine;
      listEngines.push(
        this.createRawEnginesListToggle(el, typeEngine, maxLength),
        this.createArrowToggle(typeEngine)
      );
    }

    return listEngines;
  }

  createEngines(): void {
    // adding engines list to html

    engines.forEach((el, idx) => {
      const listEngines = this.createEnginesList(el),
        itemElement = this.createEnginesItem(
          visualTypeEngines[idx],
          listEngines
        );

      enginesSelector?.append(itemElement);
    });
  }
}
