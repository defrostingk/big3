import express from 'express';
import { Workout } from '../models/Records';
import User from '../models/User';

const sectionTitle = 'Workout';
const ERROR_FAILED_TO_SAVE = 'Failed to save.';

export function getWorkout(req, res) {
  return res.render('workout', { sectionTitle });
}

export async function postWorkout(req, res) {
  const workoutRecordsObj = req.body;
  const { _id } = res.locals.loggedInUser;
  try {
    const user = await User.findById(_id);
    const workoutRecords = await Workout.create(workoutRecordsObj);
    user.workoutRecords.push(workoutRecords._id);
    user.save();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .render('workout', { sectionTitle, errorMessage: ERROR_FAILED_TO_SAVE });
  }

  return res.render('workout', { sectionTitle });
}
