from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    phone = models.CharField(max_length=20, blank=True)

    ROLE_CHOICES = (
        ('student', 'Student'),
        ('group_leader', 'Group Leader'),
        ('main_leader', 'Main Leader'),
    )

    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default='student'
    )

    def __str__(self):
        return self.username
