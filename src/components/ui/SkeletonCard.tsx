const SkeletonCard = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-3xl border border-blue-100 shadow animate-pulse">
      <div className="flex gap-4 mb-10">
        <div className="w-16 h-16 bg-gray-200 rounded-xl" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 w-1/2 rounded" />
          <div className="h-3 bg-gray-100 w-1/3 rounded" />
        </div>
      </div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-100 rounded w-full" />
        <div className="h-4 bg-gray-100 rounded w-5/6" />
        <div className="h-4 bg-gray-100 rounded w-2/3" />
      </div>
    </div>
  );
};

export default SkeletonCard;
