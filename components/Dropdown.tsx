import React, { useState } from "react";
import { Platform, Text, Pressable, View, Modal } from "react-native";
import { Picker } from "@react-native-picker/picker";

type Props = {
  value: string;
  onChange: (val: string) => void;
};

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function MonthPicker({ value, onChange }: Props) {
  const [showModal, setShowModal] = useState(false);

  if (Platform.OS === "android") {
    return (
      <Picker
        selectedValue={value}
        onValueChange={(v) => onChange(v)}
        style={{ width: "100%", height: 48 }}
      >
        {months.map((m, i) => (
          <Picker.Item key={m} label={m} value={String(i + 1)} />
        ))}
      </Picker>
    );
  }

  return (
    <View>
      <Pressable
        style={{
          padding: 12,
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 8,
          marginTop: 5,
        }}
        onPress={() => setShowModal(true)}
      >
        <Text>{months[Number(value) - 1]}</Text>
      </Pressable>

      <Modal visible={showModal} transparent animationType="slide">
        <View style={{ flex: 1, justifyContent: "flex-end", backgroundColor: "#00000055" }}>
          <View style={{ backgroundColor: "white" }}>
            <Pressable
              style={{ padding: 12, alignItems: "flex-end" }}
              onPress={() => setShowModal(false)}
            >
              <Text style={{ color: "#007aff", fontWeight: "600" }}>Done</Text>
            </Pressable>

       <Picker
  selectedValue={value}
  onValueChange={(v) => onChange(v)}
>
  {months.map((m, i) => (
    <Picker.Item
      key={m}
      label={m}
      value={String(i + 1)}
      color={Platform.OS === "ios" ? "#000" : undefined}
    />
  ))}
</Picker>
          </View>
        </View>
      </Modal>
    </View>
  );
}