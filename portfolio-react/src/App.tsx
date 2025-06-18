import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Games from './Games';
import Stories from './Stories';
import Misc from './Misc';
import About from './About';
import DJLoopman from './DJLoopman';
import DrawingSimulator from './DrawingSimulator';
import SellYourHead from './SellYourHead';
import DrHandful from './DrHandful';
import AgreeToDisagree from './AgreeToDisagree';
import ItsJustAnotherBall from './ItsJustAnotherBall';
import HeyItsYesterdayAgain from './HeyItsYesterdayAgain';
import ACopyOfTheEnd from './ACopyOfTheEnd';
import ProjectPublish from './ProjectPublish';

function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <nav className="navbar">
            <div className="logo">Joe Sujin</div>
            <ul className="nav-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/games">Games</Link></li>
              <li><Link to="/stories">Stories</Link></li>
              <li><Link to="/misc">Misc</Link></li>
              <li><Link to="/about">About</Link></li>
            </ul>
          </nav>
        </header>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/games" element={<Games />} />
            <Route path="/games/djloopman" element={<DJLoopman />} />
            <Route path="/games/drawingsimulator" element={<DrawingSimulator />} />
            <Route path="/games/sellyourhead" element={<SellYourHead />} />
            <Route path="/games/dr_Handful" element={<DrHandful />} />
            <Route path="/stories" element={<Stories />} />
            <Route path="/stories/agree_to_disagree" element={<AgreeToDisagree />} />
            <Route path="/stories/its_just_another_ball" element={<ItsJustAnotherBall />} />
            <Route path="/stories/hey_its_yesterday_again" element={<HeyItsYesterdayAgain />} />
            <Route path="/stories/a_copy_of_the_end" element={<ACopyOfTheEnd />} />
            <Route path="/stories/project_publish" element={<ProjectPublish />} />
            <Route path="/misc" element={<Misc />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
