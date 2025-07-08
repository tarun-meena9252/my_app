import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { generateItineraryWithGemini } from '../../Services/gemini';

export default function GeneratingTripScreen() {
  const router = useRouter();
  const { tripDetails } = useLocalSearchParams();

  useEffect(() => {
    const generate = async () => {
      try {
        // tripDetails is passed as a JSON string, so parse it
        const tripString = Array.isArray(tripDetails) ? tripDetails[0] : tripDetails;
        const trip = JSON.parse(tripString);
        await generateItineraryWithGemini(trip);
        router.replace('/(tabs)');
      } catch (e) {
        console.error('Error generating trip:', e);
        // Optionally handle error
        router.replace('/(tabs)');
      }
    };
    generate();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Please Wait...</Text>
      <Text style={styles.subtitle}>Generating your Trip</Text>
      <Image
        source={require('../../assets/images/loading.gif')} // Place your animation here
        style={styles.image}
      />
      <Text style={styles.subtitle}>Do not go back</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 32 },
  image: { width: 120, height: 120, marginBottom: 32 },
  subtitle: { fontSize: 18, color: '#888' },
});