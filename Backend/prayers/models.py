from django.db import models

# Create your models here.
class PrayRequest(models.Model):
    message = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __set__(self):
        return f"pray request {self.id}"
    