from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('contact/', views.contact, name='contact'),
    path('about/', views.about, name='about'),
    path('enquiry/', views.enquiry, name='enquiry'),
    path('product-enquiry', views.productEnquiry, name='product-enquiry'),
    path('products/', views.products, name='products'),
    path('products/<int:id>', views.product, name='product'),
    path('products/create-order/<int:id>', views.createOrder, name='create-order'),
    path('products/payment-verification', views.paymentVerification,)#with razorpay confirm the order 
    
]

