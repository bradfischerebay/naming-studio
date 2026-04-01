export interface MockBrief {
  id: string;
  name: string;
  text: string;
  baselineVerdict: string;
}

export const mockBriefs: MockBrief[] = [
  {
    id: "cita",
    name: "CITA (AI-powered seller listing tool)",
    text: `Product: Computer Vision-powered Item Taxonomy Assist (CITA)

Description: An AI-powered capability that helps sellers create listings by analyzing photos using computer vision and voice input. Sellers can access it via a call-to-action and module on the native eBay seller listing page, or invoke it using voice on their phones.

Integration: Accessed within the existing eBay app experience through a button/module on the seller listing page. Not a separate app or sign-up flow.

Architecture: Integrated into the native eBay experience, no separate system or dedicated backend described.

Timeline: Rollout targets multiple geographies - US first, followed by UK and DE, with future expansion to buyer use cases.

Portfolio Context: Related offerings include Terapeak, Price Guide beta, and Sell the Look.

Legal: Listed as "N/A" - no trademark or localization issues mentioned.

Note: Brief explicitly states this is "not a name to be used in-product, marketing, or branding but as a descriptor in external comms."`,
    baselineVerdict: "❌ No Proper Name Needed - Use A Descriptive Label"
  },
  {
    id: "managed-shipping",
    name: "Managed Shipping",
    text: `Product: Managed Shipping

Description: A shipping option presented to sellers within eBay's listing flow. Sellers choose between a default managed option and a custom option. The name is visible to sellers as part of the listing creation flow.

Integration: Part of eBay's existing listing flow with no separate sign-up, checkout, or standalone entry point.

Architecture: Feature embedded in the listing process, with shared platform services. No separate system boundaries described.

Timeline: Extends through 2025 across multiple markets (US, UK, Germany). Not a limited-time campaign.

Portfolio: No conflicts with existing eBay products noted.

Legal: Target markets include US, UK, and Germany. Proposed names show no flagged trademark or regulatory issues.`,
    baselineVerdict: "❌ No Proper Name Needed - Use A Descriptive Label"
  },
  {
    id: "carrier-network",
    name: "Carrier Network (Multi-Carrier Delivery)",
    text: `Product: eBay Multi-Carrier Delivery Network

Description: An intermediated, multi-carrier shipping network for eBay sellers in Australia. Sellers obtain shipping labels within eBay's interface and choose between drop-off or pickup.

Integration: Label creation happens within the existing eBay Shipping platform. No distinct sign-up or checkout mentioned.

Architecture: Positioned as a multi-carrier network integrated with eBay Shipping, with shared flows and no separate system boundary.

Timeline: MVP launch planned for 2026 with ongoing foundational improvements, indicating multi-year intent.

Portfolio: No conflicts with current eBay product names. Competitor Sendle noted only for context.

Legal: No trademark or regulatory red flags identified. Market focus is Australia with neutral terminology.`,
    baselineVerdict: "❌ No Proper Name Needed - Use A Descriptive Label"
  },
];
