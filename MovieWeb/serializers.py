from rest_framework import serializers
from .models import MovieWeb, Vote

class MovieWebSerializer (serializers.ModelSerializer):
  class Meta:
    model = MovieWeb
    fields = '__all__'

class VoteSerializer (serializers.ModelSerializer):
  class Meta:
    model = Vote
    fields = '__all__'

  # def update(self, instance, validated_data):
  #   instance.movieId = validated_data.get('movieId', instance.movieId)
  #   vote = validated_data.get('vote', 'Validator Type(?)')
  #   if vote > 0: instance.upvotes += 1
  #   if vote < 0: instance.downvotes += 1
  #   # How do I know if I'm removing a vote?
  #   instance.save()
  #   return instance