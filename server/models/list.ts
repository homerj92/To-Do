import mongoose, {Schema} from "mongoose";

const listSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  },
  activities: [{
    type: Schema.Types.ObjectId,
    ref: 'Activity'
  }]
});

const list = mongoose.model('List', listSchema);
export { list }
