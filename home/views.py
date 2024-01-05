from os import environ

from django.http import HttpRequest
from django.shortcuts import render
from dotenv import load_dotenv
from utils.main import get_args_from_page, get_user_location

load_dotenv()

# Create your views here.


def home(request: HttpRequest):
    user_request = request.session.get("user_request")
    args = get_args_from_page(get_user_location(request))
    args.update({"google_ip": environ.get("GOOGLE_IP")})

    if request.method == "POST":
        user_request = request.POST.get("user_request")
        request.session["user_request"] = user_request

    return render(
        request,
        "home/main.html",
        args,
    )
