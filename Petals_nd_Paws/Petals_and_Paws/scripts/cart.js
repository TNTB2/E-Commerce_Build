// cart.js

// Function to add items to localStorage
function addToCart(event, title, image, price) {
    event.stopPropagation(); // Prevents modal from opening when clicking "Buy Now"
    
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if item is already in the cart
    let existingItem = cart.find(item => item.title === title);
    if (existingItem) {
        existingItem.quantity += 1; // Increment quantity if already in cart
    } else {
        cart.push({ title, image, price, quantity: 1 });
    }

    // Save updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    alert(`${title} has been added to your cart!`);
}

// Function to display cart items on the cart page
function loadCartItems() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartList = document.getElementById("cart-items");
    let cartTotal = document.getElementById("cart-total");
    
    cartList.innerHTML = ""; // Clear previous content
    let total = 0;

    if (cart.length === 0) {
        cartList.innerHTML = "<p>Your cart is empty.</p>";
    } else {
        cart.forEach((item, index) => {
            let itemTotal = parseFloat(item.price.replace("$", "")) * item.quantity;
            total += itemTotal;

            cartList.innerHTML += `
                <li>
                    <img src="${item.image}" alt="${item.title}" width="50">
                    ${item.title} - ${item.price} x ${item.quantity}
                    <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
                </li>
            `;
        });
    }

    cartTotal.innerText = `Total: $${total.toFixed(2)}`;
}

// Function to remove an item from the cart
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1); // Remove item at the given index
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCartItems(); // Refresh cart display
}

// Function to handle checkout
function checkout() {
    alert("Proceeding to checkout...");
    localStorage.removeItem("cart"); // Clear cart
    loadCartItems(); // Refresh cart display
}

// Load cart when the cart page is opened
if (document.getElementById("cart-items")) {
    loadCartItems();
}
