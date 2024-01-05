import json
import urllib.request
from os import environ
from dotenv import load_dotenv

from django.http import HttpRequest


load_dotenv()

def get_client_ip(request: HttpRequest) -> str:
    x_forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR")
    if x_forwarded_for:
        ip = x_forwarded_for.split(",")[0]
    else:
        ip = request.META.get("REMOTE_ADDR")

    return ip


def get_location_by_ip(ip: str) -> dict:
    url = f"https://ipinfo.io/{ip}?token={environ.get('IP_API_KEY')}"

    with urllib.request.urlopen(url) as response:
        data = json.loads(response.read().decode())

    return data


def get_user_location(request) -> dict:
    ip = get_client_ip(request)
    location_data = get_location_by_ip(ip)

    return location_data


def get_args_from_page(ip_data: dict) -> dict:
    return {"ip": ip_data["ip"],
            "len_ip": len(ip_data["ip"]) * 9,
            "user_region": ip_data.get("country", "N/D"),}
