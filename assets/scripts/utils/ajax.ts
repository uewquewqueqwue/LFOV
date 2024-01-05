import * as $ from "jquery";

function getCookie(name_cookie: string): null | string {
    let cookieValue: null | string = null;
    if (document.cookie && document.cookie !== "") {
        const cookies: string[] = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
            const cookie: string = cookies[i].trim();
            if (cookie.substring(0, name_cookie.length + 1) === name_cookie + "=") {
                cookieValue = decodeURIComponent(cookie.substring(name_cookie.length + 1));
                break;
            }
        }
    }
    return cookieValue;
};

export function ajaxRedirect(request: string): void | string {
    $.ajax({
        url: "/",
        data: {
            user_request: request,
        },
        method: "GET",
        success: function (response) {
            const newUrl = "/search/?q=" + encodeURIComponent(request);
            window.location.assign(newUrl);
        },
        error: function (error: any): void {
            console.log("Ajax error", error);
        },
    });
}

