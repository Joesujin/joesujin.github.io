import React from 'react';
import GameDetail from './GameDetail';

const DrHandful: React.FC = () => {
  const gameData = {
    title: 'Dr. Handful',
    img: '/img/Handfullposter.jpeg',
    description: `A VR Puzzle game with multiple hands to control made for the Oculus Quest.`,
    coCreator: 'Amar Ravi',
    coCreatorUrl: 'https://www.amarravi.com/',
    developmentPeriod: '8 weeks',
    youtubeGameplay: 'https://www.youtube.com/embed/l8uWIk228wg',
    processVideo: 'https://www.youtube.com/watch?v=z93BNnnmyaM&feature=youtu.be&ab_channel=JoeSujin',
    additionalInfo: `Be the magician, watching the show amongst the audience. A stealth experience with story progressing with narrative elements.

<i>The game is made as a design project at NID</i>`
  };

  return <GameDetail game={gameData} />;
};

export default DrHandful; 