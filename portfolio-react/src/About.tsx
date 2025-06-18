import React from 'react';

const About: React.FC = () => (
  <div style={{
    maxWidth: 700,
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    padding: '2.5rem',
    overflow: 'hidden'
  }}>
    <h1 style={{
      marginBottom: '2rem',
      color: '#2c3e50',
      fontSize: '2.5rem',
      fontWeight: '700',
      textAlign: 'center',
      borderBottom: '2px solid #e9ecef',
      paddingBottom: '1rem'
    }}>About</h1>
    
    <div style={{
      fontSize: '1.2rem', 
      lineHeight: '1.8',
      color: '#2c3e50',
      marginBottom: '2rem'
    }}>
      <p style={{marginBottom: '1.5rem'}}>
        My name is <strong style={{color: '#007bff'}}>Joe Sujin</strong>. I am a design graduate in <strong style={{color: '#007bff'}}>Digital Games</strong> from the <strong style={{color: '#007bff'}}>National Institute of Design, India</strong>.
      </p>
      <p style={{marginBottom: '1.5rem'}}>
        I make weird, off-beat experiences to share stories through provocative game mechanics across interactive mediums.
      </p>
      <p style={{
        marginTop: '2rem',
        padding: '1.5rem',
        background: '#f8f9fa',
        borderRadius: '12px',
        borderLeft: '4px solid #007bff'
      }}>
        <strong style={{color: '#2c3e50'}}>Contact:</strong> <a 
          href="mailto:joesujin@gmail.com"
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
          joesujin@gmail.com
        </a>
      </p>
    </div>
    
    <div style={{
      borderTop: '1px solid #e9ecef',
      paddingTop: '2rem'
    }}>
      <h2 style={{
        fontSize: '1.5rem',
        color: '#2c3e50',
        fontWeight: '600',
        marginBottom: '1rem'
      }}>Resume</h2>
      <div style={{
        background: '#fff',
        borderRadius: '12px',
        padding: '1rem',
        border: '1px solid #e9ecef',
        transition: 'transform 0.2s, box-shadow 0.2s'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
      >
        <a 
          href="/docs/Joesujin_Resume.pdf" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            color: '#007bff',
            textDecoration: 'none',
            fontWeight: '500',
            fontSize: '1.1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          📄 View Resume (PDF)
        </a>
      </div>
    </div>
  </div>
);

export default About; 