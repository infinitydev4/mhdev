export default function BlogSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="bg-gray-900/50 rounded-2xl overflow-hidden border border-gray-800 animate-pulse"
        >
          <div className="h-48 bg-gray-800" />
          <div className="p-6 space-y-4">
            <div className="flex gap-2">
              <div className="h-6 w-20 bg-gray-800 rounded-full" />
              <div className="h-6 w-16 bg-gray-800 rounded-full" />
            </div>
            <div className="h-6 bg-gray-800 rounded w-3/4" />
            <div className="space-y-2">
              <div className="h-4 bg-gray-800 rounded" />
              <div className="h-4 bg-gray-800 rounded w-5/6" />
            </div>
            <div className="flex gap-4">
              <div className="h-4 w-24 bg-gray-800 rounded" />
              <div className="h-4 w-16 bg-gray-800 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
