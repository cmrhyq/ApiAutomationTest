import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserInfo } from '../../api/system/user';
import { getToken, removeToken } from '../../plugins/auth';
import type { User } from '../../types/auth';

interface UserState {
  user: User | null;
  token: string | null;
  roles: string[];
  permissions: string[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  token: getToken() || null,
  roles: [],
  permissions: [],
  loading: false,
  error: null,
};

// 获取用户信息的异步action
export const fetchUserInfo = createAsyncThunk(
  'user/fetchUserInfo',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUserInfo();
      
      // Validate response structure
      if (!response || !response.data) {
        return rejectWithValue('获取用户信息失败: 无效的响应格式');
      }
      
      // Return the data
      return response.data;
    } catch (error: unknown) {
      // Improved error handling
      const errorMessage = error instanceof Error 
        ? error.message 
        : '获取用户信息失败: 未知错误';
      
      console.error('Failed to fetch user info:', error);
      return rejectWithValue(errorMessage);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.roles = [];
      state.permissions = [];
      removeToken();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        // Add null checking before accessing roles
        state.roles = action.payload.roles ? action.payload.roles.map((role: any) => role.key) : [];
        // Add null checking for permissions as well
        state.permissions = action.payload.permissions || [];
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setToken, logout } = userSlice.actions;
export default userSlice.reducer;