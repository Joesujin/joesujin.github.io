---
layout: work_detail
title: "Plumo – V1 GDD"
tagline: "The Co-Parenting AI Pet"
hero_image: "/img/Terra/Plumo/plumo.png"
hide_header: true
custom_class: doc-theme
hide_sketch: true
---
<style>
    /* Force top bar links to be dark for this page */
    .topShelf a,
    .topShelf a i {
        color: #222 !important;
    }
</style>

<!-- Intro Section -->
<div class="cs-hero">
    <div class="cs-hero-content">
        <h1 style="color: white; margin-bottom: 0px;">Plumo</h1>
        <span class="tagline" style="display: block; margin-bottom: 0rem; font-size: 1.2rem; color: #888; font-weight: 300;">The Co-Parenting AI Pet</span>
        <span class="tagline" style="display: block; margin-bottom: 3rem; font-size: 0.9rem; color: #888; font-weight: 300; font-style: italic;">Game Design Document</span>
        
        <div class="cs-overview" style="margin-top: 4rem;">
            <h3>Executive Summary</h3>
            <p style="max-width: 60ch; font-size: 1.2rem; color: #ddd; line-height: 1.6;">Plumo is an AI-driven virtual pet simulation built on the core philosophy of Co-Parenting. Unlike traditional virtual pets, Plumo is designed to be raised by two players simultaneously. The pet acts as a living bridge between the players, learning from their interactions, mimicking their speech patterns, and forming a unique personality based on the combined influence of its "parents."</p>
            <p style="max-width: 60ch; font-size: 1rem; color: #aaa; line-height: 1.6;">Powered by Unity and LLM integration, Plumo features a sophisticated internal state machine where emotional intelligence, memory, and physical needs drive procedural animations and conversations.</p>
        </div>
    </div>
    <div class="cs-hero-image">
        <img src="{{ page.hero_image }}" alt="Plumo Hero Image">
    </div>
</div>

<!-- Core Pillars -->
<div class="cs-section">
    <div class="cs-text-col" style="width: 100%;">
        <h3>2. Core Pillars</h3>
        
        <h4>The Co-Parenting Dynamic</h4>
        <p>The standout feature of Plumo is the shared responsibility.</p>
        <ul>
            <li><strong>Invitation System</strong>: Players invite a friend to share the game instance.</li>
            <li><strong>Shared Metrics</strong>: All key pet metrics (Bonding, Temperament) are influenced by both players.</li>
            <li><strong>The Messenger</strong>: Plumo remembers conversations. It can relay messages or gossip, mentioning what "Player A" said to "Player B," creating a social loop outside of direct chat.</li>
        </ul>

        <h4>The AI Personality (Mumble Speech)</h4>
        <p>Plumo is designed to feel like a 4-5 year old child.</p>
        <ul>
            <li><strong>Mumble Tech</strong>: The pet uses a custom "Mumble Speech" pattern. It mimics human cadence but with a childish, unintelligible-yet-emotive layer.</li>
            <li><strong>Adaptive Learning</strong>: As players chat, Plumo learns vocabulary and context. We use a custom prompting system in Unity to filter LLM responses through this "Mumble" filter, ensuring the pet sounds cute and organic, not robotic.</li>
        </ul>
    </div>
</div>

<!-- System Design -->
<!-- System Design -->
<div class="cs-section">
    <div class="cs-text-col">
        <h3>3. System Design: The Brain of Plumo</h3>
        <p>The game logic is driven by a relationship between Player Actions (Inputs) and Pet Metrics (Internal States).</p>
    </div>
</div>

<div class="full-bleed">
    <img src="/img/Terra/Plumo/AI pet (3).png" alt="Figure 1: The Relationship Flowchart">
</div>

<p class="caption">Figure 1: The Relationship Flowchart showing how Player Metrics feed into Pet Attributes.</p>

