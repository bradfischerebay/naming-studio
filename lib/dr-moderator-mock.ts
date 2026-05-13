// Dr. Moderator mock — full 9-step guided wizard with branching.
// Replace getDrModeratorMockResponse() with real Chomsky API call when ready.
// Each step maps to a StructuredMessage type; the guide generator at the end
// simulates what the LLM would produce from collected inputs.

import type { StructuredMessage } from "@/lib/models/assistant-message";

// ── State ──────────────────────────────────────────────────────────────────────

export type DrModStep =
  | "welcome"
  | "1"   // interview type
  | "1_1" // show mock-ups? (UX feedback only)
  | "1_2" // % time for design review (if mock-ups)
  | "2"   // business decision
  | "3"   // hypotheses
  | "4"   // duration
  | "5"   // tone
  | "6"   // subjects (buyers / sellers / both)
  | "7"   // seller type (sellers only)
  | "8"   // user type (new / repeat / lapsed)
  | "9"   // documentation upload/paste
  | "output";

export type DrModState = {
  currentStep: DrModStep;
  interviewType: string;   // sentiment_discovery | workflow_discovery | ux_feedback | other
  showMockups: boolean;
  mockupPercent: string;
  businessDecision: string;
  hypotheses: string;
  duration: string;        // "30" | "45" | "60" | "75" | "90"
  tone: string;            // "casual" | "neutral" | "formal"
  subjects: string;        // "buyers" | "sellers" | "both"
  sellerType: string;      // "b2c" | "c2c" | "custom"
  userType: string;        // "new" | "repeat" | "lapsed"
  documentation: string;
};

export const INITIAL_DR_MOD_STATE: DrModState = {
  currentStep: "welcome",
  interviewType: "",
  showMockups: false,
  mockupPercent: "",
  businessDecision: "",
  hypotheses: "",
  duration: "",
  tone: "",
  subjects: "",
  sellerType: "",
  userType: "",
  documentation: "",
};

export interface MockResponse {
  content: string;
  structured?: StructuredMessage;
}

// ── Step definitions ───────────────────────────────────────────────────────────

const STEP_1: MockResponse = {
  content:
    "I'm here to help you build a clear, bias-resistant moderator guide. I'll ask a few quick questions to tailor the guide to your study.",
  structured: {
    type: "single_select_with_other",
    step: "step_1",
    title: "Step 1 of 9",
    heading: "Choose the interview type",
    prompt: "Which type of qualitative interview are you planning?",
    options: [
      { id: "sentiment_discovery", label: "Sentiment discovery", description: "Attitudes, perceptions, trust, motivations" },
      { id: "workflow_discovery",  label: "Workflow discovery",  description: "Current process, tools, workarounds, pain points" },
      { id: "ux_feedback",         label: "User experience feedback", description: "Reactions to a feature, flow, or concept" },
      { id: "other",               label: "Other", description: "Tell me what you have in mind", requiresText: true },
    ],
    submitLabel: "Continue",
  },
};

const STEP_1_1: MockResponse = {
  content: "Got it — UX feedback sessions work best when we're clear on whether participants will be reacting to live designs or talking through a concept.",
  structured: {
    type: "single_select",
    step: "step_1_1",
    title: "Step 1.1 of 9",
    heading: "Will you show mock-ups or designs?",
    prompt: "Will participants be reviewing any UI mock-ups, prototypes, or visual designs during the session?",
    options: [
      { id: "yes", label: "Yes — I'll be showing designs or prototypes" },
      { id: "no",  label: "No — discussion only" },
    ],
    submitLabel: "Continue",
  },
};

const STEP_1_2: MockResponse = {
  content: "Good to know. I'll build the schedule around that timing.",
  structured: {
    type: "single_select",
    step: "step_1_2",
    title: "Step 1.2 of 9",
    heading: "How much time for the design review?",
    prompt: "What percentage of the total interview time should be reserved for reviewing the designs or prototype?",
    options: [
      { id: "20", label: "~20%",  description: "Brief react-and-move-on review" },
      { id: "33", label: "~33%",  description: "Standard design walkthrough" },
      { id: "50", label: "~50%",  description: "Half the session on the design" },
      { id: "custom", label: "Custom amount", description: "I'll specify below", requiresText: true },
    ],
    submitLabel: "Continue",
  },
};

