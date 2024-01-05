import { setupPage } from "./commonApp";

import { home } from "../pages/home.ts";
import { handler404 } from "../pages/pageNotFound";

import { ajaxRedirect, checkRequest } from "../utils";

import lainGif from "../../media/lain.gif";
// import lainSides from "../../media/lain-dance.png"
import lainThink from "../../media/lain-think.png"

export function pageHome() {
  setupPage(lainGif, home);

  document.querySelector('#search')?.addEventListener('keypress', e => {
    if (e.key == 'Enter') {
      let request = e.target.value;
      if (checkRequest(request)) {
        ajaxRedirect(request)
      }
    }
  });
}

export function pageNotFound() {
  setupPage(lainThink, handler404);
}
