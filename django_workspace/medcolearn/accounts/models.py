from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.db import models
from django.utils.translation import gettext_lazy as _
from datetime import date, timedelta
from .managers import *

# def calculate_age(born):
#     today = date.today()
#     return today.year - born.year - ((today.month, today.day) < (born.month, born.day))


class User(AbstractUser):
    username = None
    email = models.EmailField(_('email address'), unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()

    def __str__(self):
        return self.email

class UserInfo(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )
    height = models.IntegerField()
    weight = models.IntegerField()
    date_of_birth = models.DateField()
    sex = models.CharField(max_length=4)

    @property
    def BMI(self):
        return self.height // self.weight

    @property
    def age(self):
        today = date.today()
        return (today - self.date_of_birth) // timedelta(days=365.2425)

# class UserSleepData(models.model):
#     # 수면 정보 저장
#     pass