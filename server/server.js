import authRoutes from './routes/authRoutes.js';

app.use('/api/auth', authRoutes);

import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes.js'
// import uploadRoutes from './routes/uploadRoutes.js' // For image upload, later

dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)
// app.use('/api/upload', uploadRoutes) // Uncomment when upload is implemented

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('✅ MongoDB connected')
    app.listen(5000, () => {
      console.log('🚀 Server running on port 5000')
    })
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message)
  })
