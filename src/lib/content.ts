// Central content layer for the Shuffle Mode redesign.
// Mock data stands in for a future CMS / commerce backend.

export type Mood = {
  id: string;
  label: string;
  line: string; // editorial one-liner shown when this mood is active
  palette: [string, string]; // gradient stops for the look card
};

export type ProductImage = { url: string; alt: string };

export type Product = {
  id: string;
  slug: string; // URL segment for /product/[slug] (Shopify handle)
  name: string;
  category: string;
  price: number;
  currencyCode?: string; // e.g. "USD" — defaults to USD for mock data
  mood: string; // references Mood.id
  badge?: string;
  swatch: [string, string]; // placeholder gradient (fallback when no image)
  image?: ProductImage; // real product photo (Shopify), optional
  images?: ProductImage[]; // gallery
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

export type JournalPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO date
  readMinutes: number;
  tag: string;
  palette: [string, string]; // cover gradient
  body: string[]; // paragraphs
};

export const JOURNAL: JournalPost[] = [
  {
    slug: "dress-for-the-mood",
    title: "Dress for the mood, not the occasion",
    excerpt:
      "The closet question was never \"where am I going?\" It was always \"who am I today?\" Here's how we build around the answer.",
    date: "2026-05-24",
    readMinutes: 4,
    tag: "Philosophy",
    palette: ["#c2502e", "#7a2618"],
    body: [
      "Most wardrobes are organized around events — the work thing, the dinner thing, the wedding two states over. It's a tidy system that quietly assumes you know who you'll be by the time you get dressed. You usually don't.",
      "We build the other way around. A drop is a small set of pieces designed to answer a feeling: bold on the days you want to take up room, soft on the ones you don't, sharp when the calendar is unforgiving. The occasion can sort itself out.",
      "It sounds like a small reframe. In practice it changes everything about what you buy. You stop collecting outfits for hypothetical futures and start collecting pieces that meet you where you already are.",
      "That's the whole brief behind Shuffle Mode: fewer pieces, chosen for mood, that shuffle into each other so the getting-dressed part takes thirty seconds and still feels like a decision you made.",
    ],
  },
  {
    slug: "the-case-against-restocks",
    title: "The case against restocks",
    excerpt:
      "Why \"when it's gone, it's gone\" isn't a marketing line — it's the only way we know how to make clothes we'd actually wear.",
    date: "2026-05-17",
    readMinutes: 3,
    tag: "How we make",
    palette: ["#9aa67f", "#5f6b48"],
    body: [
      "Restocking is the default in fashion, and it quietly bends every decision toward the safe and the forgettable. If a piece has to sell forever, it has to offend no one — which is another way of saying it has to mean nothing.",
      "We design in small weekly drops and we don't bring pieces back. That constraint is the point. It lets us take the cut a little further, use the better fabric, and commit to a color that won't read the same in six months.",
      "It also keeps the closet honest. A drop is a moment, not a catalog. If something speaks to you on Sunday, that's the window — and we'd rather you own three pieces you reach for than thirty you maintain.",
    ],
  },
  {
    slug: "five-ways-one-slip",
    title: "Five ways, one slip dress",
    excerpt:
      "The Ruched Ivory Slip is the most flexible thing in Drop 01. Here's how to shuffle it from morning coffee to after hours.",
    date: "2026-05-10",
    readMinutes: 5,
    tag: "Styling",
    palette: ["#e3c9b5", "#b98c6d"],
    body: [
      "A good slip dress is less a dress than a foundation. On its own it's an evening, but layered down it carries the whole week — which is exactly why it anchors this drop.",
      "Morning: throw the Cloud Knit over the top, push the sleeves up, and let the hem do the talking. Midday: the Statement Blazer, sharp shoes, and suddenly it's a meeting. Evening: nothing, and a good earring.",
      "The trick with a single hero piece is to change the volume around it, not the piece itself. A heavier knit reads cozy; a structured shoulder reads deliberate; bare reads done. Same dress, three different days.",
      "Weekend: the Off-Duty Trench open over the top, sneakers, no plan. After hours: belt the trench, lose the layers underneath, and let the satin catch the light. Five looks, one piece, zero deliberation.",
    ],
  },
];

// Helpers for the journal routes.
export const journalHref = (p: Pick<JournalPost, "slug">) =>
  `/journal/${p.slug}`;
export const getPost = (slug: string) =>
  JOURNAL.find((p) => p.slug === slug);

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

// Hash links are prefixed with "/" so they resolve from any route, not just
// the homepage.
export const NAV = [
  { label: "Shop", href: "/shop" },
  { label: "This Drop", href: "/#drop" },
  { label: "Shuffle", href: "/#shuffle" },
  { label: "Journal", href: "/journal" },
  { label: "About", href: "/#about" },
];

export const formatPrice = (amount: number, currencyCode = "USD") =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
    // Whole-dollar prices render without trailing ".00"; anything with cents
    // keeps two decimals.
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(amount);
