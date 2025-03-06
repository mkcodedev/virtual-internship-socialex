import multer from 'multer';
import path from 'path';
import Post from '../models/Post.js';

// Set up storage engine
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// Initialize upload
const upload = multer({storage: storage}).single('file');

export const createPost = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).json({error: err.message});
        }

        try {
            const {userId, userName, userPic, fileType, description, location} = req.body;
            const filePath = `/uploads/${req.file.filename}`;

            const newPost = new Post({
                userId,
                userName,
                userPic,
                fileType,
                file: filePath,
                description,
                location,
                comments: {"New user": "This is my first comment"},
                createdAt: new Date()
            });

            const post = await newPost.save();
            res.status(200).json({message: 'Post uploaded successfully', post});
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    });
};