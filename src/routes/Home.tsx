import Main from '../components/templates/Main';

import MainTitle from '../components/titles/MainTitle';
import ButtonsContainer from '../components/containers/ButtonsContainer';
import Button from '../components/buttons/LinkButton';

const Home = () => {
  return (
    <>
      <Main>
        <MainTitle title="Bem-vindo ao sistema de gestão de alunos" />
        <ButtonsContainer>
          <Button text="Alunos" link="alunos" />
          <Button text="Disciplinas" link="disciplinas" />
          <Button text="Notas" link="notas" />
          <Button text="Frequências" link="frequencias" />
        </ButtonsContainer>
      </Main>
    </>
  );
};

export default Home;
