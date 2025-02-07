type DisciplineInfoProps = {
  id: number;
  nome: string;
};

const DisciplineInfo = ({ id, nome }: DisciplineInfoProps) => {
  return (
    <div className="flex flex-col">
      <h2 className="font-bold">{nome}</h2>
      <p className="text-xs text-gray-500">ID: {id}</p>
    </div>
  );
};

export default DisciplineInfo;
