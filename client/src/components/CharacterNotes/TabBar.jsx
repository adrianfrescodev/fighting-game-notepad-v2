import { useState } from 'react';

export default function TabBar({ openTabs, openTab, closeTab, allTabs, addTab, deleteTab }) {
  const [isAdding, setIsAdding] = useState(false);
  const [tabName, setTabName] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [tabToDelete, setTabToDelete] = useState(null);
  return (
    <div className="flex flex-row content-center justify-center gap-1 overflow-x-auto px-2 pb-1">
      {allTabs.map(tab => (
        <button
          key={tab}
          className={`group relative flex min-w-0 flex-1 items-center justify-center gap-2 rounded-md px-3 py-1 text-center transition ${
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
          <span className="w-full truncate text-center" title={tab}>
            {tab.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </span>

          <span
            className="text-muted hidden text-xs text-gray-50 hover:text-red-500 group-hover:inline"
            onClick={e => {
              e.stopPropagation();
              setTabToDelete(tab);
              setIsDeleting(true);
            }}
          >
            ×
          </span>
        </button>
      ))}
      {isDeleting && (
        <div className="z-9999 fixed inset-0 flex w-full items-center justify-center bg-[rgba(0,0,0,0.5)]">
          <div className="bg-tile border-border z-9999 fixed grid h-[20%] w-[20%] grid-cols-2 grid-rows-2 rounded border p-4">
            <div className="text-1xl text-text col-span-2 row-span-1 flex items-center justify-center font-extrabold">
              Are you sure you want to delete {tabToDelete}?
            </div>
            <button
              className="text-text border-border bg-accent-hover border-1 col-span-1 row-span-1 m-4 flex cursor-pointer items-center justify-center rounded p-4 hover:scale-105"
              onClick={() => {
                setIsDeleting(false);
                setTabToDelete(null);
              }}
            >
              Cancel
            </button>
            <button
              className="text-text border-border bg-accent-hover border-1 col-span-1 row-span-1 m-4 flex cursor-pointer items-center justify-center rounded p-4 hover:scale-105 hover:bg-red-500"
              onClick={() => {
                if (tabToDelete) closeTab(tabToDelete);
                if (tabToDelete) deleteTab(tabToDelete);
                setIsDeleting(false);
                setTabToDelete(null);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      )}
      {isAdding && (
        <input
          className="bg-accent-hover text-text placeholder:text-text placeholder:text-s min-w-32 flex-1 rounded-md py-1 font-semibold transition"
          placeholder="New tab name"
          value={tabName}
          autoFocus
          onChange={e => setTabName(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter' && tabName.trim()) {
              addTab(tabName.trim());
              openTab(tabName.trim());
              setIsAdding(false);
              setTabName('');
            } else if (e.key === 'Escape') {
              setIsAdding(false);
              setTabName('');
            }
          }}
          onBlur={() => {
            setIsAdding(false);
            setTabName('');
          }}
        />
      )}

      <button
        className="bg-tile hover:bg-accent-hover text-text aspect-square h-full rounded-md"
        onClick={() => setIsAdding(true)}
      >
        +
      </button>
    </div>
  );
}
