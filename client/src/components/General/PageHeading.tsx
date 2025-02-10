export interface PageHeadingProps {
  title: string;
}

export default function PageHeading({ title }: PageHeadingProps) {
  return (
    <>
      <h2 className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight mb-8 text-center py-6">
        {title}
      </h2>
    </>
  );
}
