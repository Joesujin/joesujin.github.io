import React from 'react';
import { Link } from 'react-router-dom';
import BackgroundSketch from './BackgroundSketch';

const featuredGames = [
  {
    title: 'DJ LoopMan',
    img: '/img/DjloopmanLogo.png',
    description: `Wholesome Music Production Beat'em up`,
    award: 'IGDC - Student Game of the Year 2020',
    coCreator: 'Amar Ravi',
    coCreatorUrl: 'https://www.amarravi.com/',
    link: '/games/djloopman',
  },
  {
    title: 'Dr. Handfull',
    img: '/img/Handfullposter.jpeg',
    description: 'VR, Puzzle, An experiment on multiple hands.',
    coCreator: 'Amar Ravi',
    coCreatorUrl: 'https://www.amarravi.com/',
    link: '/games/dr_Handful.html',
  },
];

const featuredStories = [
  {
    title: 'Agree to Disagree',
    img: '/img/writing/agreetodisagree.png',
    description: 'For we are an Artificial intelligence.',
    link: '/stories/agree_to_disagree.html',
  },
];

const featuredMisc = [
  {
    title: 'Poems Alive',
    img: '/img/p5_icon.png',
    description: 'p5 Sketch library',
    link: '/p5/p5_page.html',
  },
];

const Home: React.FC = () => {
  return (
    <div className="home">
      <BackgroundSketch />
      <section style={{marginBottom: '2.5rem'}}>
        <h1 style={{fontSize: '2.5rem', marginBottom: '0.5rem'}}>Hi There!</h1>
        <p style={{fontSize: '1.2rem', maxWidth: 700}}>
          My name is <b>Joe Sujin</b>. I am a design graduate in <b>Digital Games</b> from the <b>National Institute of Design, India</b>.<br/>
          I make weird, off-beat experiences to share stories through provocative game mechanics across interactive mediums.<br/>
          <em>Here are some of my works.</em>
        </p>
      </section>
      
      <section style={{marginBottom: '2rem'}}>
        <div className="section-header" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem'}}>
          <h2>Featured Games</h2>
          <Link to="/games" className="view-all-link" style={{textDecoration: 'none', color: '#007bff', fontWeight: 500}}>View All →</Link>
        </div>
        <div className="card-container" style={{display: 'flex', gap: '1.5rem', flexWrap: 'wrap'}}>
          {featuredGames.map((game) => (
            <div key={game.title} className="feature-card" style={{background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #0001', padding: 16, width: 220}}>
              <a href={game.link} style={{textDecoration: 'none', color: 'inherit'}}>
                <img src={game.img} alt={game.title} style={{width: '100%', height: 120, objectFit: 'cover', borderRadius: 8, marginBottom: 8}} />
                <h4 style={{margin: '0 0 0.5rem 0'}}>{game.title}</h4>
              </a>
              {game.award && <div className="award" style={{fontSize: '0.85rem', color: '#bfa100', fontWeight: 600, marginBottom: 4}}>{game.award}</div>}
              <p style={{fontSize: '0.95rem', margin: '0 0 4px 0'}}>{game.description}</p>
              {game.coCreator && (
                <p className="co-creator" style={{fontSize: '0.85rem', margin: 0}}>
                  Co-creator: <a href={game.coCreatorUrl} target="_blank" rel="noopener noreferrer">{game.coCreator}</a>
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
      
      <section style={{marginBottom: '2rem'}}>
        <div className="section-header" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem'}}>
          <h2>Stories</h2>
          <Link to="/stories" className="view-all-link" style={{textDecoration: 'none', color: '#007bff', fontWeight: 500}}>View All →</Link>
        </div>
        <div className="card-container" style={{display: 'flex', gap: '1.5rem', flexWrap: 'wrap'}}>
          {featuredStories.map((story) => (
            <div key={story.title} className="feature-card" style={{background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #0001', padding: 16, width: 220}}>
              <a href={story.link} style={{textDecoration: 'none', color: 'inherit'}}>
                <img src={story.img} alt={story.title} style={{width: '100%', height: 120, objectFit: 'cover', borderRadius: 8, marginBottom: 8}} />
                <h4 style={{margin: '0 0 0.5rem 0'}}>{story.title}</h4>
              </a>
              <p style={{fontSize: '0.95rem', margin: 0}}>{story.description}</p>
            </div>
          ))}
        </div>
      </section>
      
      <section>
        <div className="section-header" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem'}}>
          <h2>Misc</h2>
          <Link to="/misc" className="view-all-link" style={{textDecoration: 'none', color: '#007bff', fontWeight: 500}}>View All →</Link>
        </div>
        <div className="card-container" style={{display: 'flex', gap: '1.5rem', flexWrap: 'wrap'}}>
          {featuredMisc.map((item) => (
            <div key={item.title} className="feature-card" style={{background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #0001', padding: 16, width: 220}}>
              <a href={item.link} style={{textDecoration: 'none', color: 'inherit'}}>
                <img src={item.img} alt={item.title} style={{width: '100%', height: 120, objectFit: 'cover', borderRadius: 8, marginBottom: 8}} />
                <h4 style={{margin: '0 0 0.5rem 0'}}>{item.title}</h4>
              </a>
              <p style={{fontSize: '0.95rem', margin: 0}}>{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home; 