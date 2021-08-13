from django.shortcuts import get_object_or_404, render
from rest_framework import viewsets
from .serializers import MovieWebSerializer, LookupSerializer, VoteSerializer
from .models import MovieWeb, Vote
from django.views import View
from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseNotAllowed, HttpResponseNotFound
import os

# Create your views here.

class MovieWebView (viewsets.ModelViewSet):
  '''
  Deprecated; used for setting favorite titles.
  '''
  serializer_class = MovieWebSerializer
  queryset = MovieWeb.objects.all()


class LookupView (viewsets.ModelViewSet):
  '''
  Used to lookup vote-count results.
  '''
  serializer_class = LookupSerializer
  queryset = Vote.objects.all()

  def create(self, request):
    return HttpResponseNotAllowed()

  # read() is fine

  def update(self, request):
    return HttpResponseNotAllowed()

  def delete(self, request):
    return HttpResponseNotAllowed()


class VoteView (viewsets.ModelViewSet):
  '''
  Used to cast votes on titles.
  '''
  serializer_class = VoteSerializer   # TODO Vote does not use the Vote Model. Why use its serializer?
  queryset = Vote.objects.all()       # Is it for this? What does a serializer do, actually?

  def recordVote(self, object, vote):
    '''
    Returns HttpResponse if vote was successfully applied to object,
    else BadRequest for incorrect fields.
    '''
    switcher = {
      'up': (1, 0),
      'down': (0, 1),
      'cancel-up': (-1, 0),
      'cancel-down': (0, -1),
    }

    if vote in switcher:
      valuePair = switcher.get(vote)
      object.upvotes += valuePair[0]
      object.downvotes += valuePair[1]
      object.save()
      return HttpResponse()
    else:
      return HttpResponseBadRequest('Vote request invalid')

  def create(self, request):
    movie = Vote()
    movie.movieId = request.data.get('movieId')
    vote = request.data.get('vote')
    return self.recordVote(movie, vote)

  def read(self, request):
    "Returns HttpResponse with this view's expected input."
    print(f"Read {request.data.get('movieId')}")
    return HttpResponse(200, {'movieId': 'tt000000', 'vote': 'up down cancel-up cancel-down'})

  def update(self, request, pk):
    movie = get_object_or_404(Vote, pk=pk)
    vote = request.data.get('vote')
    return self.recordVote(movie, vote)

  def delete(self, request):
    return HttpResponseNotAllowed()



class Assets(View):
  def get(self, _request, filename):
    path = os.path.join(os.path.dirname(__file__), 'static', filename)
    if os.path.isfile(path):
      with open(path, 'rb') as file:
        return HttpResponse(file.read(), content_type='application/javascript')
    else:
      return HttpResponseNotFound()