---
layout: work_detail
title: "Cricket Legends"
tagline: "High-stakes cricket campaign based on history"
hero_image: "/img/Terra/Cricket/cricket.png"
hide_header: true
custom_class: cricket-page
# video_id: "Insert_YouTube_ID_Here" 
---


<!-- Intro Section -->
<!-- Hero Section (Title, Tagline, Overview, Image) -->
<div class="cs-hero">
    <div class="cs-hero-content">
        <h1 style="color: white; margin-bottom: 0px;">Cricket Legends</h1>
        <span class="tagline" style="display: block; margin-bottom: 0rem; font-size: 1.2rem; color: #888; font-weight: 300;">A high-stakes cricket game that lets players relive and rewrite history with one clutch decision.</span>
        <span class="tagline" style="display: block; margin-bottom: 0.2rem; font-size: 1rem; color: #888; font-weight: 300; font-style: italic;">Role - Lead Game Designer</span>
        <span class="tagline" style="display: block; margin-bottom: 3rem; font-size: 0.9rem; color: #888; font-weight: 300; font-style: italic;">Development time - 9 weeks</span>

        <div class="cs-overview" style="margin-top: 4rem;">
            <h3>Overview</h3>
            <p style="max-width: 60ch; font-size: 1.2rem; color: #ddd; line-height: 1.6;">Cricket Legends is a sports game built for 13–19 year olds, designed around legendary Indian historical matches that escalate in difficulty. Each match is tuned for drama and mastery, pairing real-cricketer-inspired AI bowlers and animations with a swipe-first batting system that’s instantly readable but deeply skillful.</p>
        </div>
    </div>
    <div class="cs-hero-image">
        <img src="/img/Terra/Cricket/Cricketmultiplayer_splash_3.png" alt="Cricket Legends Hero Image">
    </div>
</div>

<!-- Section 1: Landscape Video Left (Placeholder), Text Right -->
<div class="cs-section">
    <div class="cs-media-col">
        <div style="display: flex; flex-direction: column; align-items: center;">
            <div class="landscape-frame">
                <video autoplay loop muted playsinline controls preload="auto">
                    <source src="{{ '/img/Terra/Cricket/Cricket_Fresh_Firstbatch_handbreaked.mp4' | relative_url }}" type="video/mp4">
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
            <li><strong>Historic, high-pressure match progression</strong>: Iconic matches that grow in difficulty, with intelligent AI bowlers inspired by real players and supported by custom animations.</li>
            <li><strong>Shot coverage + grounded ball behavior</strong>: Full 360° shot selection mapped to contact points, with custom bowling physics and post-shot ball action for a more believable feel.</li>
            <li><strong>Fluid swipe-to-bat controls</strong>: A simple swipe controller where timing + direction drives shot outcome—easy to pick up, challenging to master.</li>
            <li><strong>“Super Sub” alternate-history system</strong>: Swap in a player who never existed in that match (or even that era) to change the outcome and experience a fresh version of the same scenario.</li>
        </ul>
    </div>
</div>

<!-- Section 2: Text Left, Landscape Video Right (Placeholder) -->
<div class="cs-section reverse">
    <div class="cs-media-col">
        <div style="display: flex; flex-direction: column; align-items: center;">
            <div class="landscape-frame">
                 <video autoplay loop muted playsinline controls preload="auto">
                    <source src="{{ '/img/Terra/Cricket/Cricket_Ftue_handbreak.mp4' | relative_url }}" type="video/mp4">
                </video>
            </div>
            <div class="video-reload">
                crtl/cmd + shift + r
            </div>
        </div>
    </div>
    <div class="cs-text-col">
        <h3>Design Challenges</h3>
        <p>The core challenge was making physics feel consistent across every shot while staying readable and fair. This meant building a system that could reliably determine ball projection, compute where contact could happen, and use that information to shape outcomes—like reducing ball speed or adjusting trajectory so the same input could plausibly end in a clean hit, a mistimed edge, or a catch.</p>
    </div>
</div>

<div class="cs-section reverse">
    <div class="cs-media-col">
        <div style="display: flex; flex-direction: column; align-items: center;">
            <div class="landscape-frame">
                <video autoplay loop muted playsinline controls preload="auto">
                    <source src="{{ '/img/Terra/Cricket/Cricket_Fresh_Firstbatch_handbreaked.mp4' | relative_url }}#t=10" type="video/mp4">
                </video>
            </div>
            <div class="video-reload">
                crtl/cmd + shift + r
            </div>
        </div>
    </div>
    <div class="cs-text-col">
        <h3>Cricket that plays like a highlight reel—but runs like a simulation</h3>
        <p>Under the hood, the match experience is driven by a difficulty ramp tied to scenario stakes and bowler intelligence. AI bowlers aren’t generic “accuracy sliders”—they’re designed with real-life inspiration and custom motion, which helps players feel the difference between facing different types of threats as matches intensify.</p>
    </div>
</div>

<div class="cs-section reverse">
    <div class="cs-media-col">
        <div style="display: flex; flex-direction: column; align-items: center;">
            <div class="landscape-frame">
                <video autoplay loop muted playsinline controls preload="auto">
                    <source src="{{ '/img/Terra/Cricket/Cricket_Homepag_ Menu_handbreaked.mp4' | relative_url }}" type="video/mp4">
                </video>
            </div>
            <div class="video-reload">
                crtl/cmd + shift + r
            </div>
        </div>
    </div>
    <div class="cs-text-col">
        <h3>Replayable history, with a controlled dose of chaos</h3>
        <p>The Super Sub system adds a “what-if” layer without breaking the fantasy: players can bring in unexpected talent to flip the narrative, creating replay value while keeping the match structure familiar. It’s the same match… until it’s your version of it.</p>
        <h3>Outcome</h3>
        <p>Delivered a highly positive prototype that was well received, showing strong retention signals (high D1 and D7) and very high average and median playtime—driven by high-stakes scenario design and mastery-focused controls.</p>
    </div>
</div>

<!-- Documentation Card (Compact + NDA Lock) -->
<div class="doc-card-container compact-card">
    <div class="doc-card">
        <div onclick="alert('NDA locked, Can show it personally')" style="cursor: not-allowed; display: block; color: inherit; text-decoration: none;">
            <img src="/img/Terra/Cricket/cricket.png" alt="Documentation Thumbnail">
            <div class="doc-card-content">
                <h4><i class="fas fa-lock" style="margin-right: 5px;"></i> Documentation</h4>
                <p>Detailed documentation of physics + contact logic, shot mapping, difficulty ramping, and the Super Sub system will be added here.</p>
            </div>
        </div>
    </div>
</div>

<!-- Carousel Section -->
{% assign project_data = nil %}
{% for job in site.data.work %}
  {% assign found = job.projects | where: "title", "Cricket Legends" | first %}
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
                <img src="{{ img }}" alt="Cricket Screenshot" class="carousel-card">
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
        <li><a href="https://www.linkedin.com/in/ashish-kishore-kumar/" target="_blank">Ashish Kumar</a></li>
        <li><a href="https://www.linkedin.com/in/abhay-dwivedi-07/" target="_blank">Abhay Dwivedi</a></li>
        <li><a href="https://www.linkedin.com/in/arul-prakash-gd/" target="_blank">Arulpraksh P</a></li>
        <li><a href="https://www.linkedin.com/in/samiksha-sharma-5b164221a/" target="_blank">samiksha sharma</a></li>
        <li><a href="https://www.linkedin.com/in/priyansh-shekhar-a3b212231/" target="_blank">Priyansh Shekhar</a></li>
        
    </ul>
</div>
