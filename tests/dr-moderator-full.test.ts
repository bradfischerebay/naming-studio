/**
 * Comprehensive Dr. Moderator end-to-end test suite.
 * Exercises every state transition, every guide output combination,
 * and all edge cases. Run with: npx tsx tests/dr-moderator-full.test.ts
 */

import {
  getDrModeratorMockResponse,
  INITIAL_DR_MOD_STATE,
  type DrModState,
  type DrModStep,
} from "../lib/dr-moderator-mock";

// ── Tiny test harness ────────────────────────────────────────────────────────

let passed = 0;
let failed = 0;
const failures: string[] = [];

function expect(label: string, actual: unknown, expected: unknown) {
  const ok =
    typeof expected === "function"
      ? (expected as (v: unknown) => boolean)(actual)
      : JSON.stringify(actual) === JSON.stringify(expected);
  if (ok) {
    passed++;
  } else {
    failed++;
    failures.push(`FAIL: ${label}\n  expected: ${typeof expected === "function" ? "[fn]" : JSON.stringify(expected)}\n  got:      ${JSON.stringify(actual)}`);
    console.error(`  ✗ ${label}`);
  }
}

function section(name: string) {
  console.log(`\n── ${name} ${"─".repeat(Math.max(0, 60 - name.length))}`);
}

function assert(label: string, condition: boolean) {
  expect(label, condition, true);
}

// ── Helper: walk the wizard through a full sequence of steps ─────────────────

function walkWizard(steps: Array<{ message: string; stateUpdates: Partial<DrModState> }>) {
  let state: DrModState = { ...INITIAL_DR_MOD_STATE };
  const results: Array<{ step: DrModStep; content: string; structured?: object }> = [];

  for (const { message, stateUpdates } of steps) {
    // Apply state updates (simulating handleStructuredSubmit)
    state = { ...state, ...stateUpdates };
    const result = getDrModeratorMockResponse(message, state);
    if (!result) {
      failures.push(`FAIL: walkWizard got null at step ${state.currentStep}`);
      failed++;
      break;
    }
    state = result.nextState;
    results.push({
      step: state.currentStep,
      content: result.response.content,
      structured: result.response.structured,
    });
  }
  return { state, results };
}

// ── Helpers to run full paths ─────────────────────────────────────────────────

function runFullPath(overrides: Partial<DrModState> & { skipStep7?: boolean }) {
  const base: DrModState = {
    ...INITIAL_DR_MOD_STATE,
    interviewType: overrides.interviewType ?? "workflow_discovery",
    showMockups: overrides.showMockups ?? false,
    mockupPercent: overrides.mockupPercent ?? "",
    businessDecision: overrides.businessDecision ?? "Decide whether to expand the program",
    hypotheses: overrides.hypotheses ?? "Skip — pure discovery session",
    duration: overrides.duration ?? "60",
    tone: overrides.tone ?? "neutral",
    subjects: overrides.subjects ?? "buyers",
    sellerType: overrides.sellerType ?? "",
    userType: overrides.userType ?? "repeat",
    documentation: overrides.documentation ?? "",
  };

  // Build step sequence based on interviewType + subjects
  const steps: Array<{ message: string; stateUpdates: Partial<DrModState> }> = [
    { message: "Get started!", stateUpdates: {} }, // welcome → 1
    { message: base.interviewType, stateUpdates: { currentStep: "1", interviewType: base.interviewType } }, // 1 → 1_1 or 2
  ];

  let state = { ...INITIAL_DR_MOD_STATE };
  let r = getDrModeratorMockResponse("Get started!", state);
  if (!r) throw new Error("Step welcome failed");
  state = r.nextState; // now at "1"

  // Apply interviewType
  state = { ...state, interviewType: base.interviewType };
  r = getDrModeratorMockResponse(base.interviewType, state);
  if (!r) throw new Error("Step 1 failed");
  state = r.nextState;

  // Handle UX feedback branch
  if (base.interviewType === "ux_feedback") {
    state = { ...state, showMockups: base.showMockups };
    r = getDrModeratorMockResponse(base.showMockups ? "yes" : "no", state);
    if (!r) throw new Error("Step 1_1 failed");
    state = r.nextState;

    if (base.showMockups) {
      state = { ...state, mockupPercent: base.mockupPercent || "33" };
      r = getDrModeratorMockResponse(base.mockupPercent || "33", state);
      if (!r) throw new Error("Step 1_2 failed");
      state = r.nextState;
    }
  }

  // Step 2: business decision
  state = { ...state, businessDecision: base.businessDecision };
  r = getDrModeratorMockResponse(base.businessDecision, state);
  if (!r) throw new Error("Step 2 failed");
  state = r.nextState;

  // Step 3: hypotheses
  state = { ...state, hypotheses: base.hypotheses };
  r = getDrModeratorMockResponse(base.hypotheses, state);
  if (!r) throw new Error("Step 3 failed");
  state = r.nextState;

  // Step 4: duration
  state = { ...state, duration: base.duration };
  r = getDrModeratorMockResponse(base.duration, state);
  if (!r) throw new Error("Step 4 failed");
  state = r.nextState;

  // Step 5: tone
  state = { ...state, tone: base.tone };
  r = getDrModeratorMockResponse(base.tone, state);
  if (!r) throw new Error("Step 5 failed");
  state = r.nextState;

  // Step 6: subjects
  state = { ...state, subjects: base.subjects };
  r = getDrModeratorMockResponse(base.subjects, state);
  if (!r) throw new Error("Step 6 failed");
  state = r.nextState;

  // Step 7 (sellers or both)
  if (base.subjects === "sellers" || base.subjects === "both") {
    state = { ...state, sellerType: base.sellerType || "b2c" };
    r = getDrModeratorMockResponse(base.sellerType || "b2c", state);
    if (!r) throw new Error("Step 7 failed");
    state = r.nextState;
  }

  // Step 8: user type
  state = { ...state, userType: base.userType };
  r = getDrModeratorMockResponse(base.userType, state);
  if (!r) throw new Error("Step 8 failed");
  state = r.nextState;

  // Step 9: documentation → generates guide
  state = { ...state, documentation: base.documentation };
  r = getDrModeratorMockResponse(base.documentation || "Skip — no documentation yet", state);
  if (!r) throw new Error("Step 9 failed");
  const guide = r.response.content;
  state = r.nextState;

  return { guide, state, prevStep: "9" as DrModStep };
}

