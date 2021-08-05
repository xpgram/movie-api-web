from django.shortcuts import get_object_or_404, render
from rest_framework import viewsets
from .serializers import MovieWebSerializer, VoteSerializer
from .models import MovieWeb, Vote
from django.views import View
from django.http import HttpResponse, HttpResponseNotFound
import os

# Create your views here.

class MovieWebView (viewsets.ModelViewSet):
  serializer_class = MovieWebSerializer
  queryset = MovieWeb.objects.all()

# movie/tt328392 => {movieId: tt3242352, votes: 2343}
# vote/tt328392 (post/put only) => {movieId: tt328392, vote: +1 | 0 | -1}

class VoteView (viewsets.ModelViewSet):
  serializer_class = VoteSerializer
  queryset = Vote.objects.all()

  # what I want is a mixin, pretty sure.
  # I want to require that request data vote is only of [1, 0, -1] and that this
  # increments either vote count or neither. Default behavior would be to *set*
  # the up/downvote count to something, which I don't want.

  # Do I import Create/Update-ModelMixin and apply it somehow?
  # Or do I just override .create()/.update()?

  def put(self, request, movieId):
    movie = get_object_or_404(Vote, pk = movieId)

    return HttpResponse()




class Assets(View):
  def get(self, _request, filename):
    path = os.path.join(os.path.dirname(__file__), 'static', filename)
    if os.path.isfile(path):
      with open(path, 'rb') as file:
        return HttpResponse(file.read(), content_type='application/javascript')
    else:
      return HttpResponseNotFound()