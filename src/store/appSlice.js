import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  pump:{},
  language: 'en', // default language
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    UpdatePump:(state, actions) => {
      state.pump = actions.payload
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { 
  UpdatePump,
  setLanguage,
} = appSlice.actions

export default appSlice.reducer