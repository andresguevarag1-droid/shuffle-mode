export default function Loading() {
  return (
    <div className="py-32 md:py-48">
      <div className="container-x flex flex-col items-center text-center">
        <span
          aria-hidden
          className="h-8 w-8 rounded-full border-2 border-ink/15 border-t-ember animate-spin"
        />
        <p className="mt-5 font-display text-lg text-stone">Pulling the drop…</p>
        <span className="sr-only" role="status">
          Loading
        </span>
      </div>
    </div>
  );
}
