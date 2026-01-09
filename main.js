/**
 * Jasmin Brunschwiler Portfolio - Main JavaScript
 * Handles: Navigation, animations, form validation, and interactions
 */

document.addEventListener("DOMContentLoaded", () => {
  // ==================== MOBILE MENU ====================
  const burger = document.getElementById("burger")
  const mobileMenu = document.getElementById("mobileMenu")
  const mobileLinks = document.querySelectorAll(".header__mobile-link")

  function toggleMobileMenu() {
    burger.classList.toggle("header__burger--active")
    mobileMenu.classList.toggle("header__mobile-menu--active")
    document.body.style.overflow = mobileMenu.classList.contains("header__mobile-menu--active") ? "hidden" : ""

    // Update aria-expanded
    const isExpanded = burger.classList.contains("header__burger--active")
    burger.setAttribute("aria-expanded", isExpanded)
  }

  burger.addEventListener("click", toggleMobileMenu)

  // Close mobile menu when clicking a link
  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      toggleMobileMenu()
    })
  })

  // ==================== HEADER SCROLL EFFECT ====================
  const header = document.getElementById("header")
  let lastScrollY = window.scrollY

  function handleHeaderScroll() {
    const currentScrollY = window.scrollY

    // Add scrolled class when not at top
    if (currentScrollY > 50) {
      header.classList.add("header--scrolled")
    } else {
      header.classList.remove("header--scrolled")
    }

    lastScrollY = currentScrollY
  }

  window.addEventListener("scroll", handleHeaderScroll, { passive: true })

  // ==================== SMOOTH SCROLL ====================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href")

      if (targetId === "#") {
        window.scrollTo({ top: 0, behavior: "smooth" })
        return
      }

      const target = document.querySelector(targetId)
      if (target) {
        const headerOffset = 80
        const elementPosition = target.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.scrollY - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })
      }
    })
  })

  // ==================== SCROLL ANIMATIONS (IntersectionObserver) ====================
  const fadeElements = document.querySelectorAll(".fade-in")

  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible")
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    },
  )

  fadeElements.forEach((element) => {
    fadeObserver.observe(element)
  })

  // ==================== LOCAL TIME UPDATE ====================
  const localTimeElement = document.getElementById("localTime")

  function updateLocalTime() {
    const now = new Date()
    const options = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Europe/Berlin",
    }
    const timeString = now.toLocaleTimeString("en-GB", options)
    localTimeElement.textContent = `Berlin · Local time ${timeString}`
  }

  updateLocalTime()
  setInterval(updateLocalTime, 60000) // Update every minute

  // ==================== CURRENT YEAR ====================
  const currentYearElement = document.getElementById("currentYear")
  currentYearElement.textContent = new Date().getFullYear()

  // ==================== CONTACT FORM VALIDATION ====================
  const contactForm = document.getElementById("contactForm")
  const nameInput = document.getElementById("name")
  const emailInput = document.getElementById("email")
  const messageInput = document.getElementById("message")
  const nameError = document.getElementById("nameError")
  const emailError = document.getElementById("emailError")
  const messageError = document.getElementById("messageError")
  const formSuccess = document.getElementById("formSuccess")

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  function clearErrors() {
    nameInput.classList.remove("error")
    emailInput.classList.remove("error")
    messageInput.classList.remove("error")
    nameError.textContent = ""
    emailError.textContent = ""
    messageError.textContent = ""
  }

  function validateForm() {
    let isValid = true
    clearErrors()

    // Name validation
    if (!nameInput.value.trim()) {
      nameInput.classList.add("error")
      nameError.textContent = "Please enter your name"
      isValid = false
    }

    // Email validation
    if (!emailInput.value.trim()) {
      emailInput.classList.add("error")
      emailError.textContent = "Please enter your email"
      isValid = false
    } else if (!validateEmail(emailInput.value)) {
      emailInput.classList.add("error")
      emailError.textContent = "Please enter a valid email"
      isValid = false
    }

    // Message validation
    if (!messageInput.value.trim()) {
      messageInput.classList.add("error")
      messageError.textContent = "Please enter a message"
      isValid = false
    }

    return isValid
  }

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    if (validateForm()) {
      // Simulate form submission
      formSuccess.classList.add("show")
      contactForm.reset()

      // Hide success message after 5 seconds
      setTimeout(() => {
        formSuccess.classList.remove("show")
      }, 5000)
    }
  })

  // Real-time validation on blur
  ;[nameInput, emailInput, messageInput].forEach((input) => {
    input.addEventListener("blur", () => {
      if (input.value.trim()) {
        input.classList.remove("error")
        document.getElementById(input.id + "Error").textContent = ""
      }
    })
  })

  // ==================== PROJECT CARD HOVER EFFECT ====================
  const projectCards = document.querySelectorAll(".project-card")

  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      // Could add cursor text effect here if needed
    })
  })

  // ==================== KEYBOARD ACCESSIBILITY ====================
  // Make project cards focusable and clickable via keyboard
  projectCards.forEach((card) => {
    card.setAttribute("tabindex", "0")
    card.setAttribute("role", "article")

    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        const caseStudyLink = card.querySelector(".project-card__link")
        if (caseStudyLink) {
          caseStudyLink.click()
        }
      }
    })
  })

  // ==================== LOGO CLICK (SCROLL TO TOP) ====================
  const logo = document.querySelector(".header__logo")
  logo.addEventListener("click", (e) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: "smooth" })
  })
})
