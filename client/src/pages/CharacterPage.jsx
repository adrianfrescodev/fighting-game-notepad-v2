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
import useTab from '../hooks/useTab';
export default function About() {
  const { name } = useParams();
  const { notes, updateNotes } = useCharacterNotes(name);
  const { openTabs, addTab, deleteTab, closeTab, openTab, allTabs } = useTab();
  return (
    <div className="bg-background flex h-screen w-full items-center justify-center overflow-hidden">
      <div className="bg-card from-white/3 mx-auto my-4 h-[calc(100vh-2rem)] w-full max-w-4xl rounded-[10px] bg-gradient-to-tr via-transparent via-50% p-6 shadow-[0_0_12px_rgba(0,0,0,0.2)]">
        <div className="grid h-full w-full grid-cols-1 grid-rows-9 gap-4 sm:grid-cols-3">
          <div className="col-span-3 row-span-1 flex items-center justify-center">
            <CharacterHeader />
          </div>
          <div className="col-span-2 row-span-7 flex flex-col">
            <TabBar
              openTabs={openTabs}
              closeTab={closeTab}
              openTab={openTab}
              addTab={addTab}
              deleteTab={deleteTab}
              allTabs={allTabs}
            />
            <div className="flex w-full flex-1 flex-row gap-1 overflow-x-hidden overflow-y-hidden">
              {openTabs.length === 0 ? (
                <div className="border-border bg-tile text-subheading pb-110 flex h-full w-full items-center justify-center rounded-lg border p-8 text-center text-lg">
                  Select a tab to begin editing.
                </div>
              ) : (
                openTabs.map(tab => (
                  <NoteEditor
                    key={tab}
                    section={tab}
                    value={notes?.[tab]}
                    onChange={newValue => updateNotes(tab, newValue)}
                  />
                ))
              )}
            </div>
          </div>
          <div className="col-span-1 row-span-7 hidden sm:flex">
            <CharacterPortrait name={name} />
          </div>
          <div className="col-span-3 row-span-1">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
