from allauth.account.adapter import DefaultAccountAdapter


class CustomAccountAdapter(DefaultAccountAdapter):

    def save_user(self, request, user, form, commit=False):
        user = super().save_user(request, user, form, commit)
        data = form.cleaned_data

        user.phone = data.get('phone')
        user.type = data.get('type')
        user.save()
        return user
