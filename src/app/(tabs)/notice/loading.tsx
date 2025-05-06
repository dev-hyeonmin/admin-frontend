export default function Loading() {
  return (
    <div>
      <div className="py-6">
        <div className="text-3xl font-medium">Notice</div>
        <div className="text-sm text-zinc-500">공지사항</div>
      </div>

      <div className="flex flex-col mt-6 w-full">
        {[...Array(10)].map((_, index) => (
          <div
            key={index}
            className="flex gap-6 py-4 border-t border-gray-100 justify-between items-center"
          >
            <div className="flex gap-6 items-center">
              <div className="bg-neutral-100 h-10 w-16 rounded" />
              <div className="bg-neutral-100 h-10 w-96 rounded" />
            </div>
            <div className="bg-neutral-100 h-10 w-40 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
