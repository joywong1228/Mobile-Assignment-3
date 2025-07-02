import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Platform } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import Dropdown from '../components/Dropdown';

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function App() {
  const [month, setMonth] = useState("1"); // Default January
  const [day, setDay] = useState("");
  const [fact, setFact] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Hardcoded API key 
  const RAPIDAPI_KEY = "//anyone can do the key???"; // ← Replace 

  // Calculate days in selected month
  const daysInMonth = (month: number) => {
    const days = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return days[month - 1];
  };

  // Automatically fetch when both fields are valid, with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (month && day && Number(day) > 0 && Number(day) <= daysInMonth(Number(month))) {
        fetchFact(month, day);
      } else {
        setFact("");
      }
    }, 500); // 500ms debounce
    return () => clearTimeout(timer);
  }, [month, day]);

  // API call
  const fetchFact = async (m: string, d: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `https://numbersapi.p.rapidapi.com/${m}/${d}/date?json=true`,
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": RAPIDAPI_KEY,
            "X-RapidAPI-Host": "numbersapi.p.rapidapi.com",
          },
        }
      );
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data = await res.json();
      setFact(data.text ?? "No fact returned.");
    } catch (error) {
      setFact(`Error fetching fact: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Date Fact Finder</Text>

      <Text style={styles.label}>Select Month:</Text>
  <Dropdown
  data={months}
  defaultIndex={0}
  onSelect={(item, index) => setMonth(String(index + 1))}
/>

      <Text style={styles.label}>Enter Day:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        maxLength={2}
        placeholder="e.g. 15"
        value={day}
        onChangeText={(text) => {
          if (/^\d*$/.test(text) && (text === "" || Number(text) <= daysInMonth(Number(month)))) {
            setDay(text);
          }
        }}
      />

      {isLoading && <Text style={styles.loadingText}>Loading...</Text>}
      {fact !== "" && !isLoading && (
        <View style={styles.factBox}>
          <Text style={styles.factText}>{fact}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 18,
    marginTop: 15,
  },
  dropdownBtn: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginTop: 5,
  },
  dropdownText: {
    fontSize: 16,
    textAlign: "left",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginTop: 5,
  },
  factBox: {
    marginTop: 30,
    padding: 20,
    backgroundColor: "#fffbe6",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ffd700",
  },
  factText: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
  loadingText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
    color: "#666",
  },
});