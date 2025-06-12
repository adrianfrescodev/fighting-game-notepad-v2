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
  const { notes, updateNotes, addTab, deleteTab } = useCharacterNotes(name);
  const { openTabs, closeTab, openTab, allTabs } = useTab(notes);
  return (
    <div className="bg-background flex h-screen w-full items-center justify-center overflow-hidden">
      <div className="bg-card from-white/3 mx-auto my-4 h-full w-full max-w-4xl rounded-[10px] bg-gradient-to-tr via-transparent via-50% p-6 shadow-[0_0_12px_rgba(0,0,0,0.2)] sm:h-[calc(100vh-2rem)]">
        <div className="grid h-full w-full grid-rows-9 gap-2 sm:grid-cols-3 sm:gap-4">
          <div className="col-span-3 row-span-1 flex items-center justify-center">
            <CharacterHeader />
          </div>
          <div className="text-text border-b-accent col-span-3 flex items-center justify-center border-b text-center text-2xl font-bold capitalize sm:hidden">
            {name}
          </div>
          <div className="col-span-3 row-span-7 flex w-full flex-col overflow-x-hidden sm:col-span-2">
            <TabBar
              openTabs={openTabs}
              closeTab={closeTab}
              openTab={openTab}
              addTab={addTab}
              deleteTab={deleteTab}
              allTabs={allTabs}
            />
            <div className="flex w-full flex-1 flex-row gap-1 overflow-hidden">
              {openTabs.length === 0 ? (
                <div className="border-border bg-tile text-subheading flex h-full w-full items-center justify-center rounded-lg border text-center text-lg sm:p-8 sm:pb-8">
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

          <div className="col-span-3 row-span-3 sm:row-span-1">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
