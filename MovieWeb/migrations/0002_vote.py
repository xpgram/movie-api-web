# Generated by Django 3.2.5 on 2021-08-05 05:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('MovieWeb', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Vote',
            fields=[
                ('movieId', models.CharField(max_length=32, primary_key=True, serialize=False)),
                ('votes', models.BigIntegerField()),
            ],
        ),
    ]