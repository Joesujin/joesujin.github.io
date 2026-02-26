---
layout: work_detail
title: "Stumble Cars - Multiplayer"
tagline: "Chaotic multiplayer car battle-race"
hero_image: "/img/Terra/stumble cars/stumble_cars.png"
hide_header: true
custom_class: stumble-cars-page
# video_id: "Insert_YouTube_ID_Here"
---

<!-- Intro Section -->
<div class="cs-hero">
    <div class="cs-hero-content">
        <h1 style="color: white; margin-bottom: 0px;">Stumble Cars</h1>
        <span class="tagline" style="display: block; margin-bottom: 0rem; font-size: 1.2rem; color: #888; font-weight: 300;">A chaotic knockout racer where precision driving meets “oops I’m flying” energy.</span>
        <span class="tagline" style="display: block; margin-bottom: 3rem; font-size: 0.9rem; color: #888; font-weight: 300; font-style: italic;">Role - Lead Game Designer</span>
<!--     
        <div class="cs-contributions" style="margin-top: 2rem; margin-bottom: 2rem;">
            <span class="skill-tag">Game Design</span>
            <span class="skill-tag">System Design</span>
            <span class="skill-tag">Prototyping</span>
        </div>
-->   
        <div class="cs-overview" style="margin-top: 4rem;">
            <h3>Overview</h3>
            <p style="max-width: 60ch; font-size: 1.2rem; color: #ddd; line-height: 1.6;">Stumble Cars is a racing game for 13–18 year olds built around short, competitive obstacle-course rounds. Players race through increasingly difficult tracks in a 3-round knockout format—survive the chaos, outdrive the pack, and be the first to reach the finish.</p>
        </div>
    </div>
    <div class="cs-hero-image">
        <img src="{{ page.hero_image }}" alt="Stumble Cars Hero Image">
    </div>
</div>

<!-- Section 1 -->
<div class="cs-section">
    <div class="cs-media-col">
        <div style="display: flex; flex-direction: column; align-items: center;">
            <div class="landscape-frame">
                <video autoplay loop muted playsinline controls preload="auto">
                    <source src="{{ '/img/Terra/stumble cars/Carobby_vid_1Handbraked.mp4' | relative_url }}" type="video/mp4">
                </video>
            </div>
            <div class="video-reload">
                crtl/cmd + shift + r
            </div>
        </div>
    </div>
    <div class="cs-text-col">
        <h3>Key Features</h3>
        <ul>
            <li><strong>Physics-Based Chaos</strong>: Slippery-but-controllable handling that’s fun at low skill, but rewards mastery—plus upgrades that meaningfully improve performance.</li>
            <li><strong>Difficulty-based track pool</strong>: 15+ tracks that surface dynamically based on round difficulty, keeping runs fresh and pacing tight.</li>
            <li><strong>Social multiplayer rooms</strong>: Play with friends via share-code lobbies (up to 8 players), with bots filling the grid when needed.</li>
        </ul>
    </div>
</div>

<!-- Section 2 -->
<div class="cs-section reverse">
    <div class="cs-media-col">
        <div style="display: flex; flex-direction: column; align-items: center;">
            <div class="landscape-frame">
                <video autoplay loop muted playsinline controls preload="auto">
                    <source src="{{ '/img/Terra/stumble cars/Carobby_vid_2Handbraked.mp4' | relative_url }}" type="video/mp4">
                </video>
            </div>
            <div class="video-reload">
                crtl/cmd + shift + r
            </div>
        </div>
    </div>
    <div class="cs-text-col">
        <h3>Design Approach</h3>
        <p>The goal was to create "Streamable Chaos." The systems were designed to encourage funny moments and near-misses that players would want to share. Balancing the physics to be forgiving yet chaotic was key to the "stumble" feel.</p><h3>Built for short sessions, big moments</h3>
        <p>The handling model is intentionally “stumbly” without becoming random—players can drift, bump, recover, and clutch wins through clean lines and smart speed control. Tracks escalate in complexity across rounds to create a natural skill curve and that “one more run” pull.</p>
    </div>
</div>

<!-- Section 3 -->
<div class="cs-section">
    <div class="cs-media-col">
        <div style="display: flex; flex-direction: column; align-items: center;">
            <div class="landscape-frame">
                <video autoplay loop muted playsinline controls preload="auto">
                    <source src="{{ '/img/Terra/stumble cars/Carobby_Vid_3Handbraked.mp4' | relative_url }}" type="video/mp4">
                </video>
            </div>
            <div class="video-reload">
                crtl/cmd + shift + r
            </div>
        </div>
    </div>
    <div class="cs-text-col">
        <h3>Multiplayer that doesn’t need a spreadsheet to start</h3>
        <p>The share-code system makes it easy to jump into a match with friends instantly, while bots keep matchmaking friction low. The result is a party-racer vibe: lightweight entry, competitive payoff.</p>
        <h3>Outcome</h3>
        <p>Delivered a multiplayer-ready prototype designed for high replayability through quick knockout rounds, escalating track difficulty, and social play.</p>
    </div>
</div>

<!-- Carousel Section -->
{% assign project_data = nil %}
{% for job in site.data.work %}
  {% assign found = job.projects | where: "title", "Stumble cars - Multiplayer" | first %}
  {% if found %}
    {% assign project_data = found %}
    {% break %}
  {% endif %}
{% endfor %}

{% if project_data.images %}
<div class="cs-section" style="display: block;">
    <h3 style="text-align: center; margin-bottom: 2rem;">Gallery</h3>
    <div class="carousel-wrapper">
        <div class="carousel-btn prev" aria-label="Previous Image"><i class="fas fa-chevron-left"></i></div>
        <div class="carousel-track-container">
            <div class="carousel-track">
                {% for img in project_data.images %}
                <img src="{{ img }}" alt="Stumble Cars Screenshot" class="carousel-card">
                {% endfor %}
            </div>
        </div>
        <div class="carousel-btn next" aria-label="Next Image"><i class="fas fa-chevron-right"></i></div>
    </div>
</div>
{% endif %}

<!-- Credits Section -->
<div class="cs-credits">
    <h4>Credits</h4>
    <ul>
        <li><a href="https://www.linkedin.com/in/abhay-dwivedi-07/" target="_blank">Abhay Dwivedi</a></li>
        <li><a href="https://www.linkedin.com/in/arul-prakash-gd/" target="_blank">Arulpraksh P</a></li>
        <li><a href="https://www.linkedin.com/in/samiksha-sharma-5b164221a/" target="_blank">samiksha sharma</a></li>
    </ul>
</div>

<!-- Documentation Card -->
<div class="doc-card-container compact-card">
    <div class="doc-card">
        <div onclick="alert('NDA locked, Can show it personally')" style="cursor: not-allowed; display: block; color: inherit; text-decoration: none;">
            <img src="/img/Terra/stumble cars/stumble_cars.png" alt="Documentation Thumbnail">
            <div class="doc-card-content">
                <h4><i class="fas fa-lock" style="margin-right: 5px;"></i> Documentation</h4>
                <p>Detailed documentation of vehicle tuning, track difficulty routing, obstacle systems, and bot navigation/avoidance behaviors will be added here.</p>
            </div>
        </div>
    </div>
</div>
