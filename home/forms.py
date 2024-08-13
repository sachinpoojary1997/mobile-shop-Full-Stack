from django import forms

class EnquiryForm(forms.Form):
    first_name = forms.CharField(label='First Name', max_length=100, required=True, widget=forms.TextInput(attrs={"class":"form-control"}))
    last_name = forms.CharField(label='Last Name', max_length=100,widget=forms.TextInput(attrs={"class":"form-control"}))
    email_address = forms.EmailField(label='Email',max_length=100, required=True,widget=forms.TextInput(attrs={"class":"form-control"}))
    mobile = forms.CharField(label='Mobile',max_length=10,widget=forms.TextInput(attrs={"class":"form-control"}))
    product = forms.CharField(label='Product',max_length=100,widget=forms.Select(choices=[("mobile1","mobile1"),("mobile2","mobile2"),("mobile3","mobile3")], attrs={"class":"form-select", "id":"products"}))
    mobile = forms.CharField(label='Mobile',max_length=10,widget=forms.TextInput(attrs={"class":"form-control"}))
    enqiry_message = forms.CharField(widget=forms.Textarea(attrs={"class":"form-control"}))
