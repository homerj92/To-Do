import mongoose, {Schema} from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  list: [{
    type: Schema.Types.ObjectId,
    ref: 'List'
  }]
});

const user = mongoose.model('User', userSchema);
export { user }
