import React from 'react';
import GameDetail from './GameDetail';

const DJLoopman: React.FC = () => {
  const gameData = {
    title: 'DJ LoopMan',
    img: '/img/Djloopmanlogo-close.png',
    description: `A Wholesome Music Production Beat'em Up.`,
    award: 'IGDC - Student Game of the Year 2020',
    coCreator: 'Amar Ravi',
    coCreatorUrl: 'https://www.amarravi.com/',
    developmentPeriod: '6 days',
    itchUrl: 'https://amarravi.itch.io/dj-loopman',
    youtubeTrailer: 'https://www.youtube.com/embed/RcoyY_CggkQ?controls=0',
    youtubeTutorial: 'https://www.youtube.com/embed/SywQfDIew1I?controls=0',
    additionalInfo: `Enter <b>DJ Loopman!</b> = Music Production apps + Classic Beat'em Ups

Make some beats to complete with a melody. We tied classic beat'em up gameplay to a conventional EDM Production app interface. Also experiment with creating your own beats in <i>freestyle mode!</i>

<i>A game made for Ludam Dare 47 - Theme: "Stuck in a loop"</i>`
  };

  return <GameDetail game={gameData} />;
};

export default DJLoopman; 