import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface User {
  user: string
  firstname: string
  lastname: string
  email: string
  role: string
}

interface UserState {
  users: User[]
}

const initialState: UserState = {
  users: []
}

const url = "https://6e3391c2c13f3e38.mokky.dev/users"

export const postRequest = createAsyncThunk("users/postUsers", async (newUser) => {
  const response = await axios.post(url, newUser)
  return response.data
})

export const getRequest = createAsyncThunk("users/getUsers", async () => {
  const response = await axios.get(url)
  return response.data
})

export const deleteRequest = createAsyncThunk("users/deleteUsers", async (id) => {
  const response = await axios.delete(`${url}/${id}`)
  return response.data
})

export const putRequest = createAsyncThunk("users/putUsers", async ({id, newData}) => {
  const response = await axios.put(`${url}/${id}`, newData)
  return response.data
})

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRequest.fulfilled, (state, action) => {
        state.users = action.payload
      })
      .addCase(postRequest.fulfilled, (state, action) => {
        state.users.push(action.payload)
      })
      .addCase(deleteRequest.fulfilled, (state, action) => {
        state.users = state.users.filter(user => user.id !== action.meta.arg)
      })
      .addCase(putRequest.fulfilled, (state, action) => {
        const index = state.users.findIndex(user => user.id === action.meta.arg.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
  }
})

export default userSlice.reducer