// Wedding Invitation Configuration
const WEDDING_CONFIG = {
  // Couple Information
  couple: {
    bride: {
      name: "Henshi",
      bio: "As i step into this beautiful new chapter, i m ready to weave a lifetime of love, laughter, and shared dreams with Dhrumil.with a heart full of gratitude and excitement, i look forward to celebrate the beginning of our forever  surrounded by the people who mean the most.",
      photo: "images/bride.png",
      parents: "D/o . Kalpanaben Chandulala Diwani",
      instagram: "@henshi_shah"
    },
    groom: {
      name: "Dhrumil",
      bio: "Ready to build a future full of love, laughter and endless shared dreams with henshi. I warmly invite you to bless our new beginning and join in making our wedding day truly unforgettable",
      photo: "images/groom.png",
      parents: "S/o . Jayshreeben Bharatbhai Bhagat",
      instagram: "@dhrumil_patel"
    }
  },

  // Wedding Date & Time (For the Countdown)
  // Format: YYYY-MM-DDTHH:mm:ss
  weddingDate: "2026-11-24T12:00:00",
  dateString: "24.11.2026",
  celebrationTitle: "Join our celebration of love | 24.11.2026",

  // Background Music URL (Autoplays on entering invitation)
  // Using Mendelssohn's classic "Wedding March" (Royalty-free public domain)
  musicUrl: "music/instrumental.mp3",

  // Couple's Quote in the Countdown Section
  romanticQuote: "Love is not about how many days, months, or years you have been together. It's about how much you love each other every single day.",
  countdownCouplePhoto: "images/countdown_image.png",


  // Events Schedule
  events: [
    {
      title: "Mandva Ropan",
      icon: "images/mandva_ropan.png",
      date: "22-11-2026",
      time: "09:00 AM onwards",
      venue: "Shree Chaitanya Swarup Ashram",
      address: "Rameshwar, Nakhatrana, Kutch, Gujarat",
      mapLink: "https://maps.google.com"
    },
    {
      title: "Mameru",
      icon: "images/mameru.png",
      date: "23-11-2026",
      time: "04:00 PM onwards",
      venue: "Shree Chaitanya Swarup Ashram",
      address: "Rameshwar, Nakhatrana, Kutch, Gujarat",
      mapLink: "https://maps.google.com"
    },
    {
      title: "Dandiya",
      icon: "images/dandiya.png",
      date: "23-11-2026",
      time: "08:00 PM onwards",
      venue: "Shree Chaitanya Swarup Ashram",
      address: "Rameshwar, Nakhatrana, Kutch, Gujarat",
      mapLink: "https://maps.google.com"
    },
    {
      title: "Hastmelap",
      icon: "images/hastmelap.png",
      date: "24-11-2026",
      time: "09:30 AM onwards",
      venue: "Shree Chaitanya Swarup Ashram",
      address: "Rameshwar, Nakhatrana, Kutch, Gujarat",
      mapLink: "https://maps.google.com"
    }
  ],

  // Pre-Wedding Photoshoot Gallery
  gallery: [
    "images/gallery_image1.png",
    "images/gallery_image2.png",
    "images/gallery_image3.png",
    "images/gallery_image4.png",
  ],

  // Blessings & Gift Registry
  giftRegistry: {
    title: "Sending Blessings & Gifts",
    description: "Your presence at our wedding is the greatest gift of all. However, if you wish to honor us with a gift, you can use the options below.",
    bankTransfer: {
      bankName: "Royal Heritage Bank",
      accountName: "Dhrumil & Henshi",
      accountNumber: "987654321098",
      ifscCode: "RHB0007890",
      branch: "Heritage Park Branch"
    },
    upi: {
      upiId: "dhrumilhenshi@upi",
      payeeName: "Dhrumil"
    }
  }
};