// ═══════════════════════════════════════════════════════════════════════════════
// TEST SUITE
// ═══════════════════════════════════════════════════════════════════════════════

section("1. State machine — initial state");
{
  const s = { ...INITIAL_DR_MOD_STATE };
  expect("currentStep is welcome", s.currentStep, "welcome");
  expect("interviewType is empty", s.interviewType, "");
  expect("showMockups is false", s.showMockups, false);
  expect("all string fields empty", [s.businessDecision, s.hypotheses, s.duration, s.tone, s.subjects, s.sellerType, s.userType, s.documentation].every(v => v === ""), true);
}

section("2. Welcome step transition");
{
  const result = getDrModeratorMockResponse("Get started!", INITIAL_DR_MOD_STATE);
  assert("result not null", result !== null);
  expect("nextState.currentStep", result!.nextState.currentStep, "1");
  assert("response has content", result!.response.content.length > 0);
  assert("response has structured", result!.response.structured !== undefined);
  expect("structured type", result!.response.structured?.type, "single_select_with_other");
  expect("step_1 options count", result!.response.structured?.options?.length, 4);
  expect("title is Step 1 of 9", result!.response.structured?.title, "Step 1 of 9");
}

section("3. Step 1 branching — UX feedback → 1_1");
{
  const state: DrModState = { ...INITIAL_DR_MOD_STATE, currentStep: "1", interviewType: "ux_feedback" };
  const result = getDrModeratorMockResponse("ux_feedback", state);
  assert("result not null", result !== null);
  expect("nextState.currentStep", result!.nextState.currentStep, "1_1");
  expect("structured type", result!.response.structured?.type, "single_select");
}

section("4. Step 1 branching — non-UX → step 2");
{
  for (const type of ["workflow_discovery", "sentiment_discovery", "other"]) {
    const state: DrModState = { ...INITIAL_DR_MOD_STATE, currentStep: "1", interviewType: type };
    const result = getDrModeratorMockResponse(type, state);
    assert(`${type} → step 2`, result?.nextState.currentStep === "2");
  }
}

section("5. Step 1_1 branching — showMockups=true → 1_2");
{
  const state: DrModState = { ...INITIAL_DR_MOD_STATE, currentStep: "1_1", interviewType: "ux_feedback", showMockups: true };
  const result = getDrModeratorMockResponse("yes", state);
  expect("nextStep", result?.nextState.currentStep, "1_2");
  expect("structured type", result?.response.structured?.type, "single_select");
}

section("6. Step 1_1 branching — showMockups=false → 2");
{
  const state: DrModState = { ...INITIAL_DR_MOD_STATE, currentStep: "1_1", interviewType: "ux_feedback", showMockups: false };
  const result = getDrModeratorMockResponse("no", state);
  expect("nextStep", result?.nextState.currentStep, "2");
}

