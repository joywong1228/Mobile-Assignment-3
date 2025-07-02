import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import MonthPicker from "../components/Dropdown"; // Make sure path is correct

export default function App() {
  const [month, setMonth] = useState("1"); // Default to January
  const [day, setDay] = useState("");
  const [fact, setFact] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const RAPIDAPI_KEY = "368b2399aamsh52af1caec8df72ep1deb7cjsneac6f97a6c1c";

  const daysInMonth = (month: number) => {
    const days = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return days[month - 1];
  };

  

  useEffect(() => {
    const timer = setTimeout(() => {
      const dayNum = Number(day);
      if (
        month &&
        day &&
        dayNum > 0 &&
        dayNum <= daysInMonth(Number(month))
      ) {
        fetchFact(month, day);
      } else {
        setFact("");
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [month, day]);

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
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      const data = await res.json();
      setFact(`${m}/${d} is the day in ${data.year} that ${data.text}.`);
    } catch (error) {
      setFact("Error fetching fact. Please check your API key.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>assignmentSample</Text>
    

      <MonthPicker value={month} onChange={setMonth} />

      <TextInput
        style={styles.input}
        placeholder="Enter Day (e.g. 12)"
        keyboardType="numeric"
        maxLength={2}
        value={day}
        onChangeText={(text) => {
          // Allow 1 or 2 digit numbers only
          if (/^\d{0,2}$/.test(text)) {
            setDay(text);
          }
        }}
      />

      {isLoading && <Text style={styles.loading}>Loading...</Text>}

      {fact !== "" && !isLoading && (
        <View style={styles.factContainer}>
          <Text style={styles.fact}>{fact}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 60,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    marginVertical: 20,
    textAlign: "center",
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 10,
    fontSize: 16,
    marginTop: 12,
  },
  loading: {
    textAlign: "center",
    color: "#666",
    marginTop: 20,
  },
  factContainer: {
    marginTop: 30,
    padding: 16,
    backgroundColor: "#f0f8ff",
    borderLeftWidth: 5,
    borderLeftColor: "#007aff",
    borderRadius: 6,
  },
  fact: {
    fontSize: 16,
    lineHeight: 22,
    textAlign: "center",
  },
});
