// Central content layer for the Shuffle Mode redesign.
// Mock data stands in for a future CMS / commerce backend.

export type Mood = {
  id: string;
  label: string;
  line: string; // editorial one-liner shown when this mood is active
  palette: [string, string]; // gradient stops for the look card
};

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  mood: string; // references Mood.id
  badge?: string;
  swatch: [string, string]; // placeholder gradient
};

// Aligned to the live store: Shopify currently runs "Drop 01" with 19 pieces.
export const DROP = {
  number: 1,
  title: "Drop 01",
  // Next Sunday relative to build; the countdown recalculates on the client too.
  releasesAt: "2026-06-07T17:00:00Z",
  totalPieces: 19,
  piecesLeft: 7,
};

export const MOODS: Mood[] = [
  {
    id: "bold",
    label: "Bold",
    line: "Walk in like you own the room — because today, you do.",
    palette: ["#c2502e", "#7a2618"],
  },
  {
    id: "soft",
    label: "Soft",
    line: "Unhurried, unbothered, undeniably put-together.",
    palette: ["#e3c9b5", "#b98c6d"],
  },
  {
    id: "sharp",
    label: "Sharp",
    line: "Clean lines, clear head. Nothing left to prove.",
    palette: ["#2c2a28", "#55504a"],
  },
  {
    id: "free",
    label: "Free",
    line: "Loose, light, and going wherever the day takes you.",
    palette: ["#9aa67f", "#5f6b48"],
  },
];

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Ruched Ivory Slip Dress",
    category: "Dresses",
    price: 124,
    mood: "soft",
    badge: "Almost gone",
    swatch: ["#efe6d6", "#cdbda1"],
  },
  {
    id: "p2",
    name: "Pinstripe Wide-Leg Trouser",
    category: "Bottoms",
    price: 112,
    mood: "sharp",
    badge: "Drop 01",
    swatch: ["#2c2a28", "#56514a"],
  },
  {
    id: "p3",
    name: "Cloud Knit Set",
    category: "Knitwear",
    price: 98,
    mood: "soft",
    swatch: ["#e3c9b5", "#c1a085"],
  },
  {
    id: "p4",
    name: "The Statement Blazer",
    category: "Outerwear",
    price: 168,
    mood: "sharp",
    swatch: ["#3a3631", "#6b655c"],
  },
  {
    id: "p5",
    name: "Second-Skin Turtleneck",
    category: "Tops",
    price: 64,
    mood: "sharp",
    swatch: ["#2c2a28", "#4d4842"],
  },
  {
    id: "p6",
    name: "Off-Duty Trench",
    category: "Outerwear",
    price: 196,
    mood: "soft",
    badge: "New",
    swatch: ["#d8c6ad", "#a98f6f"],
  },
];

export const LOOKBOOK: { id: string; caption: string; tall?: boolean }[] = [
  { id: "l1", caption: "01 — Morning, unbothered", tall: true },
  { id: "l2", caption: "02 — The 6pm pivot" },
  { id: "l3", caption: "03 — Weekend, off the clock" },
  { id: "l4", caption: "04 — After hours", tall: true },
];

export const NAV = [
  { label: "Shop", href: "#shop" },
  { label: "This Drop", href: "#drop" },
  { label: "Shuffle", href: "#shuffle" },
  { label: "Journal", href: "#journal" },
  { label: "About", href: "#about" },
];

export const formatPrice = (cents: number) => `$${cents}`;