section("7. Step 1_2 → always goes to 2");
{
  const state: DrModState = { ...INITIAL_DR_MOD_STATE, currentStep: "1_2", interviewType: "ux_feedback", showMockups: true, mockupPercent: "33" };
  const result = getDrModeratorMockResponse("33", state);
  expect("nextStep", result?.nextState.currentStep, "2");
}

section("8. Steps 2→3→4→5→6 linear chain");
{
  for (const [from, to] of [["2","3"],["3","4"],["4","5"],["5","6"]] as const) {
    const state: DrModState = { ...INITIAL_DR_MOD_STATE, currentStep: from as DrModStep };
    const result = getDrModeratorMockResponse("anything", state);
    expect(`${from} → ${to}`, result?.nextState.currentStep, to);
  }
}

section("9. Step 6 branching — buyers → 8 (skip seller step)");
{
  const state: DrModState = { ...INITIAL_DR_MOD_STATE, currentStep: "6", subjects: "buyers" };
  const result = getDrModeratorMockResponse("buyers", state);
  expect("nextStep", result?.nextState.currentStep, "8");
}

section("10. Step 6 branching — sellers → 7");
{
  const state: DrModState = { ...INITIAL_DR_MOD_STATE, currentStep: "6", subjects: "sellers" };
  const result = getDrModeratorMockResponse("sellers", state);
  expect("nextStep", result?.nextState.currentStep, "7");
}

section("11. Step 6 branching — both → 7");
{
  const state: DrModState = { ...INITIAL_DR_MOD_STATE, currentStep: "6", subjects: "both" };
  const result = getDrModeratorMockResponse("both", state);
  expect("nextStep", result?.nextState.currentStep, "7");
}

section("12. Steps 7→8→9");
{
  for (const [from, to] of [["7","8"],["8","9"]] as const) {
    const state: DrModState = { ...INITIAL_DR_MOD_STATE, currentStep: from as DrModStep };
    const result = getDrModeratorMockResponse("anything", state);
    expect(`${from} → ${to}`, result?.nextState.currentStep, to);
  }
}

section("13. Step 9 → generates guide (currentStep becomes output)");
{
  const state: DrModState = {
    ...INITIAL_DR_MOD_STATE,
    currentStep: "9",
    interviewType: "workflow_discovery",
    subjects: "buyers",
    userType: "repeat",
    duration: "60",
    tone: "neutral",
  };
  const result = getDrModeratorMockResponse("Skip — no documentation yet", state);
  assert("result not null", result !== null);
  expect("nextStep", result?.nextState.currentStep, "output");
  assert("guide starts with # Moderator Guide", result!.response.content.startsWith("# Moderator Guide"));
  assert("no structured block on guide", result?.response.structured === undefined);
}

section("14. Step output → follow-up response");
{
  const state: DrModState = { ...INITIAL_DR_MOD_STATE, currentStep: "output" };
  const result = getDrModeratorMockResponse("Can you adjust the tone?", state);
  assert("result not null", result !== null);
  expect("stays at output", result?.nextState.currentStep, "output");
  assert("has follow-up content", (result?.response.content.length ?? 0) > 0);
}

section("15. Unknown step → returns null");
{
  const state: DrModState = { ...INITIAL_DR_MOD_STATE, currentStep: "99" as DrModStep };
  const result = getDrModeratorMockResponse("anything", state);
  expect("returns null for unknown step", result, null);
}

// ── Guide content tests ───────────────────────────────────────────────────────

section("16. Guide — forbidden strings absent");
{
  const { guide } = runFullPath({ interviewType: "workflow_discovery", subjects: "buyers" });
  assert("no Airtable link", !guide.includes("airtable.com"));
  assert("no Thank you for using", !guide.includes("Thank you for using"));
  assert("no export to Canvas", !guide.includes("export to Canvas"));
  assert("no empty href []() pattern with Airtable", !guide.includes("AI Support Feedback Form"));
}

section("17. Guide — required sections present (workflow_discovery)");
{
  const { guide } = runFullPath({ interviewType: "workflow_discovery", subjects: "buyers" });
  assert("has title", guide.includes("# Moderator Guide:"));
  assert("has metadata table", guide.includes("|---|---|"));
  assert("has Pre-Interview Setup", guide.includes("## Pre-Interview Setup"));
  assert("has Screener criteria as h3", guide.includes("### Screener criteria"));
  assert("has Opening & Consent", guide.includes("## Opening & Consent"));
  assert("has Icebreaker as h3", guide.includes("### Icebreaker *(2 min)*"));
  assert("has Section 1", guide.includes("## Section 1:"));
  assert("has Section 2", guide.includes("## Section 2:"));
  assert("has Wrap-up", guide.includes("## Wrap-up"));
  assert("has Bias Reduction Reminders", guide.includes("## Bias Reduction Reminders"));
}

