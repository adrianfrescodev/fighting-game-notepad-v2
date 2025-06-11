import React from 'react';
import { useAuth } from '../../context/AuthContext';
export default function CharacterDeletePanel({
  isDeleting,
  setIsDeleting,
  selectedToDelete,
  setSelectedToDelete,
  characters,
  setCharacters,
  setCharacterSettings,
}) {
  const { token } = useAuth();
  const handleBulkDelete = async () => {
    for (const id of selectedToDelete) {
      const char = characters.find(c => c._id === id);
      if (!char) continue;

      try {
        if (char.user) {
          await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/characters`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ _id: id }),
          });

          setCharacters(prev => prev.filter(c => c._id !== id));
        } else {
          await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/usercharacterdata/${char.name}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ deleted: true }),
          });

          setCharacterSettings(prev => {
            const idx = prev.findIndex(s => String(s.character) === id);
            if (idx !== -1) {
              const updated = [...prev];
              updated[idx] = { ...updated[idx], deleted: true };
              return updated;
            } else {
              return [...prev, { character: id, deleted: true }];
            }
          });
        }
      } catch (err) {
        console.error(`Failed to delete "${char.name}":`, err);
      }
    }

    setSelectedToDelete([]);
    setIsDeleting(false);
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={() => {
          setSelectedToDelete([]);
          setIsDeleting(prev => !prev);
        }}
        className="rounded bg-red-400 px-2 py-1 text-white"
      >
        {isDeleting ? 'Cancel Delete' : 'Delete Characters'}
      </button>
      {isDeleting && (
        <button
          onClick={async () => {
            try {
              const res = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/api/usercharacterdata/restore-all`,
                {
                  method: 'PATCH',
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              if (res.ok) {
                setCharacterSettings(prev =>
                  prev.map(setting => (setting.deleted ? { ...setting, deleted: false } : setting))
                );
              } else {
                console.error('Failed to restore characters:', await res.text());
              }
            } catch (err) {
              console.error('Error restoring characters:', err);
            }
          }}
          className="rounded bg-blue-500 px-3 py-1 text-white"
        >
          Restore All Characters
        </button>
      )}

      {isDeleting && (
        <button onClick={handleBulkDelete} className="rounded bg-red-600 px-2 py-1 text-white">
          Delete
        </button>
      )}
    </div>
  );
}
