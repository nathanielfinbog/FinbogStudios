document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       NAVBAR
    ========================================= */

    const navbar = document.getElementById("navbar");

    if (navbar) {

        const updateNavbar = () => {

            if (window.scrollY > 50) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }

        };

        updateNavbar();

        window.addEventListener(
            "scroll",
            updateNavbar,
            { passive: true }
        );
    }


    /* =========================================
       MOBILE MENU
    ========================================= */

    const menuButton =
        document.getElementById("menuButton");

    const navLinks =
        document.getElementById("navLinks");


    if (menuButton && navLinks) {

        menuButton.addEventListener("click", () => {

            const isOpen =
                navLinks.classList.toggle("active");

            menuButton.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuButton.setAttribute(
                "aria-label",
                isOpen
                    ? "Lukk meny"
                    : "Åpne meny"
            );

        });


        navLinks.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("active");

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuButton.setAttribute(
                    "aria-label",
                    "Åpne meny"
                );

            });

        });


        document.addEventListener("keydown", event => {

            if (event.key === "Escape") {

                navLinks.classList.remove("active");

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuButton.setAttribute(
                    "aria-label",
                    "Åpne meny"
                );

            }

        });

    }


    /* =========================================
       GALLERY
    ========================================= */

    const galleryItems =
        Array.from(
            document.querySelectorAll(".gallery-item")
        );

    const galleryFilters =
        Array.from(
            document.querySelectorAll(".gallery-filter")
        );

    const lightbox =
        document.getElementById("lightbox");

    const lightboxImage =
        document.getElementById("lightboxImage");

    const lightboxTitle =
        document.getElementById("lightboxTitle");

    const lightboxCategory =
        document.getElementById("lightboxCategory");

    const lightboxClose =
        document.getElementById("lightboxClose");

    const lightboxPrev =
        document.getElementById("lightboxPrev");

    const lightboxNext =
        document.getElementById("lightboxNext");


    let currentGalleryItems = [];
    let currentGalleryIndex = 0;


    /* =========================================
       FILTER GALLERY
    ========================================= */

    const filterGallery = category => {

        currentGalleryItems = [];

        galleryItems.forEach(item => {

            const itemCategory =
                item.dataset.category;

            const shouldShow =
                category === "all" ||
                itemCategory === category;


            if (shouldShow) {

                item.classList.remove("is-hidden");

                currentGalleryItems.push(item);

            } else {

                item.classList.add("is-hidden");

            }

        });


        galleryFilters.forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.filter === category
            );

        });

    };


    /* =========================================
       FILTER BUTTONS
    ========================================= */

    galleryFilters.forEach(button => {

        button.addEventListener("click", () => {

            filterGallery(
                button.dataset.filter
            );

        });

    });


    /* =========================================
       SHOW LIGHTBOX IMAGE
    ========================================= */

    const showLightboxImage = index => {

        const item =
            currentGalleryItems[index];

        if (!item) {
            return;
        }

        const image =
            item.dataset.image;

        const title =
            item.dataset.title;

        const category =
            item.dataset.categoryLabel;


        if (lightboxImage) {

            lightboxImage.src = image;
            lightboxImage.alt = title || "";

        }


        if (lightboxTitle) {

            lightboxTitle.textContent =
                title || "";

        }


        if (lightboxCategory) {

            lightboxCategory.textContent =
                category || "";

        }

    };


    /* =========================================
       OPEN LIGHTBOX
    ========================================= */

    const openLightbox = item => {

        if (!lightbox) {
            return;
        }

        const index =
            currentGalleryItems.indexOf(item);

        if (index === -1) {
            return;
        }

        currentGalleryIndex = index;

        showLightboxImage(
            currentGalleryIndex
        );

        lightbox.classList.add("active");

        lightbox.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.style.overflow = "hidden";

    };


    /* =========================================
       CLOSE LIGHTBOX
    ========================================= */

    const closeLightbox = () => {

        if (!lightbox) {
            return;
        }

        lightbox.classList.remove("active");

        lightbox.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.style.overflow = "";

    };


    /* =========================================
       NEXT IMAGE
    ========================================= */

    const nextImage = () => {

        if (!currentGalleryItems.length) {
            return;
        }

        currentGalleryIndex =
            (currentGalleryIndex + 1) %
            currentGalleryItems.length;

        showLightboxImage(
            currentGalleryIndex
        );

    };


    /* =========================================
       PREVIOUS IMAGE
    ========================================= */

    const previousImage = () => {

        if (!currentGalleryItems.length) {
            return;
        }

        currentGalleryIndex =
            (currentGalleryIndex - 1 +
                currentGalleryItems.length) %
            currentGalleryItems.length;

        showLightboxImage(
            currentGalleryIndex
        );

    };


    /* =========================================
       GALLERY ITEM CLICK
    ========================================= */

    galleryItems.forEach(item => {

        item.addEventListener("click", () => {

            openLightbox(item);

        });

    });


    /* =========================================
       LIGHTBOX BUTTONS
    ========================================= */

    if (lightboxNext) {

        lightboxNext.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                nextImage();

            }
        );

    }


    if (lightboxPrev) {

        lightboxPrev.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                previousImage();

            }
        );

    }


    if (lightboxClose) {

        lightboxClose.addEventListener(
            "click",
            closeLightbox
        );

    }


    /* =========================================
       CLICK BACKDROP TO CLOSE
    ========================================= */

    if (lightbox) {

        lightbox.addEventListener(
            "click",
            event => {

                if (event.target === lightbox) {
                    closeLightbox();
                }

            }
        );

    }


    /* =========================================
       KEYBOARD CONTROLS
    ========================================= */

    document.addEventListener(
        "keydown",
        event => {

            if (
                !lightbox ||
                !lightbox.classList.contains("active")
            ) {
                return;
            }


            if (event.key === "Escape") {
                closeLightbox();
            }


            if (event.key === "ArrowRight") {
                nextImage();
            }


            if (event.key === "ArrowLeft") {
                previousImage();
            }

        }
    );


    /* =========================================
       INITIAL GALLERY FILTER
    ========================================= */

    if (galleryItems.length) {

        filterGallery("all");

    }

});