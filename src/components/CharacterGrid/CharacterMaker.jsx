import { useState, useEffect, useRef } from 'react';

export default function CharacterMaker({ addCharacter, setIsCreate }) {
  const [name, setName] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
    inputRef.current?.select();
  }, []);

  return (
    <div className="fixed inset-0 z-9999 flex w-full items-center justify-center bg-[rgba(0,0,0,0.5)]">
      <div className="bg-tile border-border fixed z-9999 grid h-[70%] w-[30%] grid-cols-2 grid-rows-8 rounded border p-4">
        <div className="col-span-2 row-span-2 row-start-3 flex flex-col items-center justify-center p-8">
          <div className="text-text mb-8 text-2xl">New Character Name:</div>

          <input
            ref={inputRef}
            className="text-text border-text bg- w-full rounded border p-2"
            value={name}
            placeholder="Character name"
            onChange={e => setName(e.target.value)}
          ></input>
        </div>
        <div className="col-span-2 row-start-8 flex gap-8 p-4">
          <button
            className="text-text border-border bg-accent-hover flex-1 cursor-pointer rounded border-2 hover:scale-105"
            onClick={() => setIsCreate(false)}
          >
            Cancel
          </button>
          <button
            className="text-text border-border bg-accent-hover flex-1 cursor-pointer rounded border-2 hover:scale-105"
            onClick={() => {
              const added = addCharacter(name);
              if (added) setIsCreate(false);
              else {
                alert('Character already exists.');
              }
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
