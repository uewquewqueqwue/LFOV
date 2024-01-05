from os import environ

from django.http import HttpRequest
from django.shortcuts import render
from dotenv import load_dotenv
from utils.main import get_args_from_page, get_user_location

load_dotenv()
# Create your views here.


def search(request: HttpRequest):
    user_request = request.session.get("user_request")
    args = get_args_from_page(get_user_location(request))
    args.update({"user_request": user_request, "google_ip": environ.get("GOOGLE_IP")})

    return render(
        request,
        "search/main.html",
        args,
    )
