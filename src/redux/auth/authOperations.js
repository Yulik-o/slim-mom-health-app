import { createAsyncThunk } from '@reduxjs/toolkit';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

import {
  getUser,
  login,
  logOut,
  refresh,
  register,
  token,
} from '../../services/api';

export const registerUserRequest = createAsyncThunk(
  'auth/register',
  async (formData, thunkAPI) => {
    try {
      const response = await register(formData);
      thunkAPI.dispatch(
        loginUserRequest({ email: response.email, password: formData.password })
      );
      return response;
    } catch (error) {
      Notify.failure('You input data in false format, please try again');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const loginUserRequest = createAsyncThunk(
  'auth/login',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await login(formData);
      token.set(response.accessToken, 'Bearer');
      return response;
    } catch (error) {
      Notify.failure('False login or e-mail, please try again');
      return rejectWithValue(error.message);
    }
  }
);

export const refreshUserRequest = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    try {
      const { sid, refreshToken } = thunkAPI.getState().auth;
      if (!sid) return thunkAPI.rejectWithValue('no sid');
      const response = await refresh(sid, refreshToken);
      token.set(response.newAccessToken, 'Bearer');

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logOutRequest = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      const {token: accessToken} = thunkAPI.getState().auth;
      const responce = await logOut();
      token.unSet(accessToken);
      return responce;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const fetchCurrentUser = createAsyncThunk(
  'auth/getuser',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const persistedToken = state.auth.accessToken;
      if (!persistedToken) {
        return thunkAPI.rejectWithValue('No token');
      }
      token.set(persistedToken, 'Bearer');
      const response = await getUser();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
)
