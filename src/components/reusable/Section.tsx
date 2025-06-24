// Reusable Section Component
export const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="mb-8">
    <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
    {children}
  </div>
);
