import React from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";

import { Task } from "../types/Task";
import { COLORS } from "../constants/colors";

type Props = {
  task: Task;
  onPress: () => void;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

const TaskCard = ({
  task,
  onPress,
  onToggle,
  onEdit,
  onDelete,
}: Props) => {
  const priorityColor =
    task.priority === "High"
      ? COLORS.high
      : task.priority === "Medium"
      ? COLORS.medium
      : COLORS.low;

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <Pressable
          onPress={onToggle}
          style={[
            styles.checkbox,
            task.completed && styles.checked,
          ]}
        >
          {task.completed && (
            <Text style={styles.checkText}>✓</Text>
          )}
        </Pressable>

        <Pressable style={styles.content} onPress={onPress}>
          <Text
            style={[
              styles.title,
              task.completed && styles.completedText,
            ]}
          >
            {task.title}
          </Text>

          <Text style={styles.description} numberOfLines={2}>
            {task.description || "No description"}
          </Text>
        </Pressable>

        <View
          style={[
            styles.priority,
            { backgroundColor: priorityColor },
          ]}
        >
          <Text style={styles.priorityText}>
            {task.priority}
          </Text>
        </View>
      </View>

      <View style={styles.bottomRow}>
        <Text style={styles.date}>
          📅 {task.dueDate}
        </Text>

        <View style={styles.actions}>
          <Pressable onPress={onEdit}>
            <Text style={styles.edit}>Edit</Text>
          </Pressable>

          <Pressable onPress={onDelete}>
            <Text style={styles.delete}>Delete</Text>
          </Pressable>
        </View>
      </View>

      <Text style={styles.status}>
        {task.completed ? "Completed" : "Pending"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    padding: 15,
    marginBottom: 12,
    borderRadius: 14,
    elevation: 2,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 23,
    height: 23,
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: 6,
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  checked: {
    backgroundColor: COLORS.primary,
  },
  checkText: {
    color: COLORS.white,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.black,
  },
  completedText: {
    textDecorationLine: "line-through",
    color: COLORS.muted,
  },
  description: {
    color: COLORS.secondary,
    fontSize: 12,
    marginTop: 5,
  },
  priority: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 6,
  },
  priorityText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: "bold",
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    alignItems: "center",
  },
  date: {
    color: COLORS.secondary,
    fontSize: 11,
  },
  actions: {
    flexDirection: "row",
    gap: 15,
  },
  edit: {
    color: COLORS.primary,
    fontWeight: "bold",
  },
  delete: {
    color: COLORS.danger,
    fontWeight: "bold",
  },
  status: {
    fontSize: 10,
    color: COLORS.secondary,
    marginTop: 9,
  },
});

export default TaskCard;