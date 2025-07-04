// Impor fungsi-fungsi keranjang dari cartUtils.js
import { cart, products, formatRupiah, saveCart } from './cartUtils.js';

document.addEventListener('DOMContentLoaded', function() {
    // --- DOM Elements ---
    const checkoutForm = document.getElementById('checkout-form');
    const checkoutSummaryItems = document.getElementById('checkout-summary-items');
    const checkoutTotalPrice = document.getElementById('checkout-total-price');
    const checkoutMessage = document.getElementById('checkout-message');

    // --- Checkout Logic ---
    // Merender ringkasan pesanan di halaman checkout
    function renderCheckoutSummary() {
        checkoutSummaryItems.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            checkoutSummaryItems.innerHTML = `<p class="text-center text-main-text text-lg py-10">Keranjang Anda kosong. Silakan kembali ke <a href="index.html#products" class="text-accent-febsin hover:underline">halaman produk</a>.</p>`;
            checkoutTotalPrice.textContent = formatRupiah(0);
            // Nonaktifkan form jika keranjang kosong
            checkoutForm.querySelector('button[type="submit"]').disabled = true;
            checkoutForm.querySelector('button[type="submit"]').classList.add('opacity-50', 'cursor-not-allowed');
            return;
        } else {
            checkoutForm.querySelector('button[type="submit"]').disabled = false;
            checkoutForm.querySelector('button[type="submit"]').classList.remove('opacity-50', 'cursor-not-allowed');
        }

        cart.forEach(item => {
            const product = products.find(p => p.id === item.productId);
            if (!product) return;

            const itemTotal = item.quantity * product.price;
            total += itemTotal;

            const summaryItemDiv = document.createElement('div');
            summaryItemDiv.classList.add('flex', 'justify-between', 'items-center', 'text-main-text', 'text-lg');
            summaryItemDiv.innerHTML = `
                <span>${product.name} (${item.quantity}x)</span>
                <span>${formatRupiah(itemTotal)}</span>
            `;
            checkoutSummaryItems.appendChild(summaryItemDiv);
        });
        checkoutTotalPrice.textContent = formatRupiah(total);
    }

    // Mengirim pesanan (simulasi)
    async function submitOrder(orderData) {
        checkoutMessage.classList.remove('hidden');
        checkoutMessage.textContent = 'Memproses pesanan Anda...';
        checkoutMessage.style.color = '#000000'; // Warna hitam untuk pesan proses

        // --- Backend Integration Point (Future) ---
        // Di sini Anda akan mengintegrasikan dengan API backend Anda.
        // Contoh:
        /*
        try {
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });

            if (!response.ok) {
                throw new Error('Gagal memproses pesanan. Mohon coba lagi.');
            }

            const result = await response.json();
            console.log('Order submitted:', result);

            // Jika sukses:
            cart = []; // Kosongkan keranjang
            saveCart(); // Simpan keranjang kosong ke local storage
            // Arahkan ke halaman konfirmasi dengan parameter pesanan
            window.location.href = `order-confirmation.html?orderId=${result.orderId || 'FEB-' + Math.floor(Math.random() * 10000)}&totalPrice=${orderData.totalPrice}`;

        } catch (error) {
            console.error('Error submitting order:', error);
            checkoutMessage.textContent = `Terjadi kesalahan: ${error.message}`;
            checkoutMessage.style.color = '#B70000'; // Merah untuk error
            setTimeout(() => { checkoutMessage.classList.add('hidden'); }, 5000);
        }
        */

        // --- Simulasi Backend (Saat Ini) ---
        // Simulasi penundaan pengiriman ke backend
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Simulasi sukses
        console.log('Pesanan terkirim (simulasi):', orderData);
        
        // Kosongkan keranjang setelah pesanan sukses (simulasi)
        cart.length = 0; // Mengosongkan array cart
        saveCart(); // Simpan keranjang kosong ke local storage

        // Arahkan ke halaman konfirmasi dengan parameter pesanan
        window.location.href = `order-confirmation.html?orderId=FEB-${Math.floor(Math.random() * 10000)}&totalPrice=${orderData.totalPrice}`;
        
        // checkoutForm.reset(); // Tidak perlu reset form karena akan pindah halaman
        // setTimeout(() => { checkoutMessage.classList.add('hidden'); }, 5000); // Tidak perlu sembunyikan pesan karena akan pindah halaman
    }

    // --- Event Listeners ---
    // Checkout Form Submission
    checkoutForm.addEventListener('submit', async function(event) {
        event.preventDefault(); // Mencegah form submit default

        const customerData = {
            name: document.getElementById('checkout-name').value,
            email: document.getElementById('checkout-email').value,
            phone: document.getElementById('checkout-phone').value,
            address: document.getElementById('checkout-address').value,
            city: document.getElementById('checkout-city').value,
            postalCode: document.getElementById('checkout-postal-code').value,
        };

        const orderDetails = cart.map(item => ({
            productId: item.productId,
            name: item.name,
            quantity: item.quantity,
            price: item.price
        }));

        const totalPrice = cart.reduce((sum, item) => sum + (item.quantity * item.price), 0);

        const orderData = {
            customer: customerData,
            items: orderDetails,
            totalPrice: totalPrice,
            orderDate: new Date().toISOString()
        };

        // Panggil fungsi submitOrder (simulasi atau real backend)
        await submitOrder(orderData);
    });

    // --- Initial Load ---
    renderCheckoutSummary(); // Render ringkasan pesanan saat halaman dimuat
});
