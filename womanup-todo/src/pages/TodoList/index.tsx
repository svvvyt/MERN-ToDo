import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Layout } from '../../components/Layout';
import { List } from '../../components/List';
import { LoadingBlock } from '../../components/LoadingBlock';

import { IListItem } from '../../types';

export const TodoList = () => {
  const [tasks, setTasks] = useState<IListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const onTaskRemove = (itemId: number) => {
    const newTasks = tasks.filter((task) => task._id !== itemId);
    axios
      .delete(`http://localhost:3001/tasks/${itemId}`)
      .then(() => setTasks(newTasks));
  };

  useEffect(() => {
    setIsLoading(!isLoading);
    axios
      .get<IListItem[]>('http://localhost:3001/tasks')
      .then((res) => setTasks(res.data))
      .catch((err) => {
        console.warn(err);
        alert('Ошибка при получении задач!');
      });
    setIsLoading(!isLoading);
  }, []);

  return (
    <Layout>
      {isLoading ? (
        <List onTaskRemove={onTaskRemove} items={tasks} />
      ) : (
        <LoadingBlock />
      )}
    </Layout>
  );
};
