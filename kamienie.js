// Loader
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    if (loader) loader.classList.add('hidden');
});

// Hamburger menu
const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');

if (hamburger && menu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        menu.classList.toggle('active');
    });
}

// Paralaksa w banerze
const banner = document.querySelector('.banner');
const parallaxLayer = document.querySelector('.parallax-layer');

if (banner && parallaxLayer) {
    banner.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        parallaxLayer.style.transform = `translate(${x}px, ${y}px)`;
    });

    banner.addEventListener('mouseleave', () => {
        parallaxLayer.style.transform = 'translate(0, 0)';
    });
}

// Efekt 3D w ofercie (Vanilla Tilt)
VanillaTilt.init(document.querySelectorAll('.offer-item'), {
    max: 15,
    speed: 400,
    glare: true,
    'max-glare': 0.2
});

// Płynne przewijanie
document.querySelectorAll('.menu a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId.startsWith('#')) {
            const section = document.querySelector(targetId);
            if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            window.location.href = targetId;
        }
        if (window.innerWidth <= 768 && hamburger && menu) {
            hamburger.classList.remove('active');
            menu.classList.remove('active');
        }
    });
});

// Interaktywna mapa
const mapInfo = document.querySelector('.map-info');
if (mapInfo) {
    mapInfo.addEventListener('click', () => {
        alert('Ujrzanów 257B, 08-110 Siedlce\nTelefon: 500-341-568');
    });
}

// FAQ Akordeon
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    item.addEventListener('click', () => {
        item.classList.toggle('active');
    });
});

// Slider w sekcji Inspiracje
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.bottom-prev');
const nextBtn = document.querySelector('.bottom-next');
const dotsContainer = document.querySelector('.dots');
let currentIndex = 0;
let autoSlideInterval = null;

if (slider && slides.length > 0) {
    if (window.innerWidth > 768) {
        for (let i = 0; i < slides.length / 3; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                stopAutoSlide();
                currentIndex = i * 3;
                updateSlider();
                startAutoSlide();
            });
            dotsContainer.appendChild(dot);
        }
    }

    function updateSlider() {
        const slideWidth = slides[0].offsetWidth;
        slider.style.transition = 'transform 1s ease-in-out';
        slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        if (window.innerWidth > 768) {
            const dots = document.querySelectorAll('.dot');
            const activeDotIndex = Math.floor(currentIndex / 3);
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === activeDotIndex);
            });
        }
    }

    function updateSliderNoTransition() {
        const slideWidth = slides[0].offsetWidth;
        slider.style.transition = 'none';
        slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        setTimeout(() => {
            slider.style.transition = 'transform 1s ease-in-out';
        }, 50);
    }

    function nextSlide() {
        if (window.innerWidth > 768) {
            currentIndex += 3;
            if (currentIndex >= slides.length) {
                currentIndex = 0;
            }
        } else {
            currentIndex++;
            if (currentIndex >= slides.length) {
                currentIndex = 0;
            }
        }
        updateSlider();
    }

    function prevSlide() {
        if (window.innerWidth > 768) {
            currentIndex -= 3;
            if (currentIndex < 0) {
                currentIndex = slides.length - (slides.length % 3 || 3);
            }
        } else {
            currentIndex--;
            if (currentIndex < 0) {
                currentIndex = slides.length - 1;
            }
        }
        updateSlider();
    }

    function startAutoSlide() {
        stopAutoSlide();
        autoSlideInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
            autoSlideInterval = null;
        }
    }

    startAutoSlide();

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            stopAutoSlide();
            nextSlide();
            startAutoSlide();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            stopAutoSlide();
            prevSlide();
            startAutoSlide();
        });
    }

    slider.addEventListener('mouseenter', stopAutoSlide);
    slider.addEventListener('mouseleave', startAutoSlide);
}

