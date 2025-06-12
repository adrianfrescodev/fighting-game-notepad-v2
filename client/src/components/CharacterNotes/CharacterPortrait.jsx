export default function CharacterPortrait({ name }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-1 flex-col items-center rounded-lg bg-[#181818] p-4 shadow-[0_0_6px_rgba(0,0,0,0.3)]">
        <img
          src={`/Images/${name}-full.webp`}
          className="border-accent-hover bg-tile box-shadow rounded-lg border object-contain shadow-[0_0_7px_rgba(255,255,255,0.1)]"
          onError={e => {
            e.target.onerror = null;
            e.target.src = '/Images/default-full.webp';
          }}
        ></img>
        <div className="text-text border-b-accent mt-4 border-b pt-4 text-center text-4xl font-bold capitalize">
          {name}
        </div>
      </div>
      <div className="bg-tile flex-1 items-center rounded-lg bg-[linear-gradient(to_top_right,rgba(255,255,255,0.03),transparent_50%)] p-4 shadow-[0_0_6px_rgba(0,0,0,0.3)]"></div>
    </div>
  );
}
