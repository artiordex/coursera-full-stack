document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Navigation & Scroll
    const menuCard = document.getElementById('menu-card');
    const specialsCard = document.getElementById('specials-card');
    const mapCard = document.getElementById('map-card');

    if (menuCard) {
        menuCard.addEventListener('click', function() {
            document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
        });
    }

    if (specialsCard) {
        specialsCard.addEventListener('click', function() {
            document.getElementById('specials').scrollIntoView({ behavior: 'smooth' });
        });
    }

    if (mapCard) {
        mapCard.addEventListener('click', function() {
            document.getElementById('location').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Smooth scroll for nav links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Menu Slider
    const slider = document.getElementById('menu-slider');
    const prevBtn = document.getElementById('prev-menu');
    const nextBtn = document.getElementById('next-menu');
    const dots = document.querySelectorAll('.menu-dot');
    let currentSlide = 0;
    const totalSlides = 5;
    let startX = 0;
    let isDragging = false;

    function updateSlider() {
        if (!slider) return;
        
        const screenWidth = window.innerWidth;
        let slideWidth;

        if (screenWidth >= 1024) {
            slideWidth = 33.333;
        } else if (screenWidth >= 768) {
            slideWidth = 50;
        } else {
            slideWidth = 95;
        }

        const translateX = -currentSlide * slideWidth;
        slider.style.transform = `translateX(${translateX}%)`;

        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
                dot.classList.remove('bg-gray-300');
                dot.classList.add('bg-primary');
            } else {
                dot.classList.remove('active');
                dot.classList.remove('bg-primary');
                dot.classList.add('bg-gray-300');
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            currentSlide = Math.min(currentSlide + 1, totalSlides - 1);
            updateSlider();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentSlide = Math.max(currentSlide - 1, 0);
            updateSlider();
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            currentSlide = index;
            updateSlider();
        });
    });

    // Touch events for menu slider
    if (slider) {
        slider.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
            isDragging = true;
        });

        slider.addEventListener('touchmove', function(e) {
            if (!isDragging) return;
            e.preventDefault();
        });

        slider.addEventListener('touchend', function(e) {
            if (!isDragging) return;
            isDragging = false;
            const endX = e.changedTouches[0].clientX;
            const diffX = startX - endX;

            if (Math.abs(diffX) > 50) {
                if (diffX > 0 && currentSlide < totalSlides - 1) {
                    currentSlide++;
                } else if (diffX < 0 && currentSlide > 0) {
                    currentSlide--;
                }
                updateSlider();
            }
        });

        slider.addEventListener('mousedown', function(e) {
            startX = e.clientX;
            isDragging = true;
            e.preventDefault();
        });
    }

    document.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        e.preventDefault();
    });

    document.addEventListener('mouseup', function(e) {
        if (!isDragging) return;
        isDragging = false;
        const endX = e.clientX;
        const diffX = startX - endX;

        if (Math.abs(diffX) > 50) {
            if (diffX > 0 && currentSlide < totalSlides - 1) {
                currentSlide++;
            } else if (diffX < 0 && currentSlide > 0) {
                currentSlide--;
            }
            updateSlider();
        }
    });

    window.addEventListener('resize', updateSlider);
    updateSlider();

    // Specials Carousel
    const carousel = document.getElementById('specials-carousel');
    const prevSpecialBtn = document.getElementById('prev-special');
    const nextSpecialBtn = document.getElementById('next-special');
    const carouselDots = document.querySelectorAll('.carousel-dot');
    let currentCarouselSlide = 0;
    const totalCarouselSlides = 2;

    function updateCarousel() {
        if (!carousel) return;
        
        const translateX = -currentCarouselSlide * 100;
        carousel.style.transform = `translateX(${translateX}%)`;

        carouselDots.forEach((dot, index) => {
            if (index === currentCarouselSlide) {
                dot.classList.add('active');
                dot.classList.remove('bg-gray-300');
                dot.classList.add('bg-primary');
            } else {
                dot.classList.remove('active');
                dot.classList.remove('bg-primary');
                dot.classList.add('bg-gray-300');
            }
        });
    }

    if (nextSpecialBtn) {
        nextSpecialBtn.addEventListener('click', function() {
            currentCarouselSlide = (currentCarouselSlide + 1) % totalCarouselSlides;
            updateCarousel();
        });
    }

    if (prevSpecialBtn) {
        prevSpecialBtn.addEventListener('click', function() {
            currentCarouselSlide = (currentCarouselSlide - 1 + totalCarouselSlides) % totalCarouselSlides;
            updateCarousel();
        });
    }

    carouselDots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            currentCarouselSlide = index;
            updateCarousel();
        });
    });

    // Touch events for carousel
    let carouselStartX = 0;
    let carouselIsDragging = false;

    if (carousel) {
        carousel.addEventListener('touchstart', function(e) {
            carouselStartX = e.touches[0].clientX;
            carouselIsDragging = true;
        });

        carousel.addEventListener('touchmove', function(e) {
            if (!carouselIsDragging) return;
            e.preventDefault();
        });

        carousel.addEventListener('touchend', function(e) {
            if (!carouselIsDragging) return;
            carouselIsDragging = false;
            const endX = e.changedTouches[0].clientX;
            const diffX = carouselStartX - endX;

            if (Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    currentCarouselSlide = (currentCarouselSlide + 1) % totalCarouselSlides;
                } else {
                    currentCarouselSlide = (currentCarouselSlide - 1 + totalCarouselSlides) % totalCarouselSlides;
                }
                updateCarousel();
            }
        });

        carousel.addEventListener('mousedown', function(e) {
            carouselStartX = e.clientX;
            carouselIsDragging = true;
            e.preventDefault();
        });
    }

    // Modal
    const modal = document.getElementById('dish-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalPrice = document.getElementById('modal-price');
    const modalDescription = document.getElementById('modal-description');
    const modalReserve = document.getElementById('modal-reserve');
    const specialItems = document.querySelectorAll('.special-item');

    specialItems.forEach(item => {
        item.addEventListener('click', function() {
            const name = this.getAttribute('data-name');
            const price = parseInt(this.getAttribute('data-price'));
            const image = this.getAttribute('data-image');
            const description = this.getAttribute('data-description');

            if (modalTitle) modalTitle.textContent = name;
            if (modalPrice) modalPrice.textContent = `₩${price.toLocaleString()}`;
            if (modalImage) {
                modalImage.src = image;
                modalImage.alt = name;
            }
            if (modalDescription) modalDescription.textContent = description;

            if (modalReserve) {
                modalReserve.onclick = function() {
                    window.open('tel:02-1234-5678');
                    modal.classList.remove('active');
                };
            }

            if (modal) modal.classList.add('active');
        });
    });

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function() {
            modal.classList.remove('active');
        });
    }

    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }

    // Reservation Buttons
    const reserveBtns = [
        document.getElementById('reserve-btn'),
        document.getElementById('hero-reserve-btn'),
        document.getElementById('location-reserve-btn')
    ];

    reserveBtns.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', function() {
                window.open('tel:02-1234-5678');
            });
        }
    });

    // Hero menu button
    const heroMenuBtn = document.querySelector('.border-2.border-white');
    if (heroMenuBtn) {
        heroMenuBtn.addEventListener('click', function() {
            document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
        });
    }
});