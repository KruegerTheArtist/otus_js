// pages/interviews.tsx

import { GetServerSideProps } from 'next';
import React from 'react';

interface Interview {
  id: number;
  title: string;
  date: string;
  // Add more properties as needed
}

interface InterviewsProps {
  interviews: Interview[];
}

const InterviewsPage: React.FC<InterviewsProps> = ({ interviews }) => {
  return (
    <div>
      <h1>Technical Interviews</h1>
      <ul>
        {interviews.map((interview) => (
          <li key={interview.id}>
            {interview.title} - {interview.date}
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
    { id: 1, title: 'Frontend Developer', date: '2023-04-05' },
    { id: 2, title: 'Backend Developer', date: '2023-04-12' },
    // ...
  ];

  return {
    props: {
      interviews,
    },
  };
};