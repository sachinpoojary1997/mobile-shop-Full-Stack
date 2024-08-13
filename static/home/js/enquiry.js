
const enquiryForm = document.getElementById("enquiry");


enquiryForm.addEventListener("submit", function(event) {
    event.preventDefault();
    
    const first_name = event.target.first_name.value;
    const last_name = event.target.last_name.value;
    const email_address = event.target.email_address.value;
    const product = event.target.product.value;
    const mobile = event.target.mobile.value;
    const enquiry_message = event.target.enquiry_message.value;

    let isFirstNameValid, isLastNameValid, isEmailValid, isPhoneValid,isProductValid,isEnquiryMessageValid = false;

    if(first_name !== "" && first_name?.length > 2) {
        console.log("First Name is valid");
        isFirstNameValid = true;
        const input = document.getElementById("first_name");
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
    }
    else {
        isFirstNameValid = false;
        const input = document.getElementById("first_name");
        input.classList.add("is-invalid");
        input.classList.remove("is-valid");
    }

    if(last_name !== "" && last_name?.length > 2) {
        console.log("Last Name is valid");
        isLastNameValid = true;
        const input = document.getElementById("last_name");
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
    }
    else {
        isLastNameValid = false;
        const input = document.getElementById("last_name");
        input.classList.add("is-invalid");
        input.classList.remove("is-valid");
    }

    if(email_address !== "" && /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email_address)) {
        console.log("Email is valid");
        isEmailValid = true;
        const input = document.getElementById("email_address");
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
    }
    else {
        isEmailValid = false;
        const input = document.getElementById("email_address");
        input.classList.add("is-invalid");
        input.classList.remove("is-valid");
    }

    if(mobile !== "" && /^[6-9]\d{9}$/.test(mobile)) {
        console.log("Phone is valid");
        isPhoneValid = true;
        const input = document.getElementById("mobile");
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
    }
    else {
        isPhoneValid = false;
        const input = document.getElementById("mobile");
        input.classList.add("is-invalid");
        input.classList.remove("is-valid");
    }
    if(['Mobile 1','Mobile 2', 'Mobile 3'].includes(product)) {
        console.log("Product is valid");
        isProductValid = true;
        const input = document.getElementById("product");
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
    }
    else {
        isProductValid = false;
        const input = document.getElementById("product");
        input.classList.add("is-invalid");
        input.classList.remove("is-valid");
    }

    if(isFirstNameValid && isLastNameValid && isEmailValid && isPhoneValid && isProductValid) {
        console.log("All data is valid");
        fetch('http://127.0.0.1:8000/product-enquiry', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                first_name,
                last_name,
                email_address,
                mobile,
                product,
                enquiry_message
            })
        }).then(function(response) {
            return response.json()
        })
        .then(function(data) {
            console.log(data);
            alert("Enquiry submitted successfully")
            enquiryForm.reset()
            const firstName = document.getElementById("first_name")
            firstName.classList.remove("is-valid")

            const lastName = document.getElementById("last_name")
            lastName.classList.remove("is-valid")

            const email = document.getElementById("email_address")
            email.classList.remove("is-valid")

            const phone = document.getElementById("mobile")
            phone.classList.remove("is-valid")

            const product = document.getElementById("product")
            phone.classList.remove("is-valid")
        }).catch(function(error) {
            console.log(error);
        })
    }

    else {
        console.log("All data/some data is invalid");
    }
})