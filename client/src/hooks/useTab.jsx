import { useState, useEffect, useMemo, useRef } from 'react';
export function useTabs(notes) {
  const [openTabs, setOpenTabs] = useState([]);
  const allTabs = useMemo(() => Object.keys(notes || {}), [notes]);
  const initialized = useRef(false);
  function openTab(name) {
    setOpenTabs(prev => [...prev, name]);
  }
  function closeTab(name) {
    setOpenTabs(prev => prev.filter(item => item !== name));
  }
  useEffect(() => {
    if (!initialized.current && allTabs.length > 0) {
      setOpenTabs([allTabs[0]]);
      initialized.current = true;
    }
  }, [allTabs]);
  return { openTabs, openTab, closeTab, allTabs };
}
export default useTabs;
