from django.shortcuts import render

def page_not_found(request, exception=False):
    return render(request, "page_not_found/main.html")
