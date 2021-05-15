import mongoose, {Schema} from "mongoose";

const activitySchema = new mongoose.Schema({
  listId: {
    type: Schema.Types.ObjectId,
    ref: 'List'
  },
  description: {
    type: String,
    required: true
  },
  done: {
    type: Boolean,
    default: false
  }
});

const activity = mongoose.model('Activity', activitySchema);
export { activity }
