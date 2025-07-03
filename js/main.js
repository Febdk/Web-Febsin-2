document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });

    // Header Shadow on Scroll
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('shadow-lg');
        } else {
            header.classList.remove('shadow-lg');
        }
    });

    // Accordion Functionality for About Section
    const accordionItems = document.querySelectorAll('.accordion-item');
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

    // Fade-in Sections on Scroll
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
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Navigation link active state on scroll
    const navLinks = document.querySelectorAll('nav a');
    const pageSections = document.querySelectorAll('main section');
    
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    let targetId = entry.target.id;
                    // Special handling for the 'about' section which combines manifesto and dna
                    if (targetId === 'manifesto' || targetId === 'dna') {
                        targetId = 'about';
                    }
                    if (link.getAttribute('href').substring(1) === targetId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.5 });
    
    pageSections.forEach(section => {
        navObserver.observe(section);
    });

    // --- Product Etalase Logic (Simulated Backend) ---
    const products = [
          {
            id: 'product1',
            name: 'T-Shirt Urban Groove',
            price: 'Rp 95.000',
            category: 'streetwear',
            description: 'T-shirt oversized dengan detail grafis edgy dan bahan katun organik yang nyaman. Desain terinspirasi dari seni jalanan lokal, cocok untuk gaya urban yang dinamis.',
            image: 'Image/T-Shirt Urban Groove.webp', /* Ganti ke hitam */
            sizes: 'S, M, L, XL',
            material: '100% Katun Organik Bersertifikat'
        },
        {
            id: 'product2',
            name: 'Kemeja Linen Tropis',
            price: 'Rp 125.000',
            category: 'kasual',
            description: 'Kemeja linen ringan dengan potongan modern dan kerah unik, ideal untuk iklim tropis. Desain minimalis dengan sentuhan warna bumi.',
            image: 'Image/Kemeja Linen Tropis.webp', /* Ganti ke abu-abu gelap */
            sizes: 'S, M, L, XL',
            material: '100% Linen Ramah Lingkungan'
        },
        {
            id: 'product3',
            name: 'Blus Chic Asimetris',
            price: 'Rp 110.000',
            category: 'chic',
            description: 'Blus elegan dengan potongan asimetris dan detail kerutan halus. Terbuat dari Tencel yang jatuh sempurna, cocok untuk tampilan stylish nan sophisticated.',
            image: 'Image/Blus Chic Asimetris.webp', /* Ganti ke merah gelap */
            sizes: 'S, M, L',
            material: 'Tencel Lyocell Premium'
        },
        {
            id: 'product4',
            name: 'Outerwear Batik Kontemporer',
            price: 'Rp 170.000',
            category: 'chic',
            description: 'Outerwear dengan motif batik modern dan potongan tegas, memadukan tradisi dengan gaya formal kontemporer. Ideal untuk acara khusus.',
            image: 'Image/Outerwear Batik Kontemporer.webp', /* Ganti ke hitam */
            sizes: 'M, L, XL',
            material: 'Katun Batik Cap Eksklusif'
        },
        {
            id: 'product5',
            name: 'Polo Shirt Minimalis',
            price: 'Rp 105.000',
            category: 'kasual',
            description: 'Polo shirt klasik dengan sentuhan minimalis dan detail jahitan rapi. Bahan pique yang nyaman, cocok untuk tampilan smart-casual sehari-hari.',
            image: 'Image/Polo Shirt Minimalis.webp', /* Ganti ke abu-abu gelap */
            sizes: 'S, M, L, XL',
            material: 'Katun Pique Premium'
        },
        {
            id: 'product6',
            name: 'Crop Top Edgy',
            price: 'Rp 75.000',
            category: 'streetwear',
            description: 'Crop top dengan desain potongan yang berani dan grafis abstrak. Bahan stretch yang mengikuti bentuk tubuh, sempurna untuk gaya streetwear yang ekspresif.',
            image: 'Image/Crop Top Edgy.webp', /* Ganti ke merah gelap */
            sizes: 'XS, S, M',
            material: 'Katun Stretch Daur Ulang'
        },
        {
            id: 'product7',
            name: 'Kemeja Batik Moderen',
            price: 'Rp 250.000',
            category: 'formal',
            description: 'Kemeja batik khas indonesia dengan desain modern dan potongan slim fit. Cocok untuk acara formal maupun semi-formal.',
            image: 'Image/Kemeja Batik Moderen.webp', /* Ganti ke hitam */
            sizes: 'S, M, L, XL',   
            material: '100% Katun Batik Premium'
        },
        {   
            id: 'product8',
            name: 'Javanes Hand Bag',
            price: 'Rp 190.000',
            category: 'formal',
            description: 'Tas tangan elegan dengan motif batik Javanese yang kaya. Terbuat dari bahan kulit sintetis berkualitas tinggi, cocok untuk acara formal.',
            image: 'Image/Javanes Hand Bag.webp', /* Ganti ke hitam */
            sizes: 'One Size',
            material: 'Kain Tenun Batik Premium'
        }

        
    ];

    const productGrid = document.getElementById('product-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productModal = document.getElementById('product-modal');
    const closeModalButton = productModal.querySelector('.close-button');

    function renderProducts(filteredProducts) {
        productGrid.innerHTML = ''; // Clear current products
        filteredProducts.forEach(product => {
            const productCard = document.createElement('div');
            // Ensure these class names match what's defined in style.css or Tailwind
            productCard.classList.add('bg-white-contrast', 'rounded-lg', 'shadow-md', 'overflow-hidden', 'cursor-pointer', 'transform', 'hover:scale-105', 'transition', 'duration-300', 'flex', 'flex-col', 'product-card'); // Added 'product-card' for event delegation
            productCard.dataset.productId = product.id; // Store product ID for modal
            
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="w-full h-72 object-cover">
                <div class="p-6 flex-grow flex flex-col justify-between">
                    <h3 class="text-xl font-bold text-primary-febsin mb-2">${product.name}</h3>
                    <p class="text-lg font-semibold text-accent-febsin">${product.price}</p>
                    <span class="inline-block bg-primary-febsin/10 text-primary-febsin text-xs px-2 py-1 rounded-full font-semibold mt-2">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</span>
                </div>
            `;
            productGrid.appendChild(productCard);
        });
    }

    // Initial render
    renderProducts(products);

    // Filter Products
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active', 'bg-accent-febsin', 'text-white'));
            filterButtons.forEach(btn => btn.classList.add('bg-white-contrast', 'text-primary-febsin')); // Reset styles
            
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
        const card = event.target.closest('.product-card'); // Find the closest product card
        if (!card) return;

        const productId = card.dataset.productId;
        const product = products.find(p => p.id === productId);

        if (product) {
            document.getElementById('modal-product-image').src = product.image;
            document.getElementById('modal-product-name').textContent = product.name;
            document.getElementById('modal-product-price').textContent = product.price;
            document.getElementById('modal-product-description').textContent = product.description;
            document.getElementById('modal-product-category').textContent = product.category.charAt(0).toUpperCase() + product.category.slice(1);
            document.getElementById('modal-product-sizes').textContent = product.sizes;
            document.getElementById('modal-product-material').textContent = product.material;
            
            productModal.classList.add('open');
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
    // --- End Product Etalase Logic ---

        // --- Chart.js Radar Chart (Style Spectrum) ---
     const ctx = document.getElementById('styleSpectrumChart').getContext('2d');
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
    // --- End Chart.js Radar Chart ---

    // --- Contact Form Logic (Simulated Submission) ---
    const contactForm = document.getElementById('contact-form');
    const contactMessage = document.getElementById('contact-message');

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
        contactMessage.style.color = '#B70000'; /* Aksen Hogo Bas - Merah Gelap */ // <<< PERBAIKAN DI SINI

        // Reset form
        contactForm.reset();

        // Hide message after a few seconds
        setTimeout(() => {
            contactMessage.classList.add('hidden');
        }, 5000);

        // --- Real Backend Interaction (Conceptual) ---
        /*
        // In a real application, you would send this data to your backend API:
        fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, message }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Pesan terkirim:', data);
            contactMessage.classList.remove('hidden');
            contactMessage.textContent = 'Pesan Anda telah terkirim! Terima kasih.';
            contactMessage.style.color = '#228B22';
            contactForm.reset();
            setTimeout(() => { contactMessage.classList.add('hidden'); }, 5000);
        })
        .catch((error) => {
            console.error('Error:', error);
            contactMessage.classList.remove('hidden');
            contactMessage.textContent = 'Terjadi kesalahan saat mengirim pesan. Mohon coba lagi.';
            contactMessage.style.color = '#D9534F'; // Red color for error
        });
        */
    });
    // --- End Contact Form Logic ---
});