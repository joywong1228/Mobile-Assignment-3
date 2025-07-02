// components/Dropdown.tsx
import React from "react";
import SelectDropdown from "react-native-select-dropdown";
import { StyleSheet } from "react-native";

type DropdownProps = {
  data: string[];
  defaultIndex?: number;
  onSelect: (selectedItem: string, index: number) => void;
};

const Dropdown = ({ data, defaultIndex = 0, onSelect }: DropdownProps) => {
  return (
    <SelectDropdown
      data={data}
      defaultValueByIndex={defaultIndex}
      buttonStyle={styles.buttonStyle}
      buttonTextStyle={styles.buttonTextStyle}
      rowTextForSelection={(item) => item}
      buttonTextAfterSelection={(item) => item}
      onSelect={onSelect}
    />
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  buttonStyle: {
    width: "100%",
    height: 48,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginTop: 5,
  },
  buttonTextStyle: {
    fontSize: 16,
    textAlign: "left",
  },
});