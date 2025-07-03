export const products = [
    {
        id: 'product1',
        name: 'T-shirt Urban Groove', // Perbaikan: nama produk
        price: 95000, // Perbaikan: pricce menjadi price
        priceFormatted: 'Rp 95.000', // Perbaikan: format harga
        category: 'streetwear', // Perbaikan: catagory menjadi category
        description:  'T-shirt oversized dengan detail grafis edgy dan bahan katun organik yang nyaman. Desain terinspirasi dari seni jalanan lokal, cocok untuk gaya urban yang dinamis.',
        image: 'Image/T-Shirt Urban Groove.webp',
        sizes: 'S, M, L, XL',
        material: '100% Katun Organik Bersertifikat', // Perbaikan: materal menjadi material
    },
    {
        id: 'product2',
        name: 'Kemeja Linen Tropis',
        price: 125000,
        priceFormatted: 'Rp 125.000',
        category: 'kasual',
        description: 'Kemeja linen ringan dengan potongan modern dan kerah unik, ideal untuk iklim tropis. Desain minimalis dengan sentuhan warna bumi.',
        image: 'Image/Kemeja Linen Tropis.webp',
        sizes: 'S, M, L, XL',
        material: '100% Linen Ramah Lingkungan'
    },
    {
        id: 'product3',
        name: 'Blus Chic Asimetris',
        price: 110000,
        priceFormatted: 'Rp 110.000',
        category: 'chic',
        description: 'Blus elegan dengan potongan asimetris dan detail kerutan halus. Terbuat dari Tencel yang jatuh sempurna, cocok untuk tampilan stylish nan sophisticated.',
        image: 'Image/Blus Chic Asimetris.webp',
        sizes: 'S, M, L',
        material: 'Tencel Lyocell Premium'
    },
    {
        id: 'product4',
        name: 'Outerwear Batik Kontemporer',
        price: 170000,
        priceFormatted: 'Rp 170.000',
        category: 'chic',
        description: 'Outerwear dengan motif batik modern dan potongan tegas, memadukan tradisi dengan gaya formal kontemporer. Ideal untuk acara khusus.',
        image: 'Image/Outerwear Batik Kontemporer.webp',
        sizes: 'M, L, XL',
        material: 'Katun Batik Cap Eksklusif'
    },
    {
         id: 'product5',
        name: 'Polo Shirt Minimalis',
        price: 105000,
        priceFormatted: 'Rp 105.000',
        category: 'kasual',
        description: 'Polo shirt klasik dengan sentuhan minimalis dan detail jahitan rapi. Bahan pique yang nyaman, cocok untuk tampilan smart-casual sehari-hari.',
        image: 'Image/Polo Shirt Minimalis.webp',
        sizes: 'S, M, L, XL',
        material: 'Katun Pique Premium'
    },
    {
        id: 'product6',
        name: 'Crop Top Edgy',
        price: 75000,
        priceFormatted: 'Rp 75.000',
        category: 'streetwear',
        description: 'Crop top dengan desain potongan yang berani dan grafis abstrak. Bahan stretch yang mengikuti bentuk tubuh, sempurna untuk gaya streetwear yang ekspresif.',
        image: 'Image/Crop Top Edgy.webp',
        sizes: 'XS, S, M',
        material: 'Katun Stretch Daur Ulang'
    },
    {
        id: 'product7',
        name: 'Kemeja Batik Moderen',
        price: 250000,
        priceFormatted: 'Rp 250.000',
        category: 'formal',
        description: 'Kemeja batik khas indonesia dengan desain modern dan potongan slim fit. Cocok untuk acara formal maupun semi-formal.',
        image: 'Image/Kemeja Batik Moderen.webp',
        sizes: 'S, M, L, XL',   
        material: '100% Katun Batik Premium'
    },
    {   
        id: 'product8',
        name: 'Javanes Hand Bag',
        price: 190000,
        priceFormatted: 'Rp 190.000',
        category: 'formal',
        description: 'Tas tangan elegan dengan motif batik Javanese yang kaya. Terbuat dari bahan kulit sintetis berkualitas tinggi, cocok untuk acara formal.',
        image: 'Image/Javanes Hand Bag.webp',
        sizes: 'One Size',
        material: 'Kain Tenun Batik Premium'
    }
];

// Menggunakan 'const' untuk 'cart' dan memodifikasinya di tempatnya.
// Ini memastikan referensi array tetap sama di semua modul yang mengimpornya.
export const cart = []; // <<< PERBAIKAN KRITIS: Gunakan const dan array kosong

// Fungsi untuk memformat harga menjadi Rupiah
export function formatRupiah(number) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(number);
}

// Memuat keranjang dari Local Storage dan mengisi array 'cart' yang sudah ada
export function loadCart() {
    const storedCart = localStorage.getItem('febsinCart');
    const loadedItems = storedCart ? JSON.parse(storedCart) : [];
    // Kosongkan array 'cart' yang sudah ada dan isi dengan item yang dimuat
    cart.length = 0; // Mengosongkan array tanpa mengubah referensi
    loadedItems.forEach(item => cart.push(item)); // Menambahkan item yang dimuat
}

// Menyimpan keranjang ke Local Storage
export function saveCart() {
    localStorage.setItem('febsinCart', JSON.stringify(cart));
    updateCartCount(); // Perbarui tampilan jumlah item di keranjang
}

// Memperbarui jumlah item di ikon keranjang pada header
export function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    // Periksa apakah elemen ada sebelum memperbarui (karena tidak semua halaman punya semua elemen ini)
    const cartCountEl = document.getElementById('cart-count');
    if (cartCountEl) cartCountEl.textContent = totalItems;
    const cartCountMobileEl = document.getElementById('cart-count-mobile');
    if (cartCountMobileEl) cartCountMobileEl.textContent = totalItems;
    const cartCountMobileNavEl = document.getElementById('cart-count-mobile-nav');
    if (cartCountMobileNavEl) cartCountMobileNavEl.textContent = totalItems;
}

// Menambahkan produk ke keranjang
export function addToCart(productId, quantity) {
    const product = products.find(p => p.id === productId);
    if (!product) {
        console.error('Produk tidak ditemukan:', productId);
        return;
    }

    const existingItem = cart.find(item => item.productId === productId);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            productId: productId,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }
    saveCart();
    alert(`"${product.name}" (${quantity}x) telah ditambahkan ke keranjang!`); // Ganti dengan modal notifikasi kustom
}

// Menghapus item dari keranjang
export function removeFromCart(productId) {
    const index = cart.findIndex(item => item.productId === productId);
    if (index > -1) {
        cart.splice(index, 1); // Memodifikasi array di tempatnya
    }
    saveCart();
}

// Memperbarui kuantitas item di keranjang
export function updateCartItemQuantity(productId, newQuantity) {
    const item = cart.find(item => item.productId === productId);
    if (item) {
        item.quantity = parseInt(newQuantity);
        if (item.quantity <= 0) {
            removeFromCart(productId); // Hapus jika kuantitas 0 atau kurang
        } else {
            saveCart();
        }
    }
}

// Panggil loadCart saat cartUtils.js dimuat pertama kali
loadCart(); // <<< PERBAIKAN KRITIS: Panggil loadCart di sini untuk mengisi array 'cart'