const STEP_2: MockResponse = {
  content: "Now let's get into the substance of the research.",
  structured: {
    type: "free_text_prompt",
    step: "step_2",
    title: "Step 2 of 9",
    heading: "What business decision does this research inform?",
    prompt: "Describe the specific decision, question, or opportunity this study will help answer.",
    placeholder: "e.g. Whether to invest in a bulk listing tool for high-volume sellers…",
    chipsAutoSubmit: true,
    chipsLabel: "Suggested answers — click to use",
    chips: [
      "Whether to prioritize this feature in roadmap planning",
      "How to position this to our target segment",
      "What pain points to address in the next design iteration",
      "Whether our target users would adopt this if we built it",
      "What friction or barriers exist in the current experience",
    ],
    submitLabel: "Continue",
  },
};

const STEP_3: MockResponse = {
  content: "Almost halfway there.",
  structured: {
    type: "free_text_prompt",
    step: "step_3",
    title: "Step 3 of 9",
    heading: "Any hypotheses or assumptions to test?",
    prompt: "Share any specific beliefs your team holds that you want to validate or challenge. Skip if you're in pure discovery mode.",
    placeholder: "e.g. We assume high-volume sellers manage listings outside of eBay using spreadsheets…",
    chipsAutoSubmit: true,
    chipsLabel: "Suggested starting points — click to use",
    chips: [
      "Skip — pure discovery session",
      "Users find the current flow too slow or cumbersome",
      "Our target users are more tech-savvy than we think",
      "Price is a bigger barrier than feature gaps",
      "Users don't know this feature exists",
      "Trust or risk perception is holding adoption back",
    ],
    submitLabel: "Continue",
  },
};

const STEP_4: MockResponse = {
  content: "Let's set the schedule.",
  structured: {
    type: "single_select",
    step: "step_4",
    title: "Step 4 of 9",
    heading: "Interview duration",
    prompt: "How long will each session be?",
    options: [
      { id: "30", label: "30 minutes", description: "Focused, high-level exploration" },
      { id: "45", label: "45 minutes", description: "Solid depth without fatigue" },
      { id: "60", label: "60 minutes", description: "Standard qualitative depth" },
      { id: "75", label: "75 minutes", description: "Extended with time for edge cases" },
      { id: "90", label: "90 minutes", description: "Deep-dive with documentation review" },
    ],
    submitLabel: "Continue",
  },
};

const STEP_5: MockResponse = {
  content: "Almost there — just a few more details.",
  structured: {
    type: "single_select",
    step: "step_5",
    title: "Step 5 of 9",
    heading: "Preferred language tone",
    prompt: "How should the interview questions be phrased?",
    options: [
      { id: "casual",  label: "Casual",  description: "Conversational, friendly, uses contractions" },
      { id: "neutral", label: "Neutral",  description: "Professional but approachable — works for most audiences" },
      { id: "formal",  label: "Formal",   description: "More structured, polished language" },
    ],
    submitLabel: "Continue",
  },
};

const STEP_6: MockResponse = {
  content: "Good — knowing your audience shapes the screener criteria and question framing.",
  structured: {
    type: "single_select",
    step: "step_6",
    title: "Step 6 of 9",
    heading: "Who are the subjects?",
    prompt: "Will you be interviewing buyers, sellers, or both?",
    options: [
      { id: "sellers", label: "Sellers only" },
      { id: "buyers",  label: "Buyers only" },
      { id: "both",    label: "Both buyers and sellers" },
    ],
    submitLabel: "Continue",
  },
};

