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

  def post(self, request):
    movie = Vote()
    vote = request.POST['vote']
    
    movie.upvotes += 1 * (vote > 0)
    movie.downvotes += 1 * (vote < 0)
    movie.save()

    return HttpResponse()

  def update(self, request, pk):
    movie = get_object_or_404(Vote, pk=pk)
    data = request.data
    vote = request.data.get('vote')

    print(f'PUT: {vote} from {data} into {pk}')

    if vote != None:
      movie.upvotes += 1 * (vote > 0)
      movie.downvotes += 1 * (vote < 0)
      movie.save()

    return HttpResponse()



class Assets(View):
  def get(self, _request, filename):
    path = os.path.join(os.path.dirname(__file__), 'static', filename)
    if os.path.isfile(path):
      with open(path, 'rb') as file:
        return HttpResponse(file.read(), content_type='application/javascript')
    else:
      return HttpResponseNotFound()