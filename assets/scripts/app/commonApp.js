import "../../styles/scss/extends.scss"
import Alpine from "alpinejs";

export function setupPage(imageUrl, fn) {
    window.Alpine = Alpine;
    Alpine.start();

    fn(imageUrl);

    window.addEventListener("load", () => {
        document.body.style.display = 'block';
    });
}