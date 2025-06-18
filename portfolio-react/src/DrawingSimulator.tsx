import React from 'react';
import GameDetail from './GameDetail';

const DrawingSimulator: React.FC = () => {
  const gameData = {
    title: 'Drawing Simulator',
    img: '/img/ds_Logo.png',
    description: `This prototype is a <i>minimum viable product</i> for a story based office simulator.`,
    developmentPeriod: '8 weeks',
    itchUrl: 'https://darksauce.itch.io/drawing-simulator',
    playstoreUrl: 'https://play.google.com/store/apps/details?id=com.Joesujin.DrawingSimulator',
    gameLoopImg: '/img/ds_documentation/ds_1_1.png',
    documentationUrl: '/games/ds_documentation.html',
    prototypeUrl: '#',
    additionalInfo: `The design started with a simple question of <b>"what if they change the meaning of everything around us?"</b> followed by a short write up as a story. using the write up I applied an iterative process of prototyping and playtesting to get to this current version in the span of its Development period.

The current build takes 2 in-game days to get to the main <i>"change"</i> mechanic, just a fair warning if you'd like to try it out.`
  };

  return <GameDetail game={gameData} />;
};

export default DrawingSimulator; 