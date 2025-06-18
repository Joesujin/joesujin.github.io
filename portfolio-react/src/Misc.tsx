import React from 'react';

const misc = [
  {
    title: 'Poems Alive',
    img: '/img/p5_icon.png',
    description: 'p5 Sketch library',
    link: '/p5/p5_page.html',
  },
  {
    title: 'Circle_goes_Square_follows',
    img: '/img/c_g_s_f.png',
    description: 'A live art wallpaper',
    link: 'https://play.google.com/store/apps/details?id=com.joesujin.CirclegoesSquarefollows&hl=en_IN',
    external: true,
  },
];

const Misc: React.FC = () => (
  <div style={{
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    padding: '2rem',
    overflow: 'hidden'
  }}>
    <h1 style={{
      marginBottom: '2.5rem',
      color: '#2c3e50',
      fontSize: '2.5rem',
      fontWeight: '700',
      textAlign: 'center',
      borderBottom: '2px solid #e9ecef',
      paddingBottom: '1rem'
    }}>Misc</h1>
    
    <div style={{
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '2rem',
      justifyContent: 'center'
    }}>
      {misc.map((item) => (
        <div 
          key={item.title} 
          style={{
            background: '#fff', 
            borderRadius: 16, 
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)', 
            padding: '1.5rem', 
            border: '1px solid #e9ecef',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
          }}
        >
          <a 
            href={item.link} 
            style={{
              textDecoration: 'none', 
              color: 'inherit',
              display: 'block'
            }} 
            target={item.external ? '_blank' : undefined} 
            rel={item.external ? 'noopener noreferrer' : undefined}
          >
            <img 
              src={item.img} 
              alt={item.title} 
              style={{
                width: '100%', 
                height: 160, 
                objectFit: 'cover', 
                borderRadius: 12, 
                marginBottom: '1rem',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }} 
            />
            <h3 style={{
              margin: '0 0 0.75rem 0',
              color: '#2c3e50',
              fontSize: '1.3rem',
              fontWeight: '600',
              lineHeight: '1.3'
            }}>{item.title}</h3>
          </a>
          
          <div style={{
            fontSize: '1rem', 
            color: '#495057',
            lineHeight: '1.5'
          }}>{item.description}</div>
          
          {item.external && (
            <div style={{
              fontSize: '0.8rem',
              color: '#6c757d',
              marginTop: '0.5rem',
              fontStyle: 'italic'
            }}>
              External link
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);

export default Misc; 