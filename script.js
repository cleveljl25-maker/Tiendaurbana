
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price, image) {
    let item = cart.find(p => p.name === name);
    if (item) {
        item.quantity++;
    } else {
        cart.push({ name, price, image, quantity: 1 });
    }
    saveCart();
    updateCart();
}

function removeFromCart(name) {
    cart = cart.filter(p => p.name !== name);
    saveCart();
    updateCart();
}

function updateCart() {
    let cartItems = document.getElementById("cart-items");
    let cartTotal = document.getElementById("cart-total");
    let whatsappLink = document.getElementById("whatsapp-link");

    cartItems.innerHTML = "";
    let total = 0;
    let message = "🛒 Pedido:\n";

    cart.forEach(item => {
        cartItems.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <span>${item.name} x${item.quantity} - $${item.price * item.quantity}</span>
                <button class="remove-btn" onclick="removeFromCart('${item.name}')">X</button>
            </div>
        `;
        total += item.price * item.quantity;
        message += `\n📌 ${item.name} x${item.quantity} - $${item.price * item.quantity}\nFoto: ${item.image}`;
    });

    cartTotal.textContent = `Total: $${total}`;
    message += `\n\n💰 Total: $${total}`;

    let phoneNumber = "593967174002"; // Cambia por tu número
    let encodedMessage = encodeURIComponent(message);
    whatsappLink.href = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

updateCart();
