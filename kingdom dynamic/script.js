let cart = [];
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

function updateCart() {
  if (!cartItems || !cartTotal) return;

  cartItems.innerHTML = "";
  let total = 0;

  // Count each product quantity
  const summary = {};

  cart.forEach(item => {
    if(summary[item.name]){
      summary[item.name].quantity += 1;
      summary[item.name].price = parseFloat(item.price); // price per item
    } else {
      summary[item.name] = { quantity: 1, price: parseFloat(item.price) };
    }
  });

  // Display items
  for(const name in summary){
    const li = document.createElement("li");
    const itemTotal = summary[name].price * summary[name].quantity;
    li.textContent = ${name} x${summary[name].quantity} - $${itemTotal.toFixed(2)};
    cartItems.appendChild(li);
    total += itemTotal;
  }

  cartTotal.textContent = Total: $${total.toFixed(2)};
}

// Add to Cart buttons
document.querySelectorAll(".add-to-cart").forEach(button => {
  button.addEventListener("click", (e) => {
    const product = e.target.closest(".product");
    const name = product.dataset.name;
    const price = product.dataset.price;
    cart.push({ name, price });
    updateCart();
    alert(${name} added to cart!);
  });
});

// Checkout button
const checkout = document.getElementById("checkout");
if (checkout) {
  checkout.addEventListener("click", () => {
    if(cart.length === 0){
      alert("Cart is empty!");
      return;
    }
    const totalAmount = cart.reduce((sum, item) => sum + parseFloat(item.price), 0);
    alert("Thank you for your order!\nTotal: $" + totalAmount.toFixed(2));
    cart = [];
    updateCart();
  });
}