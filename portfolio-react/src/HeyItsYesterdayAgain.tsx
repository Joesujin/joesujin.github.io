import React from 'react';

const HeyItsYesterdayAgain: React.FC = () => {
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
        }}>Hey, it's Yesterday again</h1>
        <p style={{
          color: '#6c757d',
          fontSize: '1.1rem',
          fontStyle: 'italic',
          margin: 0
        }}>I feel younger already</p>
      </header>

      <div style={{marginBottom: '2rem'}}>
        <img 
          src="https://joesujinportfoliofiles.s3-ap-southeast-1.amazonaws.com/writing/writing_its_yesterday_again.png"
          alt="Hey, it's Yesterday again" 
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
          It's been all dark since that day. The day it all ended. Someday in April 2031, I was very young for that to happen to me. I was not ready. I've never felt that much pain before. And then nothing. Nothing. I guess I died. Wait if I'm dead why am I talking to myself. I feel very much alive. Can I open my eyes? No, but I can hear a voice.
        </p>
        
        <div style={{
          background: '#f8f9fa',
          border: '1px solid #e9ecef',
          borderRadius: '12px',
          padding: '1.5rem',
          margin: '1.5rem 0',
          fontStyle: 'italic',
          color: '#495057'
        }}>
          <p style={{margin: 0}}>
            "Do not panic… you are alright… you might feel a bit nauseated… there is a sink next to you… you won't be able to see anything for now… you are going to be alright… Do not panic…"
          </p>
        </div>
        
        <p style={{marginBottom: '1.5rem'}}>
          Okay, this is creepy. Am I not dead? Ohhh this might be the afterlife. They have great customer service here. Wait a minute did I make it to heaven?
        </p>
        
        <div style={{
          background: '#f8f9fa',
          border: '1px solid #e9ecef',
          borderRadius: '12px',
          padding: '1.5rem',
          margin: '1.5rem 0',
          fontStyle: 'italic',
          color: '#495057'
        }}>
          <p style={{margin: 0}}>
            "You are in the general public rejuvenation center for the dead… find the letter next to you once you are able to see… Do not panic… you are alright…"
          </p>
        </div>
        
        <p style={{marginBottom: '1.5rem'}}>
          This is definitely the Heaven. Oh, I can see now at least partially. Let me find this letter.
        </p>
        
        <div style={{
          background: '#f8f9fa',
          border: '1px solid #e9ecef',
          borderRadius: '12px',
          padding: '2rem',
          margin: '2rem 0',
          color: '#495057'
        }}>
          <p style={{marginBottom: '1rem'}}>You are in the year 17 R.V. (2065 A.D.)</p>
          <p style={{marginBottom: '1rem'}}>
            In the year 2048 A.D. mankind was staring at an impending death in the form of a collapsing star in a distant galaxy. Its effect was predicted to destroy our entire solar system.
          </p>
          <p style={{marginBottom: '1rem'}}>
            Instead, we were struck by a cosmic shock wave and everything changed since then.
          </p>
          <p style={{marginBottom: '1rem'}}>
            The time as we know it started going in reverse. No one noticed it for a couple of months. But then we started seeing so many anomalies. The trees started growing into the ground, the weather patterns started to repeat in reverse order, everything that was living started to move back in time.
          </p>
          <p style={{marginBottom: '1rem'}}>
            Years passed and we realized every one of us were getting younger and younger until we cease to exist. And thus we realized that the dead are coming back to life too.
          </p>
          <p style={{marginBottom: '1rem'}}>
            And so you are in this facility where we dug up the buried bodies and organized according to the time of death. So we are pleased to inform you that you are back in the world alive and well to relive your life again. In reverse.
          </p>
          <p style={{margin: 0, fontWeight: 'bold'}}>Welcome Back.</p>
        </div>
        
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

export default HeyItsYesterdayAgain; 