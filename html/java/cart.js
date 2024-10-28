// Função para carregar os itens do carrinho
function loadCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItemsContainer = document.querySelector(".cart-items");
  const products = [
    {
      id: 1,
      name: "Adidas Campus Black",
      price: 89.99,
      image: "./img/black.jpg",
    },
    {
      id: 2,
      name: "Adidas Campus Yellow",
      price: 99.99,
      image: "./img/amareo.jpg",
    },
    {
      id: 3,
      name: "Adidas Campus Green",
      price: 99.99,
      image: "./img/verde.jpg",
    },
    {
      id: 4,
      name: "Adidas Campus Red",
      price: 99.99,
      image: "./img/vermelho.jpg",
    },
    {
      id: 5,
      name: "Adidas Campus Blue",
      price: 89.99,
      image: "./img/azul.jpg",
    },
  ];

  let totalPrice = 0;
  cartItemsContainer.innerHTML = "";

  cart.forEach((cartItem) => {
    const product = products.find((p) => p.id === cartItem.id);
    if (product) {
      totalPrice += product.price * cartItem.quantity;
      cartItemsContainer.innerHTML += `
        <div class="cart-item" data-id="${product.id}">
          <img src="${product.image}" alt="${
        product.name
      }" style="width: 50px; height: 50px;">
          <span>${product.name}</span>
          <span>$${product.price.toFixed(2)}</span>
          <div>
            <button onclick="updateQuantity(${product.id}, -1)">-</button>
            <span>${cartItem.quantity}</span>
            <button onclick="updateQuantity(${product.id}, 1)">+</button>
          </div>
          <button onclick="removeItem(${product.id})">Remove</button>
        </div>
      `;
    }
  });

  document.getElementById("total-price").textContent = `$${totalPrice.toFixed(
    2
  )}`;
}

// Função para atualizar a quantidade de um item
function updateQuantity(productId, change) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const productInCart = cart.find((item) => item.id === productId);

  if (productInCart) {
    productInCart.quantity += change;
    if (productInCart.quantity <= 0) {
      cart = cart.filter((item) => item.id !== productId);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
    updateCartCount();
  }
}

// Função para remover um item do carrinho
function removeItem(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter((item) => item.id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
  updateCartCount();
}

// Função para atualizar o número de itens no ícone do carrinho
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  document.getElementById("cart-count").textContent = totalItems;
}

// Inicializar a página do carrinho
document.addEventListener("DOMContentLoaded", () => {
  loadCart();
  updateCartCount();
});
