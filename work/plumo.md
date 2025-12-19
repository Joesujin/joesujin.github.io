---
layout: work_detail
title: "Plumo"
tagline: "A talkable AI pet with a rules based “brain”"
hero_image: "/img/Terra/Plumo/plumo.png"
hide_header: true
custom_class: plumo-page
# video_id: "Insert_YouTube_ID_Here" 
---


<!-- Intro Section -->
<!-- Hero Section (Title, Tagline, Overview, Image) -->
<div class="cs-hero">
    <div class="cs-hero-content">
        <h1 style="color: white; margin-bottom: 0px;">Plumo</h1>
        <span class="tagline" style="display: block; margin-bottom: 0rem; font-size: 1.2rem; color: #888; font-weight: 300;">A talkable AI pet with a rules based “brain”</span>
        <span class="tagline" style="display: block; margin-bottom: 0.2rem; font-size: 1rem; color: #888; font-weight: 300; font-style: italic;">Role - Lead Game Designer</span>
        <span class="tagline" style="display: block; margin-bottom: 3rem; font-size: 0.9rem; color: #888; font-weight: 300; font-style: italic;">Development time - 8 weeks</span>
        
        <div class="cs-overview" style="margin-top: 4rem;">
            <h3>Overview</h3>
            <p style="max-width: 60ch; font-size: 1.2rem; color: #ddd; line-height: 1.6;">Plumo is a talkable AI pet built around co-parenting habits and long-term bonding. It features a rules-based "brain" that responds to user interactions in a realistic and engaging way.</p>
        </div>
    </div>
    <div class="cs-hero-image">
        <img src="{{ page.hero_image }}" alt="Plumo Hero Image">
    </div>
</div>

<!-- Section 1: Phone Left, Text Right -->
<div class="cs-section">
    <div class="cs-media-col">
        <div style="display: flex; flex-direction: column; align-items: center;">
            <div class="phone-frame">
                <!-- Replace 'path/to/video1.mp4' with your actual file path (can be .mp4 or .gif) -->
                <video autoplay loop muted playsinline controls preload="auto">
                    <source src="{{ '/img/Terra/Plumo/Plumo_Ftue.mp4' | relative_url }}" type="video/mp4">
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
            <li><strong>Talkable AI</strong>: Engage in conversations with Plumo.</li>
            <li><strong>Co-parenting</strong>: Work together to raise your virtual pet.</li>
            <li><strong>Habit Forming</strong>: Encourages positive habits through gameplay.</li>
        </ul>
        <h3>Design Challenges</h3>
        <p>Designed for Gen Alpha, the core challenge was creating a digital companion that felt “alive” and responsive without full autonomy, bridging the gap between scripted interactions and emergent behavior.</p>
    </div>
</div>

<!-- Section 2: Text Left, Phone Right -->
<div class="cs-section reverse">
    <div class="cs-media-col">
        <div style="display: flex; flex-direction: column; align-items: center;">
            <div class="phone-frame">
                 <!-- Replace 'path/to/video2.mp4' with your actual file path -->
                <video autoplay loop muted playsinline controls preload="auto">
                    <source src="{{ '/img/Terra/Plumo/Plumo_Throwing_Tantrum.mp4' | relative_url }}#t=80" type="video/mp4">
                </video>
            </div>
            <div class="video-reload">
                crtl/cmd + shift + r
            </div>
        </div>
    </div>
    <div class="cs-text-col">
        <h3>Plumo is a living digital pet.</h3>
        <p>It runs on a robust internal system designed to make the pet feel like it has a mind of its own. Four core metrics drive four prioritized substates, ensuring the pet consistently expresses a distinct personality through its behavior and animations.
As shown in this video, the pet throws a tantrum when the player neglects its needs—like feeding it and keeping it happy.</p>
    </div>
</div>

<!-- Section 3: Phone Left, Text Right -->
<div class="cs-section">
    <div class="cs-media-col">
        <div style="display: flex; flex-direction: column; align-items: center;">
            <div class="phone-frame">
                 <!-- Replace 'path/to/video3.mp4' with your actual file path -->
                <video autoplay loop muted playsinline controls preload="auto">
                    <source src="{{ '/img/Terra/Plumo/Plumo_PictoParty.mp4' | relative_url }}#t=100" type="video/mp4">
                </video>
            </div>
            <div class="video-reload">
                crtl/cmd + shift + r
            </div>
        </div>
    </div>
    <div class="cs-text-col">
    <p>It’s also designed to be fun to spend time with. Plumo can hold conversations with you and gradually learns from the player using AI—powered by a smart prompting system that adapts and evolves the more you play.
Beyond chatting, Plumo can play mini-games like Tic-Tac-Toe and even Pictionary. As shown in this video, the player draws an image and then confirms whether Plumo guessed it correctly.
</p >
        <h3>Outcome</h3>
        <p>Delivered a prototype with strong retention potential, driven by an emotionally engaging digital-pet bond tailored for a younger audience.</p>
    </div>
</div>

<!-- Carousel Section -->
{% assign project_data = nil %}
{% for job in site.data.work %}
  {% assign found = job.projects | where: "title", "Plumo" | first %}
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
                <img src="{{ img }}" alt="Plumo Screenshot" class="carousel-card">
                {% endfor %}
            </div>
        </div>
        <div class="carousel-btn next" aria-label="Next Image"><i class="fas fa-chevron-right"></i></div>
    </div>
</div>
{% endif %}



<!-- Documentation Card (Styled like Homepage) -->
<!-- Documentation Card (Styled like Homepage but Compact + NDA Lock) -->
<div class="doc-card-container compact-card">
    <div class="doc-card">
        <div onclick="alert('NDA locked, Can show it personally')" style="cursor: not-allowed; display: block; color: inherit; text-decoration: none;">
            <img src="/img/Terra/Plumo/plumo.png" alt="Documentation Thumbnail">
            <div class="doc-card-content">
                <h4><i class="fas fa-lock" style="margin-right: 5px;"></i> Documentation</h4>
                <p>Detailed documentation of my process and research will be here.</p>
            </div>
        </div>
    </div>
</div>

<!-- Credits Section -->
<div class="cs-credits">
    <h4>Credits</h4>
    <ul>
        <li><a href="https://www.linkedin.com/in/karthiksub/" target="_blank">Karthik Subramanyam</a></li>
        <li><a href="https://www.linkedin.com/in/vinitghedia/" target="_blank">Vinit Ghedia</a></li>
        <li><a href="https://www.linkedin.com/in/fizal-mohammed/" target="_blank">Fizal Mohammed</a></li>
        <li><a href="https://www.linkedin.com/in/mily-manohar/" target="_blank">Mily Manohar</a></li>
        <li><a href="https://www.linkedin.com/in/paulomijoshi/" target="_blank">Paulomi Joshi</a></li>
        <li><a href="https://www.linkedin.com/in/arul-prakash-gd/" target="_blank">Arulpraksh P</a></li>
        <li><a href="https://www.linkedin.com/in/abhay-dwivedi-07/" target="_blank">Abhay Dwivedi</a></li>
        <li><a href="https://www.linkedin.com/in/angad-kukreja-1018bba8/" target="_blank">Angad Kukreja</a></li>
        <li><a href="https://www.linkedin.com/in/samiksha-sharma-5b164221a/" target="_blank">samiksha sharma</a></li>
        <li><a href="https://www.linkedin.com/in/priyansh-shekhar-a3b212231/" target="_blank">Priyansh Shekhar</a></li>
        
    </ul>
</div>
