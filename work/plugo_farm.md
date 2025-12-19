---
layout: work_detail
title: "Plugo Farm"
tagline: "Phygital Farm Kit for Early Learners"
hero_image: "/img/Playshifu/plugo_farm.avif"
hide_header: true
custom_class: plugo-page
# video_id: "Insert_YouTube_ID_Here"
---



<!-- Intro Section -->
<div class="cs-hero">
    <div class="cs-hero-content">
        <h1 style="color: white; margin-bottom: 0px;">Plugo Farm</h1>
        <span class="tagline" style="display: block; margin-bottom: 0rem; font-size: 1.2rem; color: #888; font-weight: 300;">Phygital Farm Kit for Early Learners</span>
        <span class="tagline" style="display: block; margin-bottom: 3rem; font-size: 0.9rem; color: #888; font-weight: 300; font-style: italic;">Role - Senior Game Designer</span>
        
        <div class="cs-overview" style="margin-top: 4rem;">
            <h3>Overview</h3>
            <p style="max-width: 60ch; font-size: 1.2rem; color: #ddd; line-height: 1.6;">Plugo Farm is an AR-powered farm kit where kids manage their own digital farm using real physical toys. It bridges tactile play with digital feedback.</p>
        </div>
    </div>
    <div class="cs-hero-image">
        <img src="{{ page.hero_image }}" alt="Plugo Farm Hero Image">
    </div>
</div>

<!-- Section 1 -->
<div class="cs-section">
    <div class="cs-media-col">
        <div class="landscape-frame">
            <img src="/img/Playshifu/plugo_farm_1.avif" alt="Plugo Farm Kit" style="opacity: 0.8;">
        </div>
    </div>
    <div class="cs-text-col">
        <h3>Key Features</h3>
        <ul>
            <li><strong>Tactile Interaction</strong>: Place real farm pieces (barns, tractors, animals) to build in the game.</li>
            <li><strong>Business Logic</strong>: Learn basics of resource management and time management.</li>
            <li><strong>Story Missions</strong>: Engaging narratives that require solving farm problems.</li>
        </ul>
    </div>
</div>

<!-- Section 2 -->
<div class="cs-section reverse">
    <div class="cs-media-col">
        <div class="landscape-frame">
             <img src="/img/Playshifu/plugo_farm.avif" alt="Plugo Farm Gameplay" style="opacity: 0.8;">
        </div>
    </div>
    <div class="cs-text-col">
        <h3>Role & Contribution</h3>
        <p>As Senior Game Designer, I owned the mechanics-to-kit translation. I designed the interaction model where physical placement triggers digital events, ensuring the hardware (camera/mirror) limitations were masked by intuitive gameplay.</p>
    </div>
</div>

<!-- Documentation Card -->
<div class="doc-card-container compact-card">
    <div class="doc-card">
        <div onclick="alert('NDA locked, Can show it personally')" style="cursor: not-allowed; display: block; color: inherit; text-decoration: none;">
            <img src="/img/Playshifu/plugo_farm.avif" alt="Documentation Thumbnail">
            <div class="doc-card-content">
                <h4><i class="fas fa-lock" style="margin-right: 5px;"></i> Documentation</h4>
                <p>Detailed documentation of my process and research will be here.</p>
            </div>
        </div>
    </div>
</div>

<!-- Carousel Section -->
{% assign project_data = nil %}
{% for job in site.data.work %}
  {% assign found = job.projects | where: "title", "Plugo Farm" | first %}
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
                <img src="{{ img }}" alt="Plugo Farm Screenshot" class="carousel-card">
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
        <li><strong>Role</strong>: Senior Game Designer</li>
        <li><strong>Team</strong>: Playshifu Game Team</li>
    </ul>
</div>
