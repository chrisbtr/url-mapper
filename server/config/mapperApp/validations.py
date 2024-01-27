from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _

UserModel = get_user_model()

def custom_validation(data):
  username = data['username'].strip()
  password = data['password'].strip()
  if not password or len(password) < 8:
    raise ValidationError(_('choose another password, min 8 characters'), code='password')

  if not username:
    raise ValidationError(_('choose another username'), code='username')
  return data


def validate_username(data):
  username = data['username'].strip()
  if not username:
    raise ValidationError(_('choose another username'), code='username')
  return True

def validate_password(data):
  password = data['password'].strip()
  if not password:
    raise ValidationError(_('a password is needed'), code='password')
  return True