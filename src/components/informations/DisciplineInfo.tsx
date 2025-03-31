type DisciplineInfoProps = {
  id: number;
  name: string;
};

const DisciplineInfo = ({ id, name }: DisciplineInfoProps) => {
  return (
    <div className="flex flex-col">
      <h2 className="font-bold">{name}</h2>
      <p className="text-xs text-gray-500">ID: {id}</p>
    </div>
  );
};

export default DisciplineInfo;
