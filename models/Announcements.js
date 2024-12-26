import { Schema, model, models } from 'mongoose';

const AnnouncementSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
  },
  {
    timestamps: true,
  }
);

const Announcement = models.Announcement || model('Announcement', AnnouncementSchema);

export default Announcement;
