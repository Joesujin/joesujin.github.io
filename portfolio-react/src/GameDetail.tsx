import React from 'react';

interface GameDetailProps {
  game: {
    title: string;
    img: string;
    description: string;
    award?: string;
    coCreator?: string;
    coCreatorUrl?: string;
    developmentPeriod?: string;
    itchUrl?: string;
    playstoreUrl?: string;
    youtubeTrailer?: string;
    youtubeTutorial?: string;
    youtubeGameplay?: string;
    processVideo?: string;
    documentationUrl?: string;
    prototypeUrl?: string;
    onePagerUrl?: string;
    additionalInfo?: string;
    gameLoopImg?: string;
  };
}

const GameDetail: React.FC<GameDetailProps> = ({ game }) => {
  // Helper function to render HTML content safely
  const renderHTML = (html: string) => {
    return { __html: html };
  };

  return (
    <div style={{
      maxWidth: 900, 
      margin: '0 auto', 
      padding: '0 1rem',
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderRadius: '16px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <div style={{
        textAlign: 'center', 
        marginBottom: '3rem',
        padding: '2rem 0',
        borderBottom: '1px solid #e9ecef'
      }}>
        <img 
          src={game.img} 
          alt={game.title} 
          style={{
            maxWidth: '100%', 
            height: 'auto', 
            marginBottom: '1.5rem',
            maxHeight: '200px',
            objectFit: 'contain'
          }} 
        />
        {game.award && (
          <div style={{marginBottom: '1.5rem'}}>
            <img 
              src="/img/igdc2020_studentGOTY.png" 
              alt="IGDC Award" 
              style={{maxHeight: 80, width: 'auto'}} 
            />
          </div>
        )}
        {game.coCreator && (
          <h5 style={{
            color: '#2250b9', 
            marginBottom: '1rem',
            fontSize: '1.1rem',
            fontWeight: '500'
          }}>
            <a 
              href={game.coCreatorUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{
                color: '#2250b9',
                textDecoration: 'none',
                borderBottom: '1px solid transparent',
                transition: 'border-color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderBottomColor = '#2250b9'}
              onMouseLeave={(e) => e.currentTarget.style.borderBottomColor = 'transparent'}
            >
              {game.coCreator}
            </a> and Joe Sujin
          </h5>
        )}
      </div>

      {/* Description */}
      <div style={{
        marginBottom: '3rem',
        padding: '0 2rem'
      }}>
        <div 
          style={{
            fontSize: '1.2rem', 
            lineHeight: 1.7,
            color: '#2c3e50',
            marginBottom: '1.5rem'
          }}
          dangerouslySetInnerHTML={renderHTML(game.description)}
        />
        {game.additionalInfo && (
          <div style={{
            marginTop: '2rem',
            padding: '1.5rem',
            background: '#f8f9fa',
            borderRadius: '12px',
            borderLeft: '4px solid #007bff'
          }}>
            <div 
              style={{
                fontSize: '1rem', 
                lineHeight: 1.6,
                color: '#495057'
              }}
              dangerouslySetInnerHTML={renderHTML(game.additionalInfo)}
            />
          </div>
        )}
        {game.developmentPeriod && (
          <p style={{
            fontWeight: '600', 
            marginTop: '2rem',
            fontSize: '0.95rem',
            color: '#6c757d',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            Development period: {game.developmentPeriod}
          </p>
        )}
      </div>

      {/* Itch.io Embed */}
      {game.itchUrl && (
        <div style={{
          marginBottom: '3rem',
          padding: '0 2rem',
          textAlign: 'center'
        }}>
          <iframe 
            frameBorder="0" 
            src="https://itch.io/embed/780208?border_width=0" 
            width="550" 
            height="165"
            style={{
              maxWidth: '100%',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}
            title="Play on itch.io"
          >
            <a href={game.itchUrl}>Play on itch.io</a>
          </iframe>
        </div>
      )}

      {/* Game Loop Image */}
      {game.gameLoopImg && (
        <div style={{
          marginBottom: '3rem',
          padding: '0 2rem'
        }}>
          <h4 style={{
            marginBottom: '1rem',
            color: '#2c3e50',
            fontSize: '1.3rem'
          }}>Game Loop</h4>
          <img 
            src={game.gameLoopImg} 
            alt="Game Loop" 
            style={{
              width: '100%', 
              height: 'auto',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }} 
          />
        </div>
      )}

      {/* Videos */}
      <div style={{
        marginBottom: '3rem',
        padding: '0 2rem'
      }}>
        {game.youtubeTrailer && (
          <div style={{marginBottom: '2.5rem'}}>
            <h4 style={{
              marginBottom: '1rem',
              color: '#2c3e50',
              fontSize: '1.3rem'
            }}>Gameplay Trailer</h4>
            <div style={{
              position: 'relative',
              paddingBottom: '56.25%',
              height: 0,
              overflow: 'hidden',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}>
              <iframe 
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  borderRadius: '12px'
                }}
                src={game.youtubeTrailer} 
                title="Gameplay Trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}
        
        {game.youtubeTutorial && (
          <div style={{marginBottom: '2.5rem'}}>
            <h4 style={{
              marginBottom: '1rem',
              color: '#2c3e50',
              fontSize: '1.3rem'
            }}>Tutorial Level</h4>
            <div style={{
              position: 'relative',
              paddingBottom: '56.25%',
              height: 0,
              overflow: 'hidden',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}>
              <iframe 
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  borderRadius: '12px'
                }}
                src={game.youtubeTutorial} 
                title="Tutorial Level"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}

        {game.youtubeGameplay && (
          <div style={{marginBottom: '2.5rem'}}>
            <h4 style={{
              marginBottom: '1rem',
              color: '#2c3e50',
              fontSize: '1.3rem'
            }}>Gameplay Video</h4>
            <div style={{
              position: 'relative',
              paddingBottom: '56.25%',
              height: 0,
              overflow: 'hidden',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}>
              <iframe 
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  borderRadius: '12px'
                }}
                src={game.youtubeGameplay} 
                title="Gameplay Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}

        {game.processVideo && (
          <div style={{marginBottom: '2.5rem'}}>
            <h4 style={{
              marginBottom: '1rem',
              color: '#2c3e50',
              fontSize: '1.3rem'
            }}>Process Video</h4>
            <a 
              href={game.processVideo} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                padding: '12px 24px',
                background: '#007bff',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '8px',
                fontWeight: '500',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#0056b3'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#007bff'}
            >
              Watch Process Video
            </a>
          </div>
        )}
      </div>

      {/* Links */}
      <div style={{
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: '2rem', 
        marginBottom: '3rem',
        padding: '0 2rem',
        justifyContent: 'center'
      }}>
        {game.documentationUrl && (
          <div style={{
            background: '#fff', 
            borderRadius: 16, 
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)', 
            padding: '1.5rem', 
            width: 320,
            border: '1px solid #e9ecef',
            transition: 'transform 0.2s, box-shadow 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.12)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
          }}
          >
            <a href={game.documentationUrl} style={{
              textDecoration: 'none', 
              color: 'inherit',
              display: 'block'
            }}>
              <img 
                src="/img/ds_cover.png" 
                alt="Documentation" 
                style={{
                  width: '100%', 
                  height: 160, 
                  objectFit: 'cover', 
                  borderRadius: 12, 
                  marginBottom: '1rem'
                }} 
              />
              <h5 style={{
                margin: '0 0 0.5rem 0',
                color: '#2c3e50',
                fontSize: '1.1rem'
              }}>Documentation</h5>
            </a>
            <p style={{
              fontSize: '0.95rem', 
              margin: 0,
              color: '#6c757d',
              lineHeight: 1.5
            }}>Full documentation of the game. Gameplay, mechanics and narrative design details.</p>
          </div>
        )}

        {game.prototypeUrl && (
          <div style={{
            background: '#fff', 
            borderRadius: 16, 
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)', 
            padding: '1.5rem', 
            width: 320,
            border: '1px solid #e9ecef',
            transition: 'transform 0.2s, box-shadow 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.12)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
          }}
          >
            <img 
              src="/img/documentation_banner.png" 
              alt="Prototype" 
              style={{
                width: '100%', 
                height: 160, 
                objectFit: 'cover', 
                borderRadius: 12, 
                marginBottom: '1rem'
              }} 
            />
            <h5 style={{
              margin: '0 0 0.5rem 0',
              color: '#2c3e50',
              fontSize: '1.1rem'
            }}>Prototype</h5>
            <p style={{
              fontSize: '0.95rem', 
              margin: 0,
              color: '#6c757d',
              lineHeight: 1.5
            }}>
              Download the apk or check it out on your browser. This is a most minimal interpretation of the game. <em style={{color: '#dc3545'}}>(not a final product)</em>
              <br />
              <div style={{marginTop: '0.5rem'}}>
                {game.itchUrl && <><a href={game.itchUrl} target="_blank" rel="noopener noreferrer" style={{color: '#007bff', textDecoration: 'none'}}>itch.io</a> | </>}
                {game.playstoreUrl && <a href={game.playstoreUrl} target="_blank" rel="noopener noreferrer" style={{color: '#007bff', textDecoration: 'none'}}>Google Play Store</a>}
              </div>
            </p>
          </div>
        )}

        {game.onePagerUrl && (
          <div style={{
            background: '#fff', 
            borderRadius: 16, 
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)', 
            padding: '1.5rem', 
            width: 320,
            border: '1px solid #e9ecef',
            transition: 'transform 0.2s, box-shadow 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.12)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
          }}
          >
            <a href={game.onePagerUrl} style={{
              textDecoration: 'none', 
              color: 'inherit',
              display: 'block'
            }}>
              <img 
                src="/img/test_1.jpg" 
                alt="One Pager" 
                style={{
                  width: '100%', 
                  height: 160, 
                  objectFit: 'cover', 
                  borderRadius: 12, 
                  marginBottom: '1rem'
                }} 
              />
              <h5 style={{
                margin: '0 0 0.5rem 0',
                color: '#2c3e50',
                fontSize: '1.1rem'
              }}>One Pager</h5>
            </a>
            <p style={{
              fontSize: '0.95rem', 
              margin: 0,
              color: '#6c757d',
              lineHeight: 1.5
            }}>One round of gameplay made into a comic. Gives an overall understanding about the gameplay.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameDetail; 