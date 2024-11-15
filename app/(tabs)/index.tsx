import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import { useTasks } from "@/src/context/TaskContext"; // Add this import

// interface Task {
//   id: string;
//   title: string;
//   completed: boolean;
// }

export default function TabOneScreen() {
  const { tasks, toggleTask, addTask } = useTasks(); // Get tasks and toggleTask from our context
  const [modalVisible, setModalVisible] = useState(false);
  const [newTask, setNewTask] = useState("");

  const handleAddTask = () => {
    if (newTask.trim()) {
      addTask(newTask.trim());
      setNewTask("");
      setModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TaskTracker</Text>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.task,
              item.completed && styles.taskCompleted, // Add styling for completed tasks
            ]}
            onPress={() => toggleTask(item.id)}
          >
            <Text style={styles.taskText}>
              {item.completed ? "✓ " : "○ "}
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Add Task Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Task</Text>
            <TextInput
              style={styles.input}
              value={newTask}
              onChangeText={setNewTask}
              placeholder="Enter new task..."
              autoFocus
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleAddTask}>
                <Text style={styles.buttonText}>Add Task</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60, // Add extra padding at the top
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  task: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  taskCompleted: {
    backgroundColor: "#f8f8f8", // Light gray background for completed tasks
  },
  taskText: {
    fontSize: 16,
  },
  fab: {
    position: "absolute",
    right: 150,
    // top: 300,
    bottom: 150,
    backgroundColor: "#007AFF",
    // padding: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  fabText: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    width: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 8,
    minWidth: 70,
    alignItems: "center",
    marginLeft: 10,
  },
  cancelButton: {
    backgroundColor: "#f8f8f8",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelButtonText: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
