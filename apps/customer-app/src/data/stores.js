export const STORES_DATA = [
    // --- FOOD (10 Stores) ---
    ...Array.from({ length: 10 }).map((_, i) => ({
        id: i + 1,
        name: i === 0 ? "Aasaan Gourmet Burgers" : `Food Delight ${i + 1}`,
        category: "Food",
        rating: (4.5 + Math.random() * 0.5).toFixed(1),
        time: `${15 + i * 5}m`,
        img: `https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=${i}`,
        tags: "Burgers • Fast Food • Desi",
        menu: [
            { id: `f1-${i}`, name: "Special Zinger", price: 450, img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200" },
            { id: `f2-${i}`, name: "Cheese Fries", price: 250, img: "https://images.unsplash.com/photo-1585109649139-366815a0d713?w=200" }
        ]
    })),

    // --- MART (10 Stores) ---
    ...Array.from({ length: 10 }).map((_, i) => ({
        id: i + 11,
        name: i === 0 ? "Aasaan Mart - HQ" : `City Mart ${i + 1}`,
        category: "Mart",
        rating: (4.0 + Math.random() * 1).toFixed(1),
        time: "20m",
        img: `https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=${i}`,
        tags: "Groceries • Essentials",
        menu: [
            { id: `m1-${i}`, name: "Milk 1L", price: 280, img: "https://images.unsplash.com/photo-1563636619-e9107da4a7af?w=200" },
            { id: `m2-${i}`, name: "Fresh Bread", price: 120, img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200" }
        ]
    })),

    // --- HEALTH (10 Stores) ---
    ...Array.from({ length: 10 }).map((_, i) => ({
        id: i + 21,
        name: `Life Care Pharmacy ${i + 1}`,
        category: "Health",
        rating: "4.9",
        time: "15m",
        img: `https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?w=400&q=${i}`,
        tags: "Medicines • Wellness",
        menu: [
            { id: `h1-${i}`, name: "Panadol CF", price: 350, img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200" },
            { id: `h2-${i}`, name: "Face Mask Pack", price: 150, img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=200" }
        ]
    })),

    // --- PARCEL (10 Stores) ---
    ...Array.from({ length: 10 }).map((_, i) => ({
        id: i + 31,
        name: `Aasaan Express ${i + 1}`,
        category: "Parcel",
        rating: "5.0",
        time: "Instant",
        img: `https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&q=${i}`,
        tags: "Courier • Pick & Drop",
        menu: [
            { id: `p1-${i}`, name: "City Delivery", price: 200, img: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=200" },
            { id: `p2-${i}`, name: "Heavy Package", price: 500, img: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=200" }
        ]
    }))
];