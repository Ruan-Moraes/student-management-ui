import { useEffect, useState } from 'react';

import axiosInstance from '../../helper/axios-instance';

import Main from '../../components/templates/Main';
import MainTitle from '../../components/titles/MainTitle';
import CardsContainer from '../../components/containers/CardsContainer';
import DisciplineCard from '../../components/card/DisciplineCard';

interface Disciplina {
  id: number;
  nome: string;
}

const ManageStudents = () => {
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const disciplinesResponse = await axiosInstance.get(
          '/disciplinas/listar'
        );

        setDisciplinas(disciplinesResponse.data);
      } catch (error) {
        console.error('Erro ao buscar disciplinas:', error);
      }
    };

    fetchData();
  }, []);

  const handleName = async (id: number) => {
    const newNome = window.prompt('Digite o nome da disciplina');

    if (!newNome) {
      alert('Nome inválido');

      return;
    }

    try {
      await axiosInstance.put(`/disciplinas/atualizar/${id}`, {
        nome: newNome,
      });

      setDisciplinas((prev) =>
        prev.map((disciplina) =>
          disciplina.id === id ? { ...disciplina, nome: newNome } : disciplina
        )
      );

      alert('Nome atualizado com sucesso!');
    } catch (error) {
      alert('Erro ao atualizar nome da disciplina');

      console.error('Erro ao atualizar nome:', error);
    }
  };

  const handleDelete = async (id: number) => {
    const isConfirmed = window.confirm(
      'Deseja realmente deletar esta Disciplina?'
    );

    if (!isConfirmed) {
      return;
    }

    try {
      await axiosInstance.delete(`/disciplinas/deletar/${id}`);

      setDisciplinas((prev) =>
        prev.filter((disciplina) => disciplina.id !== id)
      );

      alert('Disciplina deletada com sucesso!');
    } catch (error) {
      alert('Erro ao deletar disciplina');

      console.error('Erro ao deletar aluno:', error);
    }
  };

  return (
    <Main>
      <MainTitle title="Gestão de Disciplinas" />
      <CardsContainer>
        {disciplinas.map(({ id, nome }) => (
          <DisciplineCard
            key={id}
            id={id}
            nome={nome}
            handleName={handleName}
            handleDelete={handleDelete}
          />
        ))}
      </CardsContainer>
    </Main>
  );
};

export default ManageStudents;
