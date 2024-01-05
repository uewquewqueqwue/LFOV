export function home(lainGif: string) {
    window.addEventListener("load", () => {
        (<HTMLImageElement>document.getElementById("lainGif")).src = lainGif;
    })
}
