const express = require('express');
const short = require('short-uuid');
const { UserSchema, ExerciseSchema } = require('./model');

const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// create user
router.post('/api/users', async (req, res) => {
  const user = new UserSchema({
    username: req.body.username,
    _id: short.uuid(),
  });

  try {
    const userData = await user.save();
    res.status(200).send(userData);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

//  get all users
router.get('/api/users', async (req, res) => {
  try {
    const users = await UserSchema.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// create exercise
router.post('/api/users/:_id/exercises', async (req, res) => {
  const { description, duration, date } = req.body;
  const userId = req.params._id;
  const user = await UserSchema.findById(userId);

  const exercise = new ExerciseSchema({
    _id: short.uuid(),
    userId,
    username: user.username,
    date: date ? new Date(date).toDateString() : new Date().toDateString(),
    duration: Number(duration),
    description,
  });

  try {
    const exerciseData = await exercise.save();
    res.status(200).send({
      _id: userId,
      username: exerciseData.username,
      date: exerciseData.date,
      duration: exerciseData.duration,
      description: exerciseData.description,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ message: error.message });
  }
});

// get user's exercise log
// router.get('/api/users/:_id/logs?[from][&to][&limit]', async (req, res) => {
router.get('/api/users/:_id/logs', async (req, res) => {
  try {
    const user = await UserSchema.findById(req.params._id);
    const exercises = await ExerciseSchema.find();

    const { from, to, limit } = req.query;

    const filteredExercise = exercises.map(ex => {
      if (ex.userId === user._id) {
        return {
          description: ex.description,
          duration: ex.duration,
          date: ex.date,
        };
      }
    });

    res.send({
      username: user.username,
      count: filteredExercise.length,
      _id: user._id,
      log: filteredExercise,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Helper function to validate date strings in yyyy-mm-dd format
function isValidDate(dateString) {
  const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;
  return isoDateRegex.test(dateString);
}

module.exports = router;
