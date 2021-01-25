import blogService from '../services/blogs';
import { setAlert } from './alertReducer';

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data;
    case 'NEW_BLOG':
      return [...state, action.data];
    case 'LIKE':
      const id = action.data.id;
      const likedBlog = action.data.likedBlog;
      return state.map((blog) => (blog.id !== id ? blog : likedBlog));
    case 'ADD_COMMENT':
      const blogId = action.data.id;
      const blogToUpdate = state.find((blog) => blog.id === blogId);
      const updatedBlog = {
        ...blogToUpdate,
        comments: [...blogToUpdate.comments, action.data.newComment],
      };
      return state.map((blog) => (blog.id !== blogId ? blog : updatedBlog));
    case 'REMOVE_BLOG':
      const blogToRemove = action.data.id;
      return state.filter((blog) => blog.id !== blogToRemove);
    default:
      return state;
  }
};

export const createComment = (id, comment) => {
  return async (dispatch) => {
    const newComment = await blogService
      .comment(id, comment)
      .catch((error) => console.log(error));
    dispatch({ type: 'ADD_COMMENT', data: { id, newComment } });
  };
};

export const initBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    });
  };
};

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content).catch((error) => {
      dispatch(setAlert('Cannot create empty blog', 5));
    });
    if (newBlog) {
      dispatch({
        type: 'NEW_BLOG',
        data: newBlog,
      });
      // To figure out later, dispatching a thunk inside a thunk like this seems to be very slow compared to doing it sinde the component, see --> BlogForm.js
      //dispatch(setAlert(`a new blog ${content.title} by ${content.author}`, 5));
    }
  };
};

export const addLike = (id, blog) => {
  const likedBlog = { ...blog, likes: blog.likes + 1 };
  return async (dispatch) => {
    blogService.update(id, likedBlog).catch((error) => {
      return dispatch(setAlert('400 Oops something happend', 3));
    });
    dispatch({ type: 'LIKE', data: { id, likedBlog } });
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    let error;
    await blogService.remove(id).catch((err) => {
      error = err;
      dispatch(setAlert('403 can only remove your own blogs', 5));
    });
    if (!error) {
      dispatch({ type: 'REMOVE_BLOG', data: { id } });
      dispatch(setAlert('200 Successfully removed blog', 3));
    }
  };
};

export default blogReducer;