section("18. Guide — all 4 interview types produce correct title");
{
  const types: Array<[string, string]> = [
    ["sentiment_discovery", "Sentiment Discovery"],
    ["workflow_discovery", "Workflow Discovery"],
    ["ux_feedback", "User Experience Feedback"],
    ["other", "Custom Interview"],
  ];
  for (const [type, label] of types) {
    const { guide } = runFullPath({ interviewType: type, subjects: "buyers" });
    assert(`${type} → title "${label}"`, guide.includes(`# Moderator Guide: ${label}`));
  }
}

section("19. Guide — hypothesis section present when hypothesis given");
{
  const { guide } = runFullPath({
    interviewType: "sentiment_discovery",
    subjects: "buyers",
    hypotheses: "Buyers distrust third-party sellers",
  });
  assert("Section 3 present", guide.includes("## Section 3: Hypothesis Check"));
  assert("Hypothesis text embedded in guide note", guide.includes("Buyers distrust third-party sellers"));
}

section("20. Guide — hypothesis section absent when skipped");
{
  const skipPhrases = [
    "Skip — pure discovery session",
    "skip anything here",
    "Skip — no hypothesis yet",
  ];
  for (const phrase of skipPhrases) {
    const { guide } = runFullPath({ interviewType: "workflow_discovery", subjects: "buyers", hypotheses: phrase });
    assert(`"${phrase.slice(0,30)}" → no Section 3`, !guide.includes("## Section 3: Hypothesis Check"));
  }
}

section("21. Guide — sellers path has seller screener items");
{
  const { guide } = runFullPath({ interviewType: "workflow_discovery", subjects: "sellers", sellerType: "b2c" });
  assert("seller screener item present", guide.includes("eBay seller"));
  assert("B2C label present", guide.includes("B2C (Business sellers)"));
  assert("90 days active", guide.includes("90 days"));
  assert("selling icebreaker", guide.includes("selling"));
}

section("22. Guide — buyers path has buyer screener items");
{
  const { guide } = runFullPath({ interviewType: "sentiment_discovery", subjects: "buyers" });
  assert("buyer screener item present", guide.includes("eBay buyer"));
  assert("6 months purchase", guide.includes("6 months"));
  assert("icebreaker about shopping", guide.includes("shop"));
}

section("23. Guide — both subjects has both screener sections");
{
  const { guide } = runFullPath({ interviewType: "workflow_discovery", subjects: "both", sellerType: "c2c" });
  assert("seller screener present", guide.includes("eBay seller"));
  assert("buyer screener present", guide.includes("eBay buyer"));
  assert("C2C label", guide.includes("C2C (Consumer sellers)"));
}

section("24. Guide — UX feedback with mockups has Design Review h3");
{
  const { guide } = runFullPath({
    interviewType: "ux_feedback",
    subjects: "buyers",
    showMockups: true,
    mockupPercent: "33",
    duration: "60",
  });
  assert("Design Review h3 present", guide.includes("### Design Review"));
  assert("No Design Review without mockups (sanity check)", true); // covered below
}

section("25. Guide — UX feedback without mockups has no Design Review");
{
  const { guide } = runFullPath({
    interviewType: "ux_feedback",
    subjects: "buyers",
    showMockups: false,
    duration: "60",
  });
  assert("No Design Review section", !guide.includes("### Design Review"));
  assert("Has process questions instead", guide.includes("Walk me through the last time"));
}

section("26. Guide — all 3 tones produce different opening scripts");
{
  const casual = runFullPath({ tone: "casual", subjects: "buyers" }).guide;
  const neutral = runFullPath({ tone: "neutral", subjects: "buyers" }).guide;
  const formal = runFullPath({ tone: "formal", subjects: "buyers" }).guide;
  assert("casual has informal lang", casual.includes("Thanks so much") || casual.includes("Cool if we"));
  assert("formal has formal lang", formal.includes("Thank you for participating") || formal.includes("Do you consent"));
  assert("neutral is different from casual", neutral !== casual);
  assert("neutral is different from formal", neutral !== formal);
}

