import React, { useState, memo } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import axios from 'axios';

import { Button } from '../UI/Button';

import { IListItem } from '../../types';

import { formatDate, getTimeToDate } from '../../utils/dateFormat';

import styles from './ListItem.module.scss';

interface ListItemProps {
  item: IListItem;
  onRemove: (item: any) => void;
}

export const ListItem: React.FC<ListItemProps> = ({ item, onRemove }) => {
  const [isCompleted, setIsCompleted] = useState(false);

  const handleIsCompleted = () => {
    setIsCompleted(!isCompleted);
  };

  const handleChangeCheckbox = async () => {
    try {
      const field = { isCompleted: !isCompleted };
      await axios.patch(`http://localhost:3001/tasks/${item._id}`, field);
    } catch (error) {
      console.log(error);
      alert('Ошибка при изменении состояния задачи!');
    }
  };

  return (
    item && (
      <div className={styles.listItem} key={item._id}>
        <div className={styles.listItem__isCompleted}>
          <input
            checked={isCompleted}
            onClick={handleIsCompleted}
            onChange={handleChangeCheckbox}
            type="checkbox"
            className={styles.listItem__checkbox}
            id="isCompletedCheckbox"
          />
          {item.isCompleted}
          <label htmlFor="isCompletedCheckbox"></label>
        </div>
        <div
          className={clsx(
            styles.listItem__content,
            isCompleted === true ? styles.listItem__contentFinished : '',
          )}
        >
          <Link to={`/tasks/${item._id}`}>
            <div className={styles.listItem__title}>{item.title}</div>
          </Link>
          <div className={styles.listItem__description}>{item.description}</div>
          <div className={styles.listItem__dates}>
            <div className={styles.listItem__completionDate}>
              Finish before: {formatDate(item.completionDate)}
            </div>
            <div className={styles.listItem__timeLeft}>
              Time left: {getTimeToDate(Date.now(), item.completionDate)}
            </div>
          </div>
          {item.imageUrl && (
            <img
              className={styles.listItem__image}
              src={`http://localhost:3001/${item.imageUrl}`}
              alt={item.title}
            />
          )}
        </div>
        <div className={styles.listItem__actionBtn}>
          <Link to={`/tasks/${item._id}/edit`}>
            <Button>Edit</Button>
          </Link>
        </div>
        <div className={styles.listItem__actionBtn}>
          <Button onClick={() => onRemove(item._id)}>Remove</Button>
        </div>
      </div>
    )
  );
};

export default memo(ListItem);