<div class="cs-section">
    <div class="cs-text-col">
        <h4>Metrics Overview</h4>
        <p>The system tracks player behavior to calculate the pet's emotional state.</p>
        <p><strong>Player Metrics (Inputs):</strong></p>
        <ul>
            <li><strong>Bonding</strong>: The experience level derived from positive interactions.</li>
            <li><strong>Presence</strong>: A hidden metric tracking time spent in-game vs. median values.</li>
            <li><strong>Frequency</strong>: How often the player checks in (e.g., average visits per 3-hour window).</li>
            <li><strong>Currency</strong>: Earned via milestones, used for cosmetics/food.</li>
        </ul>
        <p><strong>Pet Metrics (Outputs):</strong></p>
        <ul>
            <li><strong>Loved</strong>: (Range: Not Loved ↔ Loved)</li>
            <li><strong>Excitement</strong>: (Range: Sleepy ↔ Zoomies)</li>
            <li><strong>Hunger</strong>: (Range: Stuffed ↔ Starving)</li>
            <li><strong>Temperament</strong>: (Range: Angry ↔ Very Happy)</li>
        </ul>
    </div>
</div>

<!-- Calculation Logic -->
<div class="cs-section reverse">
    <div class="cs-media-col">
        <div class="landscape-frame">
            <img src="/img/Terra/Plumo/AI pet (4).png" alt="Figure 2: Mathematical formulas">
        </div>
        <p class="caption">Figure 2: Mathematical formulas for Presence (time spent) and Frequency (visits per interval).</p>
    </div>
    <div class="cs-text-col">
        <h4>Calculation Logic</h4>
        <p>To ensure the pet doesn't feel needy but rewards consistent play, we calculate Presence and Frequency using weighted modifiers over time, rather than raw play sessions.</p>
    </div>
</div>

<!-- State Machine & Behavior -->
<div class="cs-section">
    <div class="cs-media-col">
        <div class="landscape-frame">
            <img src="/img/Terra/Plumo/AI pet (8).png" alt="Figure 3: The Priority List">
        </div>
        <p class="caption">Figure 3: The Priority List—Negatives (Starving, Anger) always override Positives.</p>
    </div>
    <div class="cs-text-col">
        <h3>4. The State Machine & Behavior</h3>
        <p>Plumo’s behavior is not random; it is a prioritized state machine. The pet cannot be "Playful" if it is "Starving."</p>

        <h4>Priority Hierarchy</h4>
        <p>The system checks for critical states before allowing positive interactions.</p>
        <ul>
            <li><strong>Starving</strong>: Overrides all other states. The pet denies games and petting.</li>
            <li><strong>Not Loved</strong>: Dislikes petting, creates "Angry" responses.</li>
            <li><strong>Tired/Sleepy</strong>: Slows animation speed (0.5x), denies food.</li>
            <li><strong>Positives</strong>: If no negatives exist, the pet defaults to Loved/Happy/Playful.</li>
        </ul>
    </div>
</div>

<!-- Internal System Impacts -->
<div class="cs-section reverse">
    <div class="cs-media-col">
        <div class="landscape-frame">
            <img src="/img/Terra/Plumo/AI pet (6).png" alt="Figure 4: System Internal Impacts">
        </div>
        <p class="caption">Figure 4: System Internal Impacts detailing how states like "Bored" or "Zoomies" affect the decay/growth of other metrics.</p>
    </div>
    <div class="cs-text-col">
        <h4>Internal System Impacts</h4>
        <p>Every state has a ripple effect. For example, if the pet enters "Zoomies" (High Excitement), the animation speed increases to 1.5x, but Hunger increases faster due to energy expenditure.</p>
    </div>
</div>

<!-- Visual Feedback & Animations -->
<div class="cs-section">
    <div class="cs-media-col">
        <div class="landscape-frame">
            <img src="/img/Terra/Plumo/AI pet (5).png" alt="Figure 5: Animation flow">
        </div>
        <p class="caption">Figure 5: Animation flow showing how metrics drive transitions (e.g., Sleepy → Yawning → Waking Up).</p>
    </div>
    <div class="cs-text-col">
        <h4>Visual Feedback & Animations</h4>
        <p>The state machine drives the visual presentation directly:</p>
        <ul>
            <li><strong>Ear Color</strong>: Changes dynamically (Pink=Calm, Yellow=Super Happy, Blue=Sad).</li>
            <li><strong>Animation Blending</strong>: Transitions from Idle_Sad to Idle_Happy are smoothed based on the metric sliders.</li>
        </ul>
    </div>
