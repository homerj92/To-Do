import express, { Request, Response } from "express";
import { list } from '../models/list';
import {user} from "../models/user";

const router = express.Router();

// Get lists
router.get('/getAll/:id', async (req: Request, res: Response) => {
  try {
    const lists = await  list.find({userId: req.params.id}).sort({ date: -1 }).exec();
    return res.json({ message: 'All list', data: lists })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
})

// Find list by id
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const findList = await  list.findById(req.params.id).exec();
    if (!findList) {
      res.status(404).json({ message: 'List not found' });
    }
    return res.json({ message: 'Get list', user: findList })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
})

// Insert list
router.post('/insert', async (req: Request, res: Response) => {
  try {
    if (!req.body.name && !req.body.description) { return res.status(400).json({message: 'Name and Description are required'}) }
    const newList = await list.create(req.body);
    const findUser = await  user.findById(req.body.userId).exec();
    await findUser?.updateOne({
      _id: req.body.userId,
      $push: {list: newList.get('_id')}
    })
    return res.json({ message: 'List created', data: newList })
  } catch (error) {
      res.status(500).json({ message: 'Internal server error' })
  }
});

// Update list
router.put('/edit/:id', async (req: Request, res: Response) => {
  try {
    if (!req.body.name && !req.body.description) { return res.status(400).json({message: 'Name and Description are required'}) }
    const findList = await  list.findById(req.params.id).exec();
    if (!findList) {
      res.status(404).json({ message: 'List not found' });
    }
   const editList =  await findList?.updateOne({
      name: req.body.name,
      description: req.body.description
    })
    return res.json({ message: 'List edited', data: editList })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
});

// Delete list
router.delete('/delete/:id', async  (req: Request, res: Response) => {
  try {
    const findList: any = await list.findById(req.params.id).exec();
    const findUser = await  user.findById(findList?.userId).exec();
    await findUser?.updateOne({
      _id: findUser?._id,
      $pullAll: {list: [req.params.id]}
    })
    await list.findByIdAndDelete(req.params.id).exec();
    return res.json({ message: 'List deleted' })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

export { router as listRouter }
