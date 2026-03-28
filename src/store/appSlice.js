import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  pump: {},
  language: 'en', // default language
  userType: null,
  selectedMetro: null,
  selectedLabel: null,
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    UpdatePump: (state, actions) => {
      state.pump = actions.payload
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    setUserType: (state, action) => {
      state.userType = action.payload;
    },
    setSelectedMetro: (state, action) => {
      state.selectedMetro = action.payload;
    },
    setSelectedLabel: (state, action) => {
      state.selectedLabel = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  UpdatePump,
  setLanguage,
  setUserType,
  setSelectedMetro,
  setSelectedLabel
} = appSlice.actions

export default appSlice.reducer