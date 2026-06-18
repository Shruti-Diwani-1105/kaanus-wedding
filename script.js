document.addEventListener("DOMContentLoaded", () => {
  // Verify configuration exists
  if (typeof WEDDING_CONFIG === "undefined") {
    console.error("Wedding configuration (config.js) not found.");
    return;
  }

  // ==========================================================================
  // DOM INJECTION FROM CONFIG
  // ==========================================================================
  
  // Inject Names & Hero Info
  const coupleNames = `${WEDDING_CONFIG.couple.bride.name} & ${WEDDING_CONFIG.couple.groom.name}`;
  const splashNamesFormatted = `${WEDDING_CONFIG.couple.bride.name}<br>&<br>${WEDDING_CONFIG.couple.groom.name}`;
  const splashName = document.querySelector(".couple-name-below");
  if (splashName) {
    splashName.innerHTML = `${WEDDING_CONFIG.couple.bride.name} <span>&</span> ${WEDDING_CONFIG.couple.groom.name}`;
  }
  document.getElementById("hero-names").textContent = coupleNames;
  document.getElementById("footer-names").textContent = coupleNames;
  document.getElementById("hero-date").textContent = WEDDING_CONFIG.dateString;
  document.title = `Wedding Invitation | ${coupleNames}`;

  // Inject Bride Information
  document.getElementById("bride-name").textContent = WEDDING_CONFIG.couple.bride.name;
  document.getElementById("bride-photo").src = WEDDING_CONFIG.couple.bride.photo;
  document.getElementById("bride-parents").textContent = WEDDING_CONFIG.couple.bride.parents;
  document.getElementById("bride-bio").textContent = WEDDING_CONFIG.couple.bride.bio;

  // Inject Groom Information
  document.getElementById("groom-name").textContent = WEDDING_CONFIG.couple.groom.name;
  document.getElementById("groom-photo").src = WEDDING_CONFIG.couple.groom.photo;
  document.getElementById("groom-parents").textContent = WEDDING_CONFIG.couple.groom.parents;
  document.getElementById("groom-bio").textContent = WEDDING_CONFIG.couple.groom.bio;

  // Inject Countdown Info
  document.getElementById("countdown-couple-photo").src = WEDDING_CONFIG.countdownCouplePhoto;
  document.getElementById("romantic-quote").textContent = WEDDING_CONFIG.romanticQuote;

  // Inject Blessings & Gifts (if gift section exists)
  if (document.getElementById("gift-title")) {
    document.getElementById("gift-title").textContent = WEDDING_CONFIG.giftRegistry.title;
    document.getElementById("gift-desc").textContent = WEDDING_CONFIG.giftRegistry.description;
    
    document.getElementById("bank-name").textContent = WEDDING_CONFIG.giftRegistry.bankTransfer.bankName;
    document.getElementById("bank-acc-name").textContent = WEDDING_CONFIG.giftRegistry.bankTransfer.accountName;
    document.getElementById("bank-acc-num").textContent = WEDDING_CONFIG.giftRegistry.bankTransfer.accountNumber;
    document.getElementById("bank-ifsc").textContent = WEDDING_CONFIG.giftRegistry.bankTransfer.ifscCode;
    document.getElementById("bank-branch").textContent = WEDDING_CONFIG.giftRegistry.bankTransfer.branch;

    document.getElementById("upi-payee-name").textContent = WEDDING_CONFIG.giftRegistry.upi.payeeName;
    document.getElementById("upi-id").textContent = WEDDING_CONFIG.giftRegistry.upi.upiId;

    // Generate UPI QR Code dynamically
    const upiQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(
      `upi://pay?pa=${WEDDING_CONFIG.giftRegistry.upi.upiId}&pn=${WEDDING_CONFIG.giftRegistry.upi.payeeName}&cu=INR`
    )}`;
    document.getElementById("upi-qr").src = upiQrUrl;
  }

// ========================================================================== 
  // DYNAMIC RENDERING (EVENTS, TIMELINE, GALLERY)
  // ==========================================================================

  // Render Event Schedule
  const eventGrid = document.getElementById("event-grid");
  WEDDING_CONFIG.events.forEach(event => {
    const card = document.createElement("div");
    card.className = "event-card";
    card.innerHTML = `
      <div>
        <div class="event-icon">
          ${event.icon.includes('/') || event.icon.includes('.') 
            ? `<img src="${event.icon}" alt="${event.title} icon">` 
            : event.icon}
        </div>
        <h3>${event.title}</h3>
        <div class="event-details">
          <p><i class="fa-regular fa-calendar-days"></i> <strong>Date:</strong> ${event.date}</p>
          <p><i class="fa-regular fa-clock"></i> <strong>Time:</strong> ${event.time}</p>
          <p><i class="fa-solid fa-hotel"></i> <strong>Venue:</strong> ${event.venue}</p>
          <p><i class="fa-solid fa-location-dot"></i> <strong>Address:</strong> ${event.address}</p>
        </div>
      </div>
    `;
    eventGrid.appendChild(card);
  });

  // Render Love Story Timeline (if timeline section exists)
  const timeline = document.getElementById("timeline");
  if (timeline) {
    WEDDING_CONFIG.loveStory.forEach((story, index) => {
      const container = document.createElement("div");
      // Alternate left/right classes
      container.className = `timeline-container ${index % 2 === 0 ? 'left' : 'right'}`;
      container.innerHTML = `
        <div class="timeline-content">
          <div class="timeline-img-wrapper">
            <img src="${story.image}" alt="${story.title}">
          </div>
          <div class="timeline-year">${story.year}</div>
          <h3>${story.title}</h3>
          <p>${story.desc}</p>
        </div>
      `;
      timeline.appendChild(container);
    });
  }

  // Render Image Gallery (if gallery section exists)
  const galleryGrid = document.getElementById("gallery-grid");
  if (galleryGrid) {
    WEDDING_CONFIG.gallery.forEach(imgSrc => {
      const item = document.createElement("div");
      item.className = "gallery-item";
      item.innerHTML = `
        <img src="${imgSrc}" alt="Pre Wedding Shoot">
        <div class="gallery-overlay">
          <i class="fa-solid fa-magnifying-glass-plus"></i>
        </div>
      `;
      galleryGrid.appendChild(item);
    });
  }

  // ==========================================================================
  // BACKGROUND MUSIC PLAYBACK
  // ==========================================================================
  let bgMusic = null;
  
  if (typeof WEDDING_CONFIG !== "undefined" && WEDDING_CONFIG.musicUrl) {
    bgMusic = new Audio(WEDDING_CONFIG.musicUrl);
    bgMusic.loop = true;
    bgMusic.volume = 0.4; // Set a pleasant, unobtrusive volume level (40%)
  }

  // ==========================================================================
  // SPLASH CONTROLLER
  // ==========================================================================
  const splashScreen = document.getElementById("splash-screen");
  const btnOpenInvitation = document.getElementById("btn-open-invitation");

  // Prevent scrolling by touching/dragging on the splash overlay
  if (splashScreen) {
    splashScreen.addEventListener("touchmove", (e) => {
      e.preventDefault();
    }, { passive: false });
  }

  // Open Invitation Action
  if (btnOpenInvitation && splashScreen) {
    btnOpenInvitation.addEventListener("click", () => {
      splashScreen.classList.add("hidden");
      document.body.classList.remove("no-scroll");
      
      // Start background music
      if (bgMusic) {
        bgMusic.play().catch(err => {
          console.log("Audio autoplay was prevented: ", err);
        });
      }
    });
  }

  // ==========================================================================
  // COUNTDOWN TIMER
  // ==========================================================================
  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  function updateCountdown() {
    const targetTime = new Date(WEDDING_CONFIG.weddingDate).getTime();
    const now = new Date().getTime();
    const difference = targetTime - now;

    if (difference <= 0) {
      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minutesEl.textContent = "00";
      secondsEl.textContent = "00";
      document.querySelector(".section-header p").textContent = "We are happily married!";
      return;
    }

    const d = Math.floor(difference / (1000 * 60 * 60 * 24));
    const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((difference % (1000 * 60)) / 1000);

    // Format double digits
    daysEl.textContent = d < 10 ? `0${d}` : d;
    hoursEl.textContent = h < 10 ? `0${h}` : h;
    minutesEl.textContent = m < 10 ? `0${m}` : m;
    secondsEl.textContent = s < 10 ? `0${s}` : s;
  }

  // Start timer interval
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // ==========================================================================
  // INTERACTIVE GALLERY LIGHTBOX
  // ==========================================================================
  const lightbox = document.getElementById("lightbox");
  if (lightbox) {
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxClose = document.getElementById("lightbox-close");
    const galleryItems = document.querySelectorAll(".gallery-item");

    galleryItems.forEach(item => {
      item.addEventListener("click", () => {
        const imgSrc = item.querySelector("img").src;
        lightboxImg.src = imgSrc;
        lightbox.classList.add("active");
        // Disable background scrolling when lightbox open
        document.body.style.overflow = "hidden";
      });
    });

    // Close Lightbox
    lightboxClose.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox || e.target.closest("#lightbox-close")) {
        closeLightbox();
      }
    });

    function closeLightbox() {
      lightbox.classList.remove("active");
      document.body.style.overflow = "auto";
    }

    // Close lightbox on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && lightbox.classList.contains("active")) {
        closeLightbox();
      }
    });
  }

  // ==========================================================================
  // RSVP FORM & LOCAL STORAGE GUESTBOOK
  // ==========================================================================
  const rsvpForm = document.getElementById("rsvp-form");
  const wishesBoard = document.getElementById("wishes-board");

  if (rsvpForm && wishesBoard) {
    // Initial Mock Wishes (to seed the board on first load)
    const defaultWishes = [
      {
        name: "Deepak & Aarti Shah",
        attendance: "yes",
        message: "Sending you both infinite love and blessings. May your new life together be filled with absolute joy and prosperity. Congratulations, Dhrumil and Henshi!"
      },
      {
        name: "Sneha Kapoor",
        attendance: "yes",
        message: "I am so extremely excited for the wedding! You both make the most perfect couple. Can't wait to dance at the Sangeet!"
      },
      {
        name: "Rahul Verma",
        attendance: "yes",
        message: "Huge congratulations brother! Wishing you and Henshi a very beautiful and blessed journey ahead."
      }
    ];

    // Load and display wishes
    function getWishes() {
      const stored = localStorage.getItem("wedding_wishes");
      if (!stored) {
        localStorage.setItem("wedding_wishes", JSON.stringify(defaultWishes));
        return defaultWishes;
      }
      return JSON.parse(stored);
    }

    function displayWishes() {
      wishesBoard.innerHTML = "";
      const wishes = getWishes();
      
      // Display in reverse order (newest wishes first)
      [...wishes].reverse().forEach(wish => {
        const card = document.createElement("div");
        card.className = "wish-card";
        
        const attendanceText = wish.attendance === "yes" ? "✓ Attending" : "✗ Will miss it";
        
        card.innerHTML = `
          <p class="wish-text">"${wish.message}"</p>
          <div class="wish-author">${wish.name}</div>
          <div class="wish-attendance">${attendanceText}</div>
        `;
        wishesBoard.appendChild(card);
      });
    }

    // Handle RSVP Submit
    rsvpForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("rsvp-name").value.trim();
      const attendance = document.getElementById("rsvp-attendance").value;
      const message = document.getElementById("rsvp-message").value.trim();

      if (!name || !attendance || !message) {
        alert("Please fill in all the details.");
        return;
      }

      // Save wish
      const newWish = { name, attendance, message };
      const currentWishes = getWishes();
      currentWishes.push(newWish);
      localStorage.setItem("wedding_wishes", JSON.stringify(currentWishes));

      // Refresh Wishes Board
      displayWishes();

      // Clear Form
      rsvpForm.reset();

      // Alert guest with nice visual feedback
      alert(`Thank you, ${name}! Your RSVP has been received, and your wish has been posted to our board.`);
    });

    // Display initial wishes
    displayWishes();
  }

  // ==========================================================================
  // REGISTRY COPY-TO-CLIPBOARD FUNCTIONALITY
  // ==========================================================================
  const btnCopyBank = document.getElementById("btn-copy-bank");
  const btnCopyUpi = document.getElementById("btn-copy-upi");

  if (btnCopyBank && btnCopyUpi) {
    btnCopyBank.addEventListener("click", () => {
      const bankDetailsText = `Bank: ${WEDDING_CONFIG.giftRegistry.bankTransfer.bankName}
Account Name: ${WEDDING_CONFIG.giftRegistry.bankTransfer.accountName}
Account Number: ${WEDDING_CONFIG.giftRegistry.bankTransfer.accountNumber}
IFSC Code: ${WEDDING_CONFIG.giftRegistry.bankTransfer.ifscCode}
Branch: ${WEDDING_CONFIG.giftRegistry.bankTransfer.branch}`;

      copyToClipboard(bankDetailsText, btnCopyBank, "Bank Details Copied!");
    });

    btnCopyUpi.addEventListener("click", () => {
      const upiId = WEDDING_CONFIG.giftRegistry.upi.upiId;
      copyToClipboard(upiId, btnCopyUpi, "UPI ID Copied!");
    });

    function copyToClipboard(text, buttonElement, successMessage) {
      navigator.clipboard.writeText(text)
        .then(() => {
          const originalContent = buttonElement.innerHTML;
          buttonElement.innerHTML = `<i class="fa-solid fa-check"></i> ${successMessage}`;
          buttonElement.style.borderColor = "var(--color-accent)";
          buttonElement.style.color = "var(--color-accent)";

          setTimeout(() => {
            buttonElement.innerHTML = originalContent;
            buttonElement.style.borderColor = "";
            buttonElement.style.color = "";
          }, 2000);
        })
        .catch(err => {
          console.error("Failed to copy text: ", err);
          alert("Copy failed. Please manually select and copy.");
        });
    }
  }
});
