import { useEffect, useState } from 'react';

import axios, { AxiosResponse } from 'axios';
import axiosInstance from '../../helper/axios-instance';

import { DisciplineType } from '../../types/entities/DisciplineType';

import Main from '../../components/templates/Main';
import MainTitle from '../../components/titles/MainTitle';
import CardsContainer from '../../components/containers/CardsContainer';
import DisciplineCard from '../../components/card/DisciplineCard';

const ManageStudents = () => {
  const [disciplines, setDisciplines] = useState<DisciplineType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const disciplinesResponse: AxiosResponse<DisciplineType[]> =
          await axiosInstance.get('/disciplines');

        setDisciplines(disciplinesResponse.data);
      } catch (error) {
        console.error('Erro ao buscar disciplinas:', error);
      }
    };

    fetchData();
  }, []);

  const handleName = async (id: number) => {
    const newNome = window.prompt('Digite o nome da disciplina');

    if (!newNome || newNome.trim() === '' || newNome.length < 2) {
      alert('Nome inválido');

      return;
    }

    try {
      await axiosInstance.put(`/disciplines/${id}`, {
        name: newNome,
      });

      setDisciplines((prev) =>
        prev.map((discipline) =>
          discipline.id === id ? { ...discipline, name: newNome } : discipline
        )
      );

      alert('Nome atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar nome:', error);

      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          alert('Nome de disciplina já existe');
        }

        if (error.response?.status === 404) {
          alert('Disciplina não encontrada');
        }
      }

      if (!axios.isAxiosError(error)) {
        alert('Erro ao atualizar nome da disciplina');
      }
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
      await axiosInstance.delete(`/disciplines/${id}`);

      setDisciplines((prev) =>
        prev.filter((discipline) => discipline.id !== id)
      );

      alert('Disciplina deletada com sucesso!');
    } catch (error) {
      console.error('Erro ao deletar aluno:', error);

      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          alert('Disciplina não encontrada');
        }
      }

      if (!axios.isAxiosError(error)) {
        alert('Erro ao deletar disciplina');
      }
    }
  };

  return (
    <Main>
      <MainTitle title="Gestão de Disciplinas" />
      <CardsContainer>
        {disciplines.map(({ id, name }) => (
          <DisciplineCard
            key={id}
            id={id}
            student={{
              name,
            }}
            handleName={handleName}
            handleDelete={handleDelete}
          />
        ))}
      </CardsContainer>
    </Main>
  );
};

export default ManageStudents;
