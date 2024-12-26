// models/Task.js
import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a task name'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide a task description'],
  },
  assignees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  category: {
    type: String,
    enum: ['Front-end', 'Back-end'],
    required: [true, 'Please provide a category'],
  },
  status: {
    type: String,
    enum: ['To Do', 'In Progress', 'Completed'],
    default: 'To Do'
  },
  requestDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  dueDate: {
    type: Date,
    required: true
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});



const Task = mongoose.models.Task || mongoose.model('Task', taskSchema);
export default Task;
