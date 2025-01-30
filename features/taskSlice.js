import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BACKEND_API_URL } from '@env';
const APIURL = BACKEND_API_URL;

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks', 
  async (token, { rejectWithValue }) => {
    try {
      const response = await fetch(`${APIURL}/api/tasks/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addNewTask = createAsyncThunk(
  'tasks/addNewTask', 
  async ({ token, content }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${APIURL}/api/tasks/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ content }),
      });

      if (!response.ok) {
        throw new Error('Failed to add task');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteExistingTask = createAsyncThunk(
  'tasks/deleteExistingTask', 
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${APIURL}/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }

      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder
   
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
     
      .addCase(addNewTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewTask.fulfilled, (state, action) => {
        state.loading = false;
        const prevTasks=state.tasks;
        state.tasks=[...prevTasks,action.payload];
      })
      .addCase(addNewTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
    
      .addCase(deleteExistingTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteExistingTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.filter(task => task._id !== action.payload);
      })
      .addCase(deleteExistingTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default taskSlice.reducer;
