interface Props {
  title: string;
  description: string;
}

export const CustomJumbotrom = ({ title, description }: Props) => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-5xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
        {title}
      </h1>
      {description && <p className="text-gray-600 text-lg">{description}</p>}
    </div>
  );
};
