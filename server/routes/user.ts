import express, { Request, Response } from "express";
import { user } from '../models/user';
import {IAuth} from "../models/auth";

const router = express.Router();

// Signup user
router.post('/signup', async (req: Request, res: Response) => {
  try {
    const newUser = await user.create(req.body);
    return res.json({ message: 'User created', data: newUser })
  } catch (error) {
    error.name === 'MongoError' && error.code === 11000
      ? res.status(409).json({ message:'Email or Username already exist' })
      : res.status(500).json({ message: 'Internal server error' })
  }
});

// login user
router.post('/login', async (req: Request, res: Response) => {
  if (!req.body.email && !req.body.password) { return res.status(400).json({message: 'Email and Password are required'}) }
  const findUser = user.findOne({ email: req.body.email }).exec();
  findUser.then((userResponse: any) => {
    if (userResponse?.password === req.body.password) {
      const auth: IAuth = { id: userResponse._id }
      return res.json({ message: 'User login', data: auth })
    } else {
      return res.status(400).json({ message: 'Email or password are incorrect'});
    }
  }, error => {
    res.status(500).json({ message: 'Internal server error' });
  })
});

// Find user by id
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const findUser = await  user.findById(req.params.id).exec();
    if (!findUser) {
      res.status(404).json({ message: 'User not found' });
    }
    return res.json({ message: 'Get user', data: findUser })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
})

// Update user
router.put('/update/:id',  async (req: Request, res: Response) => {
  if (!req.body.username) { return res.status(400).json({message: 'Username are required'}) }
  try {
    const findUser: any = await  user.findById(req.params.id).exec();
    if (!findUser) {
      res.status(404).json({ message: 'User not found' });
    }
    findUser.username = req.body.username;
    findUser.save();
    return res.json({ message: 'User edited', data: findUser })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete user
router.delete('/delete/:id', async  (req: Request, res: Response) => {
  try {
    await user.findByIdAndDelete(req.params.id).exec();
    return res.json({ message: 'User deleted' })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

export { router as userRouter }
