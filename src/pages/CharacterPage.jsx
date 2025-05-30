import useCharacterNotes from "../hooks/useCharacterNotes";
import { useParams } from "react-router";
//import { useState, useEffect } from 'react';
import {CharacterHeader, CharacterPortrait, NoteEditor, TabBar} from "../components/CharacterNotes"
import Footer from '../components/Footer/Footer';



export default function About() {
  const { name } = useParams(); // get character name from URL
  const { notes, updateNotes } = useCharacterNotes(name);
    const openTabs = ["general", "combos", "key-moves"]
  return (
    <div className="w-full h-screen bg-background flex items-center justify-center overflow-hidden">
    <div className="bg-card  max-w-4xl w-full rounded-[10px] my-4 mx-auto h-[calc(100vh-2rem)] shadow-[0_0_12px_rgba(0,0,0,0.2)] bg-gradient-to-tr from-white/3 via-transparent via-50% p-6">
     <div className="grid grid-cols-3 grid-rows-6 gap-4 h-full w-full">
     <div className="col-span-3 row-span-1">
     <CharacterHeader />
    </div>
    <div className="col-span-2 row-span-4 flex flex-col">
     <TabBar/>
     <div className="flex flex-row flex-1 w-full overflow-y-auto">
     {openTabs.map((tab) => (
      <NoteEditor key={tab} section={tab} value={notes[tab]} onChange={newValue => updateNotes(tab, newValue)} />))}
     </div>
    </div>
    <div className="col-span-1 row-span-4">
     <CharacterPortrait />
    </div>
    <div className="row-span-1 col-span-3">
      <Footer />
    </div>
    </div>
    </div>
    </div>
  )
}