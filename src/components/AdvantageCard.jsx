function AdvantageCard ({ title, description, color, isActive }) {

  return (
    <div
      className="relative w-[280px] h-[420px] rounded-2xl overflow-hidden text-white"
    >
      <div 
        className="absolute inset-0 p-6 flex flex-col justify-between"
        style={{ backgroundColor: color }}
      >
        <div>
          <h2 className="text-xl font-bold leading-tight mb-2">{title}</h2>
          {isActive && (<p className="text-sm leading-snug">{description}</p>)}
        </div>
      </div>
    </div>
  );
};

export default AdvantageCard;
