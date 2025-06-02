import { useState } from 'react';

export function useTabs() {
  const [openTabs, setOpenTabs] = useState(['general']);
  const [allTabs, setAllTabs] = useState(['general', 'combos', 'key-moves']);
  function openTab(name) {
    setOpenTabs(prev => [...prev, name]);
  }
  function closeTab(name) {
    setOpenTabs(prev => prev.filter(item => item !== name));
  }
  function addTab(name) {
    setAllTabs(prev => [...prev, name]);
  }

  function deleteTab(name) {
    setAllTabs(prev => prev.filter(item => item !== name));
  }

  return { openTabs, openTab, closeTab, allTabs, deleteTab, addTab };
}
export default useTabs;
