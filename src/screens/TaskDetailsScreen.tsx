import React from "react";

import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";

import { NativeStackScreenProps } from
  "@react-navigation/native-stack";

import { useTasks } from "../context/TaskContext";

import { RootStackParamList } from "../types/Task";
import { COLORS } from "../constants/colors";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "TaskDetails"
>;

const TaskDetailsScreen = ({
  route,
  navigation,
}: Props) => {
  const { taskId } = route.params;

  const { tasks, toggleTask, removeTask } = useTasks();

  const task = tasks.find((item) => item.id === taskId);

  if (!task) {
    return (
      <View style={styles.center}>
        <Text>Task not found.</Text>
      </View>
    );
  }

  const handleDelete = () => {
    Alert.alert(
      "Delete Task",
      "Are you sure you want to delete this task?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await removeTask(taskId);
              navigation.goBack();
            } catch {
              Alert.alert("Error", "Unable to delete task.");
            }
          },
        },
      ]
    );
  };

  const handleToggle = async () => {
    try {
      await toggleTask(taskId, !task.completed);
    } catch {
      Alert.alert("Error", "Unable to update task status.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{task.title}</Text>

        <Text style={styles.label}>Description</Text>
        <Text style={styles.value}>
          {task.description || "No description provided"}
        </Text>

        <Text style={styles.label}>Priority</Text>
        <Text style={styles.value}>{task.priority}</Text>

        <Text style={styles.label}>Due Date</Text>
        <Text style={styles.value}>{task.dueDate}</Text>

        <Text style={styles.label}>Status</Text>
        <Text style={styles.value}>
          {task.completed ? "Completed" : "Pending"}
        </Text>

        <Pressable
          style={styles.primaryButton}
          onPress={handleToggle}
        >
          <Text style={styles.buttonText}>
            Mark as {task.completed ? "Pending" : "Completed"}
          </Text>
        </Pressable>

        <Pressable
          style={styles.editButton}
          onPress={() =>
            navigation.navigate("EditTask", { taskId })
          }
        >
          <Text style={styles.editText}>Edit Task</Text>
        </Pressable>

        <Pressable
          style={styles.deleteButton}
          onPress={handleDelete}
        >
          <Text style={styles.buttonText}>Delete Task</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 18,
  },
  card: {
    backgroundColor: COLORS.white,
    padding: 22,
    borderRadius: 15,
    elevation: 2,
  },
  title: {
    fontSize: 23,
    fontWeight: "bold",
    color: COLORS.black,
    marginBottom: 20,
  },
  label: {
    color: COLORS.secondary,
    fontWeight: "bold",
    marginTop: 16,
  },
  value: {
    color: COLORS.black,
    fontSize: 16,
    marginTop: 6,
  },
  primaryButton: {
    backgroundColor: COLORS.success,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 28,
  },
  editButton: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 12,
  },
  deleteButton: {
    backgroundColor: COLORS.danger,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 12,
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: "bold",
  },
  editText: {
    color: COLORS.white,
    fontWeight: "bold",
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default TaskDetailsScreen;