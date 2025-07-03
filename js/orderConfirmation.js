// Impor fungsi-fungsi utilitas dari cartUtils.js
import { formatRupiah, updateCartCount } from "./cartUtils.js";

document.addEventListener("DOMContentLoaded", function () {
  // --- DOM Elements ---
  const confirmationOrderId = document.getElementById("confirmation-order-id");
  const confirmationTotalPrice = document.getElementById(
    "confirmation-total-price"
  );
  const backToHomeBtn = document.getElementById("back-to-home-btn");

  // --- Logic to display order details from URL parameters ---
  function displayOrderDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get("orderId") || "#FEB-UNKNOWN";
    const totalPrice = parseFloat(urlParams.get("totalPrice")) || 0;

    confirmationOrderId.textContent = orderId;
    confirmationTotalPrice.textContent = formatRupiah(totalPrice);
  }

  // --- Event Listeners ---
  backToHomeBtn.addEventListener("click", () => {
    window.location.href = "index.html"; // Kembali ke halaman beranda
  });

  // --- Initial Load ---
  updateCartCount(); // Perbarui jumlah item keranjang di header
  displayOrderDetails(); // Tampilkan detail pesanan
});
