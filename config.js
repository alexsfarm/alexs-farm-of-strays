/* ============================================================================
   ALEX'S FARM OF STRAYS — WEBSITE SETTINGS
   ============================================================================
   This is the ONLY file you need to edit to fill the website with your own
   details. Change the text between the "quote marks", save, and the website
   updates. You do not need to touch any other file.

   TIPS:
   • Only edit what's inside the "quotation marks".
   • Keep the commas at the end of each line.
   • Anything marked PLACEHOLDER is waiting for your real information.
   • To add a photo, put the image file in the "assets" folder and write its
     name here, e.g. "assets/animals/scooby.jpg".
   ========================================================================== */

window.SITE_CONFIG = {

  /* ---- 1. CONTACT DETAILS ------------------------------------------------ */
  email:        "alexsfarmofstrays@hotmail.com",   // general / rescue enquiries
  parkEmail:    "paphospawspark@yahoo.com",        // dog-park booking emails (used by the booking system)
  whatsapp:     "35799750793",                     // WhatsApp number, digits only, no + or spaces
  phoneDisplay: "+357 99 750 793",                 // how the number looks on the page

  /* ---- 2. SOCIAL MEDIA (full links) -------------------------------------- */
  facebookRescue: "https://www.facebook.com/alexsfarmofstraysanimalrescue",
  facebookPark:   "https://www.facebook.com/people/Paphos-Paws-Park/61588800136891/",
  tiktok:         "https://www.tiktok.com/@alexsfarmofstrays",
  charityShop:    "",                        // optional — leave "" to hide this button

  /* ---- HERO STRAPLINE (the sentence under the big title) ------------------ */
  strapline: "We're a small, registered animal rescue working through a network of foster homes across Paphos. We receive no government funding, every adoption, donation and visit to Paphos Paws Park helps us continue helping animals in need.",

  /* ---- 3. OUR STORY ------------------------------------------------------ */
  storyParagraphs: [
    "Alex's Farm of Strays began in 2016 with a simple goal: to help the abandoned, neglected and unwanted animals of Cyprus. For several years we operated a rescue shelter, caring for animals with nowhere else to go. Due to ongoing local complaints and other challenges, the shelter is no longer in operation but our commitment to the animals has never changed.",
    "Today, Alex's Farm of Strays remains a fully registered animal rescue working through a network of dedicated foster homes and volunteers. We continue to rescue, rehabilitate and rehome animals across Cyprus and beyond, helping whenever and wherever we can. We receive no government funding and rely on donations, fundraising and community support to continue our work. Paphos Paws Park is one of the ways we can raise vital funds to provide food, veterinary care and a second chance for animals in need."
  ],

  // The three little numbers at the top of the page
  stats: [
    { num: "2000+", label: "strays helped" },
    { num: "100%", label: "foster-home care" },
    { num: "€0",   label: "government funding" }
  ],

  /* ---- 4. ADOPTION PROCEDURE (the numbered steps) ------------------------ */
  adoptionSteps: [
    { title: "Get in touch",  text: "Message us about the animal you're interested in and tell us a little about your home." },
    { title: "Meet & greet",  text: "We arrange a meeting at the foster home so you and the animal can get to know each other." },
    { title: "Home check",    text: "A quick, friendly check that the home is safe and suitable for the animal." },
    { title: "Welcome home",  text: "Adoption paperwork, an adoption donation, and your new family member comes home." }
    // PLACEHOLDER — change the wording to match your real process.
  ],

  /* ---- 5. ANIMALS LOOKING FOR A HOME ------------------------------------- */
  // species: "Dog", "Cat", "Rabbit", "Bird" (anything else shows a paw icon).
  // status:  "available" or "rehomed"  (shows a coloured pill on the card).
  // photo:   put the image in assets/animals/ and write its file name here;
  //          leave "" to show a friendly placeholder until a photo is added.
  // details: optional bullet points shown under the short description.
  animals: [
    { name: "Orion", species: "Dog", status: "available", photo: "assets/animals/orion.jpg",
      blurb: "A friendly, loyal German Shepherd looking for an experienced, loving family.",
      details: ["Male German Shepherd, approx. 4 years old", "Friendly and loyal", "Good with people and other dogs", "Active and intelligent breed", "Experienced home preferred", "Not available for guarding or chaining"] },
    { name: "Alice", species: "Rabbit", status: "available", photo: "assets/animals/alice.jpg",
      blurb: "A friendly (sometimes sassy!) dwarf rabbit who loves space to explore.",
      details: ["Male dwarf rabbit, neutered", "Friendly but can be sassy", "Used to dogs", "Prefers space to explore — not suited to cage living", "Needs time, attention and companionship", "Looking for an indoor home"] },
    { name: "Wilma", species: "Dog", status: "available", photo: "assets/animals/wilma.jpg",
      blurb: "A playful, affectionate young Jura Hound cross who gets on with everyone.",
      details: ["Female Jura Hound cross, approx. 1.5 years old", "Friendly and affectionate", "Good with people and other dogs", "Playful and easy-going", "Looking for a loving home"] },
    { name: "Aeris", species: "Bird", status: "available", photo: "assets/animals/aeris.jpg",
      blurb: "A hand-raised, people-friendly pigeon in need of a safe forever home.",
      details: ["Female pigeon, hand-raised", "Friendly with people", "Can fly independently", "Cannot be released to the wild", "Aviary or bird-experienced home preferred", "Looking for a safe, permanent home"] },
    { name: "Eleni", species: "Dog", status: "available", photo: "assets/animals/eleni.jpg",
      blurb: "A gentle, affectionate small dog who walks beautifully and loves a calm home.",
      details: ["Female, approx. 5 years old", "Small (under 8kg)", "Gentle and affectionate", "Good with calm dogs", "Walks well on a lead", "Calm home preferred", "Leishmania positive — managed with medication and special food"] },
    { name: "GeeGee", species: "Dog", status: "available", photo: "assets/animals/geegee.jpg",
      blurb: "A friendly, affectionate little Chihuahua cross — and a devoted mum.",
      details: ["Female Chihuahua / Miniature Pinscher cross", "Small breed (approx. 4.5kg)", "Friendly and affectionate", "Good with people and dogs", "Mum to a puppy named Patch", "Available for reservation — can leave once Patch is old enough"] },
    { name: "Kittens", species: "Cat", status: "available", photo: "assets/animals/kittens.jpg",
      blurb: "Four playful, curious kittens growing in confidence and ready for loving homes.",
      details: ["4 kittens, approx. 2 months old", "Currently in foster care", "Friendly, playful and curious", "Receiving veterinary care", "Looking for loving indoor homes", "Can be adopted individually or in pairs"] },
    { name: "Maddox", species: "Dog", status: "available", photo: "assets/animals/maddox.jpg",
      blurb: "A playful, affectionate young lad who blossoms once he knows you.",
      details: ["Mixed breed, male, approx. 1 year old", "Friendly with people", "Good with other dogs", "Playful and affectionate", "Can be shy at first", "Fully recovered from previous leg injuries"] }
  ],

  /* ---- 6. WAYS TO DONATE ------------------------------------------------- */
  // Leave any line as "" to hide that method.
  donate: {
    bankName: "SH.FOR THE PR.OF.STR.AN.,AL.F.",   // bank account name (as it appears)
    iban:     "CY79 0050 0589 0005 8901 H941 3801",
    revolut:  "https://revolut.me/alexsfarm",      // Revolut link (or @tag)
    paypal:   ""                    // PayPal.me link — awaiting the full link from Alex
  },

  /* ---- 7. PAPHOS PAWS PARK (the bookable dog park) ----------------------- */
  park: {
    address:       "Paphos, Cyprus",
    sessionLength: "1 hour",
    buffer:        15,              // minutes between sessions (safe arrivals/departures)
    pricePerSession: 10,            // the "from" price shown (€)
    maxDogs:         7,             // most dogs allowed in one booking
    currency:        "EUR",

    // Price by number of dogs (€). 1–2 dogs = €10, then +€2 per extra dog.
    priceByDogs: { "1": 10, "2": 10, "3": 12, "4": 14, "5": 16, "6": 18, "7": 20 },

    // Seasonal opening hours.
    //   mode "auto"   = switch automatically using the dates below
    //   mode "summer" = always summer · mode "winter" = always winter
    season: {
      mode:        "auto",
      summerStart: "03-01",         // MM-DD — switches INTO summer hours (Alex: ~March; confirm exact day)
      summerEnd:   "10-31",         // MM-DD — switches OUT of summer hours (Alex: ~end October; confirm exact day)
      summer: {
        hours: "Daily 07:30–19:45 (summer)",
        slots: [
          "07:30 – 08:30", "08:45 – 09:45", "10:00 – 11:00", "11:15 – 12:15", "12:30 – 13:30",
          "13:45 – 14:45", "15:00 – 16:00", "16:15 – 17:15", "17:30 – 18:30", "18:45 – 19:45"
        ]
      },
      winter: {
        hours: "Daily 07:30–17:15 (winter)",
        slots: [
          "07:30 – 08:30", "08:45 – 09:45", "10:00 – 11:00", "11:15 – 12:15",
          "12:30 – 13:30", "13:45 – 14:45", "15:00 – 16:00", "16:15 – 17:15"
        ]
      }
    },

    // The selling points shown next to the booking form:
    features: [
      "Fully fenced and secure",
      "Exclusive use during your booking",
      "Ideal for nervous, reactive or recovering dogs",
      "Shaded seating and fresh water available",
      "Self-service entry with a unique access code",
      "Every booking helps support rescue animals"
    ]
  },

  /* ---- 8. ADVANCED: ONLINE CARD PAYMENTS & LIVE DATABASE ----------------- */
  /* Leave these BLANK to run the simple, free version:
        • the booking button sends details to your WhatsApp
        • the animals above are shown from this file
     Fill them in later (see SETUP-GUIDE.md) to switch on:
        • card payments for the dog park (Stripe)
        • managing animals & bookings from the admin page (Supabase)            */
  supabaseUrl:          "https://mstcjicvpgsijeozroae.supabase.co",   // e.g. "https://abcd1234.supabase.co"
  supabaseAnonKey:      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1zdGNqaWN2cGdzaWplb3pyb2FlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE2OTgzMzAsImV4cCI6MjA5NzI3NDMzMH0.bDrvTDfpMvJuks6wuA51jzGctkdDFtpDquH820qN80A",   // your Supabase "anon public" key
  stripePublishableKey: ""    // your Stripe "publishable" key (starts with pk_)
};
