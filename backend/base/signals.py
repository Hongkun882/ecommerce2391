from django.db.models.signals import pre_save
from django.contrib.auth.models import User

def updateUser(sender, instance, **kwargs):
    print("Trigger!!")
    
pre_save.connect(updateUser,sender=User)