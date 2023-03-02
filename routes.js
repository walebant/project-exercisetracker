const express = require('express');
const { UserSchema, ExerciseSchema } = require('./model');

const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// create user
router.post('/api/users', async (req, res) => {
  const user = new UserSchema({
    username: req.body.username,
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
    userId,
    username: user.username,
    date: date ? new Date(date) : new Date(),
    duration: Number(duration),
    description,
  });

  try {
    const exerciseData = await exercise.save();

    res.status(200).send({
      username: exerciseData.username,
      date: exerciseData.date.toDateString(),
      duration: exerciseData.duration,
      description: exerciseData.description,
      _id: exerciseData.userId,
    });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// get user's exercise log
router.get('/api/users/:_id/logs', async (req, res) => {
  try {
    const user = await UserSchema.findById(req.params._id);
    const { from, to, limit } = req.query;

    // Validate query parameters
    if (from && !isValidDate(from)) {
      return res.status(400).send({
        error: 'Invalid from date. Please enter date in yyyy-mm-dd format',
      });
    }

    // validate toDate
    if (to && !isValidDate(to)) {
      return res.status(400).send({
        error: 'Invalid to date. Please enter date in yyyy-mm-dd format',
      });
    }

    // validate limit
    if (limit && isNaN(limit)) {
      return res
        .status(400)
        .send({ error: 'Invalid limit. Please enter a number' });
    }

    // Prepare query options based on query parameters
    const options = {};
    if (from) {
      options.date = { $gte: new Date(from) };
    }
    if (to) {
      options.date = { ...options.date, $lte: new Date(to) };
    }

    // filter all exercise that matches the username
    const userExercises = await ExerciseSchema.find({
      username: user.username,
      ...options,
    })
      .limit(parseInt(limit))
      .select('-_id description duration date');

    res.send({
      username: user.username,
      _id: user._id,
      count: userExercises.length,
      _id: user._id,
      log: userExercises.map(item => ({
        description: item.description,
        duration: item.duration,
        date: item.date.toDateString(),
      })),
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Validate date strings in yyyy-mm-dd format
function isValidDate(dateString) {
  const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;
  return isoDateRegex.test(dateString);
}

module.exports = router;
