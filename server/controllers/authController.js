import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body
  try {
    const existingUser = await User.findOne({ email })
    if (existingUser) return res.status(400).json({ message: 'User already exists' })

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({ username, email, password: hashedPassword })

    res.status(201).json({ message: 'User registered', user: { id: user._id, email: user.email } })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const loginUser = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) return res.status(404).json({ message: 'User not found' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' })

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })

    res.status(200).json({
      message: 'Login successful',
      token,
      user: { id: user._id, email: user.email }
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