// Modal dla inspiracji
const inspirationModal = document.querySelector('#imageModal');
if (inspirationModal) {
    const modalImage = document.querySelector('#modalImage');
    const closeBtn = document.querySelector('#imageModal .close-btn');
    const modalPrevBtn = document.querySelector('#imageModal .modal-prev');
    const modalNextBtn = document.querySelector('#imageModal .modal-next');
    const inspirationImages = document.querySelectorAll('.slide img');
    let modalIndex = 0;
    let currentImageSet = [];

    function openModal(images, index) {
        currentImageSet = Array.from(images);
        modalIndex = index;
        modalImage.src = currentImageSet[modalIndex].src;
        inspirationModal.classList.add('active');
        stopAutoSlide();
    }

    inspirationImages.forEach((img, index) => {
        img.addEventListener('click', () => {
            openModal(inspirationImages, index);
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            inspirationModal.classList.remove('active');
            startAutoSlide();
        });
    }

    if (modalNextBtn) {
        modalNextBtn.addEventListener('click', () => {
            modalIndex++;
            if (modalIndex >= currentImageSet.length) modalIndex = 0;
            modalImage.src = currentImageSet[modalIndex].src;
        });
    }

    if (modalPrevBtn) {
        modalPrevBtn.addEventListener('click', () => {
            modalIndex--;
            if (modalIndex < 0) modalIndex = currentImageSet.length - 1;
            modalImage.src = currentImageSet[modalIndex].src;
        });
    }

    inspirationModal.addEventListener('click', (e) => {
        if (e.target === inspirationModal) {
            inspirationModal.classList.remove('active');
            startAutoSlide();
        }
    });
}

// Modal dla produktów z animacją przesunięcia
const productModal = document.querySelector('#productModal');
if (productModal) {
    const modalProductImage = document.querySelector('#modalProductImage');
    const closeProductBtn = document.querySelector('#productModal .close-btn');
    const modalProductPrevBtn = document.querySelector('#productModal .modal-prev');
    const modalProductNextBtn = document.querySelector('#productModal .modal-next');
    let productModalIndex = 0;
    let currentProductImageSet = [];
    let isAnimating = false;

    function updateModalImage(src, direction) {
        if (isAnimating) return;
        isAnimating = true;

        // Usuwamy stare klasy animacji
        modalProductImage.classList.remove('slide-in-left', 'slide-in-right', 'slide-out-left', 'slide-out-right');

        // Dodajemy animację wyjścia
        modalProductImage.classList.add(direction === 'next' ? 'slide-out-right' : 'slide-out-left');

        setTimeout(() => {
            // Po zakończeniu animacji wyjścia zmieniamy źródło obrazu
            modalProductImage.src = src;
            modalProductImage.classList.remove(direction === 'next' ? 'slide-out-right' : 'slide-out-left');
            modalProductImage.classList.add(direction === 'next' ? 'slide-in-left' : 'slide-in-right');

            setTimeout(() => {
                // Czyścimy klasy po zakończeniu animacji wejścia
                modalProductImage.classList.remove('slide-in-left', 'slide-in-right');
                isAnimating = false;
            }, 600); // Czas trwania animacji wejścia (0.6s)
        }, 600); // Czas trwania animacji wyjścia (0.6s)
    }

    function openProductModal(images, index) {
        currentProductImageSet = Array.from(images);
        productModalIndex = index;
        if (modalProductImage && currentProductImageSet[productModalIndex]) {
            modalProductImage.src = currentProductImageSet[productModalIndex].src;
            productModal.classList.add('active');
        }
    }

    // Obsługa kliknięcia w cały .image-wrapper (w tym znak "+")
    const productImageWrappers = document.querySelectorAll('.product-images .image-wrapper');
    productImageWrappers.forEach((wrapper) => {
        wrapper.addEventListener('click', () => {
            const productImagesInSection = wrapper.closest('.product-images').querySelectorAll('img');
            const img = wrapper.querySelector('img');
            const index = Array.from(productImagesInSection).indexOf(img);
            openProductModal(productImagesInSection, index);
        });
    });

    if (closeProductBtn) {
        closeProductBtn.addEventListener('click', () => {
            productModal.classList.remove('active');
        });
    }

    if (modalProductNextBtn) {
        modalProductNextBtn.addEventListener('click', () => {
            if (isAnimating) return;
            productModalIndex++;
            if (productModalIndex >= currentProductImageSet.length) productModalIndex = 0;
            updateModalImage(currentProductImageSet[productModalIndex].src, 'next');
        });
    }

    if (modalProductPrevBtn) {
        modalProductPrevBtn.addEventListener('click', () => {
            if (isAnimating) return;
            productModalIndex--;
            if (productModalIndex < 0) productModalIndex = currentProductImageSet.length - 1;
            updateModalImage(currentProductImageSet[productModalIndex].src, 'prev');
        });
    }

    productModal.addEventListener('click', (e) => {
        if (e.target === productModal) {
            productModal.classList.remove('active');
        }
    });

    document.addEventListener('keydown', (e) => {
        if (productModal.classList.contains('active')) {
            if (e.key === 'ArrowRight' && !isAnimating) {
                productModalIndex++;
                if (productModalIndex >= currentProductImageSet.length) productModalIndex = 0;
                updateModalImage(currentProductImageSet[productModalIndex].src, 'next');
            } else if (e.key === 'ArrowLeft' && !isAnimating) {
                productModalIndex--;
                if (productModalIndex < 0) productModalIndex = currentProductImageSet.length - 1;
                updateModalImage(currentProductImageSet[productModalIndex].src, 'prev');
            } else if (e.key === 'Escape') {
                productModal.classList.remove('active');
            }
        }
    });
}

// Przycisk trybu ciemnego
const darkModeBtn = document.querySelector('.dark-mode-btn');
if (darkModeBtn) {
    darkModeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        if (slider) updateSliderNoTransition();
    });
}

window.addEventListener('resize', () => {
    if (slider) updateSliderNoTransition();
});

// Przycisk powrotu w regulaminie
const backBtn = document.querySelector('.back-btn');
if (backBtn) {
    backBtn.addEventListener('click', () => {
        window.location.href = 'kamienie.html';
    });
}