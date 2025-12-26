---
layout: work_detail
title: "Floatbusters"
tagline: "Co-op puzzle shooter in zero gravity"
hero_image: "/img/Terra/floatbusters/floatbuster.png"
hide_header: true
custom_class: floatbusters-page
# video_id: "Insert_YouTube_ID_Here"
---

<!-- Intro Section -->
<div class="cs-hero">
    <div class="cs-hero-content">
        <h1 style="color: white; margin-bottom: 0px;">Floatbusters</h1>
        <span class="tagline" style="display: block; margin-bottom: 0rem; font-size: 1.2rem; color: #888; font-weight: 300;">An open-world treasure hunt where every corner of the map hides a new “AHA!”… and a Floaty.</span>
        <span class="tagline" style="display: block; margin-bottom: 3rem; font-size: 0.9rem; color: #888; font-weight: 300; font-style: italic;">Role - Lead Game Designer</span>
        
<!--
        <div class="cs-contributions" style="margin-top: 2rem; margin-bottom: 2rem;">
            <span class="skill-tag">Game Design</span>
            <span class="skill-tag">System Design</span>
            <span class="skill-tag">Prototyping</span>
        </div> -->
        
        <div class="cs-overview" style="margin-top: 4rem;">
            <h3>Overview</h3>
            <p style="max-width: 60ch; font-size: 1.2rem; color: #ddd; line-height: 1.6;">Floatbusters is an open-world exploration + puzzle multiplayer game for 6–8 year olds. Players roam an intricate map across 4 main areas and 2 hidden areas, hunting for collectible Floaties. The loop is simple and motivating: explore, discover secrets, and complete your collection—solo or with friends.</p>
        </div>
    </div>
    <div class="cs-hero-image">
        <img src="{{ page.hero_image }}" alt="Floatbusters Hero Image">
    </div>
</div>

<!-- Section 1 -->
<div class="cs-section">
    <div class="cs-media-col">
        <div style="display: flex; flex-direction: column; align-items: center;">
            <div class="landscape-frame">
                <video autoplay loop muted playsinline controls preload="auto">
                    <source src="{{ '/img/Terra/floatbusters/Floatbusters_Clip1.mp4' | relative_url }}" type="video/mp4">
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
            <li><strong>Exploration-first open world</strong>: A dense, kid-friendly map designed to reward curiosity, letting players “stumble into” discoveries instead of following strict objectives.</li>
            <li><strong>Collect-a-thon progression</strong>: Finding Floaties becomes a self-driven mission—players naturally want to complete the set, turning discovery into replay.</li>
            <li><strong>Hidden-area prototypes that shipped</strong>: Custom prototypes were developed and integrated as final content, including two secret zones: the Mountain and the Clouds—with the Mountain built as an interconnected path network that loops back into the open world.</li>
        </ul>
    </div>
</div>

<!-- Section 2 -->
<div class="cs-section reverse">
    <div class="cs-media-col">
        <div style="display: flex; flex-direction: column; align-items: center;">
            <div class="landscape-frame">
                <video autoplay loop muted playsinline controls preload="auto">
                    <source src="{{ '/img/Terra/floatbusters/Floatbusters_Clip2.mp4' | relative_url }}" type="video/mp4">
                </video>
            </div>
            <div class="video-reload">
                crtl/cmd + shift + r
            </div>
        </div>
    </div>
    <div class="cs-text-col">
        <h3>Design Focus</h3>
        <p>This was one of my first 3D + multiplayer projects at Terra, which meant learning the practical realities of multiplayer constraints while still delivering a smooth, magical exploration experience. The challenge was keeping navigation intuitive for young players, making secrets feel discoverable (not frustrating), and ensuring multiplayer didn’t disrupt the flow of exploration.</p>
    </div>
</div>

<!-- Section 3 -->
<div class="cs-section">
    <div class="cs-media-col">
        <div style="display: flex; flex-direction: column; align-items: center;">
            <div class="landscape-frame">
                <video autoplay loop muted playsinline controls preload="auto">
                    <source src="{{ '/img/Terra/floatbusters/Floatbusters_Clip3.mp4' | relative_url }}" type="video/mp4">
                </video>
            </div>
            <div class="video-reload">
                crtl/cmd + shift + r
            </div>
        </div>
    </div>
    <div class="cs-text-col">
        <h3>A map designed to trigger joy loops</h3>
        <p>Floatbusters is built around a “just one more Floaty” feeling. Players don’t need heavy tutorials—the environment itself teaches through landmarks, sightlines, and gentle gating. When kids (and adults) say they have to find them all, that’s the map doing its job.</p>
        <h3>Prototyping secrets into real content</h3>
        <p>The hidden areas weren’t just “bonus rooms”—they were crafted prototypes that evolved into full experiences. The Mountain, especially, is designed like a mini-maze of interconnected routes that still feels part of the same world, making discovery feel earned and memorable.</p>
    </div>
</div>

<!-- Section 4 -->
<div class="cs-section reverse">
    <div class="cs-media-col">
        <div style="display: flex; flex-direction: column; align-items: center;">
            <div class="landscape-frame">
                <video autoplay loop muted playsinline controls preload="auto">
                    <source src="{{ '/img/Terra/floatbusters/Floatbusters_Clip4.mp4' | relative_url }}" type="video/mp4">
                </video>
            </div>
            <div class="video-reload">
                crtl/cmd + shift + r
            </div>
        </div>
    </div>
    <div class="cs-text-col">
        <h3>Outcome</h3>
        <p>One of my most positively received projects—players young and old consistently shared joy and strong “completion drive,” with many expressing a desire to find every Floaty in the world.</p>
    </div>
</div>

<!-- Carousel Section 
{% assign project_data = nil %}
{% for job in site.data.work %}
  {% assign found = job.projects | where: "title", "Floatbusters" | first %}
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
                <img src="{{ img }}" alt="Floatbusters Screenshot" class="carousel-card">
                {% endfor %}
            </div>
        </div>
        <div class="carousel-btn next" aria-label="Next Image"><i class="fas fa-chevron-right"></i></div>
    </div>
</div>
{% endif %}
-->

<!-- Credits Section 
<div class="cs-credits">
    <h4>Credits</h4>
    <ul>
        <li><a href="https://www.linkedin.com/in/abhay-dwivedi-07/" target="_blank">Abhay Dwivedi</a></li>
        <li><a href="https://www.linkedin.com/in/arul-prakash-gd/" target="_blank">Arulpraksh P</a></li>
        <li><a href="https://www.linkedin.com/in/samiksha-sharma-5b164221a/" target="_blank">samiksha sharma</a></li>
    </ul>
</div>
-->
<!-- Documentation Card -->
<div class="doc-card-container compact-card">
    <div class="doc-card">
        <div onclick="alert('NDA locked, Can show it personally')" style="cursor: not-allowed; display: block; color: inherit; text-decoration: none;">
            <img src="/img/Terra/floatbusters/floatbuster.png" alt="Documentation Thumbnail">
            <div class="doc-card-content">
                <h4><i class="fas fa-lock" style="margin-right: 5px;"></i> Documentation</h4>
                <p>Detailed documentation of my process and research will be here.</p>
            </div>
        </div>
    </div>
</div>