</div>

<!-- Player Actions & Mechanics -->
<div class="cs-section reverse">
    <div class="cs-media-col">
        <div class="landscape-frame">
            <img src="/img/Terra/Plumo/AI pet (1).png" alt="Figure 6: Direct Action Impacts">
        </div>
        <p class="caption">Figure 6: Direct Action Impacts—How specific actions immediately shift the sliders.</p>
    </div>
    <div class="cs-text-col">
        <h3>5. Player Actions & Mechanics</h3>
        
        <h4>Direct Actions</h4>
        <ul>
            <li><strong>Feeding</strong>: Drag-and-drop mechanics.
                <ul>
                    <li><em>Logic</em>: Repeatedly feeding the same item causes "Dislike." Starvation resets preferences (starving pets eat anything).</li>
                </ul>
            </li>
            <li><strong>Petting</strong>: Haptic-based interaction (rubbing head/tummy).
                <ul>
                    <li><em>Logic</em>: Gentle rubs increase Bonding. "Poking" or rapid tapping decreases Temperament.</li>
                </ul>
            </li>
            <li><strong>Chatting</strong>: Open-ended LLM conversation.
                <ul>
                    <li><em>Logic</em>: Sentiment analysis determines if the chat is "Kind" or "Profane." Note: Chatting burns energy, making the pet hungrier over time.</li>
                </ul>
            </li>
        </ul>
    </div>
</div>

<!-- Indirect Actions -->
<div class="cs-section">
    <div class="cs-media-col">
        <div class="landscape-frame">
            <img src="/img/Terra/Plumo/AI pet (2).png" alt="Figure 7: Indirect Action Impacts">
        </div>
        <p class="caption">Figure 7: Indirect Action Impacts—The secondary consequences of actions (e.g., Gaming causes Hunger).</p>
    </div>
    <div class="cs-text-col">
        <h4>Indirect Actions & Consequences</h4>
        <p>Actions have side effects. For example, playing a mini-game increases Bonding and Excitement, but drastically spikes Hunger. If the player loses a game, the pet's Temperament might drop (sore loser), whereas winning boosts Temperament.</p>
    </div>
</div>

<!-- Mini-Games & AI Integration -->
<div class="cs-section reverse">
    <div class="cs-media-col">
        <div class="landscape-frame">
            <img src="/img/Terra/Plumo/AI pet (7).png" alt="Figure 8: Mini-Game Logic Flow">
        </div>
        <p class="caption">Figure 8: Mini-Game Logic Flow—How the LLM interprets game data to generate dialogue.</p>
    </div>
    <div class="cs-text-col">
        <h3>6. Mini-Games & AI Integration</h3>
        <p>Mini-games act as the primary bonding exercise. They are not just static scripts but utilize the LLM for dynamic responses.</p>
        <p><strong>Games Included</strong>: Tic-Tac-Toe, Pictionary, Jigsaw, Jenga, Guess Who.</p>
        <p><strong>LLM Role</strong>:</p>
        <ul>
            <li><strong>Inputs</strong>: The system feeds game state (e.g., "Player placed X at B2") to the LLM.</li>
            <li><strong>Outputs</strong>: The LLM generates "Quips," "Celebrations" (if winning), or "Sore Loser" remarks (if losing).</li>
            <li><strong>Skill Growth</strong>: The pet has a hidden skill level. As you play more Tic-Tac-Toe, the AI becomes smarter/harder to beat.</li>
        </ul>
    </div>
</div>

