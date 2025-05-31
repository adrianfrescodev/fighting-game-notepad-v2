export default function TabBar({ openTabs, openTab, closeTab, allTabs }) {
  return (
    <div className="flex flex-row content-center justify-center gap-1 pb-1">
      {allTabs.map(tab => (
        <button
          key={tab}
          className={`flex-1 cursor-pointer rounded-md py-1 transition ${
            openTabs.includes(tab)
              ? 'bg-accent-hover text-text font-semibold'
              : 'text-subheading hover:bg-accent-hover bg-tile'
          }`}
          onClick={() => {
            if (openTabs.includes(tab)) {
              closeTab(tab);
            } else {
              openTab(tab);
            }
          }}
        >
          {tab.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
        </button>
      ))}
    </div>
  );
}
