const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    username: {
      required: true,
      type: String,
    },
    _id: {
      required: true,
      type: String,
    },
  },
  { versionKey: false }
);

const ExerciseSchema = new Schema(
  {
    username: {
      required: true,
      type: String,
    },
    description: {
      required: true,
      type: String,
    },
    duration: {
      required: true,
      type: Number,
    },
    date: {
      required: true,
      type: String,
    },
    userId: {
      required: true,
      type: String,
    },
    _id: {
      required: true,
      type: String,
    },
  },
  { versionKey: false }
);

module.exports = {
  UserSchema: mongoose.model('User', UserSchema),
  ExerciseSchema: mongoose.model('Exercise', ExerciseSchema),
};
