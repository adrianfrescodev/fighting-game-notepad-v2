export default function CharacterPortrait({ name }) {
  return (
    <div className="flex flex-1 flex-col items-center rounded-lg bg-[#181818] p-4 shadow-[0_0_6px_rgba(0,0,0,0.3)]">
      <img
        src={`/Images/${name}-full.png`}
        className="border-accent-hover bg-tile box-shadow h-[55vh] rounded-lg border object-contain shadow-[0_0_7px_rgba(255,255,255,0.1)]"
      ></img>
      <div className="text-text mt-4 pt-4 text-center text-4xl font-bold capitalize">{name}</div>
    </div>
  );
}
