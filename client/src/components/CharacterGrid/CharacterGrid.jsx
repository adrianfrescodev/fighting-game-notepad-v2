import Tile from './CharacterTile';

export default function Grid({
  characters,
  onToggleFavorite,
  onToggleDelete,
  isSelectedToDelete,
  isDeleting,
}) {
  return (
    <div className="h-full max-h-[80vh] w-full max-w-full flex-1 overflow-y-auto">
      <div className="mx-auto grid w-full grid-flow-row auto-rows-[1fr] grid-cols-2 gap-3 p-4 md:grid-cols-4 lg:grid-cols-6">
        {characters.map(char => (
          <Tile
            key={char._id || char.name}
            char={char}
            onToggleFavorite={() => onToggleFavorite(char.name, !char.favorite)}
            onToggleDelete={onToggleDelete}
            isSelectedToDelete={isSelectedToDelete(char._id)}
            isDeleting={isDeleting}
          />
        ))}
      </div>
    </div>
  );
}
