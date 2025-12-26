---
layout: work_detail
title: "Plugo Coding"
tagline: "Logical Thinking through Tactile Play"
hero_image: "/img/Playshifu/plugo_coding_1.png"
hide_header: true
custom_class: plugo-page
# video_id: "Insert_YouTube_ID_Here"
---



<!-- Credits Section -->
<!-- Intro Section -->
<!-- Hero Section (Title, Tagline, Overview, Image) -->
<div class="cs-hero">
    <div class="cs-hero-content">
        <h1 style="color: white; margin-bottom: 0px;">Plugo Coding</h1>
        <span class="tagline" style="display: block; margin-bottom: 0rem; font-size: 1.2rem; color: #888; font-weight: 300;">Logical Thinking through Tactile Play</span>
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
            <p style="max-width: 60ch; font-size: 1.2rem; color: #ddd; line-height: 1.6;">Plugo Coding teaches the fundamentals of programming—sequences, loops, and conditions—without any screens-only abstraction. Kids simply snap physical blocks to issue commands.</p>
        </div>
    </div>
    <div class="cs-hero-image">
        <img src="{{ page.hero_image }}" alt="Plugo Coding Hero Image">
    </div>
</div>

<!-- Section 1: Landscape Video Left (Placeholder), Text Right -->
<div class="cs-section">
    <div class="cs-media-col">
        <div class="landscape-frame">
            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/NKrER05en_g" title="Plugo Coding Video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
    </div>   
    
    <div class="cs-text-col">
        <h3>Key Features</h3>
        <ul>
            <li><strong>Physical Coding</strong>: Commands are physical blocks (Move, Jump, Loop).</li>
            <li><strong>Progressive Learning</strong>: Levels scale from basic sequencing to complex functions.</li>
            <li><strong>Creative Problem Solving</strong>: Open-ended challenges that allow multiple solutions.</li>
        </ul>
    </div>
</div>

<!-- Section 2: Text Left, Landscape Video Right (Placeholder) -->
<div class="cs-section reverse">
    <div class="cs-media-col">
        <div class="landscape-frame">
            <img src="/img/Playshifu/plugocoding/plugocoding_3.avif" alt="Plugo Coding Blocks" style="opacity: 0.8;">
        </div>
    </div>
    <div class="cs-text-col">
        <h3>Design Contributions</h3>
        <p>Focused on the "Tangible Syntax" problem—how to make physical blocks represent abstract code concepts intuitively for a 5-year-old. Designed the progression curve to introduce loops and conditionals as "shortcuts" rather than complex rules.</p>
    </div>
</div>


<!-- Carousel Section -->
{% assign project_data = nil %}
{% for job in site.data.work %}
  {% assign found = job.projects | where: "title", "Plugo Coding" | first %}
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
                <img src="{{ img }}" alt="Plugo Coding Screenshot" class="carousel-card">
                {% endfor %}
            </div>
        </div>
        <div class="carousel-btn next" aria-label="Next Image"><i class="fas fa-chevron-right"></i></div>
    </div>
</div>
{% endif %}

<!-- Documentation Card (Compact + NDA Lock) -->
<div class="doc-card-container compact-card">
    <div class="doc-card">
        <div onclick="alert('NDA locked, Can show it personally')" style="cursor: not-allowed; display: block; color: inherit; text-decoration: none;">
            <img src="/img/Playshifu/plugo_coding_1.png" alt="Documentation Thumbnail">
            <div class="doc-card-content">
                <h4><i class="fas fa-lock" style="margin-right: 5px;"></i> Documentation</h4>
                <p>Detailed documentation of my process and research will be here.</p>
            </div>
        </div>
    </div>
</div>

