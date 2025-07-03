import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import MonthPicker from "../components/Dropdown"; 

export default function App() {
  const [month, setMonth] = useState("1");
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
      setFact(data.text);
    } catch (error) {
      setFact("⚠️ Could not fetch fact. Please check your API key or try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Historical Date Facts</Text>
        <Text style={styles.subtitle}>Choose a month and day to discover a cool historical fact!</Text>

        <View style={styles.pickerContainer}>
          <MonthPicker value={month} onChange={setMonth} />
        </View>

        <TextInput
          style={styles.input}
          placeholder="Enter day"
          keyboardType="numeric"
          maxLength={2}
          value={day}
          onChangeText={(text) => {
            if (/^\d{0,2}$/.test(text)) setDay(text);
          }}
        />

        {isLoading && <ActivityIndicator size="large" color="#007aff" style={{ marginTop: 30 }} />}

        {!isLoading && fact !== "" && (
          <View style={styles.factBox}>
            <Text style={styles.factText}>{fact}</Text>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingTop: 60,
    backgroundColor: "#fdfdfd",
    alignItems: "center",
    flexGrow: 1,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#1a1a1a",
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 30,
    textAlign: "center",
  },
  pickerContainer: {
    width: "100%",
    marginBottom: 16,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 18,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  factBox: {
    marginTop: 30,
    backgroundColor: "#e6f0ff",
    padding: 20,
    borderRadius: 12,
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
  },
  factText: {
    fontSize: 17,
    textAlign: "center",
    color: "#333",
    lineHeight: 24,
  },
});
