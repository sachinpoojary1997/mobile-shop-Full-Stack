from django.contrib import admin

# Register your models here.
from .models import Enquiry,Product,Order

class EnquiryAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name','email_address', 'mobile', 'product','created_at')
    list_filter = ("first_name",'product', 'created_at')

admin.site.register(Enquiry,EnquiryAdmin)

class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'created_at')
    list_filter = ("name", 'created_at') 

class OrderAdmin(admin.ModelAdmin):
    list_display = ('user_id', 'product', 'order_id','amount','amount_due','amount_paid', 'created_at')
    


admin.site.register(Product,ProductAdmin)
admin.site.register(Order, OrderAdmin)


