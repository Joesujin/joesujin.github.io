---
layout: work_detail
title: "Ship Wars"
tagline: "High-seas tactical naval combat"
hero_image: "/img/Terra/shipwars/shipwars.png"
hide_header: true
custom_class: ship-wars-page
# video_id: "Insert_YouTube_ID_Here"
---

<!-- Intro Section -->
<div class="cs-hero">
    <div class="cs-hero-content">
        <h1 style="color: white; margin-bottom: 0px;">Ship Wars</h1>
        <span class="tagline" style="display: block; margin-bottom: 0rem; font-size: 1.2rem; color: #888; font-weight: 300;">A build-and-battle survival brawler where your bridge is your strategy—and your ship is your life.</span>
        <span class="tagline" style="display: block; margin-bottom: 3rem; font-size: 0.9rem; color: #888; font-weight: 300; font-style: italic;">Role - Lead Game Designer</span>
        
        <div class="cs-overview" style="margin-top: 4rem;">
            <h3>Overview</h3>
            <p style="max-width: 60ch; font-size: 1.2rem; color: #ddd; line-height: 1.6;">Ship Wars is an action multiplayer combat + building game for 8–13 year olds, inspired by Minecraft Bedwars. Players collect resources, build pathways and defenses, invade enemy ships, and destroy their core to become the last player/team standing. The loop is simple to learn, but the matches evolve fast based on how players build and fight.</p>
        </div>
    </div>
    <div class="cs-hero-image">
        <img src="{{ page.hero_image }}" alt="Ship Wars Hero Image">
    </div>
</div>

<!-- Section 1 -->
<div class="cs-section">
    <div class="cs-media-col">
        <div style="display: flex; flex-direction: column; align-items: center;">
            <div class="landscape-frame">
                <video autoplay loop muted playsinline controls preload="auto">
                    <source src="{{ '/img/Terra/shipwars/Shipwars Getting Inthegame.mp4' | relative_url }}" type="video/mp4">
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
            <li><strong>Gridless building system</strong>: A custom, non-grid building mechanic that lets players create their own bridges and structures—more freedom than Minecraft-style block placement, and more room for creativity and skill expression.</li>
            <li><strong>Tight economy that forces conflict</strong>: Rare resources are intentionally placed in contested common areas, pushing players to leave safety, build outward, and engage in combat to power up.</li>
            <li><strong>Emergent match-to-match variety</strong>: Because building is gridless, players invent wildly different bridge shapes, defense layouts, and invasion tactics—so each game feels meaningfully different from the last.</li>
        </ul>
    </div>
</div>

<!-- Section 2 -->
<div class="cs-section reverse">
    <div class="cs-media-col">
        <div style="display: flex; flex-direction: column; align-items: center;">
            <div class="landscape-frame">
                <video autoplay loop muted playsinline controls preload="auto">
                    <source src="{{ '/img/Terra/shipwars/Shipwars Clip5. With Edited Audio.mp4' | relative_url }}" type="video/mp4">
                </video>
            </div>
            <div class="video-reload">
                crtl/cmd + shift + r
            </div>
        </div>
    </div>
    <div class="cs-text-col">
        <h3>Design Challenges</h3>
        <p>The core challenge was balancing creativity with clarity: giving kids expressive building freedom while keeping structures readable, gameplay fair, and combat focused. The economy also had to reliably generate encounters—rewarding smart routing and risk-taking without letting one early advantage snowball into an unwinnable match.</p>
        <h3>A sandbox… with sharp edges</h3>
        <p>Ship Wars is designed to create “I made that!” moments through building, then immediately test those choices through combat pressure. Players don’t just fight—they fight through their own construction decisions, turning bridge shape, wall placement, and defense planning into real strategy.</p>
    </div>
</div>

<!-- Section 1 -->
<div class="cs-section">
    <div class="cs-media-col">
        <div style="display: flex; flex-direction: column; align-items: center;">
            <div class="landscape-frame">
                <video autoplay loop muted playsinline controls preload="auto">
                    <source src="{{ '/img/Terra/shipwars/Shipwarsending.mp4' | relative_url }}" type="video/mp4">
                </video>
            </div>
            <div class="video-reload">
                crtl/cmd + shift + r
            </div>
        </div>
    </div>
    <div class="cs-text-col">
         <h3>A platform-level experiment in items and inventory</h3>
        <p>This game was also part of a bigger initiative: building a holistic items + inventory system for the Terra platform. Ship Wars became a proving ground for how items are collected, stored, used, and surfaced to players—an ambitious exercise that helped validate and stress-test the broader platform ecosystem.</p>
    </div>
</div>

<!-- Section 2 -->
<div class="cs-section reverse">
    <div class="cs-media-col">
        <div style="display: flex; flex-direction: column; align-items: center;">
            <div class="landscape-frame">
                <video autoplay loop muted playsinline controls preload="auto">
                    <source src="{{ '/img/Terra/shipwars/Shipwarsthirdpersonvsfpv.mp4' | relative_url }}" type="video/mp4">
                </video>
            </div>
            <div class="video-reload">
                crtl/cmd + shift + r
            </div>
        </div>
    </div>
    <div class="cs-text-col">
        <h3>Outcome</h3>
        <p>Delivered a prototype that showcased strong potential for replayability and emergent strategy, powered by gridless building freedom and an economy tuned to drive conflict.</p>
    </div>
</div>

<!-- Carousel Section 
{% assign project_data = nil %}
{% for job in site.data.work %}
  {% assign found = job.projects | where: "title", "Ship wars" | first %}
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
                <img src="{{ img }}" alt="Ship Wars Screenshot" class="carousel-card">
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
            <img src="/img/Terra/shipwars/shipwars.png" alt="Documentation Thumbnail">
            <div class="doc-card-content">
                <h4><i class="fas fa-lock" style="margin-right: 5px;"></i> Documentation</h4>
                <p>Detailed documentation of the building system, economy placement logic, item/inventory integration, and core combat loop will be added here.</p>
            </div>
        </div>
    </div>
</div>
