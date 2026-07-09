import { faHeart, faCheckCircle, faStar, faUsers, faAward, faCalendarCheck, faGem, faGlassCheers, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

// Data used for UI placeholders and static sections
export const homeFeatures = [
  { icon: faHeart, title: "Curated Vendors", desc: "Hand-picked professionals to ensure your day is perfect and stress-free." },
  { icon: faCheckCircle, title: "Verified Reviews", desc: "Genuine feedback from real couples to guide your booking decisions." },
  { icon: faStar, title: "Expert Support", desc: "Dedicated team of wedding experts available to help you at every step." }
];

export const eventTypes = [
  {
    category: "Ceremony",
    icon: faGem,
    events: [
      { name: "Wedding Ceremony", desc: "The main event where vows are exchanged.", img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=500&q=80" },
      { name: "Engagement", desc: "Celebrate the beginning of your journey together.", img: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=500&q=80" },
      { name: "Reception", desc: "A grand party following the ceremony.", img: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=500&q=80" },
    ]
  },
  {
    category: "Parties",
    icon: faGlassCheers,
    events: [
      { name: "Bachelor Party", desc: "A fun night for the groom and his friends.", img: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=500&q=80" },
      { name: "Bachelorette Party", desc: "Celebrate the bride's last days as a single woman.", img: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=500&q=80" },
      { name: "Pre-Wedding Party", desc: "Gatherings to build excitement before the big day.", img: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=500&q=80" },
    ]
  },
  {
    category: "Special Moments",
    icon: faCalendarAlt,
    events: [
      { name: "Anniversary", desc: "Celebrate years of love and togetherness.", img: "https://images.unsplash.com/photo-1522673607200-1648832cee98?w=500&q=80" },
      { name: "Renewal Vows", desc: "Reaffirm your commitment to each other.", img: "https://images.unsplash.com/photo-1519741497674-611481863552?w=500&q=80" },
      { name: "Surprise Events", desc: "Memorable surprise proposals and parties.", img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=80" },
    ]
  }
];

export const galleryImages = [
  { id: 1, title: "Wedding Ceremony", url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=500&q=60" },
  { id: 2, title: "Reception Decor", url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=500&q=60" },
  { id: 3, title: "Bridal Portrait", url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=500&q=60" },
  { id: 4, title: "Wedding Ring", url: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=500&q=60" },
  { id: 5, title: "Floral Arrangement", url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=500&q=60" },
  { id: 6, title: "Wedding Cake", url: "https://images.unsplash.com/photo-1522673607200-1648832cee98?auto=format&fit=crop&w=500&q=60" },
  { id: 7, title: "Outdoor Venue", url: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=500&q=60" },
  { id: 8, title: "Night Party", url: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=500&q=60" },
];

export const aboutStats = [
  { icon: faUsers, count: "5000+", label: "Happy Couples" },
  { icon: faHeart, count: "1200+", label: "Weddings Planned" },
  { icon: faAward, count: "15+", label: "Award Wins" },
  { icon: faCalendarCheck, count: "10+", label: "Years Experience" },
];
