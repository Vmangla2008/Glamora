let cart = [];
let cartCount = document.getElementById("cart-count");
let cartModal = document.getElementById("cart");
let cartItemsList = document.getElementById("cart-items");
let totalAmount = document.getElementById("total-amount");

<script src="https://unpkg.com/swiper/swiper-bundle.min.js"></script>
<script>
  var swiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    spaceBetween: 10,
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });
</script>

function addToCart(productName, price) {
    cart.push({ productName, price });
    updateCart();
}

function updateCart() {
    cartItemsList.innerHTML = ""; // Reset cart items
    let total = 0;

    cart.forEach(item => {
        let li = document.createElement("li");
        li.innerText = `${item.productName} - ₹${item.price}`;
        cartItemsList.appendChild(li);
        total += item.price;
    });

    totalAmount.innerText = `Total: ₹${total}`;
    cartCount.innerText = cart.length;
}

document.getElementById("view-cart").onclick = () => {
    cartModal.style.display = "block";
};

document.getElementById("checkout-btn").onclick = () => {
    // Proceed to checkout with Razorpay payment
    createRazorpayOrder();
};

// Hide cart modal if clicked outside
window.onclick = function(event) {
    if (event.target === cartModal) {
        cartModal.style.display = "none";
    }
};

// Razorpay Integration
function createRazorpayOrder() {
    const total = cart.reduce((sum, item) => sum + item.price, 0);

    const options = {
        key: "rzp_live_n8IHBm8Tn47PIa", // Replace with your Razorpay key
        amount: total * 100, // Razorpay expects amount in paise
        currency: "INR",
        name: "Glamora",
        description: "Order Payment",
        handler: function (response) {
            alert("Payment Successful!");
            console.log(response);
        },
        prefill: {
            name: "Customer Name",
            email: "customer@example.com",
            contact: "1234567890"
        }
    };

    const rzp = new Razorpay(options);
    rzp.open();
}
