import React from 'react';
import { Link } from 'react-router-dom';

const games = [
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
    link: '/games/dr_Handful',
  },
  {
    title: 'Drawing Simulator',
    img: '/img/ds_logo_banner.png',
    description: 'Narrative, Puzzle, A take on story driven mobile games.',
    link: '/games/drawingsimulator',
  },
  {
    title: 'Sell Your Head',
    img: '/img/syh_logo_banner.png',
    description: 'Cards, Table top game, A game based on Game theory.',
    link: '/games/sellyourhead',
  },
];

const Games: React.FC = () => (
  <div style={{
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    padding: '2rem',
    overflow: 'hidden',
    maxWidth: '1200px',
    margin: '0 auto'
  }}>
    <h1 style={{
      marginBottom: '2.5rem',
      color: '#2c3e50',
      fontSize: 'clamp(2rem, 5vw, 2.5rem)',
      fontWeight: '700',
      textAlign: 'center',
      borderBottom: '2px solid #e9ecef',
      paddingBottom: '1rem'
    }}>Games</h1>
    
    <div style={{
      display: 'flex', 
      flexWrap: 'wrap',
      gap: 'clamp(1rem, 2vw, 1.5rem)',
      justifyContent: 'center',
      alignItems: 'stretch'
    }}>
      {games.map((game) => (
        <div 
          key={game.title} 
          style={{
            background: '#fff', 
            borderRadius: 16, 
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)', 
            padding: 'clamp(1rem, 2vw, 1.25rem)', 
            width: 'clamp(280px, calc(33.333% - 1rem), 240px)',
            minWidth: '280px',
            border: '1px solid #e9ecef',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-6px)';
            e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
          }}
        >
          <Link to={game.link} style={{
            textDecoration: 'none', 
            color: 'inherit',
            display: 'block',
            flex: '1'
          }}>
            <img 
              src={game.img} 
              alt={game.title} 
              style={{
                width: '100%', 
                height: 'clamp(140px, 20vw, 140px)', 
                objectFit: 'cover', 
                borderRadius: 12, 
                marginBottom: '0.75rem',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }} 
            />
            <h3 style={{
              margin: '0 0 0.5rem 0',
              color: '#2c3e50',
              fontSize: 'clamp(1.1rem, 3vw, 1.2rem)',
              fontWeight: '600',
              lineHeight: '1.3'
            }}>{game.title}</h3>
          </Link>
          
          {game.award && (
            <div style={{
              fontSize: 'clamp(0.75rem, 2vw, 0.8rem)', 
              color: '#bfa100', 
              fontWeight: '600', 
              marginBottom: '0.5rem',
              padding: '0.4rem 0.6rem',
              background: '#fff3cd',
              borderRadius: '6px',
              border: '1px solid #ffeaa7',
              display: 'inline-block'
            }}>
              🏆 {game.award}
            </div>
          )}
          
          <div style={{
            fontSize: 'clamp(0.85rem, 2.5vw, 0.9rem)', 
            marginBottom: '0.75rem',
            color: '#495057',
            lineHeight: '1.4',
            flex: '1'
          }}>{game.description}</div>
          
          {game.coCreator && (
            <div style={{
              fontSize: 'clamp(0.75rem, 2vw, 0.8rem)',
              color: '#6c757d',
              borderTop: '1px solid #e9ecef',
              paddingTop: '0.5rem',
              marginTop: 'auto'
            }}>
              Co-creator: <a 
                href={game.coCreatorUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  color: '#007bff',
                  textDecoration: 'none',
                  fontWeight: '500',
                  borderBottom: '1px solid transparent',
                  transition: 'border-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderBottomColor = '#007bff'}
                onMouseLeave={(e) => e.currentTarget.style.borderBottomColor = 'transparent'}
              >
                {game.coCreator}
              </a>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);

export default Games; 