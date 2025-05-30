import useCharacterNotes from '../hooks/useCharacterNotes';
import { useParams } from 'react-router';
//import { useState, useEffect } from 'react';
import {
  CharacterHeader,
  CharacterPortrait,
  NoteEditor,
  TabBar,
} from '../components/CharacterNotes';
import Footer from '../components/Footer/Footer';

export default function About() {
  const { name } = useParams(); // get character name from URL
  const { notes, updateNotes } = useCharacterNotes(name);
  const openTabs = ['general', 'combos', 'key-moves'];
  return (
    <div className="bg-background flex h-screen w-full items-center justify-center overflow-hidden">
      <div className="bg-card mx-auto my-4 h-[calc(100vh-2rem)] w-full max-w-4xl rounded-[10px] bg-gradient-to-tr from-white/3 via-transparent via-50% p-6 shadow-[0_0_12px_rgba(0,0,0,0.2)]">
        <div className="grid h-full w-full grid-cols-3 grid-rows-6 gap-4">
          <div className="col-span-3 row-span-1">
            <CharacterHeader />
          </div>
          <div className="col-span-2 row-span-4 flex flex-col">
            <TabBar />
            <div className="flex w-full flex-1 flex-row overflow-y-auto">
              {openTabs.map(tab => (
                <NoteEditor
                  key={tab}
                  section={tab}
                  value={notes[tab]}
                  onChange={newValue => updateNotes(tab, newValue)}
                />
              ))}
            </div>
          </div>
          <div className="col-span-1 row-span-4">
            <CharacterPortrait />
          </div>
          <div className="col-span-3 row-span-1">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
