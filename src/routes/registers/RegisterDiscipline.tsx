import { Link } from 'react-router-dom';

import axiosInstance from '../../helper/axios-instance';

import Main from '../../components/templates/Main';
import MainTitle from '../../components/titles/MainTitle';
import BaseInput from '../../components/inputs/BaseInput';
import SubmitInput from '../../components/inputs/SubmitInput';
import FormContainer from '../../components/form/FormContainer';

const RegisterDiscipline = () => {
  const handleRegister = async (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();

    const nome = (
      document.querySelector('input[type="text"]') as HTMLInputElement
    ).value;

    try {
      await axiosInstance.post('/disciplinas/cadastrar', {
        nome,
      });

      alert('Disciplina cadastrada com sucesso!');
    } catch (error) {
      alert('Erro ao cadastrar disciplina');

      console.error('Erro ao cadastrar disciplina:', error);
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
