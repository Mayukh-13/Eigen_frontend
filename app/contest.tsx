
import { StyleSheet, FlatList } from "react-native";
import { useState, useEffect } from "react";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

const previousContests = [
  { id: '1', name: 'Weekly Contest #1', date: '2023-12-01', winner: 'Alice' },
  { id: '2', name: 'Weekly Contest #2', date: '2023-11-24', winner: 'Bob' },
  { id: '3', name: 'Weekly Contest #3', date: '2023-11-17', winner: 'Charlie' },
  { id: '4', name: 'Weekly Contest #4', date: '2023-11-10', winner: 'Diana' },
  { id: '5', name: 'Weekly Contest #5', date: '2023-11-03', winner: 'Eve' },
];

const upcomingContest = {
  name: 'Weekly Contest #6',
  startTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
};

export default function ContestScreen() {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = upcomingContest.startTime.getTime() - now;
      setTimeLeft(distance > 0 ? distance : 0);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (ms: number) => {
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>🏆 Weekly Contests</ThemedText>

      <ThemedView style={styles.upcoming}>
        <ThemedText type="subtitle">Upcoming Contest</ThemedText>
        <ThemedText style={styles.contestName}>{upcomingContest.name}</ThemedText>
        <ThemedText style={styles.timer}>Starts in: {formatTime(timeLeft)}</ThemedText>
      </ThemedView>

      <ThemedText type="subtitle" style={styles.previousTitle}>Previous Contests</ThemedText>
      <FlatList
        data={previousContests}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ThemedView style={styles.contestItem}>
            <ThemedText style={styles.contestName}>{item.name}</ThemedText>
            <ThemedText>{item.date} - Winner: {item.winner}</ThemedText>
          </ThemedView>
        )}
        style={styles.list}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 50,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  upcoming: {
    marginBottom: 30,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  contestName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  timer: {
    fontSize: 16,
    color: 'red',
  },
  previousTitle: {
    marginBottom: 10,
  },
  list: {
    flex: 1,
  },
  contestItem: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#eee',
  },
});
