import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../constant/constant";

const initialState = {
  posts: [],
  isLoading: true,
  error: "",
  postId: "",
  post: "",
};

export const getAllPosts = createAsyncThunk("posts/getAllPosts", async () => {
  return axios.get(`${API_URL}/allPosts`).then((res) => res);
});

export const getPostById = createAsyncThunk("posts/getPostById", async (id) => {
  return axios.get(`${API_URL}/${id}`).then((res) => res);
});

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (formData) => {
    return axios.post(`${API_URL}/create`, {
      title: formData.Title,
      creator: formData.Creator,
      image: formData.Image,
      tags: formData.Tags,
      message: formData.Message,
    });
  }
);

export const updatePost = createAsyncThunk("posts/updatePost", async (formData) => {
  const reqBody={
    creator:formData.Creator,
    title:formData.Title,
    message:formData.Message,
    tags:formData.Tags,
  }
  return axios.put(`${API_URL}/update/${formData.postId}`,reqBody)
});

export const deletePost = createAsyncThunk("posts/deletePost", async (id) => {
  return axios
    .delete(`${API_URL}/${id}`)
    .then((res) => res);
});

export const likePost = createAsyncThunk("posts/likePost", async (id) => {
    return axios
      .patch(`${API_URL}/${id}/like`)
      .then((res) => res);
  });

const postSlice = createSlice({
  name: "post",
  initialState: initialState,
  extraReducers: (builder) => {
    //getAllPosts
    builder.addCase(getAllPosts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllPosts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
      state.error = "";
    });
    builder.addCase(getAllPosts.rejected, (state, action) => {
      state.isLoading = false;
      state.posts = [];
      state.error = action.error.message;
    });
    //getPostById
    builder.addCase(getPostById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getPostById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.post = action.payload;
      state.error = "";
    });
    builder.addCase(getPostById.rejected, (state, action) => {
      state.isLoading = false;
      state.post = "";
      state.error = action.error.message;
    });
    //createPost
    builder.addCase(createPost.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.isLoading = false;
      state.posts = [];
      state.error = "";
    });
    builder.addCase(createPost.rejected, (state, action) => {
      state.isLoading = false;
      state.posts = "";
      state.error = action.error.message;
    });
    //updatePost
    builder.addCase(updatePost.pending, (state) => {
        state.isLoading = true;
      });
    builder.addCase(updatePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
      });
    builder.addCase(updatePost.rejected, (state, action) => {
        state.isLoading = false;
        state.posts = "";
        state.error = action.error.message;
      });
      //deletePost
    builder.addCase(deletePost.pending, (state) => {
        state.isLoading = true;
      });
    builder.addCase(deletePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
      });
    builder.addCase(deletePost.rejected, (state, action) => {
        state.isLoading = false;
        state.posts = "";
        state.error = action.error.message;
      });
      //likePost
    builder.addCase(likePost.pending, (state) => {
        state.isLoading = true;
      });
    builder.addCase(likePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
      });
    builder.addCase(likePost.rejected, (state, action) => {
        state.isLoading = false;
        state.posts = "";
        state.error = action.error.message;
      });
  },
});

export default postSlice.reducer;
//module.exports.getAllPosts = getAllPosts