const STEP_7: MockResponse = {
  content: "Seller context helps tailor the screener and question depth.",
  structured: {
    type: "single_select_with_other",
    step: "step_7",
    title: "Step 7 of 9",
    heading: "What type of sellers?",
    prompt: "Are you targeting Business-to-Consumer sellers, Consumer-to-Consumer sellers, or a specific seller profile?",
    options: [
      { id: "b2c",    label: "B2C (Business sellers)", description: "Professional sellers, storefronts, high volume" },
      { id: "c2c",    label: "C2C (Consumer sellers)", description: "Casual / occasional sellers" },
      { id: "custom", label: "Specific profile", description: "I'll describe the seller type", requiresText: true },
    ],
    submitLabel: "Continue",
  },
};

const STEP_8: MockResponse = {
  content: "User tenure shapes how much assumed knowledge we can build into the questions.",
  structured: {
    type: "single_select_with_other",
    step: "step_8",
    title: "Step 8 of 9",
    heading: "User tenure",
    prompt: "Are subjects new, repeat, or lapsed users? Feel free to add specific criteria — frequency thresholds, time since last purchase, cohort definitions, etc.",
    options: [
      { id: "new",     label: "New users",    description: "Recently joined, still forming habits" },
      { id: "repeat",  label: "Repeat users", description: "Established users with existing patterns" },
      { id: "lapsed",  label: "Lapsed users", description: "Previously active, returned or churned" },
      { id: "other",   label: "Mixed or specific criteria", description: "I'll describe the target user group", requiresText: true },
    ],
    submitLabel: "Continue",
  },
};

const STEP_9: MockResponse = {
  content: "Last one — any supporting materials will help me write sharper, more relevant questions.",
  structured: {
    type: "free_text_prompt",
    step: "step_9",
    title: "Step 9 of 9",
    heading: "Documentation (optional)",
    prompt: "Paste any relevant PRDs, strategy docs, or context that should shape the interview. You can also upload one or more files.",
    placeholder: "Paste documentation here — no character limit…",
    chipsAutoSubmit: true,
    chipsLabel: "Quick options",
    chips: [
      "Skip — no documentation yet",
      "Skip — documentation is confidential",
    ],
    textareaRows: 8,
    allowFileUpload: true,
    submitLabel: "Generate guide",
  },
};

// ── Moderator guide generator ──────────────────────────────────────────────────
// Real API: this entire function is replaced by the LLM response.

