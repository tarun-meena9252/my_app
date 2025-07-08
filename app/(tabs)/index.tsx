import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, RefreshControl, Image} from 'react-native';
import { supabase_client } from '../../Services/supabase';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const [trips, setTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  const fetchTrips = useCallback(async () => {
    setLoading(true);
    const { data: userData, error: userError } = await supabase_client.auth.getUser();
    if (userError || !userData?.user?.id) {
      setTrips([]);
      setLoading(false);
      return;
    }
    const auth_id = userData.user.id;
    const { data, error } = await supabase_client
      .from('trip_details')
      .select('*')
      .eq('auth_id', auth_id)
      .order('id', { ascending: false });

    if (error) {
      setTrips([]);
    } else {
      setTrips(data || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchTrips();
    setRefreshing(false);
  }, [fetchTrips]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#000" />
        <Text style={styles.text}>Loading your trips...</Text>
      </View>
    );
  }

  if (!trips.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No trips found. Create your first trip!</Text>
        <FlatList
          data={[]}
          renderItem={() => null}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#fff" />
          }
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* here, Recent trip data with show trip button*/}
      {trips.length > 0 && (
        
        <View style={styles.recentTripBox}>
          <Image
            source={
              trips[0].photo_url
                ? { uri: trips[0].photo_url }
                : require('../../assets/images/get-started.png')
            }
            style={styles.recentTripImage}
            resizeMode="cover"
          />
          <View style={styles.recentTripDetails}>
            <Text style={styles.recentTripTitle}>{trips[0].destination}</Text>
            <View style={styles.recentTripRow}>
              <Text style={styles.recentTripText}>
                Created at: {trips[0].created_at ? new Date(trips[0].created_at).toLocaleDateString() : 'N/A'}
              </Text>
              <Text style={styles.recentTripText}>{trips[0].partner}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.recentTripButton}
            onPress={() =>
              router.push({
                pathname: '/Screens/TripDetailsScreen',
                params: { trip: encodeURIComponent(JSON.stringify(trips[0])) },
              })
            }
          >
            <Text style={styles.recentTripButtonText}>Show Trip</Text>
          </TouchableOpacity>
        </View>
      )}
      <FlatList
        data={trips}
        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.tripListItem}
            onPress={() =>
              router.push({
                pathname: '/Screens/TripDetailsScreen',
                params: { trip: encodeURIComponent(JSON.stringify(item)) },
              })
            }
          >
            <Image
              source={
                item.photo_url
                  ? { uri: item.photo_url }
                  : require('../../assets/images/get-started.png')
              }
              style={styles.tripListImage}
              resizeMode="cover"
            />
            <View style={styles.tripListDetails}>
              <Text style={styles.tripListTitle}>{item.destination}</Text>
              <Text style={styles.tripListText}>{item.partner}</Text>
              <Text style={styles.tripListText}>
                Created at: {item.created_at ? new Date(item.created_at).toLocaleDateString() : 'N/A'}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#ffd33d" />
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  text: {
    color: '#000',
    fontSize: 18,
    marginTop: 16,
  },
  recentTripBox: {
    width: 340,
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 5,
    // shadowColor: '#000',
    // shadowOpacity: 0.12,
    // shadowRadius: 6,
    // elevation: 3,
    alignItems: 'center',
    paddingBottom: 16,
    overflow: 'hidden',
  },
  recentTripImage: {
    width: '90%',
    height: 180,
    borderRadius: 16,
    marginTop: 15,
  },
  recentTripDetails: {
    width: '100%',
    paddingHorizontal: 18,
    paddingTop: 8,
    paddingBottom: 2,
    alignItems: 'flex-start',
  },
  recentTripTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  recentTripRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
  },
  recentTripText: {
    fontSize: 13,
    color: '#333',
    marginBottom: 1,
  },
  recentTripButton: {
    marginTop: 5,
    backgroundColor: '#000',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 36,
    alignSelf: 'center',
    width: '90%',
  },
  recentTripButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
tripListItem: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#fff',
  borderRadius: 12,
  padding: 12,
  marginVertical: 8,
  width: 340,
  // shadowColor: '#000',
  // shadowOpacity: 0.1,
  // shadowRadius: 4,
  // elevation: 2,
},
tripListImage: {
  width: 80,
  height: 80,
  borderRadius: 10,
  marginRight: 14,
  backgroundColor: '#eee',
},
tripListDetails: {
  flex: 1,
  justifyContent: 'center',
},
tripListTitle: {
  color: '#000',
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: 2,
},
tripListText: {
  color: '#333',
  fontSize: 13,
  marginBottom: 1,
},
});
