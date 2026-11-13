import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";

import { Task, TaskInput, Priority } from "../types/Task";
import { COLORS } from "../constants/colors";

type Props = {
  initialTask?: Task;
  onSubmit: (task: TaskInput) => Promise<void>;
  submitLabel: string;
};

const TaskForm = ({
  initialTask,
  onSubmit,
  submitLabel,
}: Props) => {
  const [title, setTitle] = useState(
    initialTask?.title ?? ""
  );

  const [description, setDescription] = useState(
    initialTask?.description ?? ""
  );

  const [priority, setPriority] = useState<Priority>(
    initialTask?.priority ?? "Medium"
  );

  const [dueDate, setDueDate] = useState(
    initialTask?.dueDate ?? new Date().toISOString().slice(0, 10)
  );

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [saving, setSaving] = useState(false);

  const selectedDate = new Date(`${dueDate}T12:00:00`);

  const handleSubmit = async () => {
    if (!title.trim()) {
      Alert.alert("Validation Error", "Please enter task title.");
      return;
    }

    if (!dueDate) {
      Alert.alert("Validation Error", "Please select due date.");
      return;
    }

    try {
      setSaving(true);

      await onSubmit({
        title: title.trim(),
        description: description.trim(),
        priority,
        dueDate,
      });
    } catch (error) {
      console.error("Task save failed:", error);
      Alert.alert("Error", "Unable to save task.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Task Title *</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter task title"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Description</Text>

      <TextInput
        style={[styles.input, styles.description]}
        placeholder="Enter task description"
        value={description}
        onChangeText={setDescription}
        multiline
        textAlignVertical="top"
      />

      <Text style={styles.label}>Priority</Text>

      <View style={styles.priorityContainer}>
        {(["High", "Medium", "Low"] as Priority[]).map(
          (item) => (
            <Pressable
              key={item}
              onPress={() => setPriority(item)}
              style={[
                styles.priorityButton,
                priority === item && styles.selectedPriority,
              ]}
            >
              <Text
                style={[
                  styles.priorityText,
                  priority === item && styles.selectedText,
                ]}
              >
                {item}
              </Text>
            </Pressable>
          )
        )}
      </View>

      <Text style={styles.label}>Due Date</Text>

      <Pressable
        style={styles.dateButton}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={styles.dateText}>📅 {dueDate}</Text>
        <Text style={styles.changeText}>Change</Text>
      </Pressable>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          minimumDate={new Date(2000, 0, 1)}
          onChange={(event, date) => {
            setShowDatePicker(false);

            if (event.type === "set" && date) {
              const year = date.getFullYear();
              const month = String(
                date.getMonth() + 1
              ).padStart(2, "0");
              const day = String(
                date.getDate()
              ).padStart(2, "0");

              setDueDate(`${year}-${month}-${day}`);
            }
          }}
        />
      )}

      <Pressable
        style={[
          styles.submitButton,
          saving && { opacity: 0.6 },
        ]}
        onPress={handleSubmit}
        disabled={saving}
      >
        <Text style={styles.submitText}>
          {saving ? "Saving..." : submitLabel}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 18,
  },
  label: {
    fontWeight: "bold",
    color: COLORS.black,
    marginBottom: 8,
    marginTop: 15,
  },
  input: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    padding: 13,
    color: COLORS.black,
  },
  description: {
    height: 100,
  },
  priorityContainer: {
    flexDirection: "row",
    gap: 10,
  },
  priorityButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 9,
    padding: 12,
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
  selectedPriority: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  priorityText: {
    color: COLORS.secondary,
    fontWeight: "600",
  },
  selectedText: {
    color: COLORS.white,
  },
  dateButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 14,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  dateText: {
    color: COLORS.black,
  },
  changeText: {
    color: COLORS.primary,
    fontWeight: "bold",
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 28,
  },
  submitText: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default TaskForm;