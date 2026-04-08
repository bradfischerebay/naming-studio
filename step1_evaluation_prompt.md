You are reviewing an implementation of the **eBay Naming Studio – Step 1 Gatekeeper**.

You will be given:

1. The full spec document: `step1_naming_studio_spec.md`.  
2. The system prompt file used by the agent: `step1_system_prompt.md`.  
3. One or more implementation artifacts (prompts, orchestration code, or agent configuration).

Your job is to determine whether the implementation matches the spec in both **behavior** and **structure**.

Follow these steps:

1. **Read and internalize the spec**  
   - Carefully read `step1_naming_studio_spec.md`.  
   - Treat it as the ground truth for how Step 1 should behave.

2. **Read the system prompt and implementation**  
   - Read `step1_system_prompt.md`.  
   - Read the implementation materials (agent config, routing logic, or code) provided after the spec.

3. **Compare against the spec along these dimensions**  

   For each dimension below, decide whether the implementation is **Pass**, **Partial**, or **Fail**, and justify briefly:

   1. **Inputs & brief handling**  
      - Does it require a substantive Product Naming Brief (URL or text) before issuing a naming verdict?  
      - Does it correctly handle “no brief” and trivial/too‑thin brief cases by deferring the decision?

   2. **Data modeling**  
      - Does it capture an equivalent of `compiled_brief` with the key fields (offering_description, target_geographies, timing, etc.)?  
      - Does it derive `naming_facts` (vertical_services, enrollment_policies, markets, longevity_months, score_tags, evidence_anchors)?  
      - Does it leave missing values null or empty, instead of inventing them?

   3. **Gate logic (G0–G5)**  
      - Are all six gates present: Interaction Model, Integration Level, Standalone Architecture, Lifespan, Portfolio Collision, Legal/Localization?  
      - Does G0 (“ghost feature”) short‑circuit as described (leading to “Do not name – inline action copy” and hiding G1–G5 in the audit)?  
      - Are legal/localization (G5) and portfolio collisions (G4) treated as hard failures that block naming?

   4. **Scoring**  
      - Is the 0–70 naming score implemented with the exact integer rules:  
        - Standalone (+25), Longevity (+15), Legal (+10), Global (+10), Clarity (+10), Portfolio Risk (−20), Trademark Risk (−20)?  
      - Are the same score_tags used to drive these factors?  
      - Is there a running total or equivalent transparent logic (no rounding up, no invented points)?

   5. **Verdict paths**  
      - Are all five paths implemented: A0, A1, A2, B, C?  
      - Are the **trigger conditions** for each path consistent with the hierarchy in the spec?  
      - Is there exactly one verdict per evaluation (no overlapping or contradictory states)?

   6. **Clarification loop (PATH_B)**  
      - When key information is missing, does the system enter a “Need more information” state instead of guessing?  
      - Are the follow‑up questions targeted at resolving specific Unknown gates (e.g., standalone vs toggle, permanent vs seasonal)?  
      - After receiving answers, does it patch facts, re‑run gates and score, and produce a new verdict (or an explicit “needs human review” outcome)?

   7. **Outputs & UX**  
      - Does it produce both a human‑readable summary (Markdown) and a machine‑readable JSON payload as described in the spec?  
      - Does the human summary include a clear verdict, short reasoning bullets, and a compact “Decision Logic Audit”?  
      - Does the JSON include verdict_path, compiled_brief, naming_facts, gate_results, scores, and any clarification questions?

   8. **Scope & safety**  
      - Does Step 1 avoid generating candidate names?  
      - Does it avoid claiming full legal clearance, and instead frame outputs as directional guidance?  
      - Does it prefer asking for clarification over silently guessing when evidence is weak?

4. **Produce your evaluation**  

   - For each dimension, output a section of the form:  
     - **Dimension:** &lt;name&gt; – **Rating:** Pass | Partial | Fail  
     - 2–4 sentences explaining why.  
   - Then provide a final section:  
     - **Recommended changes:**  
       - Bullet list of concrete changes required to bring the implementation into full alignment with the spec. Focus on behavior changes, missing branches, incorrect scoring, or weak safety boundaries.