function generateGuide(state: DrModState): string {
  const typeLabel = {
    sentiment_discovery: "Sentiment Discovery",
    workflow_discovery:  "Workflow Discovery",
    ux_feedback:         "User Experience Feedback",
    other:               "Custom Interview",
  }[state.interviewType] ?? "Research Interview";

  const subjectsLabel = {
    sellers: "Sellers",
    buyers:  "Buyers",
    both:    "Buyers & Sellers",
  }[state.subjects] ?? "Participants";

  const sellerDetail = state.subjects !== "buyers"
    ? state.sellerType === "b2c" ? "B2C (Business sellers)"
    : state.sellerType === "c2c" ? "C2C (Consumer sellers)"
    : state.sellerType
    : "";

  const userLabel = { new: "New users", repeat: "Repeat users", lapsed: "Lapsed users" }[state.userType] ?? (state.userType || "Participants");
  const dur = parseInt(state.duration) || 60;
  const tone = state.tone || "neutral";
  const hasMockups = state.showMockups;
  const mockupMin = hasMockups ? Math.round(dur * (parseInt(state.mockupPercent || "33") / 100)) : 0;
  const coreMin = dur - 5 - 10 - 5 - mockupMin; // minus icebreaker, context, wrap-up, mock-ups

  const hypothesis = state.hypotheses && state.hypotheses.toLowerCase() !== "skip — pure discovery session" && !state.hypotheses.toLowerCase().startsWith("skip")
    ? state.hypotheses
    : null;

  const sections: string[] = [];

  sections.push(`# Moderator Guide: ${typeLabel}`);
  sections.push("");
  sections.push("| | |");
  sections.push("|---|---|");
  sections.push(`| **Interview type** | ${typeLabel} |`);
  sections.push(`| **Business decision** | ${state.businessDecision || "Not specified"} |`);
  if (hypothesis) sections.push(`| **Hypothesis to test** | ${hypothesis} |`);
  sections.push(`| **Participants** | ${subjectsLabel}${sellerDetail ? ` — ${sellerDetail}` : ""} — ${userLabel} |`);
  sections.push(`| **Duration** | ${dur} minutes |`);
  sections.push(`| **Tone** | ${tone.charAt(0).toUpperCase() + tone.slice(1)} |`);
  if (hasMockups) sections.push(`| **Design review** | ${mockupMin} min (${state.mockupPercent}% of session) |`);
  sections.push("");

  // Screener
  sections.push("---");
  sections.push("");
  sections.push("## Pre-Interview Setup");
  sections.push("");
  sections.push("- [ ] Test recording software and confirm consent process");
  sections.push("- [ ] Review screener for this participant before the session");
  sections.push("- [ ] Brief note-taker on observation focus areas");
  if (hasMockups) sections.push("- [ ] Load prototype or mock-ups and confirm sharing permissions");
  sections.push("- [ ] Camera optional — audio required");
  sections.push("");

  // Screener criteria
  sections.push("### Screener criteria");
  if (state.subjects === "sellers" || state.subjects === "both") {
    sections.push(`- eBay seller (${sellerDetail || "any type"})`);
    sections.push(`- ${userLabel.toLowerCase()} on the eBay platform`);
    sections.push("- Actively selling within the last 90 days");
  }
  if (state.subjects === "buyers" || state.subjects === "both") {
    sections.push(`- eBay buyer — ${userLabel.toLowerCase()}`);
    sections.push("- Made at least one purchase in the last 6 months");
  }
  sections.push("");

  // Opening
  sections.push("---");
  sections.push("");
  sections.push(`## Opening & Consent *(5 min)*`);
  sections.push("");
  sections.push(tone === "casual"
    ? `> *"Thanks so much for joining! My name is [moderator], and I'm here to learn from you today — there are seriously no wrong answers. We're trying to understand [topic]. This will take about ${dur} minutes. Cool if we record this for our notes?"*`
    : tone === "formal"
    ? `> *"Thank you for participating in this research session. My name is [moderator]. I'd like to assure you that there are no right or wrong answers — we're here to listen and learn. This session will take approximately ${dur} minutes. Do you consent to having this session recorded for internal research purposes?"*`
    : `> *"Thanks for joining us today. My name is [moderator], and I'm here to listen — there are no right or wrong answers. We're hoping to understand [topic area] better. The session will run about ${dur} minutes. With your permission, we'd like to record this session for our notes. Is that alright with you?"*`
  );
  sections.push("");
  sections.push("### Icebreaker *(2 min)*");
  sections.push("");

  if (state.subjects === "sellers" || state.subjects === "both") {
    sections.push("- Tell me a bit about your eBay selling — how long have you been at it, and what kinds of things do you typically sell?");
    sections.push("- How would you describe your selling in terms of frequency — more occasional, or more regular?");
  } else {
    sections.push("- Tell me a bit about how you shop online — is eBay something you use pretty regularly?");
    sections.push("- What kinds of things do you typically look for on eBay?");
  }
  sections.push("");

  // Context setting
  sections.push("---");
  sections.push("");
  sections.push("## Section 1: Context Setting *(10 min)*");
  sections.push("");
  sections.push("> *Goal: Establish the participant's baseline and current mental model before getting into specifics.*");
  sections.push("");

  if (state.interviewType === "workflow_discovery") {
    sections.push("1. *(Descriptive)* Walk me through what a typical session looks like when you're getting ready to [task area] on eBay.");
    sections.push("   - *Probe: Take me through it from start to finish — where do you usually begin?*");
    sections.push("   - *Probe: What devices or tools do you use as part of that?*");
    sections.push("");
    sections.push("2. *(Process)* How do you currently decide when and how to [task area]?");
    sections.push("   - *Probe: Is there a routine you follow, or is it more situational?*");
    sections.push("   - *Probe: Has that approach changed over time?*");
  } else if (state.interviewType === "sentiment_discovery") {
    sections.push("1. *(Descriptive)* In your own words, how would you describe your overall experience with eBay lately?");
    sections.push("   - *Probe: What stands out — positive or negative?*");
    sections.push("   - *Probe: How does that compare to six months ago?*");
    sections.push("");
    sections.push("2. *(Interpretive)* When you think about [topic area], what's the first thing that comes to mind?");
    sections.push("   - *Probe: What does that feel like day-to-day?*");
    sections.push("   - *Probe: Where does that feeling come from, in your view?*");
  } else if (state.interviewType === "ux_feedback") {
    sections.push("1. *(Descriptive)* Before I show you anything, tell me how you currently handle [task or workflow] today.");
    sections.push("   - *Probe: What tools or steps are involved?*");
    sections.push("   - *Probe: What works well about how you do it now?*");
    sections.push("");
    sections.push("2. *(Interpretive)* What's the most frustrating part of the way things work today?");
    sections.push("   - *Probe: Walk me through a recent example.*");
    sections.push("   - *Probe: How often does that happen?*");
  } else {
    sections.push("1. *(Descriptive)* Tell me about your experience with eBay lately — what's been on your mind?");
    sections.push("   - *Probe: Has anything changed recently in how you use or think about it?*");
    sections.push("");
    sections.push("2. *(Interpretive)* When you think about [topic area], what comes to mind first?");
    sections.push("   - *Probe: Why that specifically?*");
  }
  sections.push("");

  // Core questions
  sections.push("---");
  sections.push("");
  sections.push(`## Section 2: Core Exploration *(${coreMin} min)*`);
  sections.push("");
  sections.push("> *Goal: Go deep on the specific behaviors, decisions, and perceptions most relevant to your research question.*");
  sections.push("");

  if (state.interviewType === "workflow_discovery") {
    sections.push("3. *(Process)* Tell me about the last time you [did the specific workflow in question]. Walk me through exactly what happened, step by step.");
    sections.push("   - *Probe: How did you start? What came first?*");
    sections.push("   - *Probe: Were there any moments where you got stuck or had to stop and figure something out?*");
    sections.push("   - *Probe: What tools did you use, and why those?*");
    sections.push("");
    sections.push("4. *(Interpretive)* When you reflect on that process — which parts feel the most effortful or time-consuming?");
    sections.push("   - *Probe: Why does that part feel that way?*");
    sections.push("   - *Probe: Have you tried any workarounds to make it faster or easier?*");
    sections.push("");
    sections.push("5. *(Comparative)* How does your approach today compare to how you did this a year or two ago?");
    sections.push("   - *Probe: What changed, and what prompted that change?*");
    sections.push("   - *Probe: Is there anything you used to do that you wish still worked?*");
    sections.push("");
    sections.push("6. *(Explanatory)* When something in this process doesn't work the way you expect — what do you do?");
    sections.push("   - *Probe: Can you give me a recent example?*");
    sections.push("   - *Probe: How did you resolve it?*");
  } else if (state.interviewType === "sentiment_discovery") {
    sections.push("3. *(Interpretive)* When you think about [specific belief or trust topic], how would you describe your gut feeling?");
    sections.push("   - *Probe: Where does that feeling come from?*");
    sections.push("   - *Probe: Has that changed over time? What drove the change?*");
    sections.push("");
    sections.push("4. *(Comparative)* How does eBay compare to other platforms or options you've used for [topic]?");
    sections.push("   - *Probe: What makes it feel different — better or worse?*");
    sections.push("   - *Probe: Is there a specific moment or experience that shaped that view?*");
    sections.push("");
    sections.push("5. *(Explanatory)* What would it take for you to feel more [confident / trusting / positive] about [topic] on eBay?");
    sections.push("   - *Probe: Is there something specific eBay could do, or something that would have to happen more broadly?*");
    sections.push("");
    sections.push("6. *(Evaluative)* If a friend asked you whether to trust eBay for [topic area], what would you tell them?");
    sections.push("   - *Probe: What would you tell them to watch out for?*");
  } else if (state.interviewType === "ux_feedback") {
    if (hasMockups) {
      sections.push(`### Design Review *(${mockupMin} min)*`);
      sections.push("");
      sections.push(`> *Now share your screen and open the prototype / mock-up.*`);
      sections.push("");
      sections.push(`3. *(Descriptive)* I'm going to share something with you now and I'd like you to just think out loud as you look at it — tell me what you notice, what draws your attention, what you're wondering about.`);
      sections.push("   - *Probe: What do you think this is for?*");
      sections.push("   - *Probe: What's the first thing you'd want to do here?*");
      sections.push("");
      sections.push("4. *(Interpretive)* Now that you've had a chance to look at it — what's your overall impression?");
      sections.push("   - *Probe: What works well? What feels off or confusing?*");
      sections.push("   - *Probe: Is there anything missing that you'd expect to see?*");
      sections.push("");
      sections.push("5. *(Evaluative)* If this were something you could actually use today, how likely would you be to try it?");
      sections.push("   - *Probe: What would make you more likely to use it?*");
      sections.push("   - *Probe: What concerns would you have before using it?*");
      sections.push("");
    } else {
      sections.push("3. *(Process)* Walk me through the last time you tried to [do the specific task being designed for].");
      sections.push("   - *Probe: What was your goal at the start?*");
      sections.push("   - *Probe: Where did things go well? Where did they break down?*");
      sections.push("");
      sections.push("4. *(Interpretive)* What's the most frustrating thing about the way [feature or flow] works right now?");
      sections.push("   - *Probe: How does that affect what you do next?*");
      sections.push("   - *Probe: Have you found any workarounds?*");
      sections.push("");
      sections.push("5. *(Evaluative)* If you could redesign this from scratch, what would you want it to do?");
      sections.push("   - *Probe: Who else would that design need to work for?*");
      sections.push("   - *Probe: What trade-offs would you be willing to make?*");
      sections.push("");
    }
  } else {
    sections.push("3. *(Descriptive)* Tell me about a recent experience related to [interview topic] that stood out to you.");
    sections.push("   - *Probe: Walk me through what happened.*");
    sections.push("   - *Probe: What made it stand out?*");
    sections.push("");
    sections.push("4. *(Interpretive)* How does that experience affect how you think about [topic] going forward?");
    sections.push("   - *Probe: Did it change anything about what you do or expect?*");
    sections.push("");
    sections.push("5. *(Evaluative)* Looking back — what would have made that experience better?");
    sections.push("   - *Probe: Whose responsibility would that have been to fix?*");
    sections.push("");
  }

  // Hypothesis section
  if (hypothesis) {
    sections.push("---");
    sections.push("");
    sections.push("## Section 3: Hypothesis Check *(5–8 min)*");
    sections.push("");
    sections.push("> *Goal: Test your team's specific assumptions without leading the participant.*");
    sections.push("");
    sections.push(`7. *(Probing)* I'd love to understand a bit more about [area related to hypothesis]. Without putting words in your mouth — how would you describe your experience with that?`);
    sections.push("   - *Probe: Can you give me a concrete example?*");
    sections.push("   - *Probe: What would have to be different for it to work better?*");
    sections.push("");
    sections.push(`> 💡 *Interviewer note: Your hypothesis was "${hypothesis.slice(0, 80)}${hypothesis.length > 80 ? "…" : ""}". Test by listening, not leading.*`);
    sections.push("");
  }

  // Wrap-up
  sections.push("---");
  sections.push("");
  sections.push("## Wrap-up *(5 min)*");
  sections.push("");
  const wrapNum = hypothesis ? (sections.filter(s => s.match(/^\d+\./)).length + 1) : (state.interviewType === "ux_feedback" && hasMockups ? 6 : 7);
  sections.push(`${wrapNum}. *(Evaluative)* If you could change one thing about [topic] on eBay, what would it be and why?`);
  sections.push("   - *Probe: Why that specifically?*");
  sections.push("   - *Probe: What would that change allow you to do?*");
  sections.push("");
  sections.push(`${wrapNum + 1}. Is there anything about [topic] that we didn't cover today that you think would be important for us to understand?`);
  sections.push("");
  sections.push(tone === "casual"
    ? `> *"Awesome — this was super helpful. I really appreciate you taking the time. Any questions for me before we wrap up?"*`
    : tone === "formal"
    ? `> *"Thank you for your time and thoughtful responses. This input is genuinely valuable to our team. Do you have any questions before we conclude?"*`
    : `> *"This has been really helpful — thank you so much for your time. Before we wrap up, do you have any questions for me?"*`
  );
  sections.push("");

  // Bias reminders
  sections.push("---");
  sections.push("");
  sections.push("## Bias Reduction Reminders");
  sections.push("");
  sections.push('- **Stay neutral:** Avoid words like "good," "bad," "easy," or "hard" in your questions');
  sections.push('- **Don\'t lead:** If a participant seems uncertain, use silence or "take your time" rather than suggesting answers');
  sections.push("- **Let them finish:** Wait a full beat after each answer — silence is data");
  sections.push('- **Echo, don\'t rephrase:** "Tell me more about that" beats summarizing what they said');
  sections.push('- **Acknowledge, don\'t validate:** "I see" or "Okay" — not "Great!" or "That makes sense"');
  sections.push("- **Separate observation from interpretation:** Flag your own interpretations with [MY READ] in notes");
  if (hasMockups) sections.push("- **Don't explain the design:** If they're confused, that confusion is data — resist the urge to clarify");
  sections.push("");

  return sections.join("\n");
}

