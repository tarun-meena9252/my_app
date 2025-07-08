import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function TripDetailsScreen() {
  const { trip } = useLocalSearchParams();

  if (!trip) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>No trip data found.</Text>
      </View>
    );
  }

  let tripObj;
  try {
    tripObj = JSON.parse(decodeURIComponent(trip as string));
  } catch {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Invalid trip data.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#1e2125' }}>
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>{tripObj.destination}</Text>
      <Text style={styles.label}>Days: <Text style={styles.value}>{tripObj.days}</Text></Text>
      <Text style={styles.label}>Budget: <Text style={styles.value}>{tripObj.budget}</Text></Text>
      <Text style={styles.label}>Partner: <Text style={styles.value}>{tripObj.partner}</Text></Text>
      <Text style={styles.label}>Accommodation: <Text style={styles.value}>{tripObj.accommodation ?? tripObj.accomodation}</Text></Text>
      <Text style={styles.subheading}>Itinerary:</Text>
      <Text style={styles.codeBlock}>{JSON.stringify(tripObj.itinerary, null, 2)}</Text>
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    marginTop: 100,
    flexGrow: 1,
    backgroundColor: '#25292e', 
    padding: 20 
  },
  heading: { 
    color: '#ffd33d', 
    fontSize: 28, 
    fontWeight: 'bold', 
    marginBottom: 12 
  },
  subheading: { 
    color: '#ffd33d', 
    fontSize: 20, 
    fontWeight: 'bold', 
    marginTop: 20, 
    marginBottom: 8 
  },
  label: { 
    color: '#fff', 
    fontSize: 16, 
    marginBottom: 2 },
  value: { 
    color: '#ffd33d' 
  },
  codeBlock: { 
    color: '#fff', 
    fontFamily: 'monospace', 
    fontSize: 13, 
    backgroundColor: '#333', 
    padding: 10, 
    borderRadius: 8, 
    marginTop: 8 
  },
  error: { 
    color: 'red',
    fontSize: 18, 
    textAlign: 'center', 
    marginTop: 40 
  },
});