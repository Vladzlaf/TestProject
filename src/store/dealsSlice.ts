import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { DealService } from '../application/services/DealService';
import { DealRepository } from '@/infrastructure/firebase/dealRepo';

const dealService = new DealService(new DealRepository());

export const fetchDeals = createAsyncThunk('deals/fetchDeals', async () => {
  return await dealService.getAllDeals();
});

const dealsSlice = createSlice({
  name: 'deals',
  initialState: { deals: [] },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchDeals.fulfilled, (state, action) => {
      state.deals = action.payload;
    });
  },
});

export default dealsSlice.reducer;
