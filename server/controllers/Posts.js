import Post from '../models/Post.js';
import Stories from '../models/Stories.js';
import User from '../models/Users.js'

export const fetchAllPosts = async (req, res) => {
  try {
      const posts = await Post.find().sort({_id: -1});
      const updatedPosts = posts.map(post => ({
          ...post._doc,
          file: `http://localhost:6001${post.file}`
      }));

      res.json(updatedPosts);
  } catch (error) {
      console.error(error);
      res.status(500).json({error: 'Server error'});
  }
}; 

export const fetchUserName = async (req, res) =>{
  try {
      const userId = req.body.userId;
      const user = await User.findById(userId);
      console.log(userId);
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    } 
} 

export const fetchUserImg = async (req, res) =>{
  try {
    const userId = req.body.userId;
    const user = await User.findOne({_id: userId});
    console.log(userId);
    res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
} 

export const fetchAllStories = async (req, res) =>{
  try {
    const stories =  await Stories.find();

    res.status(200).json(stories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
} 