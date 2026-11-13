import React from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
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
  "EditTask"
>;

const EditTaskScreen = ({ route, navigation }: Props) => {
  const { taskId } = route.params;

  const { tasks, loading, editTask } = useTasks();

  const task = tasks.find((item) => item.id === taskId);

  const handleUpdate = async (
    updatedTask: Parameters<typeof editTask>[1]
  ) => {
    await editTask(taskId, updatedTask);

    Alert.alert("Success", "Task updated successfully!");

    navigation.goBack();
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (!task) {
    return (
      <View style={styles.center}>
        <Text>Task not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Edit Task</Text>

      <TaskForm
        key={task.id}
        initialTask={task}
        onSubmit={handleUpdate}
        submitLabel="Update Task"
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
    margin: 18,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.background,
  },
});

export default EditTaskScreen;