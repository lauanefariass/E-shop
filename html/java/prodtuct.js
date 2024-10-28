// Função para adicionar produto ao carrinho
function addToCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const productInCart = cart.find((item) => item.id === productId);
  if (productInCart) {
    productInCart.quantity += 1;
  } else {
    cart.push({ id: productId, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

// Função para atualizar o número de itens no ícone do carrinho
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  document.getElementById("cart-count").textContent = totalItems;
}

// Inicializar a contagem do carrinho ao carregar a página
document.addEventListener("DOMContentLoaded", updateCartCount);
