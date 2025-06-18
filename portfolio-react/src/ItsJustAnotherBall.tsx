import React from 'react';

const ItsJustAnotherBall: React.FC = () => {
  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderRadius: '16px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      padding: '2.5rem',
      maxWidth: 800,
      margin: '0 auto',
      overflow: 'hidden'
    }}>
      <header style={{
        textAlign: 'center',
        marginBottom: '2rem',
        borderBottom: '2px solid #e9ecef',
        paddingBottom: '1.5rem'
      }}>
        <h1 style={{
          color: '#2c3e50',
          fontSize: '2.5rem',
          fontWeight: '700',
          marginBottom: '0.5rem'
        }}>It's just another ball</h1>
        <p style={{
          color: '#6c757d',
          fontSize: '1.1rem',
          fontStyle: 'italic',
          margin: 0
        }}>And this is where you live.</p>
      </header>

      <div style={{marginBottom: '2rem'}}>
        <img 
          src="https://joesujinportfoliofiles.s3-ap-southeast-1.amazonaws.com/writing/writing_its_just_another_ball.png"
          alt="It's just another ball" 
          style={{
            width: '100%',
            height: 'auto',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}
        />
      </div>

      <article style={{
        fontSize: '1.1rem',
        lineHeight: '1.8',
        color: '#2c3e50'
      }}>
        <p style={{marginBottom: '1.5rem'}}>
          You get up one day and you find a letter in your nightstand it says.
        </p>
        
        <div style={{
          background: '#f8f9fa',
          border: '1px solid #e9ecef',
          borderRadius: '12px',
          padding: '2rem',
          margin: '2rem 0',
          fontStyle: 'italic',
          color: '#495057'
        }}>
          <p style={{marginBottom: '1rem'}}>
            "Dear citizen of the free worlds
          </p>
          <p style={{marginBottom: '1rem'}}>
            As we all know we have a population crisis in our hands and we've been trying to get out of our Mother Earth for a while now. But with our newest breakthrough in Quantum Physics, we found a way to create Quantum worlds on daily objects( mostly spherical ones just to keep the consistency)
          </p>
          <p style={{marginBottom: '1rem'}}>
            You are one of the lucky ones to be put in one of our greatest and most sophisticated Quantum worlds created yet. And this is to inform you that there might be some unusual behaviors in your world as it is most likely to be entangled with one of the other worlds as an object of some sort.
          </p>
          <p style={{marginBottom: '1rem'}}>
            Hence this physical letter is superpositioned across worlds.
          </p>
          <p style={{marginBottom: '1rem'}}>
            We hope you live happily ever after.
          </p>
          <p style={{marginBottom: '1rem'}}>
            (P.s. all your friends, family and loved ones are replicated in this world and a whole lot of other people for you to explore)
          </p>
          <p style={{marginBottom: '1rem'}}>
            You will forget this letter in 24hrs as it will cease to exist.
          </p>
          <p style={{margin: 0}}>
            Thank you for your cooperation."
          </p>
        </div>
        
        <p style={{marginBottom: '1.5rem'}}>
          You look out of your window and you see nothing out of the usual. You decide to take a walk. It's the same place you know. Same neighborhood, same people, same queues. Time seems to move a bit faster. There are mild jerks that you feel now and then but everything seems to be fine. You get a coffee and reach back home. It is already dusk but you read the letter again you find yourself questioning.
        </p>
        
        <p style={{marginBottom: '1.5rem'}}>
          Where am I? Is this another world that someone created? What do they mean <em>"some sort of spherical object"</em> for all you know you might be living on a kids football that is kicked around or on a wrecking ball that is demolishing buildings back in the real earth to make room for trees and other animals. Maybe that's why there are these jerks now and then.
        </p>
        
        <p style={{marginBottom: '1.5rem'}}>
          Will you be willing to live in a world that breaks stuff or one that's being kicked around? Are you willing to sleep on it and live in this false world? Around these fake people? You decide to jump out of the window. The last breath fills your lungs mid-air and everything goes dark.
        </p>
        
        <p style={{marginBottom: '1.5rem'}}>And then you wake up.</p>
        
        <p style={{
          color: '#6c757d',
          fontStyle: 'italic',
          marginTop: '2rem',
          textAlign: 'center'
        }}>
          <small>Thank you for reading.</small>
        </p>
      </article>
    </div>
  );
};

export default ItsJustAnotherBall; 