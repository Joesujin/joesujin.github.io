---
layout: work_detail
title: "Plugo Detective"
tagline: "AR Spy Kit for Little Agents"
hero_image: "/img/Playshifu/plugo_detective.avif"
hide_header: true
custom_class: plugo-page
# video_id: "Insert_YouTube_ID_Here"
---



<!-- Intro Section -->
<div class="cs-hero">
    <div class="cs-hero-content">
        <h1 style="color: white; margin-bottom: 0px;">Plugo Detective</h1>
        <span class="tagline" style="display: block; margin-bottom: 0rem; font-size: 1.2rem; color: #888; font-weight: 300;">AR Spy Kit for Little Agents</span>
        <span class="tagline" style="display: block; margin-bottom: 3rem; font-size: 0.9rem; color: #888; font-weight: 300; font-style: italic;">Role - Lead Game Designer</span>

<!--     
        <div class="cs-contributions" style="margin-top: 2rem; margin-bottom: 2rem;">
            <span class="skill-tag">Game Design</span>
            <span class="skill-tag">System Design</span>
            <span class="skill-tag">Prototyping</span>
        </div> -->
        
        <div class="cs-overview" style="margin-top: 4rem;">
            <h3>Overview</h3>
            <p style="max-width: 60ch; font-size: 1.2rem; color: #ddd; line-height: 1.6;">Plugo Detective turns the tablet into a crime-solving gadget. Kids use a real physical sliding glass gizmo to solve puzzles on screen, engaging in logic and deduction missions.</p>
        </div>
    </div>
    <div class="cs-hero-image">
        <img src="{{ page.hero_image }}" alt="Plugo Detective Hero Image">
    </div>
</div>

<!-- Section 1 -->
<div class="cs-section">
    <div class="cs-media-col">
        <div class="landscape-frame">
            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/tFhdAGgm1i0" title="Plugo Detective Video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
    </div>   
    <div class="cs-text-col">
        <h3>Key Features</h3>
        <ul>
            <li><strong>Physical Gizmo</strong>: Use a slider lens to hunt for clues and decrypt codes.</li>
            <li><strong>Logic Puzzles</strong>: Deductive reasoning challenges disguised as spy missions.</li>
            <li><strong>Whodunnit Mysteries</strong>: Narrative-driven cases with multiple suspects.</li>
        </ul>
    </div>
</div>

<!-- Section 2 -->
<div class="cs-section reverse">
    <div class="cs-media-col">
        <div class="landscape-frame">
             <img src="/img/Playshifu/plugodetective/plugodetective_3.avif" alt="Plugo Detective Gameplay" style="opacity: 0.8;">
        </div>
    </div>
    <div class="cs-text-col">
        <h3>Design Focus</h3>
        <p>The core loop revolves around "Observation and Deduction." I focused on creating puzzles that required children to pay attention to details in the physical world (via the lens) to progress in the digital narrative.</p>
    </div>
</div>

<!-- Documentation Card -->

<!-- Carousel Section -->
{% assign project_data = nil %}
{% for job in site.data.work %}
  {% assign found = job.projects | where: "title", "Plugo Detective" | first %}
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
                <img src="{{ img }}" alt="Plugo Detective Screenshot" class="carousel-card">
                {% endfor %}
            </div>
        </div>
        <div class="carousel-btn next" aria-label="Next Image"><i class="fas fa-chevron-right"></i></div>
    </div>
</div>
{% endif %}

<!-- Documentation Card -->
<div class="doc-card-container compact-card">
    <div class="doc-card">
        <div onclick="alert('NDA locked, Can show it personally')" style="cursor: not-allowed; display: block; color: inherit; text-decoration: none;">
            <img src="/img/Playshifu/plugo_detective.avif" alt="Documentation Thumbnail">
            <div class="doc-card-content">
                <h4><i class="fas fa-lock" style="margin-right: 5px;"></i> Documentation</h4>
                <p>Detailed documentation of my process and research will be here.</p>
            </div>
        </div>
    </div>
</div>

