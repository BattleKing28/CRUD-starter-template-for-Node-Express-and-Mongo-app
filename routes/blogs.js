import express from 'express';

import {
   getBlog,
   getBlogs,
   createBlog,
   updateBlog,
   deleteBlog,
} from '../controllers/blogs.js';

const router = express.Router();

router.route('/').get(getBlogs).post(createBlog);

router.route('/:id').get(getBlog).put(updateBlog).delete(deleteBlog);

export { router };
