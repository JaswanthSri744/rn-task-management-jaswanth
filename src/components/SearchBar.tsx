import React from "react";
import {
  TextInput,
  StyleSheet,
} from "react-native";
import { COLORS } from "../constants/colors";

type Props = {
  value: string;
  onChangeText: (text: string) => void;
};

const SearchBar = ({ value, onChangeText }: Props) => {
  return (
    <TextInput
      style={styles.input}
      placeholder="Search tasks..."
      placeholderTextColor={COLORS.muted}
      value={value}
      onChangeText={onChangeText}
      autoCapitalize="none"
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 14,
    borderRadius: 12,
    marginVertical: 12,
    color: COLORS.black,
  },
});

export default SearchBar;