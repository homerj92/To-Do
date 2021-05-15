import express from 'express'
import { json } from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import { userRouter } from '../routes/user';
import {listRouter} from "../routes/list";
import {activityRouter} from "../routes/activity";

const app = express();
const PORT: number = 3001;
const url: string = 'mongodb://localhost/ToDo';
app.use(json());
app.use(cors());
app.use('/api/user', userRouter);
app.use('/api/list', listRouter);
app.use('/api/activity', activityRouter);

mongoose.connect(url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));

export default app



