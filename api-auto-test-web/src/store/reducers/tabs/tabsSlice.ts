import { createSlice } from '@reduxjs/toolkit';

const tabsSlice = createSlice({
  name: 'tab',
  initialState: {
    tabs: [
      {
        icon: "DashboardOutlined",
        label: "首页",
        key: "/index",
        closable: false
      }
    ]
  },
  reducers: {
    setTab: (state, action) => {
      state.tabs.push(action.payload);
    },
    removeTab: (state, action) => {
      state.tabs = state.tabs.filter(tab => tab.key !== action.payload);
    }
  }
});

export const { setTab, removeTab } = tabsSlice.actions
export default tabsSlice.reducer;