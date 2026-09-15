import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  entities: {
    1: {
      id: 1,
      name: "Instagram",
      connected: true,
    },

    2: {
      id: 2,
      name: "Facebook",
      connected: false,
    },

    3: {
      id: 3,
      name: "LinkedIn",
      connected: true,
    },
  },

  ids: [1, 2, 3],
};

const platformSlice = createSlice({
  name: "platforms",

  initialState,

  reducers: {
    addPlatform: (state, action) => {
      const platform = action.payload;

      state.entities[platform.id] = platform;
      state.ids.push(platform.id);
    },

    togglePlatform: (state, action) => {
      const id = action.payload;

      if (state.entities[id]) {
        state.entities[id].connected =
          !state.entities[id].connected;
      }
    },

    deletePlatform: (state, action) => {
      const id = action.payload;

      delete state.entities[id];

      state.ids = state.ids.filter(
        (platformId) => platformId !== id
      );
    },
  },
});

export const {
  addPlatform,
  togglePlatform,
  deletePlatform,
} = platformSlice.actions;

export default platformSlice.reducer;