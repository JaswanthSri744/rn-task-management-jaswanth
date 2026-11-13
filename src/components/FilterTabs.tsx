import React from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";

import { COLORS } from "../constants/colors";

export type FilterType = "All" | "Pending" | "Completed";

type Props = {
  selected: FilterType;
  onSelect: (filter: FilterType) => void;
};

const filters: FilterType[] = [
  "All",
  "Pending",
  "Completed",
];

const FilterTabs = ({ selected, onSelect }: Props) => {
  return (
    <View style={styles.container}>
      {filters.map((filter) => {
        const active = selected === filter;

        return (
          <Pressable
            key={filter}
            onPress={() => onSelect(filter)}
            style={[
              styles.tab,
              active && styles.activeTab,
            ]}
          >
            <Text
              style={[
                styles.text,
                active && styles.activeText,
              ]}
            >
              {filter}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 10,
    gap: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 11,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  activeTab: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  text: {
    color: COLORS.secondary,
    fontWeight: "600",
    fontSize: 12,
  },
  activeText: {
    color: COLORS.white,
  },
});

export default FilterTabs;