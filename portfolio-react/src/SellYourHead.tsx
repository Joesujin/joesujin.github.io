import React from 'react';
import GameDetail from './GameDetail';

const SellYourHead: React.FC = () => {
  const gameData = {
    title: 'Sell Your Head',
    img: '/img/syh_logo.png',
    description: `This is a Tabletop game that aims to <b>bring people together</b>.`,
    developmentPeriod: '6 weeks',
    gameLoopImg: '/img/syh_gameloop.png',
    onePagerUrl: '/games/Syh_OnePage.html',
    documentationUrl: '/games/Syh_Documentation.html',
    additionalInfo: `Using Game theory principles that <b><i>intrinsically motivate players</i></b> to share information, co-operate or deceit each other. This prototype is completely playable with some guaranteed conflicts and resolution among a group of 3.`
  };

  return <GameDetail game={gameData} />;
};

export default SellYourHead; 