<!-- User Experience: Onboarding Flow -->
<div class="cs-section">
    <div class="cs-media-col">
        <div class="landscape-frame">
            <img src="/img/Terra/Plumo/AI pet onboarding 1.png" alt="Figure 9: Onboarding Part 1" style="margin-bottom: 1rem;">
            <img src="/img/Terra/Plumo/AI pet onboarding 2.png" alt="Figure 10: Onboarding Part 2">
        </div>
        <p class="caption">Figure 9 & 10: Onboarding Steps - Trust mechanics and naming.</p>
    </div>
    <div class="cs-text-col">
        <h3>7. User Experience: Onboarding Flow</h3>
        <p>The onboarding introduces the emotional weight of the pet immediately.</p>
        <ul>
            <li><strong>FPV Entry</strong>: The player enters the room.</li>
            <li><strong>Scared State</strong>: The pet hides (Blue ears, Sad animation).</li>
            <li><strong>Trust Building</strong>: Player must wait/speak gently.</li>
            <li><strong>First Contact</strong>: Player pets the creature → Ears turn Pink → "Are you Mama or Papa?" dialogue triggers.</li>
        </ul>
    </div>
</div>

<!-- State Machine Simulation -->
<div class="cs-section">
    <div class="cs-media-col">
        <div class="landscape-frame" style="aspect-ratio: 16/9;">
            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/wtgzq7son0c" title="Plumo state machine" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
        <p class="caption">Simulation Showcase: A demonstration of the state machine logic.</p>
    </div>
    <div class="cs-text-col" style="width: 100%;">
        <h3>8. State Machine Simulation</h3>
        <p>The heart of Plumo is a deterministic state machine that manages the chaotic nature of a virtual pet. It ensures that the pet's behavior is consistent, logical, and responsive to the "Co-Parenting" actions.</p>
        
        <h4>The Simulation Loop</h4>
        <p>The system runs on a continuous loop where Player Actions modify Internal Metrics, which in turn dictate the Active State.</p>

        <h5>1. Input: Direct & Indirect Impact</h5>
        <p>Every action carries a "payload" of metric adjustments. We differentiate between direct intent and side effects.</p>
        <ul>
            <li><strong>Scenario</strong>: The player chooses to play Tic-Tac-Toe.</li>
            <li><strong>Direct Impact</strong>: Excitement increases (Pet loves playing). Bonding increases.</li>
            <li><strong>Indirect Impact (Side Effect)</strong>: Hunger spikes drastically. Brainwork burns energy faster than idling.</li>
            <li><strong>Result</strong>: The pet becomes happier but physically needier.</li>
        </ul>

        <h5>2. Logic: Priority & Overrides</h5>
        <p>The State Machine does not treat all metrics equally. It uses a Priority List to determine behavior. Survival needs always override social desires.</p>
        <ul>
            <li><strong>The Check</strong>: <code>If (Hunger > Threshold) { State = STARVING; }</code></li>
            <li><strong>The Override</strong>: Even if Excitement is 100% (Zoomies), if the pet is Starving, the "Starving" state takes precedence.</li>
            <li><strong>Behavioral Consequence</strong>: The pet will deny a request to play a mini-game. The LLM is instructed to reject the prompt with a "hungry" specific dialogue.</li>
        </ul>

        <h5>3. Output: State Transitions</h5>
        <p>The simulation smooths transitions to prevent robotic snapping between states.</p>
        <ul>
            <li><strong>Decay/Growth</strong>: If the pet is "Zooming" (High Excitement), the Hunger metric decays faster than normal (1.5x rate).</li>
            <li><strong>Visual State</strong>: The Unity Animator blends from Idle_Happy to Idle_Hungry based on these floating-point values.</li>
        </ul>
    </div>
</div>

