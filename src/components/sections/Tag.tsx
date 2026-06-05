const colorMap = {
  amber: 'bg-amber-50 text-amber-800',
  blue: 'bg-blue-50 text-blue-800',
  purple: 'bg-violet-50 text-violet-800',
  teal: 'bg-teal-50 text-teal-800',
  pink: 'bg-pink-50 text-pink-800',
};

export default function Tag({ label, color = 'amber' }) {
  return (
    <span
      className={`text-[10px] font-medium px-2.5 py-1 rounded-full tracking-wide ${colorMap[color]}`}
    >
      {label}
    </span>
  );
}
