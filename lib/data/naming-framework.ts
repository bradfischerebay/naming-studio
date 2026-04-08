/**
 * Naming Strategy Framework
 * Pure data — no imports from lib/
 */

export interface StrategySubtype {
  key: string;
  label: string;
  description: string;
  examples: string[];
}

export interface StrategyBucket {
  key: string;
  label: string;
  description: string;
  subtypes: StrategySubtype[];
}

export const STRATEGY_BUCKETS: StrategyBucket[] = [
  {
    key: "descriptors",
    label: "Descriptors",
    description: "Focus on names that describe the product's key attributes, functionalities, and unique selling points. This is the 'Safe/Functional' bucket.",
    subtypes: [
      {
        key: "functionality",
        label: "Functionality-Based",
        description: "Highlight what the product does or how it helps the user.",
        examples: ["SmartTrack", "FlexPay", "SecureLine"],
      },
      {
        key: "feature",
        label: "Feature-Based",
        description: "Emphasize specific aspects of the product, such as speed, accessibility, or simplicity.",
        examples: ["QuickSync", "OneLedger", "PayEase"],
      },
      {
        key: "identity",
        label: "Identity-Based",
        description: "Use terms that reinforce the product's role or position within the market or for the user.",
        examples: ["BuyerPro", "TradeVault", "PartnerFlow"],
      },
    ],
  },
  {
    key: "metaphors",
    label: "Metaphors & Analogies",
    description: "Draw inspiration from symbolic or visual imagery that aligns with the product's purpose. This is the 'Evocative/Creative' bucket.",
    subtypes: [
      {
        key: "nature",
        label: "Nature Metaphors",
        description: "Use natural elements to convey strength, reliability, or growth.",
        examples: ["OakPay", "Streamline", "Horizon"],
      },
      {
        key: "journey",
        label: "Journey Metaphors",
        description: "Reflect movement, progress, or transformation.",
        examples: ["BridgePay", "Pathway", "Ascend"],
      },
      {
        key: "tool",
        label: "Tool Metaphors",
        description: "Frame the product as an essential tool or resource.",
        examples: ["Compass", "AnchorPay", "Vault"],
      },
      {
        key: "abstract",
        label: "Abstract Concepts",
        description: "Evoke broader ideas or values such as trust, efficiency, or innovation.",
        examples: ["Catalyst", "Beacon", "Momentum"],
      },
    ],
  },
  {
    key: "benefits",
    label: "Customer Benefits",
    description: "Highlight the value or outcomes the product delivers to customers, rather than the mechanism itself.",
    subtypes: [
      {
        key: "time",
        label: "Time-Saving Benefits",
        description: "Emphasize efficiency or the reduction of hassle.",
        examples: ["TimeVault", "EffortlessPay", "QuickCash"],
      },
      {
        key: "financial",
        label: "Financial Benefits",
        description: "Focus on cost savings, growth potential, or rewards.",
        examples: ["ProfitEdge", "ValuePay", "CashFlowPro"],
      },
      {
        key: "reliability",
        label: "Reliability & Security Benefits",
        description: "Showcase trustworthiness, consistency, or safety.",
        examples: ["ShieldPay", "TrustLine", "SecureVault"],
      },
      {
        key: "empowerment",
        label: "Empowerment Benefits",
        description: "Reflect the control and confidence users gain.",
        examples: ["EmpowerPay", "InControl", "BuyerBoost"],
      },
    ],
  },
  {
    key: "emotional",
    label: "Emotional & Aspirational Themes",
    description: "Create a name that connects with users' feelings and aspirations.",
    subtypes: [
      {
        key: "success",
        label: "Success and Growth",
        description: "Highlight ambition, potential, and accomplishment.",
        examples: ["Elevate", "AscendPay", "Pinnacle"],
      },
      {
        key: "community",
        label: "Community and Collaboration",
        description: "Focus on connection, partnerships, or shared goals.",
        examples: ["TeamPay", "UnityWallet", "CircleCash"],
      },
      {
        key: "freedom",
        label: "Freedom and Simplicity",
        description: "Suggest ease of use, liberation from stress, or seamless experiences.",
        examples: ["FlowPay", "Simplify", "HassleFree"],
      },
      {
        key: "innovation",
        label: "Innovation and Modernity",
        description: "Emphasize cutting-edge features or forward-thinking qualities.",
        examples: ["NextWave", "FuturePay", "Innovate"],
      },
    ],
  },
  {
    key: "market",
    label: "Market Position & Differentiation",
    description: "Use names that set the product apart in a competitive landscape.",
    subtypes: [
      {
        key: "premium",
        label: "Premium Positioning",
        description: "Suggest exclusivity or high value.",
        examples: ["PrimeVault", "Prestige"],
      },
      {
        key: "universal",
        label: "Universal Appeal",
        description: "Use broad, relatable terms to resonate across diverse customer segments.",
        examples: ["EveryPay", "GlobalLine", "UniversalWallet"],
      },
      {
        key: "niche",
        label: "Niche or Industry-Specific",
        description: "Incorporate terminology specific to the target market or use case.",
        examples: ["BizLedger", "TradeFlex", "CommerceLink"],
      },
    ],
  },
];

