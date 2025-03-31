import { Link } from 'react-router-dom';

import axiosInstance from '../../helper/axios-instance';

import Main from '../../components/templates/Main';
import MainTitle from '../../components/titles/MainTitle';
import BaseInput from '../../components/inputs/BaseInput';
import SubmitInput from '../../components/inputs/SubmitInput';
import FormContainer from '../../components/containers/FormContainer';

const RegisterStudents = () => {
  const handleRegister = async (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();

    const name = (
      document.querySelector('input[type="text"]') as HTMLInputElement
    ).value;
    const frequency = (
      document.querySelector('input[type="number"]') as HTMLInputElement
    ).value;

    try {
      await axiosInstance.post('/students', {
        name,
        frequency,
      });

      alert('Aluno cadastrado com sucesso!');
    } catch (error) {
      console.error('Erro ao cadastrar aluno:', error);

      alert('Erro ao cadastrar aluno');
    }
  };

  return (
    <Main>
      <MainTitle title="Cadastrar Alunos" />
      <FormContainer>
        <BaseInput
          label="Nome"
          placeholder="Digite o nome do aluno"
          type="text"
        />
        <BaseInput
          label="Frequência"
          placeholder="Digite a frequência do aluno"
          type="number"
        />
        <SubmitInput text="Cadastrar aluno" handleClick={handleRegister} />
      </FormContainer>
      <div>
        <p className="text-sm mt-2 px-4">
          Não se esqueça matricular os alunos na disciplina cadastrada. Para
          isso, acesse a página de gerenciamento de alunos{' '}
          <Link to={'/alunos/gerenciar/'}>
            <span className="text-blue-500">clicando aqui</span>
          </Link>
        </p>
      </div>
    </Main>
  );
};

export default RegisterStudents;
