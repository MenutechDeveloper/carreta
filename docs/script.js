document.addEventListener("DOMContentLoaded", () => {
  // Variables globales
  const header = document.getElementById("header")
  const mobileMenuBtn = document.getElementById("mobile-menu-btn")
  const mobileMenu = document.getElementById("mobile-menu")
  const mobileMenuClose = document.getElementById("mobile-menu-close")
  const butterfliesContainer = document.getElementById("butterflies-container")

  function handleScroll() {
    if (window.scrollY > 50) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }
  }

  window.addEventListener("scroll", handleScroll)


  function toggleMobileMenu() {
    mobileMenu.classList.toggle("active")
    document.body.style.overflow = mobileMenu.classList.contains("active") ? "hidden" : ""
  }

  function closeMobileMenu() {
    mobileMenu.classList.remove("active")
    document.body.style.overflow = ""
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", toggleMobileMenu)
  }

  if (mobileMenuClose) {
    mobileMenuClose.addEventListener("click", closeMobileMenu)
  }

  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link")
  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu)
  })

  document.addEventListener("click", (e) => {
    if (
      mobileMenu &&
      mobileMenu.classList.contains("active") &&
      !mobileMenu.contains(e.target) &&
      mobileMenuBtn &&
      !mobileMenuBtn.contains(e.target)
    ) {
      closeMobileMenu()
    }
  })

  const navLinks = document.querySelectorAll('a[href^="#"]')
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })

        updateActiveNavLink(targetId)
      }
    })
  })

  function updateActiveNavLink(activeId) {
    const allNavLinks = document.querySelectorAll(".nav-link")
    allNavLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === activeId) {
        link.classList.add("active")
      }
    })
  }

  function handleScrollSpy() {
    const sections = document.querySelectorAll("section[id]")
    const scrollPos = window.scrollY + 100

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight
      const sectionId = "#" + section.getAttribute("id")

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        updateActiveNavLink(sectionId)
      }
    })
  }

  window.addEventListener("scroll", handleScrollSpy)

  function animateOnScroll() {
    const elements = document.querySelectorAll(".animate-on-scroll")

    elements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top
      const elementVisible = 150

      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add("visible")
      }
    })
  }

  window.addEventListener("scroll", animateOnScroll)
  animateOnScroll() // Run once on page load


 
  // Add some performance optimizations
  let ticking = false

  function optimizedScrollHandler() {
    if (!ticking) {
      requestAnimationFrame(() => {
        handleScroll()
        handleScrollSpy()
        animateOnScroll()
        ticking = false
      })
      ticking = true
    }
  }

  window.removeEventListener("scroll", handleScroll)
  window.removeEventListener("scroll", handleScrollSpy)
  window.removeEventListener("scroll", animateOnScroll)
  window.addEventListener("scroll", optimizedScrollHandler)

  // Preload images for better performance
  function preloadImages() {
    const imageUrls = [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/marg1-RZXbw8tF08MEN3d0IxN48sbGZ9kN4d.png", // marg1.png
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/marb1-jWqklgcAto3wM1eMcEPy1f0rxveRqF.png", // marb1.png
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/marb2-cyBYePBLxyL8jx4XkwVY5EkF2odERr.png", // marb2.png
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/marb3-9dRk1fkjUjL1RM7HLwpPS12l2zBSHe.png", // marb3.png
      "/placeholder.svg?height=60&width=60",
    ]

    imageUrls.forEach((url) => {
      const img = new Image()
      img.src = url
    })
  }

  preloadImages()

  // Add loading animation
  window.addEventListener("load", () => {
    document.body.classList.add("loaded")
  })
})
