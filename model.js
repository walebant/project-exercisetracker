const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    username: {
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
      type: Date,
      default: Date.now,
    },
    userId: {
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
