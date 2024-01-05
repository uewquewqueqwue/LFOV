import { selectedEngines, cardsSelector } from "../configs";
import { ConfigEngine } from "../interfaces";
import { Engines } from "./Engines";
import { Card } from "./Card";
import { createCards, checkRequest, changeUrl } from "../utils";

// HANDLER
export class EngineHandler {
  addEngine(target: HTMLElement, engine: ConfigEngine): void {
    // add Card on card selector and clear button

    target.classList.add("engine--selected");
    selectedEngines.push(engine.key);

    const targetParent = target.closest(".engines-item");

    if (targetParent && !targetParent.querySelector(".engines-clear")) {
      const clearElement = new Engines(this).createClearElement(
          <HTMLDivElement>targetParent
        ),
        typeElement: HTMLDivElement =
          targetParent.querySelector(".engines-type");
      typeElement.appendChild(clearElement);
    }

    cardsSelector?.append(new Card(engine).createCard());
  }

  removeEngine(target: HTMLElement, engine: ConfigEngine): void {
    // remove Card on card selector

    target.classList.remove("engine--selected");

    const index = selectedEngines.indexOf(engine.key);
    if (index !== -1) {
      selectedEngines.splice(index, 1);
    }

    const card = document.getElementById(engine.id);

    if (card) {
      card.classList.add("card--deleted");
      const additionalBg = card.querySelector(".card-additionalBg");

      if (additionalBg instanceof HTMLElement) {
        additionalBg.style.display = "none";
      }

      setTimeout(() => {
        card.remove();
      }, 1000);
    }
  }

  handleEngine(event: Event, engine: ConfigEngine): void {
    // toggle selected on engine

    const target = <HTMLElement>event.target,
      isSelected = target.classList.contains("engine--selected");

    if (isSelected) {
      this.removeEngine(target, engine);
    } else {
      this.addEngine(target, engine);
    }
  }

  handleCLickOnArrow(event: Event, typeEngine: string): void {
    // toggle selected arrow on engine list

    const invisibleEngines: HTMLElement | null = document.getElementById(
        `enginesToggle${typeEngine}`
      ),
      target: HTMLElement = <HTMLElement>event.target;

    target.classList.toggle("engines-toggle--rotate");

    if (invisibleEngines) {
      invisibleEngines.classList.toggle("engines-list--invisible");
    }
  }

  handleRequestRefreshCardsAndUrl() {
    document
      .querySelector("#search")
      ?.addEventListener("keypress", (e: KeyboardEvent) => {
        if (e.key == "Enter") {
          const request = (<HTMLInputElement>e.target).value;
          if (checkRequest(request)) {
            cardsSelector.textContent = ""; // clear cards selector
            changeUrl(request); // changeurl without refresh page
            createCards(); // create new cards on selector
          }
        }
      });
  }

  handleScrollForSearchBar() {
    const upperElement = document.querySelector(".upper"),
      searchBarSection = <HTMLDivElement>(
        document.querySelector(".search-bar-section")
      );

    window.addEventListener("scroll", () => {
      if (window.scrollY > upperElement.scrollHeight) {
        searchBarSection.classList.add("search-bar-section--fixed");
        setTimeout(() => {
          searchBarSection.classList.add("search-bar-section--visible");
        }, 100)
      } else {
        searchBarSection.classList.remove("search-bar-section--fixed", "search-bar-section--visible");
      }
    });
  }
}
