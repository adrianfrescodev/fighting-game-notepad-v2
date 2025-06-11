import Tile from './CharacterTile';

export default function Grid({ characters }) {
  return (
    <div className="h-full max-h-[80vh] w-full max-w-full flex-1 overflow-y-auto">
      <div className="mx-auto my-0 grid w-full grid-flow-row auto-rows-[1fr] grid-cols-3 gap-3 p-4 md:grid-cols-4 lg:grid-cols-6">
        {characters.map(char => (
          <Tile key={char._id} char={char} />
        ))}
      </div>
    </div>
  );
}
