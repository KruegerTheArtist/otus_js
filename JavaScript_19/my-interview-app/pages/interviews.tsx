// pages/interviews.tsx

import { GetServerSideProps } from 'next';
import React from 'react';

interface Interview {
  id: number;
  title: string;
  date: string;
  description: string;
}

interface InterviewsProps {
  interviews: Interview[];
}

const InterviewsPage: React.FC<InterviewsProps> = ({ interviews }) => {
  return (
    <div>
      <h1>Технические собеседования</h1>
      <ul>
        {interviews.map((interview) => (
          <li key={interview.id}>
            {interview.title} - {interview.date}
            <ul>{interview.description}</ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InterviewsPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Fetch data from an API or database
  const interviews = [
    // Replace with actual data fetching logic
    { id: 1, title: 'Frontend Developer', date: '2023-04-05', description: 'Собеседование прошло успешно. Парень красавчик, опыта очень много. Че только не умеет. Все умеет в этой жизни и бэкенд и фронтенд и мидленд, все что на -енд он умеет' },
    { id: 2, title: 'Backend Developer', date: '2023-04-12', description: 'Ну, нормально. Как - то прошло. Берем в любом случае у нас нехватка кадров, да и человек хороший. Да и в таких компаниях до нас работал огронмых, классно' },
    // ...
  ];

  return {
    props: {
      interviews,
    },
  };
};