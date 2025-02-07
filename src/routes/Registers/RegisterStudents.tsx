import Main from '../../components/templates/Main';
import MainTitle from '../../components/titles/MainTitle';
import BaseInput from '../../components/inputs/BaseInput';
import SubmitInput from '../../components/inputs/SubmitInput';

const RegisterStudents = () => {
  const handleCadastro = async (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();

    const nome = (
      document.querySelector('input[type="text"]') as HTMLInputElement
    ).value;
    const percentualFrequencia = (
      document.querySelector('input[type="number"]') as HTMLInputElement
    ).value;

    try {
      const response = await fetch('http://localhost:8080/alunos/cadastrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome,
          percentualFrequencia,
        }),
      });

      if (response.ok) {
        alert('Aluno cadastrado com sucesso!');
      }

      if (!response.ok) {
        alert('Erro ao cadastrar aluno!');
      }
    } catch (error) {
      console.error('Erro ao cadastrar aluno:', error);
    }
  };

  return (
    <Main>
      <MainTitle title="Cadastrar Alunos" />
      <div className="bg-blue-100 p-4 rounded-lg">
        <form className="flex-col flex">
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
          <SubmitInput text="Cadastrar aluno" handleClick={handleCadastro} />
        </form>
      </div>
    </Main>
  );
};

export default RegisterStudents;
