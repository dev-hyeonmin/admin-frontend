export default function Loading() {
  return (
    <div>
      <div className="py-6">
        <div className="text-3xl font-medium">Notice</div>
        <div className="text-sm text-zinc-500">공지사항</div>
      </div>

      <div className="mt-6 flex w-full flex-col">
        {[...Array(10)].map((_, index) => (
          <div
            key={index}
            className="flex animate-pulse items-center justify-between gap-6 border-t border-gray-100 py-4"
          >
            <div className="flex items-center gap-6">
              <div className="h-10 w-16 rounded bg-neutral-100" />
              <div className="h-10 w-96 rounded bg-neutral-100" />
            </div>
            <div className="h-10 w-40 rounded bg-neutral-100" />
          </div>
        ))}
      </div>
    </div>
  );
}
