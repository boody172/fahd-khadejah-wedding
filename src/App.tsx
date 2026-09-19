import { useState } from 'react';
import CloudGate from './components/CloudGate';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Moments from './components/Moments';
import BigDay from './components/BigDay';
import RSVP from './components/RSVP';
import MusicPlayer from './components/MusicPlayer';

export default function App() {
  const [entered, setEntered] = useState(false);

  return (
    <>
      <CloudGate onRevealed={() => setEntered(true)} />
      {entered && (
        <>
          <Nav />
          <MusicPlayer />
        </>
      )}
      <div id="top" />
      <Hero />
      <Moments />
      <BigDay />
      <RSVP />
    </>
  );
}
