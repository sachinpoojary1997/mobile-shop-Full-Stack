# from django.shortcuts import render
# from django.http import HttpResponse
# from django.template import loader
# # Create your views here.
# def index(request):
#     template=loader.get_template('index.html')
#     return HttpResponse(template.render())

# def contact(request):
#     return HttpResponse('Contact')

# def about(request):
#     return HttpResponse('About')

from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
from django.template import loader
from django.contrib import messages
from .forms import EnquiryForm
from .models import Product,Order
from requests import request
import requests
from django.core.serializers import serialize
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.forms.models import model_to_dict
import razorpay
from django.conf import settings
import json
from django.contrib.auth.decorators import login_required



# Create your views here.

def index(request):
    # template = loader.get_template('index.html')
    # return HttpResponse(template.render(request, context))
    return render(request, 'index.html', {'name' : "ashjgfdjhasfgdjh"})


def contact(request):
    # return HttpResponse("Contact")
    return render(request, 'contact.html')

@login_required(login_url='/account/login/')
def about(request):
    # return HttpResponse("About")
    return render(request, 'about.html')

def services(request):
    # return HttpResponse("Services")
    return render(request, 'services.html')

def enquiry(request):
    if request.method == 'POST':
        #print(request.POST)
        EnquiryFormData = EnquiryForm(request.POST)
        if EnquiryFormData.is_valid():
            print(EnquiryFormData.cleaned_data)
            messages.success(request, 'Thank you for your enquiry')

            return render(request, 'success.html')
        else:
            messages.error(request, 'Invalid data')

            EnquiryFormRender = EnquiryForm()
            return render(request, 'enquiry.html',{'form' :EnquiryFormRender})
       
    else:
        EnquiryFormRender = EnquiryForm()
        return render(request, 'enquiry.html',{'form' :EnquiryFormRender})
    
def productEnquiry(request):
    if request.method == 'POST':
        print(request.POST)
    return JsonResponse({'status' : 'success'})

def products(request):
    # return HttpResponse("Products")
    """products_from_db = list(Product.objects.all().values())
    return JsonResponse(products_from_db,safe=False)"""
    productCursor = Product.objects.all()
    page = request.GET.get('page', 1)
    paginator = Paginator(productCursor, 3)

    try:
        objects = paginator.page(page)
    except PageNotAnInteger:
        objects = paginator.page(1)
    except EmptyPage:
        objects = paginator.page(paginator.num_pages)

    data = {
            'count': paginator.count,
            'num_pages' : paginator.num_pages,
            'current_page' : objects.number,
            'next_page' : objects.has_next() if objects.has_next() else None,
            'previous_page' : objects.has_previous() if objects.has_previous() else None,
            'products' : list(objects.object_list.values())
            
        }
    return JsonResponse(data,safe=False)

def product(request, id):
    product = Product.objects.get(id=id)
    print(product)
    #return JsonResponse(serialize('json', [product]), safe=False)
    return render(request, 'product.html', {'product' : product})


#connect with razorpay and create order
def createOrder(request,id):
    product = Product.objects.get(id=id)
    client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))
    client.set_app_details({"title" : "Mobile shop", "version" : "v1.0.0"})

    

    response=client.order.create({
        'amount' : int(product.price)*100,
        'currency' : 'INR',
        'receipt' : 'receipt#1',
        'partial_payment' : False,
        'notes' : {
            'Product' : product.name,
            'Seller' : product.seller,
            'Brand' : product.brand
        }
        
    })

    order = Order()
    order.user_id = 1
    order.quantity= 1
    order.product = product
    order.order_id = response.get('id')
    order.amount = response.get('amount')
    order.amount_due = response.get('amount_due')
    order.amount_paid = response.get('amount_paid')
    order.currency = response.get('currency')
    order.receipt = response.get('receipt')
    order.status = response.get('status')
    order.save()


    return JsonResponse(response, safe=False)

def paymentVerification(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        print(data)

        client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))
        
       # responserazorpay = request.POST
        paymentStatus=client.utility.verify_payment_signature({
            'razorpay_order_id': data.get('razorpay_order_id'),
            'razorpay_payment_id': data.get('razorpay_payment_id'),
            'razorpay_signature': data.get('razorpay_signature')
         })
        print(paymentStatus)

        if(paymentStatus):
            order = Order.objects.get(order_id=data.get('razorpay_order_id'))
            order.status = "Paid"
            order.amount_due = 0
            order.amount_paid = order.amount * 100
            order.save()
        

        
            return JsonResponse({"status" : "success"}, safe=False, status=200)
        else:
            return JsonResponse({"status" : "failed"}, safe=False, status=403)
    
   
    
        