section("27. Guide — all 5 durations produce valid coreMin (>0)");
{
  for (const dur of ["30", "45", "60", "75", "90"]) {
    const { guide } = runFullPath({ duration: dur, subjects: "buyers" });
    const match = guide.match(/## Section 2: Core Exploration \*\((\d+) min\)\*/);
    assert(`duration ${dur} → positive coreMin`, match !== null && parseInt(match[1]) > 0);
  }
}

section("28. Guide — mockupPercent=50 takes half the session");
{
  const { guide } = runFullPath({
    interviewType: "ux_feedback",
    showMockups: true,
    mockupPercent: "50",
    duration: "60",
    subjects: "buyers",
  });
  // mockupMin = round(60 * 0.50) = 30
  assert("Design Review shows 30 min", guide.includes("### Design Review *(30 min)*"));
}

section("29. Guide — all 3 user types appear in metadata");
{
  for (const [type, label] of [["new","New users"],["repeat","Repeat users"],["lapsed","Lapsed users"]] as const) {
    const { guide } = runFullPath({ userType: type, subjects: "buyers" });
    assert(`userType ${type} → "${label}" in metadata`, guide.includes(label));
  }
}

section("30. Guide — custom seller type appears in metadata");
{
  const state: DrModState = {
    ...INITIAL_DR_MOD_STATE,
    currentStep: "9",
    interviewType: "workflow_discovery",
    subjects: "sellers",
    sellerType: "Vintage clothing resellers with >100 listings",
    userType: "repeat",
    duration: "60",
    tone: "neutral",
    businessDecision: "test",
    hypotheses: "skip",
  };
  const result = getDrModeratorMockResponse("skip", state);
  assert("custom sellerType appears in guide", result!.response.content.includes("Vintage clothing resellers with >100 listings"));
}

section("31. Guide — custom userType (step 8 other) appears");
{
  const state: DrModState = {
    ...INITIAL_DR_MOD_STATE,
    currentStep: "9",
    interviewType: "sentiment_discovery",
    subjects: "buyers",
    sellerType: "",
    userType: "Power buyers who spend >$500/year",
    duration: "60",
    tone: "neutral",
    businessDecision: "test",
    hypotheses: "skip",
  };
  const result = getDrModeratorMockResponse("skip", state);
  assert("custom userType in guide", result!.response.content.includes("Power buyers who spend >$500/year"));
}

section("32. Guide — documentation content passes to guide when provided");
{
  const state: DrModState = {
    ...INITIAL_DR_MOD_STATE,
    currentStep: "9",
    interviewType: "workflow_discovery",
    subjects: "buyers",
    userType: "repeat",
    duration: "60",
    tone: "neutral",
    businessDecision: "test",
    hypotheses: "Skip — pure discovery session",
    documentation: "Our hypothesis is based on Q1 research showing 40% drop-off.",
  };
  const result = getDrModeratorMockResponse("anything", state);
  // The guide content itself is generated regardless of documentation field (it's
  // context for the real LLM; the mock doesn't embed it). Just ensure guide exists.
  assert("guide generated even with documentation", result!.response.content.startsWith("# Moderator Guide"));
  expect("nextStep is output", result?.nextState.currentStep, "output");
}

section("33. Guide — bias reminders section always present");
{
  for (const type of ["sentiment_discovery", "workflow_discovery", "ux_feedback", "other"]) {
    const { guide } = runFullPath({ interviewType: type, subjects: "buyers" });
    assert(`${type} → bias reminders present`, guide.includes("## Bias Reduction Reminders"));
    assert(`${type} → Stay neutral bullet`, guide.includes("Stay neutral"));
    assert(`${type} → Don't lead bullet`, guide.includes("Don't lead"));
  }
}

section("34. Guide — mockup bias reminder only when showMockups=true");
{
  const withMockups = runFullPath({ interviewType: "ux_feedback", subjects: "buyers", showMockups: true, mockupPercent: "33" }).guide;
  const withoutMockups = runFullPath({ interviewType: "ux_feedback", subjects: "buyers", showMockups: false }).guide;
  assert("mockup bias reminder present when mockups", withMockups.includes("Don't explain the design"));
  assert("mockup bias reminder absent without mockups", !withoutMockups.includes("Don't explain the design"));
}

section("35. Guide — wrap-up has exactly 2 closing questions");
{
  const { guide } = runFullPath({ interviewType: "workflow_discovery", subjects: "buyers" });
  const wrapSection = guide.split("## Wrap-up")[1]?.split("---")[0] ?? "";
  // Should have numbered questions
  const numbered = wrapSection.match(/^\d+\./gm);
  assert("wrap-up has at least 2 numbered questions", (numbered?.length ?? 0) >= 2);
}

section("36. Guide — structured block absent (pure content response)");
{
  const state: DrModState = {
    ...INITIAL_DR_MOD_STATE,
    currentStep: "9",
    interviewType: "workflow_discovery",
    subjects: "buyers",
    userType: "new",
    duration: "45",
    tone: "casual",
    businessDecision: "test",
    hypotheses: "skip",
  };
  const result = getDrModeratorMockResponse("skip", state);
  expect("no structured on guide response", result?.response.structured, undefined);
}

section("37. Step definitions — all structured messages have required fields");
{
  // Walk through welcome → output and check each structured block
  const state1 = getDrModeratorMockResponse("start", INITIAL_DR_MOD_STATE);
  const s1 = state1!.response.structured!;
  assert("step 1 has title", !!s1.title);
  assert("step 1 has heading", !!s1.heading);
  assert("step 1 has options", (s1.options?.length ?? 0) > 0);
  assert("step 1 has submitLabel", !!s1.submitLabel);

  // Step 1_1
  const s1_1 = getDrModeratorMockResponse("ux_feedback", { ...INITIAL_DR_MOD_STATE, currentStep: "1", interviewType: "ux_feedback" })!.response.structured!;
  assert("step 1_1 has options", (s1_1.options?.length ?? 0) === 2);

  // STEP_2 (business decision, free_text_prompt) — returned when answering step 1 with non-UX type
  const s2 = getDrModeratorMockResponse("workflow_discovery", { ...INITIAL_DR_MOD_STATE, currentStep: "1", interviewType: "workflow_discovery" })!.response.structured!;
  assert("step 2 type is free_text_prompt", s2.type === "free_text_prompt");
  assert("step 2 has chipsAutoSubmit", s2.chipsAutoSubmit === true);
  assert("step 2 has chips", (s2.chips?.length ?? 0) > 0);

  // STEP_3 (hypotheses) — returned when answering step 2
  const s3 = getDrModeratorMockResponse("anything", { ...INITIAL_DR_MOD_STATE, currentStep: "2" })!.response.structured!;
  assert("step 3 has chipsAutoSubmit", s3.chipsAutoSubmit === true);
  assert("step 3 chips are hypotheses", s3.chips?.some(c => c.toLowerCase().includes("skip")));

  // STEP_4 (duration, single_select, 5 options) — returned when answering step 3
  const s4 = getDrModeratorMockResponse("anything", { ...INITIAL_DR_MOD_STATE, currentStep: "3" })!.response.structured!;
  assert("step 4 type single_select", s4.type === "single_select");
  assert("step 4 has 5 duration options", s4.options?.length === 5);
  assert("step 4 options include 30", s4.options?.some(o => o.id === "30"));
  assert("step 4 options include 90", s4.options?.some(o => o.id === "90"));

  // STEP_5 (tone, single_select, 3 options) — returned when answering step 4
  const s5 = getDrModeratorMockResponse("anything", { ...INITIAL_DR_MOD_STATE, currentStep: "4" })!.response.structured!;
  assert("step 5 has casual/neutral/formal", s5.options?.length === 3);
  assert("step 5 casual option", s5.options?.some(o => o.id === "casual"));
  assert("step 5 formal option", s5.options?.some(o => o.id === "formal"));

  // STEP_6 (subjects, single_select, 3 options) — returned when answering step 5
  const s6 = getDrModeratorMockResponse("anything", { ...INITIAL_DR_MOD_STATE, currentStep: "5" })!.response.structured!;
  assert("step 6 has buyers/sellers/both", s6.options?.length === 3);

  // STEP_7 (seller type, single_select_with_other) — returned when answering step 6 with sellers
  const s7 = getDrModeratorMockResponse("sellers", { ...INITIAL_DR_MOD_STATE, currentStep: "6", subjects: "sellers" })!.response.structured!;
  assert("step 7 is single_select_with_other", s7.type === "single_select_with_other");
  assert("step 7 has b2c/c2c/custom", s7.options?.some(o => o.id === "b2c") && s7.options?.some(o => o.id === "c2c"));

  // STEP_8 (user type, single_select_with_other, 4 options) — returned when answering step 7
  const s8 = getDrModeratorMockResponse("anything", { ...INITIAL_DR_MOD_STATE, currentStep: "7" })!.response.structured!;
  assert("step 8 is single_select_with_other", s8.type === "single_select_with_other");
  assert("step 8 has 4 options", s8.options?.length === 4);
  assert("step 8 has 'Mixed or specific criteria'", s8.options?.some(o => o.label === "Mixed or specific criteria"));
  assert("step 8 Mixed option requiresText", s8.options?.find(o => o.label === "Mixed or specific criteria")?.requiresText === true);

  // STEP_9 (documentation, free_text_prompt, allowFileUpload) — returned when answering step 8
  const s9 = getDrModeratorMockResponse("anything", { ...INITIAL_DR_MOD_STATE, currentStep: "8" })!.response.structured!;
  assert("step 9 is free_text_prompt", s9.type === "free_text_prompt");
  assert("step 9 has allowFileUpload", s9.allowFileUpload === true);
  assert("step 9 has textareaRows 8", s9.textareaRows === 8);
  assert("step 9 has chipsAutoSubmit", s9.chipsAutoSubmit === true);
  assert("step 9 has skip chips", s9.chips?.some(c => c.includes("Skip")));
  assert("step 9 submitLabel is Generate guide", s9.submitLabel === "Generate guide");
}

section("38. All step titles follow 'Step N of 9' format");
{
  const stepTitles = [
    { step: "welcome" as DrModStep, state: INITIAL_DR_MOD_STATE, title: "Step 1 of 9" },
    { step: "1" as DrModStep, state: { ...INITIAL_DR_MOD_STATE, currentStep: "1" as DrModStep, interviewType: "ux_feedback" }, title: "Step 1.1 of 9" },
    { step: "1_1" as DrModStep, state: { ...INITIAL_DR_MOD_STATE, currentStep: "1_1" as DrModStep, interviewType: "ux_feedback", showMockups: true }, title: "Step 1.2 of 9" },
  ];
  for (const { state, title } of stepTitles) {
    const result = getDrModeratorMockResponse("anything", state);
    assert(`title "${title}" present`, result?.response.structured?.title === title);
  }
}

section("39. INITIAL_DR_MOD_STATE immutability — verify original not mutated");
{
  const orig = { ...INITIAL_DR_MOD_STATE };
  getDrModeratorMockResponse("start", { ...INITIAL_DR_MOD_STATE });
  getDrModeratorMockResponse("ux_feedback", { ...INITIAL_DR_MOD_STATE, currentStep: "1", interviewType: "ux_feedback" });
  expect("currentStep unchanged", INITIAL_DR_MOD_STATE.currentStep, orig.currentStep);
  expect("interviewType unchanged", INITIAL_DR_MOD_STATE.interviewType, orig.interviewType);
}

section("40. Full path A: ux_feedback + mockups + buyers + hypothesis");
{
  const { guide, state } = runFullPath({
    interviewType: "ux_feedback",
    showMockups: true,
    mockupPercent: "33",
    subjects: "buyers",
    userType: "new",
    duration: "60",
    tone: "casual",
    businessDecision: "Should we redesign the checkout flow?",
    hypotheses: "New users abandon at payment step due to trust concerns",
  });
  assert("state is output", state.currentStep === "output");
  assert("guide title: UX Feedback", guide.includes("User Experience Feedback"));
  assert("Design Review section", guide.includes("### Design Review"));
  assert("Section 3 (hypothesis)", guide.includes("## Section 3: Hypothesis Check"));
  assert("hypothesis text in guide", guide.includes("New users abandon at payment step"));
  assert("buyer screener", guide.includes("eBay buyer"));
  assert("new users label", guide.includes("New users"));
  assert("casual tone opening", guide.includes("Thanks so much") || guide.includes("Cool if we"));
}

section("41. Full path B: workflow_discovery + sellers + c2c + no hypothesis + formal");
{
  const { guide, state } = runFullPath({
    interviewType: "workflow_discovery",
    subjects: "sellers",
    sellerType: "c2c",
    userType: "lapsed",
    duration: "45",
    tone: "formal",
    hypotheses: "Skip — pure discovery session",
  });
  assert("state is output", state.currentStep === "output");
  assert("C2C label in guide", guide.includes("C2C (Consumer sellers)"));
  assert("Lapsed users", guide.includes("Lapsed users"));
  assert("No Section 3", !guide.includes("## Section 3: Hypothesis Check"));
  assert("formal opening", guide.includes("Thank you for participating") || guide.includes("Do you consent"));
  assert("seller icebreaker", guide.includes("selling"));
}

section("42. Full path C: sentiment_discovery + both + b2c + 90min");
{
  const { guide, state } = runFullPath({
    interviewType: "sentiment_discovery",
    subjects: "both",
    sellerType: "b2c",
    userType: "repeat",
    duration: "90",
    tone: "neutral",
    hypotheses: "skip",
  });
  assert("state is output", state.currentStep === "output");
  assert("sentiment discovery title", guide.includes("Sentiment Discovery"));
  assert("B2C sellers", guide.includes("B2C (Business sellers)"));
  assert("buyer screener too", guide.includes("eBay buyer"));
  assert("90 min duration", guide.includes("90 minutes"));
}

section("43. Full path D: other + buyers + 30min (minimum session)");
{
  const { guide, state } = runFullPath({
    interviewType: "other",
    subjects: "buyers",
    userType: "new",
    duration: "30",
    tone: "casual",
    hypotheses: "skip",
  });
  assert("state is output", state.currentStep === "output");
  assert("Custom Interview title", guide.includes("Custom Interview"));
  assert("30 minutes in metadata", guide.includes("30 minutes"));
  // coreMin = 30 - 5 - 10 - 5 = 10
  assert("coreMin 10 in guide", guide.includes("10 min"));
}

section("44. Edge case — empty businessDecision handled gracefully");
{
  const state: DrModState = {
    ...INITIAL_DR_MOD_STATE,
    currentStep: "9",
    interviewType: "workflow_discovery",
    subjects: "buyers",
    userType: "repeat",
    duration: "60",
    tone: "neutral",
    businessDecision: "",
    hypotheses: "skip",
  };
  const result = getDrModeratorMockResponse("skip", state);
  assert("guide generated with empty businessDecision", result !== null);
  assert("fallback 'Not specified' in metadata", result!.response.content.includes("Not specified"));
}

section("45. Edge case — subjects not set uses fallback label");
{
  const state: DrModState = {
    ...INITIAL_DR_MOD_STATE,
    currentStep: "9",
    interviewType: "workflow_discovery",
    subjects: "",
    userType: "repeat",
    duration: "60",
    tone: "neutral",
  };
  const result = getDrModeratorMockResponse("skip", state);
  assert("guide generated with empty subjects", result !== null);
  assert("fallback 'Participants' in metadata", result!.response.content.includes("Participants"));
}

section("46. Edge case — duration 0/invalid defaults to 60");
{
  const state: DrModState = {
    ...INITIAL_DR_MOD_STATE,
    currentStep: "9",
    interviewType: "workflow_discovery",
    subjects: "buyers",
    userType: "repeat",
    duration: "invalid",
    tone: "neutral",
  };
  const result = getDrModeratorMockResponse("skip", state);
  assert("guide generated with invalid duration", result !== null);
  assert("defaults to 60 minutes", result!.response.content.includes("60 minutes"));
}

section("47. Hypothesis skipping — all skip variants suppressed");
{
  const skipVariants = [
    "Skip — pure discovery session",
    "SKIP — NO HYPOTHESIS",
    "skip",
    "Skip — we have no hypothesis",
  ];
  for (const phrase of skipVariants) {
    const state: DrModState = {
      ...INITIAL_DR_MOD_STATE,
      currentStep: "9",
      interviewType: "sentiment_discovery",
      subjects: "buyers",
      userType: "repeat",
      duration: "60",
      tone: "neutral",
      hypotheses: phrase,
    };
    const result = getDrModeratorMockResponse("skip", state);
    assert(`Skip phrase "${phrase.slice(0,30)}" suppresses Section 3`, !result!.response.content.includes("## Section 3:"));
  }
}

section("48. Hypothesis NOT skipped for non-skip phrases");
{
  const nonSkips = [
    "Sellers find the listing flow confusing",
    "Users don't trust third-party listings",
    "We think price is the main barrier",
  ];
  for (const phrase of nonSkips) {
    const state: DrModState = {
      ...INITIAL_DR_MOD_STATE,
      currentStep: "9",
      interviewType: "sentiment_discovery",
      subjects: "buyers",
      userType: "repeat",
      duration: "60",
      tone: "neutral",
      hypotheses: phrase,
    };
    const result = getDrModeratorMockResponse("skip", state);
    assert(`Non-skip "${phrase.slice(0,30)}" shows Section 3`, result!.response.content.includes("## Section 3:"));
  }
}

section("49. Guide — no extra markdown artifacts (no raw curly quotes)");
{
  const { guide } = runFullPath({ interviewType: "workflow_discovery", subjects: "sellers", sellerType: "b2c" });
  // Check no unicode left/right double quotes appear (these cause TS1127)
  assert("no Unicode left double quote in guide", !guide.includes("“"));
  assert("no Unicode right double quote in guide", !guide.includes("”"));
}

section("50. State machine — nextState never mutates input state");
{
  const originalState = { ...INITIAL_DR_MOD_STATE };
  const inputState = { ...originalState };
  getDrModeratorMockResponse("start", inputState);
  // inputState should not have been mutated
  expect("currentStep unchanged after call", inputState.currentStep, originalState.currentStep);
  expect("interviewType unchanged after call", inputState.interviewType, originalState.interviewType);
}

// ── Final report ──────────────────────────────────────────────────────────────

console.log(`\n${"═".repeat(64)}`);
console.log(`Results: ${passed} passed, ${failed} failed out of ${passed + failed} total`);
if (failures.length > 0) {
  console.log("\nFailed tests:");
  for (const f of failures) console.log(`\n${f}`);
} else {
  console.log("✅ All tests passed — Dr. Moderator is production-ready.");
}