export const NAMING_PROTOCOLS = `
HARD GUARDRAILS (these override all creative suggestions):
- Do NOT use "Elite", "Pro", "Premium" as standalone suffixes
- Avoid names that are too generic or merely descriptive (e.g., "eBay Payments")
- Avoid names that conflict with existing eBay products in the portfolio
- Avoid names that are trademarked by major competitors
- Names must be cross-culturally neutral unless brief specifies specific markets only
- Names must support the product's standalone identity (not embed it within a parent brand)
- Favor shorter names (1-2 words) over longer compound names
- Avoid acronyms unless they are genuinely memorable
`;

export interface MarketCompetitors {
  [category: string]: string[];
}

export interface CompetitorBenchmarks {
  US: MarketCompetitors;
  UK: MarketCompetitors;
  DE: MarketCompetitors;
}

export const COMPETITOR_BENCHMARKS: CompetitorBenchmarks = {
  US: {
    "Watches": ["Crown & Caliber", "Chrono24", "The RealReal", "WatchBox", "Watches of Switzerland", "Watchfinder & Co."],
    "Sneakers": ["Flight Club", "GOAT", "Stadium Goods", "StockX"],
    "Handbags": ["Poshmark", "Rebag", "StockX", "The RealReal", "Tradesy", "Vestiaire Collective"],
    "Jewelry": ["1stdibs", "Etsy", "Farfetch", "The RealReal", "Tradesy", "TrueFacet"],
    "Pre-Loved Fashion": ["Depop", "Facebook Marketplace", "Mercari", "Poshmark", "The RealReal", "ThredUP", "Tradesy", "Vestiaire Collective"],
    "Home Décor": ["Amazon", "Bed Bath & Beyond", "Etsy", "IKEA", "Macy's", "Pier 1 Imports", "Target", "Walmart", "Wayfair", "Williams Sonoma", "World Market"],
    "Home Improvement": ["Ace Hardware", "Amazon", "Grainger", "Home Depot", "houzz", "Lowe's", "Target", "Walmart"],
    "Furniture": ["Amazon", "Ashley Furniture", "Beckett", "Burrow", "Crate & Barrel", "Etsy", "houzz", "IKEA", "Lowe's", "Overstock", "Pottery Barn", "Restoration Hardware", "Walmart", "Wayfair", "West Elm", "World Market"],
    "Sports Cards": ["Amazon", "COMC", "Dave & Adams", "Heritage Auctions", "Goldin Auction", "Starstock", "StockX", "Whatnot"],
    "Collectible Card Games": ["Amazon", "Heritage Auctions", "StockX", "TCGplayer", "Whatnot"],
    "Vehicle Parts and Accessories": ["Amazon", "AutoZone", "NAPA Auto Parts", "RockAuto"],
    "Certified Refurbished": ["Amazon", "Apple Store", "Best Buy", "Walmart"],
    "Seller Refurbished": ["Amazon", "Back Market", "Decluttr", "Glyde", "Newegg", "Walmart"],
    "Fashion Outlet": ["6pm.com", "Amazon Outlet", "Burlington", "Nordstrom Rack", "Overstock", "Ross Dress For Less", "The Outnet", "TJ Maxx"],
    "Electronics Outlet": ["Amazon Outlet", "B&H Photo", "Best Buy", "Newegg", "Slickdeals", "Target", "Walmart", "WOOT"],
    "Toys & Comics": ["Amazon", "ComicConnect", "Funko", "Goldin Auction", "Heritage Auctions", "StockX", "Target", "Walmart", "Whatnot"],
    "Coins & Bullion": ["APMEX", "Great Collections", "Heritage Auctions", "JM Bullion", "Walmart"],
  },
  UK: {
    "Watches": ["Amazon", "Beaverbrooks", "Chrono24", "Crown & Caliber", "Est1897", "Goldsmiths.co.uk", "House of Watches", "Jura Watches", "The Watch Hut", "Watch Shop", "WatchBox", "Watchfinder & Co."],
    "Sneakers": ["Amazon", "Depop", "Flight Club", "Goat", "Klekt", "Laced.co.uk", "SneakersNstuff", "Stadium Goods", "StockX"],
    "Handbags": ["Amazon", "Farfetch", "John Lewis & Partners", "Net-a-porter", "Next", "Rebelle", "Vestiaire Collective"],
    "Jewelry": ["Catawiki", "Goldsmiths.co.uk", "Net-a-porter", "Vestiaire Collective", "Wolf and Badger"],
    "Pre-Loved Fashion": ["Asos Marketplace", "Cudoni", "Depop", "Farfetch", "Facebook Marketplace", "Rebelle", "Secondlife", "Vestiaire Collective", "Vinted"],
    "Home Décor": ["1stdibs", "Amazon", "Dunelm", "Etsy", "Habitat", "John Lewis & Partners", "Next Home", "TK Maxx", "Wayfair"],
    "Home Improvement": ["Amazon", "Argos", "B&M", "B&Q", "Homebase", "Manomano", "Screwfix", "Toolstation", "Wayfair", "Wickes", "Wilko"],
    "Arts & Collectibles": ["1stdibs", "Etsy", "Not On The High Street", "The Salesroom", "Vinterior"],
    "Computers": ["Argos", "Chillblast", "Dell", "Overclockers UK", "Scan"],
    "Furniture": ["Amazon", "Argos", "Dunelm", "Etsy", "IKEA", "John Lewis & Partners", "Made.com", "Swoon", "Wayfair"],
    "Vehicle Parts and Accessories": ["Amazon", "Euro Car Parts", "Halfords", "Tyres On The Drive"],
    "Certified Refurbished": ["Apple Store", "Dyson", "OnBuy"],
    "Seller Refurbished": ["Amazon", "Back Market", "CeX", "Laptops Direct", "Music Magpie"],
    "Fashion Outlet": ["Brand Alley", "Farfetch", "The Outnet", "TK Maxx", "Yoox"],
    "Collectibles": ["Antiques.co.uk", "Beckett", "Catawiki", "Delcampe", "Discogs", "The Salesroom"],
    "Electronics Outlet": ["Amazon Outlet", "ao.com", "Argos", "Currys", "ebuyer.com", "Maplin", "Richer Sounds"],
  },
  DE: {
    "Watches": ["Amazon", "Catawiki", "Christ", "Chronext", "Chrono24", "eBay Kleinanzeigen", "Otto", "Timeshop24", "Uhrcenter.de", "Uhrszeit.org", "Valmano"],
    "Sneakers": ["About You", "Amazon", "Flight Club", "Goat", "Klekt", "SneakersNstuff", "Snipes", "Solestage", "Stadium Goods", "StockX", "Zalando"],
    "Handbags": ["Amazon", "Farfetch", "Fashionette", "Mytheresa", "Otto", "Rebelle", "Vestiaire Collective", "Vinted", "Zalando"],
    "Jewelry": ["Amazon", "Catawiki", "Christ", "Mytheresa", "New One", "Otto", "The Jeweller", "Valmano"],
    "Pre-Loved Fashion": ["eBay Kleinanzeigen", "Facebook Marketplace", "Madchenflomarkt", "Momax", "Rebelle", "Vestiaire Collective", "Vinted", "Zalando", "Zalando Lounge"],
    "Home Décor": ["Amazon", "Etsy", "Höffner", "Home24", "IKEA", "Mömax", "Otto", "Poco", "Wayfair", "Westwing", "XXXLutz"],
    "Home Improvement": ["Amazon", "Bauhaus", "Hornbach", "Manomano", "OBI", "Otto", "Reuter", "Thomann", "Toom", "Wayfair"],
    "Arts & Collectibles": ["Catawiki", "Dorotheum", "Etsy", "Lumas", "Vestiaire Collective"],
    "Computers": ["Amazon", "Apple Store", "Gaming Guru", "MediaMarkt", "notebooksbilliger.de", "Otto"],
    "Furniture": ["Amazon", "Etsy", "Höffner", "Home24", "IKEA", "Mömax", "Otto", "Poco", "Wayfair", "XXXLutz"],
    "Collectibles": ["Catawiki", "Dorotheum", "eBay Kleinanzeigen", "Etsy", "Lumas", "Vestiaire Collective"],
    "Vehicle Parts and Accessories": ["Amazon", "AUTODOC", "Check24", "kfzteile24"],
    "Certified Refurbished": ["Amazon", "Apple Store", "MediaMarkt"],
    "Seller Refurbished": ["Amazon", "Amazon Warehouse", "asgoodasnew", "Back Market", "Flip4shop", "notebooksbilliger.de", "reBuy", "Refurbed.de"],
    "Fashion Outlet": ["Amazon Outlet", "Dress4Less", "Limango", "OutletCity", "TK Maxx", "Zalando Lounge"],
    "Electronics Outlet": ["Amazon Outlet", "Conrad.de", "Idealo", "MediaMarkt", "notebooksbilliger.de", "Otto", "Saturn"],
  },
};
