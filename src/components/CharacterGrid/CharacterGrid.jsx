import Tile from './CharacterTile';



export default function Grid( {characters}) {
  return (
    <div className= "flex-1 w-full h-full max-h-[80vh] max-w-full overflow-y-auto">
    <div className= "grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 grid-flow-row auto-rows-[1fr] gap-3 w-full mx-auto my-0" >
      {characters.map(name => (
  <Tile key={name} name={name} />
))}
    </div>
    </div>
  )
}