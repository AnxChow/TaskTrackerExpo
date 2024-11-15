import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import { useRouter } from "expo-router";
import { useTasks } from "@/src/context/TaskContext"; // Add this import

export default function AddTaskScreen() {
  const [newTask, setNewTask] = useState("");
  const router = useRouter();
  const { addTask } = useTasks(); // Get addTask from context

  const handleSubmit = () => {
    if (newTask.trim()) {
      // We'll implement this next to communicate with our task list
      console.log("New task:", newTask);
      addTask(newTask.trim()); // Add task using our context
      setNewTask("");
      router.push("/"); // Go back to task list
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Task</Text>
      <TextInput
        style={styles.input}
        value={newTask}
        onChangeText={setNewTask}
        placeholder="Enter new task..."
        autoFocus
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Add Task</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
