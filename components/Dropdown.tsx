import React, { useState } from "react";
import {
  Platform,
  Text,
  Pressable,
  View,
  Modal,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

type Props = {
  value: string;
  onChange: (val: string) => void;
};

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export default function MonthPicker({ value, onChange }: Props) {
  const [showModal, setShowModal] = useState(false);

  // Android view
  if (Platform.OS === "android") {
    return (
      <View style={styles.androidWrapper}>
        <Picker
          selectedValue={value}
          onValueChange={(v) => onChange(v)}
          style={styles.androidPicker}
        >
          <Picker.Item label="Select Month" value="" />
          {months.map((m, i) => (
            <Picker.Item key={m} label={m} value={String(i + 1)} />
          ))}
        </Picker>
      </View>
    );
  }

  // iOS view
  return (
    <View>
      <Pressable
        style={styles.iosBox}
        onPress={() => setShowModal(true)}
      >
        <Text style={value ? styles.text : styles.placeholder}>
          {value ? months[Number(value) - 1] : "Select Month"}
        </Text>
      </Pressable>

      <Modal visible={showModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Pressable
              style={styles.doneButton}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.doneText}>Done</Text>
            </Pressable>

            <Picker
              selectedValue={value}
              onValueChange={(v) => onChange(v)}
            >
              <Picker.Item label="Select Month" value="" />
              {months.map((m, i) => (
                <Picker.Item
                  key={m}
                  label={m}
                  value={String(i + 1)}
                  color="#000"
                />
              ))}
            </Picker>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  androidWrapper: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8, 
    overflow: "hidden",
    marginBottom: 10,
  },
  androidPicker: {
    height: 48,
    width: "100%",
  },
  iosBox: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8, 
    marginTop: 5,
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 16,
    color: "#000",
  },
  placeholder: {
    fontSize: 16,
    color: "#888",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "#00000055",
  },
  modalContent: {
    backgroundColor: "white",
  },
  doneButton: {
    padding: 12,
    alignItems: "flex-end",
  },
  doneText: {
    color: "#007aff",
    fontWeight: "600",
    fontSize: 16,
  },
});
