export default function StatusBadge({ status }) {
  const styles =
    status === 'Live'
      ? 'bg-emerald-50 text-emerald-800'
      : 'bg-stone-100 text-stone-600';

  return (
    <span className={`text-[9px] font-semibold px-2 py-1 rounded-full tracking-widest uppercase ${styles}`}>
      {status}
    </span>
  );
}
