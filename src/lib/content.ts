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
  slug: string; // URL segment for /product/[slug]
  name: string;
  category: string;
  price: number;
  mood: string; // references Mood.id
  badge?: string;
  swatch: [string, string]; // placeholder gradient
  description: string; // editorial detail-page copy
  details: string[]; // fabric / fit / care bullets
  sizes: string[];
};

// Every drop piece carries the same size run unless noted.
const STANDARD_SIZES = ["XS", "S", "M", "L", "XL"];

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
    slug: "ruched-ivory-slip-dress",
    name: "Ruched Ivory Slip Dress",
    category: "Dresses",
    price: 124,
    mood: "soft",
    badge: "Almost gone",
    swatch: ["#efe6d6", "#cdbda1"],
    description:
      "The piece that does the work for you. A bias-cut slip in heavyweight matte satin, gathered at the side so it skims instead of clings. Dress it down with a knit thrown over, or let it stand alone after dark.",
    details: [
      "Bias-cut heavyweight satin, fully lined",
      "Side ruching for an adjustable drape",
      "Midi length · hits below the knee",
      "Dry clean only",
    ],
    sizes: STANDARD_SIZES,
  },
  {
    id: "p2",
    slug: "pinstripe-wide-leg-trouser",
    name: "Pinstripe Wide-Leg Trouser",
    category: "Bottoms",
    price: 112,
    mood: "sharp",
    badge: "Drop 01",
    swatch: ["#2c2a28", "#56514a"],
    description:
      "Tailoring with the volume turned up. A high, clean waist falls into a generous wide leg, pressed to a sharp crease. The chalk pinstripe keeps it editorial without trying too hard.",
    details: [
      "Wool-blend suiting with a soft hand",
      "High rise · wide leg · pressed crease",
      "Hook-and-bar closure, hidden zip",
      "Machine wash cold, hang to dry",
    ],
    sizes: STANDARD_SIZES,
  },
  {
    id: "p3",
    slug: "cloud-knit-set",
    name: "Cloud Knit Set",
    category: "Knitwear",
    price: 98,
    mood: "soft",
    swatch: ["#e3c9b5", "#c1a085"],
    description:
      "A matching knit top and pull-on short in a yarn so soft it reads as comfort. Wear them together for the off-duty set, or split them across the rest of the drop.",
    details: [
      "Brushed cotton-modal blend",
      "Relaxed top · pull-on knit short",
      "Sold as a two-piece set",
      "Machine wash cold, lay flat to dry",
    ],
    sizes: STANDARD_SIZES,
  },
  {
    id: "p4",
    slug: "statement-blazer",
    name: "The Statement Blazer",
    category: "Outerwear",
    price: 168,
    mood: "sharp",
    swatch: ["#3a3631", "#6b655c"],
    description:
      "One blazer, the whole wardrobe behind it. Structured shoulders, a single sharp button, and a length that works over the slip or the knit set alike. The piece you reach for when it has to count.",
    details: [
      "Structured shoulder, single-button front",
      "Fully lined with an interior pocket",
      "Longline cut · hits mid-thigh",
      "Dry clean only",
    ],
    sizes: STANDARD_SIZES,
  },
  {
    id: "p5",
    slug: "second-skin-turtleneck",
    name: "Second-Skin Turtleneck",
    category: "Tops",
    price: 64,
    mood: "sharp",
    swatch: ["#2c2a28", "#4d4842"],
    description:
      "The quiet anchor of every look. A fine, second-skin rib that layers under tailoring without bulk and stands alone with the wide-leg trouser. The kind of basic you end up rationing across the week.",
    details: [
      "Fine modal-stretch rib",
      "Slim fit · long sleeve · funnel neck",
      "Designed to layer flat",
      "Machine wash cold, hang to dry",
    ],
    sizes: STANDARD_SIZES,
  },
  {
    id: "p6",
    slug: "off-duty-trench",
    name: "Off-Duty Trench",
    category: "Outerwear",
    price: 196,
    mood: "soft",
    badge: "New",
    swatch: ["#d8c6ad", "#a98f6f"],
    description:
      "The trench, softened. A relaxed shoulder and an unlined, fluid body that moves with you instead of standing to attention. Belt it for shape or let it fall open over the slip dress.",
    details: [
      "Water-resistant cotton blend, unlined",
      "Relaxed shoulder · self-tie belt",
      "Storm flap and welt pockets",
      "Machine wash cold, hang to dry",
    ],
    sizes: STANDARD_SIZES,
  },
];

// Helpers for the catalog and product detail routes.
export const productHref = (p: Pick<Product, "slug">) => `/product/${p.slug}`;
export const getProduct = (slug: string) =>
  PRODUCTS.find((p) => p.slug === slug);

export const LOOKBOOK: { id: string; caption: string; tall?: boolean }[] = [
  { id: "l1", caption: "01 — Morning, unbothered", tall: true },
  { id: "l2", caption: "02 — The 6pm pivot" },
  { id: "l3", caption: "03 — Weekend, off the clock" },
  { id: "l4", caption: "04 — After hours", tall: true },
];

// Hash links are prefixed with "/" so they resolve from any route, not just
// the homepage.
export const NAV = [
  { label: "Shop", href: "/shop" },
  { label: "This Drop", href: "/#drop" },
  { label: "Shuffle", href: "/#shuffle" },
  { label: "Lookbook", href: "/#journal" },
  { label: "About", href: "/#about" },
];

export const formatPrice = (cents: number) => `$${cents}`;
