from django.db import models

# Create your models here.

class MovieWeb(models.Model):
  movieId = models.CharField(max_length=32, primary_key=True)
  favorited = models.PositiveSmallIntegerField(default=0, choices=[
    (0, 'Neutral'),
    (1, 'Favorite'),
    (2, 'Super-Favorite'),
  ])

  def _str_(self):
    return self.movieId


class Vote(models.Model):
  movieId = models.CharField(max_length=32, primary_key=True)
  upvotes = models.BigIntegerField(default=0)
  downvotes = models.BigIntegerField(default=0)

  def __str__(self):
    return f'm={self.movieId},uv={self.upvotes},dv={self.downvotes}'
    