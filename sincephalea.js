document.addEventListener('DOMContentLoaded', () => {
    const fadeIns = document.querySelectorAll('.fade-in');
    if (!fadeIns.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px'
    });

    fadeIns.forEach(el => observer.observe(el));

    // Lightbox Gallery
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    
    // Get all images
    const images = Array.from(document.querySelectorAll('.case-image'));
    let currentImageIndex = 0;

    // Open lightbox
    function openLightbox(index) {
        currentImageIndex = index;
        const img = images[index];
        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt;
        
        // Get caption from figcaption if available
        const figure = img.closest('figure');
        const caption = figure ? figure.querySelector('.figure-caption') : null;
        lightboxCaption.textContent = caption ? caption.textContent.trim() : img.alt;
        
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        
        // Update navigation buttons visibility
        lightboxPrev.style.display = images.length > 1 ? 'flex' : 'none';
        lightboxNext.style.display = images.length > 1 ? 'flex' : 'none';
    }

    // Close lightbox
    function closeLightbox() {
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    // Navigate to next image
    function nextImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        openLightbox(currentImageIndex);
    }

    // Navigate to previous image
    function prevImage() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        openLightbox(currentImageIndex);
    }

    // Add click event to all images
    images.forEach((img, index) => {
        img.addEventListener('click', (e) => {
            e.stopPropagation();
            openLightbox(index);
        });
    });

    // Close button
    lightboxClose.addEventListener('click', (e) => {
        e.stopPropagation();
        closeLightbox();
    });

    // Navigation buttons
    lightboxPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        prevImage();
    });

    lightboxNext.addEventListener('click', (e) => {
        e.stopPropagation();
        nextImage();
    });

    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox.getAttribute('aria-hidden') === 'false') {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                prevImage();
            } else if (e.key === 'ArrowRight') {
                nextImage();
            }
        }
    });
});
