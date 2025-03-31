import { Link } from 'react-router-dom';

import axios from 'axios';
import axiosInstance from '../../helper/axios-instance';

import Main from '../../components/templates/Main';
import MainTitle from '../../components/titles/MainTitle';
import BaseInput from '../../components/inputs/BaseInput';
import SubmitInput from '../../components/inputs/SubmitInput';
import FormContainer from '../../components/containers/FormContainer';

const RegisterDiscipline = () => {
  const handleRegister = async (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();

    const name = (
      document.querySelector('input[type="text"]') as HTMLInputElement
    ).value;

    if (!name || name.trim() === '' || name.length < 2) {
      alert('Nome inválido');

      return;
    }

    try {
      await axiosInstance.post('/disciplines', {
        name,
      });

      alert('Disciplina cadastrada com sucesso!');
    } catch (error) {
      console.error('Erro ao cadastrar disciplina:', error);

      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          alert('Nome de disciplina já existe');
        }
      }

      if (!axios.isAxiosError(error)) {
        alert('Erro ao cadastrar disciplina');
      }
    }
  };

  return (
    <Main>
      <MainTitle title="Cadastrar Disciplina" />
      <FormContainer>
        <BaseInput
          label="Nome da disciplina"
          placeholder="Digite o nome da disciplina"
          type="text"
        />
        <SubmitInput text="Cadastrar disciplina" handleClick={handleRegister} />
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

export default RegisterDiscipline;
