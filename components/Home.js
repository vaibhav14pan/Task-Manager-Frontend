import { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles';
import { useSelector, useDispatch } from 'react-redux';
import { callFetchTasks, callAddTasks, callDeleteTasks } from './TasksAPI';
import { useAuth } from './AuthAPI';

const Home = () => {
  const [inputText, setInputText] = useState('');
  const [buttonText, setButtonText] = useState('Add Task');
  const { token } = useAuth();
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);


  useEffect(() => {
    if (token) {
      callFetchTasks(dispatch, token);
    }
  }, [dispatch, token]);


  const handleAddTask = () => {
    if (inputText.trim()) {
      callAddTasks(dispatch, token, inputText);
      setInputText('');
      setButtonText('Add Task');
    }
  };

  const handleDeleteTask = (id) => {
    callDeleteTasks(dispatch, token, id);
  };


  const handleEditTask = (id) => {
    const taskToEdit = tasks.find((task) => task._id === id);
    if (taskToEdit) {
      setInputText(taskToEdit.content);
      setButtonText('Edit Task');
      handleDeleteTask(id);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Manager</Text>
      <Text style={styles.label}>Enter the task</Text>

      <TextInput
        style={styles.input}
        value={inputText}
        placeholder="Type here"
        onChangeText={setInputText}
      />

      <TouchableOpacity style={styles.button} onPress={handleAddTask}>
        <Text style={styles.buttontext}>{buttonText}</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.tasksContainer}>
        {tasks.map((task) => (
          <View key={task._id} style={styles.taskContainer}>
            <Text style={styles.task}>{task.content}</Text>
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={() => handleEditTask(task._id)}>
                <Ionicons name="create-outline" size={20} color="blue" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteTask(task._id)} style={{ marginLeft: 10 }}>
                <Ionicons name="trash-outline" size={20} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Home;
