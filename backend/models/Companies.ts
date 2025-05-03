// models/Company.js
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const companySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  industry: {
    type: String,
  },
  website: {
    type: String,
  },
  logo: {
    type: String,
  },
  description: {
    type: String,
  },
  contact_person: {
    name: String,
    phone: String,
  },
  sponsored_societies: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Society',
    },
  ],
  sponsored_events: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Event',
    },
  ],
  verified: {
    type: Boolean,
    default: false,
  },
  event_type: { type: String }, // types they prefer to sponsor
  target_audience: { type: String }, // audiences they want to reach
  budget: { type: Number }, // sponsorship budget
  location: { type: String }, // preferred location
  proposal: {type: String,}

}, { timestamps: true });

const Company = model('Company', companySchema);
export default Company;
