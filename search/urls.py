from django.urls import path
from search import views

urlpatterns = [
    path("", views.search, name="search"),
    path("?q=<str:query>/", views.search, name="search_with_query"),
]
