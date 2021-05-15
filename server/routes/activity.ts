import express, { Request, Response } from "express";
import { list } from '../models/list';
import { activity } from '../models/activity';

const router = express.Router();

// Get activities
router.get('/getAll/:id', async (req: Request, res: Response) => {
  try {
    const activities = await  activity.find({listId: req.params.id}).exec();
    return res.json({ message: 'All activities', data: activities })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
})

// Find activity by id
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const findActivity = await  activity.findById(req.params.id).exec();
    if (!findActivity) {
      res.status(404).json({ message: 'Activity not found' });
    }
    return res.json({ message: 'Get Activity', user: findActivity })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
})

// Insert Activity
router.post('/insert', async (req: Request, res: Response) => {
  try {
    if (!req.body.description) { return res.status(400).json({message: 'Description are required'}) }
    const newActivity = await activity.create(req.body);
    const findList = await  list.findById(req.body.listId).exec();
    await findList?.updateOne({
      _id: req.body.listId,
      $push: {activities: newActivity.get('_id')}
    })
    return res.json({ message: 'Activity created', data: newActivity })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
});

// Update Activity
router.put('/edit/:id', async (req: Request, res: Response) => {
  try {
    if (!req.body.description) { return res.status(400).json({message: 'Description are required'}) }
    const findActivity = await  activity.findById(req.params.id).exec();
    if (!findActivity) {
      res.status(404).json({ message: 'Activity not found' });
    }
    const editActivity =  await findActivity?.updateOne({
      description: req.body.description,
      done: req.body.done
    })
    return res.json({ message: 'Activity edited', data: editActivity })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
});

// Delete Activity
router.delete('/delete/:id', async  (req: Request, res: Response) => {
  try {
    const findActivity: any = await activity.findById(req.params.id).exec();
    const findList = await  list.findById(findActivity?.listId).exec();
    await findList?.updateOne({
      _id: findList?._id,
      $pullAll: {activities: [req.params.id]}
    })
    await activity.findByIdAndDelete(req.params.id).exec();
    return res.json({ message: 'Activity deleted' })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

export { router as activityRouter }
