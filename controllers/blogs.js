import { ErrorResponse } from '../utilities/errResponse.js';
import { Blog } from '../models/Blog.js';
import { asyncHandler } from '../middleware/async.js';

//@decs     get all Blogs
//@route    GET /api/v1/blogs
//@access   public
const getBlogs = asyncHandler(async (req, res, next) => {
   const blogs = await Blog.find();
   res.status(200).json({
      success: true,
      data: blogs,
   });
});

//@decs     get single Blog
//@route    GET /api/v1/blogs/:id
//@access   public
const getBlog = asyncHandler(async (req, res, next) => {
   const blog = await Blog.findById(req.params.id);

   if (!blog) {
      return next(
         new ErrorResponse(
            `Could not find a post by the ID of ${req.params.id}`
         )
      );
   }
   res.status(200).json({ success: true, data: blog });
});

//@decs     Create a blog
//@route    POST /api/v1/blogs
//@access   public
const createBlog = asyncHandler(async (req, res, next) => {
   const blog = await Blog.create(req.body);
   res.status(200).json({ success: true, data: blog });
});

//@decs     update a blog
//@route    PUT /api/v1/blogs/:id
//@access   public
const updateBlog = asyncHandler(async (req, res, next) => {
   const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
   });

   if (!blog) {
      return next(
         new ErrorResponse(
            `Could not find the Blog with id of ${req.params.id}`
         )
      );
   }
   res.status(200).json({ success: true, data: blog });
});

//@decs     delete a Blog
//@route    DELETE /api/v1/blogs/:id
//@access   public
const deleteBlog = asyncHandler(async (req, res, next) => {
   const blog = await Blog.findByIdAndDelete(req.params.id);

   if (!blog) {
      return next(
         new ErrorResponse(`Could not find the post with ID ${req.params.id}`)
      );
   }

   res.status(200).json({ success: true, data: {} });
});

export { getBlogs, getBlog, createBlog, updateBlog, deleteBlog };
