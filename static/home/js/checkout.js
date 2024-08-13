console.log("check out")

async function buyNow(id){
const response = await fetch(`http://localhost:8000/products/create-order/${id}`)
console.log(response)
if (response.status === 200) {
const orderDetails =  await response.json()
console.log(orderDetails)
intitializePayment(orderDetails)
}    
}

async function handlePaymentSuccess(data) {
    console.log("payment success",data)
    const response = await fetch(`http://localhost:8000/products/payment-verification`,{
        body:JSON.stringify(data),
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "X-CSRFToken": document.querySelector("meta[name='csrf-token']").getAttribute("content")
        },

    })
    const result = await response.json()
    if (result.status === "success") {
        alert("Payment Successful")
    } else {
        alert("Payment Failed please try agin")
    }
    console.log(result)
}
   

    

 function intitializePayment(orderDetails){
    var options = {
        "key": "rzp_test_fZlX9FazdgeFW1", // Enter the Key ID generated from the Dashboard
        "amount": orderDetails.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "Mobile shop",
        "description": "Test Transaction",
        "image": "https://example.com/your_logo",
        "order_id": orderDetails.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "handler": function (response){
            handlePaymentSuccess({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
            })
           
            // alert(response.razorpay_payment_id);
            // alert(response.razorpay_order_id);
            // alert(response.razorpay_signature)
        },
        "prefill": {
            "name": "mobile shop",
            "email": "sachinkundar001@gmail.com",
            "contact": "9000090000"
        },
        "notes": {
            "address": "Razorpay Corporate Office"
        },
        "theme": {
            "color": "#3399cc"
        }
    };
    var rzp1 = new Razorpay(options);
rzp1.on('payment.failed', function (response){
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
});
rzp1.open();

}

