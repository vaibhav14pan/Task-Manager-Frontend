import { BACKEND_API_URL } from '@env';
const APIURL = BACKEND_API_URL;
import { Alert } from 'react-native';
import { setUserTasks, addTask, deleteTask } from '../features/taskSlice';

export const callFetchTasks = async (dispatch, token) => {
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
    dispatch(setUserTasks(data));
  } catch (error) {
    console.error('Error fetching tasks:', error);
    Alert.alert(error.message);
  }
};

export const callAddTasks = async (dispatch, token, content) => {
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
    dispatch(addTask(data));
  } catch (error) {
    console.error('Error adding task:', error);
    Alert.alert(error.message);
  }
};

export const callDeleteTasks = async (dispatch, token, id) => {
  try {
    const response = await fetch(`${APIURL}/api/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete task');
    }

    dispatch(deleteTask(id));
  } catch (error) {
    console.error('Error deleting task:', error);
    Alert.alert(error.message);
  }
};
