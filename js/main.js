// Impor fungsi-fungsi keranjang dari cartUtils.js
// products sekarang diimpor dari cartUtils.js
import { updateCartCount, addToCart, products } from './cartUtils.js';

document.addEventListener('DOMContentLoaded', function() {
    // --- DOM Elements ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const header = document.getElementById('header');
    const accordionItems = document.querySelectorAll('.accordion-item');
    const productGrid = document.getElementById('product-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productModal = document.getElementById('product-modal');
    const closeModalButton = productModal.querySelector('.close-button');
    const addToCartBtn = productModal.querySelector('.add-to-cart-btn');
    const modalProductQuantity = document.getElementById('modal-product-quantity');

    // --- Event Listeners ---
    // Mobile Menu Toggle
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Tutup mobile menu saat link di dalamnya diklik
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            // Untuk navigasi antar halaman, browser akan otomatis mengarahkan ke href
        });
    });

    // Header Shadow on Scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('shadow-lg');
        } else {
            header.classList.remove('shadow-lg');
        }
    });

    // Accordion Functionality for About Section
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');
        const icon = item.querySelector('.accordion-icon');

        header.addEventListener('click', () => {
            accordionItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.querySelector('.accordion-content').style.maxHeight = '0px';
                    otherItem.querySelector('.accordion-icon').classList.remove('rotate-45');
                }
            });
            
            const isOpen = content.style.maxHeight && content.style.maxHeight !== '0px';
            if (isOpen) {
                content.style.maxHeight = '0px';
                icon.classList.remove('rotate-45');
            } else {
                content.style.maxHeight = content.scrollHeight + 'px';
                icon.classList.add('rotate-45');
            }
        });
    });

    // Fade-in Sections on Scroll (Hanya untuk section di index.html)
    const sections = document.querySelectorAll('.fade-in-section');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // observer.unobserve(entry.target); // Bisa di-unobserve jika hanya ingin sekali animasi
            } else {
                entry.target.classList.remove('is-visible');
            }
        });
    }, observerOptions);
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Navigation link active state on scroll (Hanya untuk section di index.html)
    const navLinks = document.querySelectorAll('nav a:not(.cart-icon-link)');
    const mobileNavLinks = document.querySelectorAll('#mobile-menu a:not(.cart-icon-link)');
    const allNavLinks = [...navLinks, ...mobileNavLinks];

    // Hanya observe section yang ada di index.html
    const pageSections = document.querySelectorAll('main section:not(#product-modal)'); 

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                allNavLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${entry.target.id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.5 });

    pageSections.forEach(section => {
        observer.observe(section); // Gunakan observer yang sama untuk fade-in
        navObserver.observe(section);
    });

    // --- Product Etalase Logic ---
    // Merender (menampilkan) produk di grid
    function renderProducts(filteredProducts) {
        productGrid.innerHTML = ''; // Clear current products
        filteredProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('bg-white-contrast', 'rounded-lg', 'shadow-md', 'overflow-hidden', 'cursor-pointer', 'transform', 'hover:scale-105', 'transition', 'duration-300', 'flex', 'flex-col', 'product-card');
            productCard.dataset.productId = product.id; // Store product ID for modal
            
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="w-full h-72 object-cover">
                <div class="p-6 flex-grow flex flex-col justify-between">
                    <h3 class="text-xl font-bold text-primary-febsin mb-2">${product.name}</h3>
                    <p class="text-lg font-semibold text-accent-febsin">${product.priceFormatted}</p>
                    <span class="inline-block bg-primary-febsin/10 text-primary-febsin text-xs px-2 py-1 rounded-full font-semibold mt-2">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</span>
                </div>
            `;
            productGrid.appendChild(productCard);
        });
    }

    // Initial render of products
    renderProducts(products);

    // Filter Products
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Reset gaya semua tombol filter
            filterButtons.forEach(btn => {
                btn.classList.remove('active', 'bg-accent-febsin', 'text-white');
                btn.classList.add('bg-white-contrast', 'text-primary-febsin');
            });
            
            // Terapkan gaya aktif pada tombol yang diklik
            button.classList.add('active', 'bg-accent-febsin', 'text-white');
            button.classList.remove('bg-white-contrast', 'text-primary-febsin');

            const filter = button.dataset.filter;
            if (filter === 'all') {
                renderProducts(products);
            } else {
                const filtered = products.filter(product => product.category === filter);
                renderProducts(filtered);
            }
        });
    });

    // Open Product Modal
    productGrid.addEventListener('click', (event) => {
        const card = event.target.closest('.product-card'); // Temukan product card terdekat
        if (!card) return; // Jika tidak ada card yang diklik, keluar

        const productId = card.dataset.productId;
        const product = products.find(p => p.id === productId); // Cari produk berdasarkan ID

        if (product) {
            // Isi detail modal dengan data produk
            document.getElementById('modal-product-image').src = product.image;
            document.getElementById('modal-product-name').textContent = product.name;
            document.getElementById('modal-product-price').textContent = product.priceFormatted;
            document.getElementById('modal-product-description').textContent = product.description;
            document.getElementById('modal-product-category').textContent = product.category.charAt(0).toUpperCase() + product.category.slice(1);
            document.getElementById('modal-product-sizes').textContent = product.sizes;
            document.getElementById('modal-product-material').textContent = product.material;
            modalProductQuantity.value = 1; // Reset kuantitas ke 1 setiap kali modal dibuka
            
            // Simpan ID produk di tombol "Tambahkan ke Keranjang" agar bisa diakses saat diklik
            addToCartBtn.dataset.productId = product.id;

            productModal.classList.add('open'); // Tampilkan modal
        }
    });

    // Close Product Modal
    closeModalButton.addEventListener('click', () => {
        productModal.classList.remove('open');
    });

    // Close modal when clicking outside
    productModal.addEventListener('click', (event) => {
        if (event.target === productModal) {
            productModal.classList.remove('open');
        }
    });

    // --- Add to Cart Button in Modal ---
    addToCartBtn.addEventListener('click', () => {
        const productId = addToCartBtn.dataset.productId;
        const quantity = parseInt(modalProductQuantity.value);
        if (quantity > 0) {
            addToCart(productId, quantity);
            // Setelah menambahkan ke keranjang, arahkan ke halaman keranjang
            window.location.href = 'cart.html'; 
        } else {
            alert('Kuantitas harus lebih dari 0.'); // Ganti dengan modal kustom
        }
    });

    // --- Chart.js Radar Chart (Style Spectrum) ---
    // Pastikan elemen canvas ada sebelum menginisialisasi chart
    const styleSpectrumChartElement = document.getElementById('styleSpectrumChart');
    if (styleSpectrumChartElement) {
        const ctx = styleSpectrumChartElement.getContext('2d');
        const styleSpectrumChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Kasual', 'Streetwear', 'Chic', 'Vintage', 'Smart Casual', 'Formal'],
                datasets: [{
                    label: 'Cakupan Gaya Febsin',
                    data: [85, 90, 70, 60, 75, 65],
                    backgroundColor: 'rgba(183, 0, 0, 0.3)', /* Aksen Hogo Bas - Merah Gelap fill */
                    borderColor: 'rgba(183, 0, 0, 1)',     /* Aksen Hogo Bas - Merah Gelap border */
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(183, 0, 0, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(183, 0, 0, 1)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            font: {
                                size: 16,
                                family: 'Inter',
                                weight: '600'
                            },
                            color: '#000000' /* Text Utama Hogo Bas - Hitam */
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.label}: ${context.raw}%`;
                            },
                            title: function() {
                                return '';
                            }
                        },
                        bodyFont: {
                            family: 'Inter',
                            size: 14,
                            weight: 'normal'
                        },
                        padding: 10,
                        displayColors: false,
                        backgroundColor: '#000000', /* Warna Primer Hogo Bas - Hitam untuk tooltip */
                        titleColor: '#FFFFFF',
                        bodyColor: '#FFFFFF'
                    }
                },
                scales: {
                    r: {
                        angleLines: {
                            color: 'rgba(0, 0, 0, 0.3)' /* Hitam dengan transparansi */
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.3)' /* Hitam dengan transparansi */
                        },
                        pointLabels: {
                            font: {
                                size: 14,
                                family: 'Inter',
                                weight: '600'
                            },
                            color: '#000000' /* Text Utama Hogo Bas - Hitam */
                        },
                        ticks: {
                            backdropColor: '#FFFFFF', /* Background Utama Hogo Bas - Putih */
                            color: '#000000', /* Text Utama Hogo Bas - Hitam */
                            stepSize: 25,
                            font: {
                                family: 'Inter',
                                size: 10
                            }
                        },
                        suggestedMin: 0,
                        suggestedMax: 100
                    }
                }
            }
        });
    }
    // --- End Chart.js Radar Chart ---

    // --- Contact Form Logic (Simulated Submission) ---
    const contactForm = document.getElementById('contact-form');
    const contactMessage = document.getElementById('contact-message');

    if (contactForm) { // Pastikan form ada sebelum menambahkan event listener
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent actual form submission

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Basic client-side validation
            if (!name || !email || !message) {
                alert('Mohon lengkapi semua kolom formulir.'); // In a real app, use a custom modal
                return;
            }
            if (!email.includes('@') || !email.includes('.')) {
                alert('Format email tidak valid.'); // In a real app, use a custom modal
                return;
            }

            // Simulate backend submission
            console.log('Pesan terkirim (simulasi):', { name, email, message });

            // Display success message
            contactMessage.classList.remove('hidden');
            contactMessage.textContent = 'Pesan Anda telah terkirim! Terima kasih.';
            contactMessage.style.color = '#B70000'; // Aksen Hogo Bas - Merah Gelap

            // Reset form
            contactForm.reset();

            // Hide message after a few seconds
            setTimeout(() => {
                contactMessage.classList.add('hidden');
            }, 5000);
        });
    }
    // --- End Contact Form Logic ---

    updateCartCount(); // Perbarui jumlah item keranjang saat halaman dimuat
});
