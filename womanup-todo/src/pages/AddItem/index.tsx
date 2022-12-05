import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import { Button } from '../../components/UI/Button';
import { Layout } from '../../components/Layout';

import styles from './AddItem.module.scss';

export const AddItem: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completionDate, setCompletionDate] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const isEditing = Boolean(id);

  const inputFileRef = useRef(null);

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('image', file);
      const { data } = await axios.post(
        'http://localhost:3001/upload',
        formData,
      );
      setImageUrl(data.url);
    } catch (error) {
      console.warn(error);
      alert('Ошибка при загрузке файла!');
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl('');
  };

  const onSubmit = async () => {
    try {
      const fields = {
        title,
        description,
        imageUrl,
        completionDate,
      };

      const { data } = isEditing
        ? await axios.patch(`http://localhost:3001/tasks/${id}`, fields)
        : await axios.post('http://localhost:3001/tasks', fields);

      const _id = isEditing ? id : data._id;

      navigate(`/tasks`);
    } catch (error) {
      console.warn(error);
      alert('Ошибка при создании задачи!');
    }
  };

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3001/tasks/${id}`)
        .then(({ data }) => {
          setTitle(data.title);
          setDescription(data.description);
          setImageUrl(data.imageUrl);
          setCompletionDate(data.completionDate);
        })
        .catch((err) => {
          console.warn(err);
          alert('Ошибка при получении статьи!');
        });
    }
  }, []);

  return (
    <Layout>
      <div className={styles.formsWrapper}>
        <div>
          <label className={styles.label} htmlFor="image">
            Attach image
          </label>
          <input
            ref={inputFileRef}
            type="file"
            onChange={handleChangeFile}
            id="image"
            hidden
          />
        </div>
        {imageUrl && (
          <div className={styles.imagePreview}>
            <img
              className={styles.image}
              src={`http://localhost:3001/${imageUrl}`}
              alt="Uploaded"
            />
            <Button className={styles.actionBtn} onClick={onClickRemoveImage}>
              Удалить
            </Button>
          </div>
        )}
        <br />
        <br />
        <div>
          <label className={styles.label} htmlFor="title">
            Enter title
          </label>
          <input
            id="title"
            type="text"
            className={styles.input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title..."
          />
        </div>
        <div>
          <label className={styles.label} htmlFor="description">
            Enter description
          </label>
          <input
            id="description"
            type="text"
            className={styles.input}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description..."
          />
        </div>
        <div>
          <label className={styles.label} htmlFor="completionDate">
            Enter completion date
          </label>
          <input
            id="completionDate"
            type="datetime-local"
            className={styles.input}
            min="2022-11-24"
            value={completionDate}
            onChange={(e) => setCompletionDate(e.target.value)}
          />
        </div>
      </div>
      <div>
        <Button className={styles.actionBtn} onClick={onSubmit}>
          {isEditing ? 'Save' : 'Publish'}
        </Button>
        <Button className={styles.actionBtn} onClick={() => navigate('/tasks')}>
          Cancel
        </Button>
      </div>
    </Layout>
  );
};
