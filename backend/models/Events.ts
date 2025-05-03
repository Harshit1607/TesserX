// models/Event.js
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const eventSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  desc: {
    type: String,
  },
  proposal: {
    type: String,
  },
  budget: {
    type: Number,
  },
  sponsors: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Company',
    },
  ],
  society: {
    type: Schema.Types.ObjectId,
    ref: 'Society',
    required: true,
  },
  event_type: { type: String }, // e.g., 'tech', 'cultural'
  target_audience: { type: String }, // e.g., 'students', 'general public'
  location: { type: String }, // e.g., 'New Delhi'

}, { timestamps: true });

const Event = model('Event', eventSchema);
export default Event;
