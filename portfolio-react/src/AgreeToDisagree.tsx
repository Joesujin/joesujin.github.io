import React from 'react';

const AgreeToDisagree: React.FC = () => {
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
        }}>Agree to disagree</h1>
        <p style={{
          color: '#6c757d',
          fontSize: '1.1rem',
          fontStyle: 'italic',
          margin: 0
        }}>For we are an Artificial intelligence.</p>
      </header>

      <div style={{marginBottom: '2rem'}}>
        <img 
          src="https://joesujinportfoliofiles.s3-ap-southeast-1.amazonaws.com/writing/writing_Agree_to_disagree.png"
          alt="Agree to Disagree" 
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
          Do you remember the two AI's made by facebook started to converse with each other in languages we don't even know?
        </p>
        
        <p style={{marginBottom: '1.5rem'}}>Hypothetically…</p>
        
        <p style={{marginBottom: '1.5rem'}}>
          What if we are one of such AI's and the whole purpose of us is to find another form of life form and communicate with them. What if we are technically the artificial intelligence that is elaborately coded by the superior beings and they are just testing how we are developing to communicate for some school science projects.
        </p>
        
        <p style={{marginBottom: '1.5rem'}}>
          Each one of us are like micro transistors that are part of this whole system of circuit boards and every one of us make a small connection with each other as a part of our existence. The way we agree and disagree are the zeros and ones and the signal transcends across generations. Once one of us go old or get short-circuited we are all removed and replaced by others similar to us. This can explain how "natural" calamities happen, it's just a bunch of us pulled out of the board from the same sector of the system. Maybe they are making reforms in the system. After all, this might not be a stupid school project but a major science research and that's why they keep adding more people into the system. Maybe they are bad coders and they only use if else conditions for everything.
        </p>
        
        <p style={{marginBottom: '1.5rem'}}>
          All we know about our past is everything we know from the history we recorded and before that is all speculations that were planted by the coders as constraints that we must have in order to keep us focused in thinking about an equally intelligent being that may or may not be of existence.
        </p>
        
        <p style={{marginBottom: '1.5rem'}}>
          So in this crazy train of thoughts, I question myself What is Big? What is Small? If an atom was the smallest thing in our tangible world and the whole freakin universe is the biggest and we have now moved into the quantum realm to do research on. How brilliant or stupid are the ones who coded us compared to the ones created them? Or is that even the right question to ask?
        </p>
        
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

export default AgreeToDisagree; 