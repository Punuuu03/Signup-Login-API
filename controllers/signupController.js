import jwt from 'jsonwebtoken';
import Signup from '../models/Signup.js';

export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await Signup.create({ username, email, password });
    return res.status(201).json({ message: 'User created successfully', user });
  } catch (err) {
    return res.status(400).json({ error: 'Error creating user' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Signup.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
};
