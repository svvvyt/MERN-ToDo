import TaskModel from '../models/Task.js';

export const getAll = async (req, res) => {
  try {
    const tasks = await TaskModel.find().exec();

    res.json(tasks);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось загрузить задачи',
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const taskId = req.params.id;

    TaskModel.findOneAndUpdate(
      {
        _id: taskId,
      },
      {},
      {
        returnDocument: 'after',
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: 'Не удалось загрузить задачу',
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: 'Задача не найдена',
          });
        }

        res.json(doc);
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось загрузить задачу',
    });
  }
};

export const removeOne = async (req, res) => {
  try {
    const taskId = req.params.id;

    TaskModel.findOneAndDelete(
      {
        _id: taskId,
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: 'Не удалось удалить задачу',
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: 'Задача не найдена',
          });
        }

        res.json({
          success: true,
        });
      }
    );
  } catch (err) {}
};

export const createOne = async (req, res) => {
  try {
    const doc = new TaskModel({
      title: req.body.title,
      description: req.body.description,
      completionDate: req.body.completionDate,
      isCompleted: req.body.isCompleted,
      imageUrl: req.body.imageUrl,
    });

    const task = await doc.save();

    res.json(task);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось создать задачу',
    });
  }
};

export const updateOne = async (req, res) => {
  try {
    const taskId = req.params.id;

    await TaskModel.updateOne(
      {
        _id: taskId,
      },
      {
        title: req.body.title,
        description: req.body.description,
        completionDate: req.body.completionDate,
        isCompleted: req.body.isCompleted,
        imageUrl: req.body.imageUrl,
      }
    );

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось изменить задачу',
    });
  }
};
