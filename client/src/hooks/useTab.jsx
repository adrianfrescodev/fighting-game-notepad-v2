import { useState } from 'react';
export function useTabs() {
  const [openTabs, setOpenTabs] = useState(['general']);
  function openTab(name) {
    setOpenTabs(prev => [...prev, name]);
  }
  function closeTab(name) {
    setOpenTabs(prev => prev.filter(item => item !== name));
  }

  return { openTabs, openTab, closeTab };
}
export default useTabs;
