import { useEffect, useState, useRef } from 'react';

import { AxiosResponse } from 'axios';

import axiosInstance from '../../helper/axios-instance';

import Main from '../../components/templates/Main';
import MainTitle from '../../components/titles/MainTitle';

import { StudentType } from '../../types/entities/StudentType';

const Frequency = () => {
  const [students, setStudents] = useState<StudentType[]>([]);
  const [cutoffValue, setCutoffValue] = useState<number>(75);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response: AxiosResponse<StudentType[]> = await axiosInstance.get(
        `/students/lowFrequency?frequency_below=${cutoffValue}`
      );

      setStudents(response.data);
    } catch (error) {
      console.error('Erro ao buscar frequências:', error);

      alert('Erro ao buscar frequências');
    }
  };

  useEffect(() => {
    inputRef.current?.click();
  }, []);

  return (
    <Main>
      <MainTitle
        title={`Alunos
            com a frequência abaixo de ${cutoffValue}%
        `}
      />
      <div>
        <form className="flex-col flex gap-4">
          <input
            type="number"
            onChange={(e) => setCutoffValue(Number(e.target.value))}
            placeholder="Digite o valor de corte"
            className="p-2 rounded-lg border border-gray-200"
          />
          <input
            type="submit"
            value="Buscar"
            className="bg-blue-500 text-white p-2 rounded-lg cursor-pointer hover:bg-blue-600 mb-2"
            onClick={handleSubmit}
            ref={inputRef}
          />
        </form>
      </div>
      <div className="flex flex-col gap-2">
        {students.length > 0 &&
          students.map(({ id, name, frequency }) => (
            <div
              key={id}
              className="flex items-center justify-between bg-white shadow-sm p-4 rounded-lg border border-gray-200"
            >
              <div className="flex flex-col gap-2 justify-between h-full">
                <p className="text-xs text-gray-500">ID: {id}</p>

                <div className="mt-2">
                  <p className="font-semibold text-lg text-gray-800">{name}</p>
                  <p className="text-sm text-gray-500">
                    Frequência: {frequency}%
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </Main>
  );
};

export default Frequency;
