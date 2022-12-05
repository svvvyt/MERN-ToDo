import { Link } from 'react-router-dom';

import ListItem from '../ListItem';
import { Button } from '../UI/Button';

import { IListItem } from '../../types';

import styles from './List.module.scss';

interface ListProps {
  items: IListItem[];
  onTaskRemove: (item: any) => void;
}

export const List: React.FC<ListProps> = ({ items, onTaskRemove }) => {
  return (
    <>
      <div className={styles.list}>
        {items.map((item) => (
          <ListItem onRemove={onTaskRemove} key={item._id} item={item} />
        ))}
      </div>
      <div>
        <Link to="/add-task">
          <Button>Add Todo</Button>
        </Link>
      </div>
    </>
  );
};
