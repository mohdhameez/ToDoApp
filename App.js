import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, TouchableOpacity, FlatList } from "react-native";
import {MaterialIcons} from '@expo/vector-icons'

const App = () => {
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleTitleChange = (text) => {
    setTitle(text);
  };

  const handleDetailChange = (text) => {
    setDetail(text);
  };

  const handleSubmit = () => {
    if (title.trim() !== '' && detail.trim() !== '') {
      if (editIndex !== null) {
        // Update existing task
        const updatedList = todoList.map((item, index) =>
          index === editIndex ? { title, detail } : item
        );
        setTodoList(updatedList);
        setEditIndex(null);
      } else {
        // Add new task
        setTodoList([...todoList, { title, detail }]);
      }
      setTitle('');
      setDetail('');
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setTitle(todoList[index].title);
    setDetail(todoList[index].detail);
  };

  const handleRemove = (index) => {
    const newTodoList = todoList.filter((_, i) => i !== index);
    setTodoList(newTodoList);
    if (editIndex === index) {
      setEditIndex(null);
      setTitle('');
      setDetail('');
    }
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.taskContainer}>
      <View style={styles.taskContent}>
        <Text style={styles.taskTitle}>{item.title}</Text>
        <Text style={styles.taskDetail}>{item.detail}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={() => handleEdit(index)} style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleRemove(index)} style={styles.removeButton}>
          <Text style={styles.removeButtonText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.heading}>To-Do List</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Title"
          value={title}
          onChangeText={handleTitleChange}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Detail"
          value={detail}
          onChangeText={handleDetailChange}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>{editIndex !== null ? 'Update Task' : 'Add Task'}</Text>
        </TouchableOpacity>
        <FlatList
          data={todoList}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  top: {
    flex: 1,
    backgroundColor: '#ffffff',
    margin: 20,
    borderRadius: 10,
    padding: 15,
    marginTop: 65,
    marginBottom: 25,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  textInput: {
    backgroundColor: '#fafafa',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  taskContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 5,
    borderRadius: 5,
    borderColor: '#ddd',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
  taskDetail: {
    fontSize: 14,
    marginTop:10,
    color: '#666',
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  editButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  removeButton: {
    backgroundColor: '#f44336',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default App;
