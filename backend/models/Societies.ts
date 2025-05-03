// models/Society.js
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const societySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  college: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  social: {
    website: String,
    instagram: String,
    linkedin: String,
    twitter: String,
  },
  pass: {
    type: String,
    required: true,
  },
  connected_companies: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Company',
    },
  ],
  events: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Event',
    },
  ],
  proposal: {
    type: String,
  },
  desc: {
    type: String,
  },
  sponsors: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Company',
    },
  ],
  type: {
    type: String,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  prev_sponsors: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Company',
    },
  ],
  budget: {
    type: Number,
  },
}, { timestamps: true });

const Society = model('Society', societySchema);
export default Society;
