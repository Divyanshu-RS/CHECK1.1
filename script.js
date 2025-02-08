document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {
      menuToggle.addEventListener("click", function () {
        navLinks.classList.toggle("active");
      });
    } else {
      console.error("Menu toggle or nav links not found!");
    }
  });

  // Contact Form Validation
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      let name = document.querySelector("input[type='text']").value.trim();
      let email = document.querySelector("input[type='email']").value.trim();
      let message = document.querySelector("textarea").value.trim();

      if (!name || !email || !message) {
        alert("Please fill in all fields.");
      } else {
        alert("Thank you for your message! We'll get back to you soon.");
        contactForm.reset();
      }
    });
  } else {
    console.error("Contact form not found!");
  }

  // Smooth scrolling function (Only on pages with sections)
  function scrollToSection(id) {
    const target = document.getElementById(id);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80, // Offset for fixed navbar
        behavior: "smooth",
      });
    } else {
      console.error(`Section with ID '${id}' not found.`);
    }
  }

  // Attach smooth scrolling to navbar links (Only for internal links)
  document.querySelectorAll("nav ul li a[href^='#']").forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      scrollToSection(targetId);
    });
  });
});

// Splash Screen Handling
window.onload = function () {
  const splashScreen = document.getElementById("splash-screen");
  const mainContent = document.getElementById("main-content");

  if (!splashScreen || !mainContent) {
    console.error("Splash screen or main content not found!");
    return;
  }

  // Fade out splash screen instead of abruptly removing it
  setTimeout(() => {
    splashScreen.style.transition = "opacity 1s ease-out";
    splashScreen.style.opacity = "0";

    setTimeout(() => {
      splashScreen.style.display = "none";
      mainContent.classList.remove("hidden");
      mainContent.classList.add("fade-in");
      document.body.style.overflow = "auto";
    }, 1000);
  }, 2500);
};

document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
      navLinks.classList.toggle("active");
    });
  } else {
    console.error("Menu toggle or nav links not found!");
  }
});
