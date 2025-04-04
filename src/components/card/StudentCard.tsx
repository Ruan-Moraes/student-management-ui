import ButtonsContainer from '../containers/ButtonsContainer';
import Button from '../../components/buttons/Button';
import StudentInfo from '../informations/StudentInfo';
import { StudentType } from '../../types/entities/StudentType';

type StudentCardProps = {
  id: number;
  student: Partial<StudentType>;

  openModal: (id: number) => void;
  handleFrequency: (id: number) => void;
  handleName: (id: number) => void;
  handleDelete: (id: number) => void;
};

const StudentCard = ({
  id,
  student: { name, frequency },
  openModal,
  handleFrequency,
  handleName,
  handleDelete,
}: StudentCardProps) => {
  return (
    <div className="flex items-center justify-between bg-white shadow-sm p-4 rounded-lg border border-gray-200">
      <StudentInfo
        id={id}
        student={{
          name,
          frequency,
        }}
      />
      <ButtonsContainer className="flex flex-col gap-2">
        <Button
          className="bg-green-400 hover:bg-green-500"
          handleClick={() => openModal(id)}
          label="Matricular"
        />
        <Button
          className="bg-yellow-400 hover:bg-yellow-500"
          handleClick={() => handleName(id)}
          label="Alterar nome"
        />
        <Button
          className="bg-indigo-400 hover:bg-indigo-500"
          handleClick={() => handleFrequency(id)}
          label="Alterar Frequência"
        />
        <Button
          className="bg-red-400 hover:bg-red-500"
          handleClick={() => handleDelete(id)}
          label="Deletar"
        />
      </ButtonsContainer>
    </div>
  );
};

export default StudentCard;
