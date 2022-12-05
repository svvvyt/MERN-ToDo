import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

import { ListItem } from '../../components/ListItem';
import { LoadingBlock } from '../../components/LoadingBlock';
import { Layout } from '../../components/Layout';
import { Button } from '../../components/UI/Button';

import { IListItem } from '../../types';

export const TodoItem = () => {
  const [task, setTask] = useState<IListItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();

  const onTaskRemove = () => {
    setIsLoading(true);
    axios.delete(`http://localhost:3001/tasks/${id}`).then(() => setTask(null));
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get<IListItem>(`http://localhost:3001/tasks/${id}`)
      .then((res) => setTask(res.data))
      .catch((err) => {
        console.warn(err);
        alert('Ошибка при получении задачи!');
      });
    setIsLoading(false);
  }, []);

  return (
    <Layout>
      {isLoading === true ? (
        <LoadingBlock />
      ) : task ? (
        <ListItem onRemove={onTaskRemove} item={task} />
      ) : (
        'Задача не найдена'
      )}
      <Link to="/tasks">
        <Button> ← Go back</Button>
      </Link>
    </Layout>
  );
};
