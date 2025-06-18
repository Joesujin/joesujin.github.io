import React from 'react';
import { Link } from 'react-router-dom';

const stories = [
  {
    title: 'Agree to Disagree',
    img: '/img/writing/agreetodisagree.png',
    description: 'For we are an Artificial intelligence.',
    link: '/stories/agree_to_disagree',
  },
  {
    title: 'It\'s just another ball',
    img: '/img/writing/anotherball.png',
    description: 'And this is where you live.',
    link: '/stories/its_just_another_ball',
  },
  {
    title: 'Hey, it\'s Yesterday again',
    img: '/img/writing/yesterday.png',
    description: 'I feel younger already',
    link: '/stories/hey_its_yesterday_again',
  },
  {
    title: 'A Copy of the End',
    img: '/img/writing/copyoftheend.png',
    description: 'Not a happy one',
    link: '/stories/a_copy_of_the_end',
  },
  {
    title: 'Project Publish',
    img: '/img/ds_cover.png',
    description: 'Changes dictated',
    link: '/stories/project_publish',
  },
];

const Stories: React.FC = () => (
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
    }}>Stories</h1>
    
    <div style={{
      display: 'flex', 
      flexWrap: 'wrap',
      gap: 'clamp(1rem, 2vw, 1.5rem)',
      justifyContent: 'center',
      alignItems: 'stretch'
    }}>
      {stories.map((story) => (
        <div 
          key={story.title} 
          style={{
            background: '#fff', 
            borderRadius: 16, 
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)', 
            padding: 'clamp(1rem, 2vw, 1.25rem)', 
            width: 'clamp(260px, calc(33.333% - 1rem), 220px)',
            minWidth: '260px',
            border: '1px solid #e9ecef',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            cursor: 'pointer'
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
          <Link to={story.link} style={{
            textDecoration: 'none', 
            color: 'inherit',
            display: 'block'
          }}>
            <img 
              src={story.img} 
              alt={story.title} 
              style={{
                width: '100%', 
                height: 'clamp(130px, 18vw, 130px)', 
                objectFit: 'cover', 
                borderRadius: 12, 
                marginBottom: '0.75rem',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }} 
            />
            <h3 style={{
              margin: '0 0 0.5rem 0',
              color: '#2c3e50',
              fontSize: 'clamp(1rem, 3vw, 1.1rem)',
              fontWeight: '600',
              lineHeight: '1.3'
            }}>{story.title}</h3>
          </Link>
          
          <div style={{
            fontSize: 'clamp(0.8rem, 2.5vw, 0.85rem)', 
            color: '#495057',
            lineHeight: '1.4',
            fontStyle: 'italic'
          }}>{story.description}</div>
        </div>
      ))}
    </div>
  </div>
);

export default Stories; 