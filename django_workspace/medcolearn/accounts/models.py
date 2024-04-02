from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.db import models
from django.utils.translation import gettext_lazy as _
from datetime import date, timedelta
from .managers import *

GENDER_CHOICES = (
    (0, 'Female'),
    (1, 'Male'),
)


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
    sex = models.SmallIntegerField(choices = GENDER_CHOICES)

    @property
    def BMI(self):
        bmi = (self.weight / pow(self.height, 2)) * 10000
        return f"{bmi:.2f}"

    @property
    def age(self):
        today = date.today()
        return (today - self.date_of_birth) // timedelta(days=365.2425)
    
# class UserSleepData(models.model):
#     # 수면 정보 저장
#     pass