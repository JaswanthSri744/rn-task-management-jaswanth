import React from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";

import { NativeStackScreenProps } from
  "@react-navigation/native-stack";

import TaskForm from "../components/TaskForm";

import { useTasks } from "../context/TaskContext";

import { RootStackParamList } from "../types/Task";
import { COLORS } from "../constants/colors";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "AddTask"
>;

const AddTaskScreen = ({ navigation }: Props) => {
  const { addTask } = useTasks();

  const handleAddTask = async (
    task: Parameters<typeof addTask>[0]
  ) => {
    await addTask(task);

    Alert.alert("Success", "Task added successfully!");

    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Create New Task</Text>

      <Text style={styles.subtitle}>
        Enter your task details below.
      </Text>

      <TaskForm
        onSubmit={handleAddTask}
        submitLabel="Add Task"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  heading: {
    fontSize: 25,
    fontWeight: "bold",
    color: COLORS.black,
    marginHorizontal: 18,
    marginTop: 22,
  },
  subtitle: {
    color: COLORS.secondary,
    marginHorizontal: 18,
    marginTop: 7,
  },
});

export default AddTaskScreen;