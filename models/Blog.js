import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
   imageUrl: {
      type: String,
      required: [true, 'Please add cover img url for your post'],
   },
   author: {
      type: String,
      required: [true, 'Please add author name for your post'],
   },
   title: {
      type: String,
      required: [true, 'Please add title for your post'],
      minlength: 6,
      maxlength: 50,
   },
   body: {
      type: String,
      required: [true, 'Please add body for your post'],
   },
});

const Blog = mongoose.model('Blog', BlogSchema);

export { Blog };
