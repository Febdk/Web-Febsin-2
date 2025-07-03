// Impor fungsi-fungsi keranjang dari cartUtils.js
import {
  cart,
  products,
  formatRupiah,
  saveCart,
  removeFromCart,
  updateCartItemQuantity,
  updateCartCount,
} from "./cartUtils.js";

document.addEventListener("DOMContentLoaded", function () {
  // --- DOM Elements ---
  const cartItemsContainer = document.getElementById("cart-items-container");
  const cartTotalPrice = document.getElementById("cart-total-price");
  const continueShoppingBtn = document.getElementById("continue-shopping-btn");
  const checkoutBtn = document.getElementById("checkout-btn");

  // --- Cart Page Rendering ---
  function renderCartPage() {
    cartItemsContainer.innerHTML = ""; // Kosongkan kontainer item keranjang
    let total = 0;

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = `<p class="text-center text-main-text text-lg py-10">Keranjang Anda kosong. Yuk, <a href="index.html#products" class="text-accent-febsin hover:underline">jelajahi produk kami</a>!</p>`;
      cartTotalPrice.textContent = formatRupiah(0);
      checkoutBtn.disabled = true; // Nonaktifkan tombol checkout jika keranjang kosong
      checkoutBtn.classList.add("opacity-50", "cursor-not-allowed");
      return;
    } else {
      checkoutBtn.disabled = false; // Aktifkan tombol checkout
      checkoutBtn.classList.remove("opacity-50", "cursor-not-allowed");
    }

    cart.forEach((item) => {
      const product = products.find((p) => p.id === item.productId);
      if (!product) return; // Lewati jika produk tidak ditemukan (misalnya dihapus dari sumber data)

      const itemTotal = item.quantity * product.price;
      total += itemTotal;

      const cartItemDiv = document.createElement("div");
      cartItemDiv.classList.add(
        "flex",
        "flex-col",
        "sm:flex-row",
        "items-center",
        "space-y-4",
        "sm:space-y-0",
        "sm:space-x-4",
        "border-b",
        "border-gray-100",
        "py-4"
      );
      cartItemDiv.innerHTML = `
                <img src="${product.image}" alt="${
        product.name
      }" class="w-24 h-24 object-cover rounded-lg shadow-sm flex-shrink-0">
                <div class="flex-grow text-center sm:text-left">
                    <h3 class="text-xl font-semibold text-primary-febsin">${
                      product.name
                    }</h3>
                    <p class="text-lg text-main-text">${formatRupiah(
                      product.price
                    )}</p>
                </div>
                <div class="flex items-center mt-2 sm:mt-0">
                    <label for="qty-${
                      item.productId
                    }" class="mr-2 text-main-text sr-only">Kuantitas ${
        product.name
      }:</label>
                    <input type="number" id="qty-${item.productId}" value="${
        item.quantity
      }" min="1" data-product-id="${
        item.productId
      }" class="cart-qty-input w-20 px-2 py-1 border border-gray-300 rounded-md text-center">
                </div>
                <button data-product-id="${
                  item.productId
                }" class="remove-from-cart-btn text-red-600 hover:text-red-800 transition-colors duration-200 ml-0 sm:ml-4">Hapus</button>
            `;
      cartItemsContainer.appendChild(cartItemDiv);
    });

    cartTotalPrice.textContent = formatRupiah(total);

    // Tambahkan event listeners untuk perubahan kuantitas dan tombol hapus
    cartItemsContainer.querySelectorAll(".cart-qty-input").forEach((input) => {
      input.addEventListener("change", (e) => {
        updateCartItemQuantity(e.target.dataset.productId, e.target.value);
        renderCartPage(); // Render ulang keranjang setelah perubahan kuantitas
      });
    });
    cartItemsContainer
      .querySelectorAll(".remove-from-cart-btn")
      .forEach((button) => {
        button.addEventListener("click", (e) => {
          removeFromCart(e.target.dataset.productId);
          renderCartPage(); // Render ulang keranjang setelah item dihapus
        });
      });
  }

  // --- Event Listeners ---
  // Tombol Lanjutkan ke Checkout
  checkoutBtn.addEventListener("click", () => {
    window.location.href = "checkout.html"; // Arahkan ke halaman checkout
  });

  // --- Initial Load ---
  loadCart(); // Pastikan keranjang dimuat
  updateCartCount(); // Perbarui jumlah item keranjang di header setelah dimuat
  renderCartPage(); // Render halaman keranjang saat dimuat
});