<!-- Prompting Work & LLM Architecture -->
<div class="cs-section">
    <div class="cs-text-col" style="width: 100%;">
        <h3>9. Prompting Work & LLM Architecture</h3>
        <p>Plumo acts as a "living" character by wrapping a Large Language Model (LLM) in a strict set of constraints. We do not simply "chat" with the AI; we pipe game data into a Single Source of Truth (SSOT) structure that forces the AI to act as both a Game Engine and a Character.</p>

        <h4>A. The "Mumble" Speech Engine</h4>
        <p>To convey the feeling of a 2-4 year old, we developed a custom phonetic filter called Mumble Speak (MD). The LLM generates two versions of every response.</p>
        <ul>
            <li><strong>DD (Display Dialogue)</strong>: The readable, correctly spelled line for the player (Subtitle).</li>
            <li><strong>MD (Mumble Dialogue)</strong>: A phonetic transcription mimicking toddler speech impediments.</li>
        </ul>
        <p><em>The Rules of Mumble:</em></p>
        <ul>
            <li><strong>Softening</strong>: Hard consonants like 'r' and 'l' shift to 'w' or 'y' (e.g., run → wun).</li>
            <li><strong>Lisps</strong>: 'th' becomes 'd' or 'f' (e.g., that → dat).</li>
            <li><strong>Reduction</strong>: Complex clusters are simplified (e.g., sleep → seep).</li>
            <li><strong>Stutter</strong>: Natural pauses (um, uh) are inserted to simulate thinking.</li>
        </ul>

        <h4>B. The Wire Protocol (Strict KV Output)</h4>
        <p>To prevent the game from crashing, the LLM is forbidden from outputting Markdown, JSON, or conversational filler. It must adhere to a strict Key-Value (KV) format.</p>
        <pre style="background: #2d2d2d; color: #ddd; padding: 1rem; border-radius: 5px; overflow-x: auto;">
EM: CU        <-- Emotion Code (Curious)
MA: 25        <-- Maturity Level (Controls Vocab Complexity)
MO: 0         <-- Minigame Output (Engine Flag)
MD: Aww gess now!  <-- The Audio file to play (Mumble)
DD: Awww guess now! <-- The Text to display
DG: clock, watch, timer <-- Data for Game Logic (Pictionary Guesses)
        </pre>

        <h4>C. Context-Aware Gameplay Modules</h4>
        <p>Different game modes swap out the system prompt to change the AI's "brain" while keeping the personality consistent.</p>
        <ul>
            <li><strong>Case Study: Pictionary</strong>
                <ul>
                    <li>When playing Pictionary, the AI acts as the Guesser.</li>
                    <li><strong>Input</strong>: The system tells the AI "State = PetGuessing".</li>
                    <li><strong>Constraint</strong>: The AI must generate 3 lowercase noun guesses based on Tier-1 vocabulary (simple objects like sun, tree, ball).</li>
                    <li><strong>Visual Intelligence</strong>: The DG field (Drawing Guess) allows the C# backend to check if the AI "won" the round without the player seeing the logic.</li>
                </ul>
            </li>
            <li><strong>Case Study: Tic-Tac-Toe</strong>
                <ul>
                    <li>When playing Tic-Tac-Toe, the AI acts as the Opponent Engine.</li>
                    <li><strong>Logic</strong>: It uses a deterministic "Decision Order" (Win Now → Block → Fork) to ensure it plays competently.</li>
                    <li><strong>Coupling</strong>: It generates PRE (Anticipation) and POST (Reaction) dialogue lines that must logically flow together, creating a seamless narrative moment around a single move.</li>
                </ul>
            </li>
        </ul>

        <h4>D. Personality Evolution (Maturity Gating)</h4>
        <p>Plumo grows up. The Maturity (MA) metric gates the AI's vocabulary, ensuring it learns like a real child.</p>
        <table>
            <thead>
                <tr>
                    <th>Maturity (MA)</th>
                    <th>Concept</th>
                    <th>Vocabulary Constraint</th>
                    <th>Example</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>0 - 30%</td>
                    <td>Sensory</td>
                    <td>Max 4 words. No time concepts.</td>
                    <td>"Me want food!"</td>
                </tr>
                <tr>
                    <td>30 - 60%</td>
                    <td>Action</td>
                    <td>Max 6 words. Concepts: "Sorry", "Share".</td>
                    <td>"I sorry I make mess."</td>
                </tr>
                <tr>
                    <td>60 - 100%</td>
                    <td>Abstract</td>
                    <td>Max 8 words. Concepts: "Promise", "Dream".</td>
                    <td>"I promise I be brave tomorrow."</td>
                </tr>
            </tbody>
        </table>
        <p>This system ensures that a "Newborn" Plumo feels distinctly different from a "Raised" Plumo, rewarding long-term co-parenting.</p>
    </div>
</div>
