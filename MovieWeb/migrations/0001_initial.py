# Generated by Django 3.2.5 on 2021-07-25 18:45

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='MovieWeb',
            fields=[
                ('movieId', models.CharField(max_length=32, primary_key=True, serialize=False)),
                ('favorited', models.PositiveSmallIntegerField(choices=[(0, 'Neutral'), (1, 'Favorite'), (2, 'Super-Favorite')], default=0)),
            ],
        ),
    ]
