# Generated by Django 4.2.9 on 2024-02-19 14:00

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("accounts", "0002_userinfo"),
    ]

    operations = [
        migrations.AlterField(
            model_name="userinfo",
            name="sex",
            field=models.SmallIntegerField(choices=[(0, "Female"), (1, "Male")]),
        ),
    ]