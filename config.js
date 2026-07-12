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
    { title: "Get in touch",  text: "Complete an application form and tell us about your home, lifestyle and the animal you're interested in adopting." },
    { title: "Meet & greet",  text: "Meet your potential new family member. If you're local, we'll arrange a meet and greet at your home or at Paphos Paws Park so you can get to know each other." },
    { title: "Home check",    text: "A volunteer will visit your home to make sure it's safe and suitable. We carry out home checks locally and abroad whenever possible." },
    { title: "Welcome home",  text: "Once approved, you'll complete the adoption paperwork, make the adoption donation, and welcome your new family member home." }
  ],

  /* ---- 5. ANIMALS LOOKING FOR A HOME ------------------------------------- */
  // species: "Dog", "Cat", "Rabbit", "Bird" (anything else shows a paw icon).
  // status:  "available" or "rehomed"  (shows a coloured pill on the card).
  // photo:   put the image in assets/animals/ and write its file name here;
  //          leave "" to show a friendly placeholder until a photo is added.
  // focus:   (optional) which part of a photo to keep visible in the card if it
  //          has to be cropped, e.g. "center top", "center 30%", "center".
  //          Default keeps the upper part so faces are less likely to be cut off.
  //          Visitors can also click/tap any photo to see the FULL, uncropped image.
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
    minNoticeHours:  24,            // earliest a visitor can book ahead, in hours (24 = from tomorrow)
    maxAdvanceDays:  365,           // furthest ahead a visitor can book, in days
    holdHours:       2,             // how long an unconfirmed request holds its slot before auto-release
    postVisitHours:  1,             // hours after a visit to send the post-visit thank-you email
    // Short note shown under the price so visitors know the fee supports the rescue:
    fundsMessage:    "Every booking helps fund food and vet care for our rescue animals — thank you! 🐾",

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

  /* ---- 7b. INFO PAGES (footer pop-ups: FAQs / Privacy / Terms) --------- */
  pages: {
    faqs:    { title: "FAQs", body: "## Private Dog Park\n\nWho can use the dog park?\nThe park is open to anyone looking for a safe, secure area where their dog can run, play and exercise.\n\nIs the park private?\nYes. Every booking gives you exclusive use of the park during your session, so you won’t share it with other dogs or visitors.\n\nIs the park suitable for reactive or nervous dogs?\nYes. Because the park is booked privately, it’s ideal for reactive, nervous or anxious dogs, as well as puppies learning recall and building confidence.\n\nHow do I book?\nBookings can be made quickly and easily through our website.\n\nWhere does the booking money go?\nEvery booking helps support the rescue work of Alex’s Farm of Strays, helping us care for stray and abandoned animals in Cyprus.\n\n## General\n\nWhat is Alex’s Farm of Strays?\nAlex’s Farm of Strays is an animal rescue based in Cyprus. Over the years, we have helped thousands of stray and abandoned animals find loving homes in Cyprus and abroad.\n\nDo you have a shelter?\nNo. We don’t have a physical shelter and instead rely on a network of foster homes to care for animals while they wait for their forever families. If you live in Cyprus and would like to register as a foster carer, we’d love to hear from you.\n\nAre you a registered charity?\nYes. Alex’s Farm of Strays is a registered non-profit association in Cyprus.\n\nHow can I support your work?\nYou can support us by donating, volunteering, fostering, shopping at our charity shop, booking our private dog park, or simply sharing our animals to help them find loving homes.\n\nHow can I contact you?\nYou can contact us through the contact form on our website or by messaging us on our social media pages.\n\n## Adoption\n\nHow do I adopt?\nSimply complete our adoption application form. If your application is suitable, we will arrange a successful home check before proceeding with the adoption.\n\nWhy do you carry out home checks?\nHome checks help us ensure every animal is going to a safe, suitable and permanent home, giving them the best chance of a happy future.\n\nCan I adopt if I rent my home or already have pets?\nYes. If you rent, you’ll need your landlord’s permission to keep pets. If you already have pets, we’ll simply make sure the animal you’re interested in is a suitable match for your household.\n\nWhat is included in the adoption package?\nEvery animal is adopted with an adoption package, which is covered by your adoption donation. Depending on the animal’s age and needs, this includes vaccinations, microchipping, flea and worm treatment, neutering (unless too young), snap tests and any other necessary veterinary care before adoption.\n\nDo you adopt outside Cyprus?\nYes. We regularly arrange adoptions to the United Kingdom and may also be able to arrange adoptions to other countries.\n\nWhat happens if I can no longer keep my adopted animal?\nIf, at any point, you are no longer able to care for your adopted animal, they must be returned to Alex’s Farm of Strays. They must never be sold, given away or abandoned.\n\n## Donations\n\nHow can I support Alex’s Farm of Strays?\nThere are many ways to support our rescue, including making a financial donation, donating pet food or supplies, shopping at our charity shop, booking our private dog park, volunteering, fostering animals, or simply sharing our animals to help them find loving homes. Every contribution helps us continue saving lives.\n\n## Charity Shop\n\nWhere is your charity shop?\nOur charity shop is located in Kissonerga, Paphos.\n\nWhat can I donate?\nWe welcome good-quality clothing, shoes, household items, bric-a-brac, toys and many other reusable items. If you’re unsure whether we can accept something, please get in touch.\n\nWhere does the money go?\nAll proceeds from our charity shop help fund the rescue, care and rehoming of stray and abandoned animals.\n\n## Volunteering & Fostering\n\nCan I volunteer?\nYes. We’re always grateful for volunteers who can help with fundraising, events, transporting animals to the vet or airport, assisting at our private dog park or charity shop, and supporting other areas of our rescue work.\n\nCan I foster an animal?\nYes. Foster homes are essential to our rescue work, providing a safe and loving temporary home for animals while they wait to find their forever families.\n\n## Rescue & Surrenders\n\nCan you take in my dog or cat?\nUnfortunately, we cannot take in dogs or cats immediately, as we don’t have a physical shelter and rely entirely on foster homes. If you’re able to continue caring for your animal while we search for a suitable foster or forever home, we’ll do our best to help. However, we cannot guarantee that we’ll always be able to assist.\n\nI found a stray animal. What should I do?\nIf you find a stray animal, please post it on local Facebook groups, check whether it has a microchip at your nearest veterinary clinic, and, if the animal is injured, take it to a veterinary clinic as soon as possible. You should also inform the local police and the council in the area where the animal was found. If you need further advice or assistance, please don’t hesitate to contact us.\n\n## Contact\n\nI can’t find the answer to my question.\nIf your question isn’t answered in our FAQs, please feel free to contact us by email, WhatsApp or through our social media pages. We’ll be happy to help." },
    privacy: { title: "Privacy Policy", body: "Last updated: July 2026\n\nAt Alex’s Farm, we are committed to protecting your privacy and handling your personal information responsibly. This Privacy Policy explains what information we collect through our website, how we use it, and your rights.\n\n1. Who We Are\n\nAlex’s Farm is operated by the registered non-profit association Shelter for the Protection of Stray Animals – Alex’s Farm, based in Cyprus.\n\nIf you have any questions about this Privacy Policy, please contact us through our social media pages.\n\n2. Information We Collect\n\nDepending on how you use our website, we may collect:\n\nYour name\n\nEmail address\n\nTelephone number\n\nInformation you provide in your adoption application\n\nPrivate dog park booking information, including your booking date, time, number of dogs and selected donation method\n\nTechnical information such as your IP address, browser type and cookies\n\n3. How We Use Your Information\n\nWe use your information to:\n\nProcess adoption applications\n\nManage private dog park bookings\n\nContact you regarding your adoption application or booking\n\nSend booking confirmations and automated emails\n\nImprove our website and services\n\nComply with legal obligations\n\nWe will only use your personal information for the purposes for which it was collected.\n\n4. Sharing Your Information\n\nWe do not sell or trade your personal information.\n\nYour information may be shared with trusted service providers that help us operate our website, such as Netlify (website hosting), Supabase (secure data storage) and Resend (automated emails), or where required by law.\n\n5. How We Protect Your Information\n\nWe take reasonable technical and organisational measures to protect your personal information from unauthorised access, loss, misuse or disclosure. Access to personal information is limited to authorised members of Alex’s Farm where necessary.\n\n6. How Long We Keep Your Information\n\nWe only keep your personal information for as long as necessary for the purpose it was collected or to comply with legal obligations. Dog park booking information is regularly removed once it is no longer required.\n\n7. Your Rights\n\nUnder the General Data Protection Regulation (GDPR), you have the right to:\n\nRequest access to your personal information\n\nRequest correction of inaccurate information\n\nRequest deletion of your personal information where applicable\n\nRequest restriction of processing\n\nObject to certain processing\n\nWithdraw your consent where processing is based on consent\n\nTo exercise any of these rights, please contact us through our social media pages.\n\n8. Cookies\n\nOur website may use cookies and similar technologies to improve your browsing experience and help us understand how our website is used. You can manage or disable cookies through your browser settings.\n\n9. Changes to This Privacy Policy\n\nWe may update this Privacy Policy from time to time. Any changes will be published on this page together with the updated revision date." },
    terms:   { title: "Terms & Conditions", body: "Last updated: July 2026\n\nWelcome to the Alex’s Farm website. By accessing or using this website, you agree to these Terms & Conditions. If you do not agree with any part of these Terms & Conditions, please do not use our website.\n\n1. About Us\n\nAlex’s Farm is operated by the registered non-profit association Shelter for the Protection of Stray Animals – Alex’s Farm, based in Cyprus.\n\nOur website provides information about our rescue work, animals available for adoption, fundraising activities and our private dog park.\n\n2. Website Use\n\nBy using this website, you agree to use it lawfully, responsibly and respectfully.\n\nYou must not:\n\nAttempt to interfere with the operation or security of the website.\n\nUpload or transmit viruses, malicious software or harmful code.\n\nAttempt to gain unauthorised access to any part of the website or its systems.\n\nUse the website for any fraudulent, unlawful or harmful purpose.\n\nMisuse any forms, booking systems or other features provided on the website.\n\n3. Website Information\n\nWe make every effort to ensure the information on this website is accurate and kept up to date.\n\nHowever, details such as an animal’s age, breed, health, behaviour, adoption status, availability, opening times, suggested donations and services may change without notice.\n\nWe cannot guarantee uninterrupted access to the website or that all information will always be complete, accurate or free from errors.\n\n4. Adoption Applications\n\nSubmitting an adoption application does not guarantee adoption.\n\nEvery application is carefully assessed to ensure each animal is matched with the most suitable home.\n\nAlex’s Farm reserves the right to approve, decline or withdraw an adoption application at its sole discretion and is not obliged to provide a reason for its decision.\n\nSuccessful applicants may be required to complete a successful home check, sign an adoption agreement and pay the applicable adoption donation before an adoption is completed.\n\n5. Donations\n\nAll donations made to Alex’s Farm are voluntary and directly support our rescue work and the animals in our care.\n\nDonations are generally non-refundable.\n\nWhere Alex’s Farm refuses or cancels a private dog park booking before the visit takes place, any donation made for that booking will be refunded in full.\n\n6. Private Dog Park\n\nBookings provide exclusive use of the park during the reserved session and are subject to availability.\n\nA maximum of 7 dogs may attend each booking.\n\nDog park bookings are made by voluntary donation.\n\nIf you are unable to attend, we are happy to reschedule your booking provided at least 48 hours’ notice is given. Rescheduling is always subject to availability.\n\nBookings cancelled with less than 48 hours’ notice, or where visitors fail to attend, are not eligible for rescheduling.\n\nIn exceptional circumstances, such as severe weather or another event that makes the park unsafe to use, Alex’s Farm may offer an alternative booking date, subject to availability.\n\n7. Health, Safety & Visitor Responsibilities\n\nOwners are responsible for ensuring their dogs are healthy and suitable to attend.\n\nDogs should be up to date with their routine vaccinations appropriate for their age.\n\nDogs showing signs of contagious illness, including vomiting, diarrhoea or infectious conditions, must not attend.\n\nFemale dogs in season are not permitted.\n\nReactive, nervous and anxious dogs are welcome. However, owners remain fully responsible for deciding whether the park is suitable for their dog and for managing their dog’s behaviour safely throughout their visit.\n\nDogs must remain on lead until safely inside the enclosed park area.\n\nVisitors remain fully responsible for the supervision, safety and behaviour of their dogs throughout their visit.\n\nChildren under the age of 14 must be accompanied and supervised by a responsible adult at all times.\n\nPlease do not arrive more than 5 minutes before your booking. Your session will finish at the scheduled end time regardless of your arrival time.\n\nRepeated late departures may result in future bookings being refused.\n\n8. Park Rules & Facilities\n\nVisitors agree to:\n\nClean up after themselves and their dogs.\n\nDispose of all rubbish in the bins provided.\n\nReturn toys, equipment and other items to their original place before leaving.\n\nLeave the park clean and tidy for the next visitor.\n\nKeep gate access codes confidential and never share them with others.\n\nEnsure all gates are securely closed after entering and before leaving.\n\nVisitors are welcome to use the equipment and facilities provided.\n\nAll equipment must be used responsibly and entirely at the visitor’s own risk.\n\nAgility equipment and permanent park structures must not be moved.\n\nSmoking and vaping are discouraged. If you choose to smoke or vape, all cigarette ends and waste must be disposed of responsibly. Anyone leaving litter, including cigarette ends, may have future bookings refused.\n\nAlcohol may be consumed responsibly. Excessive alcohol consumption or behaviour that compromises the safety or enjoyment of others is not permitted.\n\nBBQs, open fires and naked flames are strictly prohibited.\n\nIf any equipment, fencing, gates or facilities are damaged, please notify Alex’s Farm as soon as possible.\n\n9. Photography, Professional Trainers & Emergencies\n\nPhotography and video recording are welcome.\n\nDrones may be used provided they are operated safely, legally and respectfully and are not used to record neighbouring properties or individuals without permission.\n\nProfessional dog trainers and behaviourists are welcome to use the park with their clients, provided a valid booking has been made and these Terms & Conditions are followed.\n\nIf an emergency occurs, including damage to fencing, an escaped dog or any other incident affecting safety, please contact Alex’s Farm as soon as possible. Visitors should seek appropriate emergency assistance where required before contacting Alex’s Farm.\n\n10. Right to Refuse or Cancel Bookings\n\nAlex’s Farm reserves the right to refuse, decline or cancel any booking at its sole discretion and is not obliged to provide a reason for its decision.\n\nThis right includes, but is not limited to:\n\nBreaches of these Terms & Conditions.\n\nFalse or misleading information.\n\nSafety, welfare or security concerns.\n\nBehaviour considered inappropriate or unacceptable.\n\nAny other reason that Alex’s Farm reasonably considers necessary to protect the park, its visitors, neighbouring properties or the animals.\n\nWhere Alex’s Farm refuses or cancels a booking before the visit takes place, any donation made for that booking will be refunded in full.\n\n11. Intellectual Property\n\nUnless otherwise stated, all photographs, logos, graphics, text and other content on this website are the property of Alex’s Farm.\n\nYou are welcome to share links to our website and our animals to help them find homes. However, our content may not be copied, reproduced, modified or used for commercial purposes without our prior written permission.\n\n12. Third-Party Links\n\nOur website may contain links to third-party websites or services for your convenience.\n\nAlex’s Farm is not responsible for the content, availability or privacy practices of those external websites.\n\n13. Limitation of Liability\n\nWhile we make every effort to ensure this website remains accurate and available, Alex’s Farm accepts no liability for any loss or damage arising from the use of this website or reliance on its content, except where liability cannot legally be excluded.\n\nVisitors use the private dog park, its equipment and facilities entirely at their own risk.\n\nOwners remain fully responsible for the supervision, safety and behaviour of their dogs throughout their visit.\n\nAlex’s Farm accepts no responsibility for injury, illness, loss, damage, escape or death of any person or animal while using the park, except where liability cannot legally be excluded.\n\n14. Privacy & Changes\n\nYour use of this website is also governed by our Privacy Policy.\n\nAlex’s Farm may update these Terms & Conditions from time to time. Any changes will be published on this page together with the updated revision date.\n\n15. Governing Law\n\nThese Terms & Conditions are governed by the laws of the Republic of Cyprus.\n\nAny disputes relating to these Terms & Conditions or the use of this website shall be subject to the exclusive jurisdiction of the courts of the Republic of Cyprus.\n\n16. Contact Us\n\nIf you have any questions about these Terms & Conditions, please contact Alex’s Farm through our official social media pages or by email." }
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
