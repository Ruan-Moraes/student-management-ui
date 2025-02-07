type GradesInfoProps = {
  id: number;
  nome: string;
  percentualFrequencia: number;
};

const GradesInfo = ({ id, nome, percentualFrequencia }: GradesInfoProps) => {
  return (
    <div className="flex flex-col gap-2 justify-between h-full">
      <div className="mt-8">
        <p className="text-lg text-gray-800 font-bold">{nome}</p>
        <p className="text-sm text-gray-500">
          Frequência: {percentualFrequencia}%
        </p>
      </div>
      <p className="text-xs text-gray-500 mt-4">ID: {id}</p>
    </div>
  );
};

export default GradesInfo;
