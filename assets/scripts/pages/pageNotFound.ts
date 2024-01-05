export function handler404(lainThink: string) {
    window.addEventListener("load", () => {
        // (<HTMLImageElement>document.querySelector(".lainLeft")).src = lainSides;
        // (<HTMLImageElement>document.querySelector(".lainRight")).src = lainSides;
        (<HTMLImageElement>document.querySelector(".lainThink")).src = lainThink;
    })
}