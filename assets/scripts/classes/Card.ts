import { ConfigEngine } from "../interfaces";
import {
  createSvgFromSvgsprite,
  getUserRequest,
  getUserRegion
} from "../utils";
import { svgValues, budges, enginesRegionRestrictions } from "../configs";

// CARD
export class Card {
  private readonly engine: ConfigEngine;
  private readonly request: string = getUserRequest();
  private readonly userRegion = getUserRegion();

  constructor(engine: ConfigEngine) {
    this.engine = engine;
  }

  private createBudge(cssClass: string, value: string): HTMLDivElement {
    // return budge, meaning unavailability in region

    const budgeElement: HTMLDivElement = document.createElement("div");

    budgeElement.classList.add(cssClass);
    budgeElement.textContent = value;

    return budgeElement;
  }

  private createPointAtMeContent(topElement: HTMLDivElement): void {
    // edit top element with text

    topElement.textContent = "Point it at me";
  }

  private createSearchContent(
    topElement: HTMLDivElement,
    typeSearch: string
  ): void {
    // edit top element with content

    const verticalBarElement: HTMLSpanElement = document.createElement("span"),
      spanElement: HTMLSpanElement = document.createElement("span"),
      svgElement: HTMLElement = createSvgFromSvgsprite(
        svgValues.magnifier.id,
        svgValues.magnifier.size
      );

    verticalBarElement.textContent = "|";
    // spanElement.textContent = typeSearch.toUpperCase();
    spanElement.textContent = `${typeSearch.toUpperCase()} search`;

    topElement.append(svgElement, verticalBarElement, spanElement);
  }

  private hasMultipleUrls(): boolean {
    // return check for presence one or more links

    return this.engine.urls && Object.keys(this.engine.urls).length > 1;
  }

  private createLogo(): HTMLElement {
    // return search engine svg logo

    const svgElement: HTMLElement = createSvgFromSvgsprite(
      this.engine.svgName,
      this.engine.logoSize
    );

    svgElement.classList.add("card-logo");

    return svgElement;
  }

  private createLink(
    whereUrl: string,
    content: HTMLElement
  ): HTMLAnchorElement {
    // wraps the content in a link

    const linkElement: HTMLAnchorElement = document.createElement("a");

    linkElement.href = whereUrl + encodeURIComponent(this.request);
    linkElement.target = "_blank";
    linkElement.append(content);

    return linkElement;
  }

  private createTopElement(typeEngine?: string): HTMLDivElement {
    // return top content element in card

    const topElement: HTMLDivElement = document.createElement("div");

    topElement.classList.add("card-content", "card-content--top");
    topElement.style.color = this.engine.keyColor;

    if (typeEngine) {
      this.createSearchContent(topElement, typeEngine);
    } else {
      this.createPointAtMeContent(topElement);
    }

    return topElement;
  }

  private createMiddleElementWithLink(
    titleElement: HTMLSpanElement,
    link: string
  ): HTMLAnchorElement {
    // return middle link content element in card

    const middleElement: HTMLAnchorElement = this.createLink(
      link,
      titleElement
    );

    middleElement.classList.add("card-content", "card-content--middle");
    middleElement.append(
      createSvgFromSvgsprite(svgValues.arrow.id, svgValues.arrow.size)
    );

    return middleElement;
  }

  private createMiddleElement(
    link?: string
  ): HTMLSpanElement | HTMLAnchorElement {
    // return middle/middle link content element in card

    const titleElement: HTMLSpanElement = document.createElement("span");

    titleElement.textContent = this.engine.name;

    if (link) {
      return this.createMiddleElementWithLink(titleElement, link);
    }

    titleElement.classList.add("card-content", "card-content--middle");

    return titleElement;
  }

  private createBottomElement(): HTMLDivElement {
    // return bottom content element in card

    const bottomElement: HTMLDivElement = document.createElement("div");

    bottomElement.classList.add("card-content", "card-content--bottom");
    bottomElement.textContent = `located in ${this.engine.located}`;

    return bottomElement;
  }

  private createFrontSide(): HTMLDivElement {
    // return frontside of card

    const frontElement: HTMLDivElement = document.createElement("div");

    frontElement.classList.add("card-front");
    frontElement.append(this.createLogo());

    if (this.hasMultipleUrls()) {
      frontElement.classList.add("card-multilinks-front");
      frontElement.append(this.createTopElement(), this.createMiddleElement());
    } else {
      frontElement.append(
        this.createTopElement(this.engine.urls[0].type),
        this.createMiddleElement(this.engine.urls[0].link)
      );
    }

    return frontElement;
  }

  private createBackSide(): HTMLDivElement {
    // return backside of card

    const backSideElement: HTMLDivElement = document.createElement("div");

    for (const url of this.engine.urls) {
      const styleElement: HTMLDivElement = document.createElement("div");
      styleElement.append(
        this.createTopElement(url.type),
        this.createMiddleElement(url.link)
      );
      backSideElement.append(styleElement);
    }

    backSideElement.classList.add("card-backside", "card-multilinks-backside");

    return backSideElement;
  }

  createCard(): HTMLDivElement {
    // return completed card

    const cardElement: HTMLDivElement = document.createElement("div"),
      cardInnerElement: HTMLDivElement = document.createElement("div"),
      cardUnderElement: HTMLDivElement = document.createElement("div");

    cardUnderElement.classList.add("card-under");
    cardUnderElement.style.backgroundColor = this.engine.keyColor;

    cardInnerElement.classList.add("card-inner");
    cardInnerElement.append(this.createFrontSide());

    if (this.hasMultipleUrls()) {
      cardInnerElement.append(this.createBackSide());
    }

    if (
      enginesRegionRestrictions[this.userRegion.lowerCaseValue]?.includes(
        this.engine.key
      )
    ) {
      cardInnerElement.append(
        this.createBudge(budges.accessDenied.name, budges.accessDenied.value)
      );
    }

    cardInnerElement.append(this.createBottomElement());

    cardElement.id = this.engine.id;
    cardElement.classList.add("card");
    cardElement.append(cardInnerElement, cardUnderElement);

    return cardElement;
  }
}
