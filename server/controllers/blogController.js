// server/controllers/blogController.js
import Blog from '../models/Blog.js';

// GET all blogs
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate('author', 'username email');
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: 'Error getting blogs', error: err.message });
  }
};

// GET one blog
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', 'username email');
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: 'Error getting blog', error: err.message });
  }
};

// CREATE blog
export const createBlog = async (req, res) => {
  const { title, content, image, author } = req.body;
  try {
    const newBlog = await Blog.create({ title, content, image, author });
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(500).json({ message: 'Error creating blog', error: err.message });
  }
};

// UPDATE blog
export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: 'Error updating blog', error: err.message });
  }
};

// DELETE blog
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json({ message: 'Blog deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting blog', error: err.message });
  }
};
