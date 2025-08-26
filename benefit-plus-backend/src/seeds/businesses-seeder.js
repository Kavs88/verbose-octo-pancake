const businesses = [
  {
    name: "Olivia's Prime Steakhouse",
    slug: "olivias-prime-steakhouse",
    description: "An upscale dining experience specializing in high-quality imported steaks, fine wines, and classic cocktails. Perfect for a special occasion or a premium dinner.",
    category: "Restaurant",
    neighborhood: "Hai Chau",
    rating: 4.8,
    reviewCount: 750,
    isOpen: true,
    hasMemberDeal: true,
    dealHighlight: "Free glass of house wine with any steak order",
    isFavorite: false,
    isPremium: true,
    amenities: ["Fine Dining", "Air Conditioning", "Full Bar", "Reservations Recommended"],
    location: {
      latitude: 16.0752,
      longitude: 108.2232,
      address: "505 Đ. Trần Hưng Đạo, An Hải Trung, Sơn Trà, Đà Nẵng"
    },
    reviews: [
      { rating: 5, comment: "Best steak I've had in Vietnam! Impeccable service.", date: "2025-08-15" },
      { rating: 5, comment: "A fantastic fine dining experience. The wine list is excellent.", date: "2025-08-10" }
    ]
  },
  {
    name: "43 Factory Coffee Roaster",
    slug: "43-factory-coffee-roaster",
    description: "A specialty coffee roastery known for its minimalist, industrial design and commitment to high-quality, ethically sourced beans. A hub for coffee connoisseurs.",
    category: "Café",
    neighborhood: "Hai Chau",
    rating: 4.7,
    reviewCount: 1250,
    isOpen: true,
    hasMemberDeal: true,
    dealHighlight: "15% off specialty pour-over coffee",
    isFavorite: false,
    isPremium: true,
    amenities: ["WiFi", "Air Conditioning", "Outdoor Seating", "Specialty Coffee"],
    location: {
      latitude: 16.0398,
      longitude: 108.2498,
      address: "Lô 422, Đ. Ngô Thì Sỹ, Bắc Mỹ An, Ngũ Hành Sơn, Đà Nẵng"
    },
    reviews: [
      { rating: 5, comment: "Absolutely world-class coffee. A must-visit for any coffee lover.", date: "2025-09-01" },
      { rating: 4, comment: "The architecture is stunning. Coffee is pricey but worth it.", date: "2025-08-28" }
    ]
  },
  {
    name: "The Craftsman Cocktail Bar",
    slug: "the-craftsman-cocktail-bar",
    description: "An intimate, speakeasy-style bar with a focus on handcrafted, artisanal cocktails. A sophisticated spot for a quiet drink or a date night.",
    category: "Restaurant",
    neighborhood: "Hai Chau",
    rating: 4.9,
    reviewCount: 420,
    isOpen: true,
    hasMemberDeal: true,
    dealHighlight: "2-for-1 on 'Cocktail of the Week'",
    isFavorite: false,
    isPremium: false,
    amenities: ["Craft Cocktails", "Air Conditioning", "Intimate Atmosphere"],
    location: {
      latitude: 16.0688,
      longitude: 108.2205,
      address: "48 Phan Tứ, Bắc Mỹ Phú, Ngũ Hành Sơn, Đà Nẵng"
    },
    reviews: [
      { rating: 5, comment: "Incredible cocktails, probably the best in Da Nang. The bartenders are true artists.", date: "2025-08-22" }
    ]
  },
  {
    name: "Enouvo Space",
    slug: "enouvo-space",
    description: "A modern and vibrant co-working and co-living space designed for digital nomads and local entrepreneurs. Features flexible desks, private offices, and a strong community.",
    category: "Co-working",
    neighborhood: "Hai Chau",
    rating: 4.8,
    reviewCount: 150,
    isOpen: true,
    hasMemberDeal: true,
    dealHighlight: "First day pass completely free for members",
    isFavorite: false,
    isPremium: false,
    amenities: ["High-Speed WiFi", "Air Conditioning", "Meeting Rooms", "Community Events", "Free Coffee"],
    location: {
      latitude: 16.0611,
      longitude: 108.2131,
      address: "15 Tạ Mỹ Duật, An Hải Bắc, Sơn Trà, Đà Nẵng"
    },
    reviews: [
      { rating: 5, comment: "Great community and super fast internet. The perfect place to work from in Da Nang.", date: "2025-08-19" }
    ]
  },
  {
    name: "Banh Xeo Ba Duong",
    slug: "banh-xeo-ba-duong",
    description: "A legendary local eatery famous for its authentic Banh Xeo (Vietnamese crispy pancake) and Nem Lui (lemongrass pork skewers). A true taste of Central Vietnam.",
    category: "Restaurant",
    neighborhood: "Hai Chau",
    rating: 4.4,
    reviewCount: 3500,
    isOpen: true,
    hasMemberDeal: true,
    dealHighlight: "10% off total bill for tables of 2 or more",
    isFavorite: false,
    isPremium: false,
    amenities: ["Local Cuisine", "Authentic Experience", "Casual Dining"],
    location: {
      latitude: 16.0537,
      longitude: 108.2127,
      address: "K280/23, Hoàng Diệu, Bình Hiên, Hải Châu, Đà Nẵng"
    },
    reviews: [
      { rating: 5, comment: "The best Banh Xeo in Da Nang, without a doubt. Hidden in an alley but worth the search!", date: "2025-09-02" }
    ]
  },
  {
    name: "L Spa",
    slug: "l-spa",
    description: "A serene and professional spa offering a wide range of treatments, from traditional Vietnamese massages to modern facial therapies. An oasis of calm in the city.",
    category: "Wellness",
    neighborhood: "My Khe",
    rating: 4.9,
    reviewCount: 980,
    isOpen: true,
    hasMemberDeal: true,
    dealHighlight: "20% off any 90-minute massage treatment",
    isFavorite: false,
    isPremium: true,
    amenities: ["Professional Therapists", "Air Conditioning", "Relaxing Ambiance", "Herbal Tea"],
    location: {
      latitude: 16.0468,
      longitude: 108.2435,
      address: "05 An Thượng 3, Bắc Mỹ Phú, Ngũ Hành Sơn, Đà Nẵng"
    },
    reviews: [
      { rating: 5, comment: "Felt completely rejuvenated after my massage. The staff are so skilled and welcoming.", date: "2025-08-30" }
    ]
  },
  {
    name: "7 Bridges Brewing Co.",
    slug: "7-bridges-brewing-co",
    description: "A popular craft brewery with a rooftop bar overlooking the Han River. Offers a wide selection of locally brewed beers and a menu of Western-style pub food.",
    category: "Restaurant",
    neighborhood: "Hai Chau",
    rating: 4.5,
    reviewCount: 1800,
    isOpen: true,
    hasMemberDeal: true,
    dealHighlight: "First craft beer of your choice for 50,000 VND",
    isFavorite: false,
    isPremium: false,
    amenities: ["Craft Beer", "Rooftop Bar", "Live Music", "River View", "Food Menu"],
    location: {
      latitude: 16.0681,
      longitude: 108.2261,
      address: "493 Đ. Trần Hưng Đạo, An Hải Trung, Sơn Trà, Đà Nẵng"
    },
    reviews: [
      { rating: 5, comment: "Great beer selection and an amazing view of the Dragon Bridge.", date: "2025-08-25" }
    ]
  },
  {
    name: "The Local Beans",
    slug: "the-local-beans",
    description: "A cozy cafe that focuses on high-quality, locally sourced Vietnamese coffee beans. Great for a quiet work session or catching up with friends.",
    category: "Café",
    neighborhood: "Hai Chau",
    rating: 4.6,
    reviewCount: 640,
    isOpen: true,
    hasMemberDeal: true,
    dealHighlight: "Buy one get one free on Vietnamese Iced Coffee",
    isFavorite: false,
    isPremium: false,
    amenities: ["WiFi", "Air Conditioning", "Locally Sourced Coffee", "Comfortable Seating"],
    location: {
      latitude: 16.0655,
      longitude: 108.2177,
      address: "56A Lê Hồng Phong, Phước Ninh, Hải Châu, Đà Nẵng"
    },
    reviews: []
  },
  {
    name: "Jolie Da Nang Cooking Class",
    slug: "jolie-da-nang-cooking-class",
    description: "A fun and interactive cooking class that includes a market tour to select fresh ingredients. Learn to make classic Vietnamese dishes in a friendly environment.",
    category: "Experience",
    neighborhood: "Non Nuoc",
    rating: 5.0,
    reviewCount: 990,
    isOpen: true,
    hasMemberDeal: true,
    dealHighlight: "15% off the full-day class booking price",
    isFavorite: false,
    isPremium: false,
    amenities: ["Market Tour", "Hands-on Cooking", "English Speaking Guide", "All Ingredients Included"],
    location: {
      latitude: 16.0634,
      longitude: 108.2321,
      address: "11 An Cư 5, Mân Thái, Sơn Trà, Đà Nẵng"
    },
    reviews: []
  },
  {
    name: "California Fitness & Yoga",
    slug: "california-fitness-yoga",
    description: "A large, modern fitness center with state-of-the-art equipment, a wide variety of group classes (including yoga and dance), and professional trainers.",
    category: "Wellness",
    neighborhood: "Hai Chau",
    rating: 4.3,
    reviewCount: 320,
    isOpen: true,
    hasMemberDeal: true,
    dealHighlight: "Free 3-day trial pass for all members",
    isFavorite: false,
    isPremium: true,
    amenities: ["Modern Equipment", "Group Classes", "Personal Trainers", "Sauna", "Air Conditioning"],
    location: {
      latitude: 16.0601,
      longitude: 108.2223,
      address: "271 Nguyễn Văn Linh, Vĩnh Trung, Thanh Khê, Đà Nẵng"
    },
    reviews: []
  },
  {
    name: "Waterfront Danang Restaurant & Bar",
    slug: "waterfront-danang",
    description: "A long-standing favorite among expats, offering a diverse menu of international cuisine, a comprehensive bar, and scenic views of the Han River.",
    category: "Restaurant",
    neighborhood: "Hai Chau",
    rating: 4.4,
    reviewCount: 1500,
    isOpen: true,
    hasMemberDeal: true,
    dealHighlight: "Happy Hour prices on all drinks, all night long",
    isFavorite: false,
    isPremium: false,
    amenities: ["River View", "International Cuisine", "Full Bar", "Outdoor Seating"],
    location: {
      latitude: 16.0694,
      longitude: 108.2241,
      address: "150-152 Bạch Đằng, Hải Châu 1, Hải Châu, Đà Nẵng"
    },
    reviews: []
  },
  {
    name: "Cong Caphe - Bach Dang",
    slug: "cong-caphe-bach-dang",
    description: "A popular Vietnamese coffee chain with a unique, retro, military-chic decor. Famous for its signature coconut coffee and yogurt coffee drinks.",
    category: "Café",
    neighborhood: "Hai Chau",
    rating: 4.3,
    reviewCount: 2100,
    isOpen: true,
    hasMemberDeal: true,
    dealHighlight: "Free upgrade to large size on any coffee",
    isFavorite: false,
    isPremium: false,
    amenities: ["WiFi", "Air Conditioning", "Unique Decor", "River View"],
    location: {
      latitude: 16.0712,
      longitude: 108.2246,
      address: "98-96 Bạch Đằng, Hải Châu 1, Hải Châu, Đà Nẵng"
    },
    reviews: []
  },
  {
    name: "Limoncello Italian Restaurant",
    slug: "limoncello-italian-restaurant",
    description: "Authentic Italian dining with a cozy atmosphere. Serves a wide range of pastas, wood-fired pizzas, and classic Italian mains.",
    category: "Restaurant",
    neighborhood: "Hai Chau",
    rating: 4.6,
    reviewCount: 950,
    isOpen: true,
    hasMemberDeal: true,
    dealHighlight: "Free bruschetta appetizer with any main course order",
    isFavorite: false,
    isPremium: false,
    amenities: ["Authentic Italian", "Wood-fired Pizza", "Air Conditioning", "Wine List"],
    location: {
      latitude: 16.0754,
      longitude: 108.2238,
      address: "188 Trần Phú, Phước Ninh, Hải Châu, Đà Nẵng"
    },
    reviews: []
  },
  {
    name: "Sky36 Bar",
    slug: "sky36-bar",
    description: "The highest rooftop bar in Da Nang, offering breathtaking 360-degree views of the city, river, and ocean. A glamorous spot for cocktails, music, and watching the city lights.",
    category: "Restaurant",
    neighborhood: "Hai Chau",
    rating: 4.3,
    reviewCount: 2400,
    isOpen: true,
    hasMemberDeal: true,
    dealHighlight: "No cover charge for members (usually 200k VND)",
    isFavorite: false,
    isPremium: true,
    amenities: ["Rooftop Bar", "Panoramic Views", "Live DJ", "Luxury Cocktails"],
    location: {
      latitude: 16.0706,
      longitude: 108.2243,
      address: "36 Bạch Đằng, Thạch Thang, Hải Châu, Đà Nẵng (Novotel Rooftop)"
    },
    reviews: []
  },
  {
    name: "Han Market",
    slug: "han-market",
    description: "A bustling, traditional Vietnamese market in the heart of the city. A great place to shop for local snacks, souvenirs, clothing, and experience the vibrant local culture.",
    category: "Shopping",
    neighborhood: "Han Market",
    rating: 4.1,
    reviewCount: 11000,
    isOpen: true,
    hasMemberDeal: false,
    dealHighlight: null,
    isFavorite: false,
    isPremium: false,
    amenities: ["Local Market", "Souvenirs", "Street Food", "Cultural Experience"],
    location: {
      latitude: 16.0693,
      longitude: 108.2223,
      address: "119 Đ. Trần Phú, Hải Châu 1, Hải Châu, Đà Nẵng"
    },
    reviews: []
  },
  {
    name: "Family Indian Restaurant",
    slug: "family-indian-restaurant",
    description: "A highly-rated restaurant serving authentic North and South Indian cuisine. Known for its flavorful curries, tandoori dishes, and extensive vegetarian options.",
    category: "Restaurant",
    neighborhood: "An Thuong",
    rating: 4.7,
    reviewCount: 1900,
    isOpen: true,
    hasMemberDeal: true,
    dealHighlight: "15% off your entire bill",
    isFavorite: false,
    isPremium: false,
    amenities: ["Authentic Indian", "Vegetarian Options", "Air Conditioning", "Delivery Available"],
    location: {
      latitude: 16.0501,
      longitude: 108.2432,
      address: "231/14 Nguyễn Công Trứ, An Hải Bắc, Sơn Trà, Đà Nẵng"
    },
    reviews: []
  },
  {
    name: "Apocalypse Beach Club",
    slug: "apocalypse-beach-club",
    description: "A lively beach club located right on My Khe beach. Offers sunbeds, a swimming pool, a full bar, and a menu of food and snacks. Perfect for a day of sun and fun.",
    category: "Restaurant",
    neighborhood: "My Khe",
    rating: 4.2,
    reviewCount: 850,
    isOpen: true,
    hasMemberDeal: true,
    dealHighlight: "Free sunbed rental with any cocktail purchase",
    isFavorite: false,
    isPremium: false,
    amenities: ["Beachfront", "Swimming Pool", "Sunbeds", "Live Music", "Full Bar"],
    location: {
      latitude: 16.0441,
      longitude: 108.2491,
      address: "Võ Nguyên Giáp, Phước Mỹ, Sơn Trà, Đà Nẵng"
    },
    reviews: []
  },
  {
    name: "BreadnSalt Cafe",
    slug: "breadnsalt-cafe",
    description: "A charming cafe in the An Thuong area, popular for its delicious breakfast options, freshly baked bread, and great coffee. A favorite spot for expats.",
    category: "Café",
    neighborhood: "An Thuong",
    rating: 4.6,
    reviewCount: 330,
    isOpen: true,
    hasMemberDeal: true,
    dealHighlight: "Free regular coffee with any breakfast set",
    isFavorite: false,
    isPremium: false,
    amenities: ["WiFi", "Air Conditioning", "Breakfast Menu", "Fresh Baked Goods"],
    location: {
      latitude: 16.0525,
      longitude: 108.2445,
      address: "Đ. An Thượng 30, Bắc Mỹ Phú, Ngũ Hành Sơn, Đà Nẵng"
    },
    reviews: []
  },
  {
    name: "My Hanh Restaurant",
    slug: "my-hanh-restaurant",
    description: "A well-known seafood restaurant located along the beach road, offering fresh seafood chosen live from tanks and cooked to your preference in Vietnamese style.",
    category: "Restaurant",
    neighborhood: "Non Nuoc",
    rating: 4.0,
    reviewCount: 1100,
    isOpen: true,
    hasMemberDeal: true,
    dealHighlight: "10% off total bill (excluding crab & lobster)",
    isFavorite: false,
    isPremium: false,
    amenities: ["Fresh Seafood", "Ocean View", "Live Tanks", "Local Style"],
    location: {
      latitude: 16.0689,
      longitude: 108.2474,
      address: "Lô 18 Võ Nguyên Giáp, Phước Mỹ, Sơn Trà, Đà Nẵng"
    },
    reviews: []
  },
  {
    name: "On The Radio Bar",
    slug: "on-the-radio-bar",
    description: "A bustling and popular live music bar in the city center, featuring local bands playing rock and pop hits every night. A great place for a lively night out.",
    category: "Restaurant",
    neighborhood: "Hai Chau",
    rating: 4.2,
    reviewCount: 900,
    isOpen: true,
    hasMemberDeal: true,
    dealHighlight: "First Tiger beer is on the house",
    isFavorite: false,
    isPremium: false,
    amenities: ["Live Music", "Full Bar", "Lively Atmosphere"],
    location: {
      latitude: 16.0673,
      longitude: 108.2215,
      address: "35 Thái Phiên, Phước Ninh, Hải Châu, Đà Nẵng"
    },
    reviews: []
  },
  {
    name: "Roots Plant-based Cafe",
    slug: "roots-plant-based-cafe",
    description: "A vibrant and healthy cafe focusing on delicious plant-based and vegan food, including smoothie bowls, salads, burgers, and fresh juices.",
    category: "Restaurant",
    neighborhood: "An Thuong",
    rating: 4.8,
    reviewCount: 550,
    isOpen: true,
    hasMemberDeal: true,
    dealHighlight: "15% off all smoothie bowls",
    isFavorite: false,
    isPremium: false,
    amenities: ["Vegan", "Vegetarian", "Healthy Food", "WiFi", "Air Conditioning"],
    location: {
      latitude: 16.0545,
      longitude: 108.2458,
      address: "An Thượng 30, Bắc Mỹ Phú, Ngũ Hành Sơn, Đà Nẵng"
    },
    reviews: []
  },
  {
    name: "DNC - Da Nang Coworking Space",
    slug: "dnc-da-nang-coworking-space",
    description: "A professional coworking space supported by the city, aimed at fostering the local startup ecosystem. Offers hot desks, meeting rooms, and regular networking events.",
    category: "Co-working",
    neighborhood: "Hai Chau",
    rating: 4.6,
    reviewCount: 80,
    isOpen: true,
    hasMemberDeal: true,
    dealHighlight: "20% off a weekly pass",
    isFavorite: false,
    isPremium: false,
    amenities: ["High-Speed WiFi", "Air Conditioning", "Networking Events", "Quiet Zone"],
    location: {
      latitude: 16.0718,
      longitude: 108.2201,
      address: "31 Trần Phú, Hải Châu 1, Hải Châu, Đà Nẵng"
    },
    reviews: []
  },
  {
    name: "Yaly Couture",
    slug: "yaly-couture",
    description: "While famous in Hoi An, Yaly also has a presence in Da Nang, offering high-quality custom tailoring for suits, dresses, and other apparel with a wide fabric selection.",
    category: "Shopping",
    neighborhood: "Hai Chau",
    rating: 4.5,
    reviewCount: 450,
    isOpen: true,
    hasMemberDeal: true,
    dealHighlight: "Free custom tie with any suit purchase",
    isFavorite: false,
    isPremium: true,
    amenities: ["Custom Tailoring", "High-Quality Fabrics", "Professional Service"],
    location: {
      latitude: 16.0709,
      longitude: 108.2230,
      address: "41A-43-45 Nguyễn Thái Học, Hải Châu 1, Hải Châu, Đà Nẵng"
    },
    reviews: []
  },
  {
    name: "Esco Beach Bar Lounge & Restaurant",
    slug: "esco-beach-bar-lounge",
    description: "A stylish and relaxed beachside venue with a varied menu of Asian and Western dishes, creative cocktails, and comfortable seating right on the sand.",
    category: "Restaurant",
    neighborhood: "My Khe",
    rating: 4.5,
    reviewCount: 680,
    isOpen: true,
    hasMemberDeal: true,
    dealHighlight: "Buy one get one free on all classic cocktails",
    isFavorite: false,
    isPremium: false,
    amenities: ["Beachfront", "Outdoor Seating", "Full Bar", "International Cuisine"],
    location: {
      latitude: 16.0401,
      longitude: 108.2510,
      address: "Lô 12 Võ Nguyên Giáp, Phước Mỹ, Sơn Trà, Đà Nẵng"
    },
    reviews: []
  },
  {
    name: "Wonderlust Bakery & Cafe",
    slug: "wonderlust-bakery-cafe",
    description: "A cozy bakery and cafe that is a haven for lovers of cake, pastry, and all things sweet. Also serves a good brunch and specialty teas.",
    category: "Bakery",
    neighborhood: "An Thuong",
    rating: 4.7,
    reviewCount: 210,
    isOpen: true,
    hasMemberDeal: true,
    dealHighlight: "10% off any whole cake purchase",
    isFavorite: false,
    isPremium: false,
    amenities: ["Cakes & Pastries", "WiFi", "Air Conditioning", "Brunch Menu"],
    location: {
      latitude: 16.0558,
      longitude: 108.2439,
      address: "96 Trần Bạch Đằng, Bắc Mỹ Phú, Ngũ Hành Sơn, Đà Nẵng"
    },
    reviews: []
  },
  {
    name: "Queen Spa",
    slug: "queen-spa",
    description: "A well-regarded spa known for its clean facilities, professional staff, and reasonable prices. Offers a variety of massages, facials, and body treatments.",
    category: "Wellness",
    neighborhood: "Hai Chau",
    rating: 4.8,
    reviewCount: 1100,
    isOpen: true,
    hasMemberDeal: true,
    dealHighlight: "30% off any Body Scrub treatment",
    isFavorite: false,
    isPremium: false,
    amenities: ["Massage", "Facials", "Body Treatments", "Professional Staff", "Air Conditioning"],
    location: {
      latitude: 16.0622,
      longitude: 108.2238,
      address: "144 Phạm Cự Lượng, An Hải Đông, Sơn Trà, Đà Nẵng"
    },
    reviews: []
  },
  {
    name: "The Dirty Fingers",
    slug: "the-dirty-fingers",
    description: "A Texas-style BBQ and smokehouse restaurant in the heart of the An Thuong area. Famous for its ribs, brisket, and laid-back, friendly vibe.",
    category: "Restaurant",
    neighborhood: "An Thuong",
    rating: 4.7,
    reviewCount: 490,
    isOpen: true,
    hasMemberDeal: true,
    dealHighlight: "Free side of coleslaw and fries with any main platter",
    isFavorite: false,
    isPremium: false,
    amenities: ["BBQ", "Outdoor Seating", "Casual Dining", "Craft Beer"],
    location: {
      latitude: 16.0528,
      longitude: 108.2452,
      address: "49 An Thượng 3, Bắc Mỹ Phú, Ngũ Hành Sơn, Đà Nẵng"
    },
    reviews: []
  },
  {
    name: "MMA Danang",
    slug: "mma-danang",
    description: "A premier training center for Mixed Martial Arts, offering classes in BJJ, Muay Thai, Boxing, and MMA for all skill levels, from beginners to professionals.",
    category: "Wellness",
    neighborhood: "Non Nuoc",
    rating: 4.9,
    reviewCount: 95,
    isOpen: true,
    hasMemberDeal: true,
    dealHighlight: "First trial class is completely free",
    isFavorite: false,
    isPremium: false,
    amenities: ["MMA", "BJJ", "Muay Thai", "Professional Coaches", "Full-size Ring"],
    location: {
      latitude: 16.0645,
      longitude: 108.2365,
      address: "33 An Cư 4, Mân Thái, Sơn Trà, Đà Nẵng"
    },
    reviews: []
  },
  {
    name: "OQ Bar",
    slug: "oq-bar",
    description: "A lively, loud, and popular late-night club on the Bach Dang riverfront. Known for its energetic music, crowded dance floor, and being a staple of Da Nang nightlife.",
    category: "Restaurant",
    neighborhood: "Hai Chau",
    rating: 4.0,
    reviewCount: 780,
    isOpen: true,
    hasMemberDeal: true,
    dealHighlight: "Buy one get one free on all shisha",
    isFavorite: false,
    isPremium: false,
    amenities: ["Nightclub", "Live DJ", "Dance Floor", "Late Night"],
    location: {
      latitude: 16.0710,
      longitude: 108.2245,
      address: "18 Bạch Đằng, Hải Châu 1, Hải Châu, Đà Nẵng"
    },
    reviews: []
  },
  {
    name: "Burger Bros",
    slug: "burger-bros",
    description: "A go-to spot for delicious, high-quality burgers in Da Nang. Offers a simple menu of classic and creative burgers, great fries, and a casual atmosphere.",
    category: "Restaurant",
    neighborhood: "An Thuong",
    rating: 4.5,
    reviewCount: 1300,
    isOpen: true,
    hasMemberDeal: true,
    dealHighlight: "Upsize your combo for free (fries & drink)",
    isFavorite: false,
    isPremium: false,
    amenities: ["Gourmet Burgers", "Casual Dining", "Delivery Available"],
    location: {
      latitude: 16.0567,
      longitude: 108.2435,
      address: "30 An Thượng 4, Bắc Mỹ Phú, Ngũ Hành Sơn, Đà Nẵng"
    },
    reviews: []
  }
];

module.exports = businesses;
