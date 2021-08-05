"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from MovieWeb import views
from .views import index
from .settings import DEBUG

router = routers.DefaultRouter()
router.register(r'MovieWeb', views.MovieWebView, 'MovieWeb')
router.register(r'votes', views.VoteView, 'votes')

urlpatterns = [
    path('', index, name='index'),
    path('search', index, name='index'),
    path('movie', index, name='index'),
    path('api/', include(router.urls)),
]

# Prevent the serving of special pages in production; don't expose admin to public
if DEBUG:
    urlpatterns.extend([
        path('admin/', admin.site.urls),
    ])