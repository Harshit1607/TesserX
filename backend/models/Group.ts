import mongoose from 'mongoose'

const groupSchema = new mongoose.Schema({
  Users: {type: [mongoose.Schema.Types.ObjectId], ref: 'User', default: []},
  UserDetails:{type: Object, default:[]},
}, { timestamps: true })

export default  mongoose.model('Group', groupSchema);