from django.db import models
from groups.models import Group


class MeetingSchedule(models.Model):

    group = models.OneToOneField(
        Group,
        on_delete=models.CASCADE,
        related_name="meeting"
    )

    meeting_day = models.CharField(max_length=20)

    meeting_time = models.TimeField()

    location = models.CharField(max_length=255)

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.group.name} Meeting"