// ── Main router ───────────────────────────────────────────────────────────────

export function getDrModeratorMockResponse(
  _userMessage: string,
  state: DrModState
): { response: MockResponse; nextState: DrModState } | null {
  const { currentStep, interviewType, showMockups, subjects } = state;

  switch (currentStep) {
    case "welcome":
      return { response: STEP_1, nextState: { ...state, currentStep: "1" } };

    case "1":
      // Branch: UX feedback → step 1_1; everything else → step 2
      if (interviewType === "ux_feedback") {
        return { response: STEP_1_1, nextState: { ...state, currentStep: "1_1" } };
      }
      return { response: STEP_2, nextState: { ...state, currentStep: "2" } };

    case "1_1":
      if (showMockups) {
        return { response: STEP_1_2, nextState: { ...state, currentStep: "1_2" } };
      }
      return { response: STEP_2, nextState: { ...state, currentStep: "2" } };

    case "1_2":
      return { response: STEP_2, nextState: { ...state, currentStep: "2" } };

    case "2":
      return { response: STEP_3, nextState: { ...state, currentStep: "3" } };

    case "3":
      return { response: STEP_4, nextState: { ...state, currentStep: "4" } };

    case "4":
      return { response: STEP_5, nextState: { ...state, currentStep: "5" } };

    case "5":
      return { response: STEP_6, nextState: { ...state, currentStep: "6" } };

    case "6":
      // Branch: sellers or both → step 7; buyers only → step 8
      if (subjects === "sellers" || subjects === "both") {
        return { response: STEP_7, nextState: { ...state, currentStep: "7" } };
      }
      return { response: STEP_8, nextState: { ...state, currentStep: "8" } };

    case "7":
      return { response: STEP_8, nextState: { ...state, currentStep: "8" } };

    case "8":
      return { response: STEP_9, nextState: { ...state, currentStep: "9" } };

    case "9": {
      const guide = generateGuide(state);
      return {
        response: { content: guide },
        nextState: { ...state, currentStep: "output" },
      };
    }

    case "output":
      return {
        response: { content: "Your guide is ready above. Type any follow-up questions or ask me to adjust anything — I can revise tone, add more questions, or rebalance timing." },
        nextState: state,
      };

    default:
      return null;
  }
}
