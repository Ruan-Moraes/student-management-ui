import Main from '../../components/templates/Main';
import MainTitle from '../../titles/MainTitle';
import BaseInput from '../../components/inputs/BaseInput';
import SubmitInput from '../../components/inputs/SubmitInput';

const RegisterDiscipline = () => {
  const handleCadastro = async (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();

    const nome = (
      document.querySelector('input[type="text"]') as HTMLInputElement
    ).value;

    try {
      const response = await fetch(
        'http://localhost:8080/disciplinas/cadastrar',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nome,
          }),
        }
      );

      if (response.ok) {
        alert('Disciplina cadastrada com sucesso!');
      }

      if (!response.ok) {
        alert('Erro ao cadastrar disciplina!');
      }
    } catch (error) {
      console.error('Erro ao cadastrar disciplina:', error);
    }
  };

  return (
    <Main>
      <MainTitle title="Cadastrar Disciplina" />
      <div className="bg-blue-100 p-4 rounded-lg">
        <form className="flex-col flex">
          <BaseInput
            label="Nome da disciplina"
            placeholder="Digite o nome da disciplina"
            type="text"
          />
          <SubmitInput text="Cadastrar aluno" handleClick={handleCadastro} />
        </form>
      </div>
    </Main>
  );
};

export default RegisterDiscipline;
