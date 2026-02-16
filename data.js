/**
 * LG Rent-Up™ Official Product Database
 * Ensure all IDs are lowercase and unique.
 */

const products = [
  {
    id: "oled-77-b5",
    model: "OLED77B5PSA",
    name: "LG OLED evo AI B5 77\"",
    category: "TV",
    subPrice: 560,
    outrightPrice: 15999,
    duration: 5,
    isNew: true,
    features: [
        "α8 AI Processor 4K", 
        "Self-lit OLED Pixels", 
        "Dolby Vision & Atmos", 
        "480Hz Refresh Rate"
    ],
    img: "https://www.lg.com/content/dam/channel/wcms/my/images/tvs/oled77b5psa/gallery/medium01.jpg"
  },
  {
    id: "instaview-601",
    model: "GC-X24FFC7R",
    name: "InstaView™ Door-in-Door",
    category: "Kitchen",
    subPrice: 290,
    outrightPrice: 9499,
    duration: 5,
    isNew: true,
    features: [
        "601L Large Capacity", 
        "UVNano Water Dispenser", 
        "Linear Cooling™", 
        "Craft Ice Maker"
    ],
    img: "https://www.lg.com/content/dam/channel/wcms/my/images/refrigerators/gc-x24ffc7r/gallery/medium01.jpg"
  },
  {
    id: "neochef-42",
    model: "MJ3965BGP",
    name: "NeoChef™ Microwave",
    category: "Kitchen",
    subPrice: 80,
    outrightPrice: 2499,
    duration: 3,
    isNew: false,
    features: [
        "Smart Inverter Technology", 
        "Healthy Fry & Roast", 
        "EasyClean™ Interior", 
        "42L Capacity"
    ],
    img: "https://www.lg.com/content/dam/channel/wcms/my/images/cooking-appliances/mj3965bgp/gallery/medium01.jpg"
  },
  {
    id: "puri-care-360",
    model: "AS10GDPB0",
    name: "PuriCare™ 360° Air Purifier",
    category: "Air Solution",
    subPrice: 110,
    outrightPrice: 4500,
    duration: 5,
    isNew: true,
    features: [
        "360° Purification", 
        "Clean Booster", 
        "Multi-Filtration System", 
        "PM 1.0 Sensor"
    ],
    img: "https://www.lg.com/content/dam/channel/wcms/my/images/air-purifiers/as10gdpb0/gallery/medium01.jpg"
  }
];

// Global Contact Configuration
const CONTACT_WA = "60142626792";
