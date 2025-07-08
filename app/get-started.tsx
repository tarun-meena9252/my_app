import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image} from 'react-native';
import { useRouter } from 'expo-router';
import { supabase_client } from '../Services/supabase';
import type { User } from '@supabase/supabase-js';

export default function GetStartedScreen() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null); // State to store the signed-in user
  
  useEffect (() =>{
    // Check if a user is already signed in when the component mounts
    const sessionPromise = supabase_client.auth.getSession();
    // console.log('session', sessionPromise);
    // If a session exists, set the user state and redirect to the home page
    sessionPromise.then(({ data }) => {
      if (data?.session?.user) {
        setUser(data.session.user);
        router.replace('/(tabs)'); // Redirect if already signed in
      }
    });
  }, []);

  const handleSignIn = () => {
    router.push('/(auth)/sign-in')
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/get-started.png')}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.text_container} > 
        <Text style={styles.heading}>Get Started</Text>
        <Text style={styles.subText}>
          Smart, personalized travel planning made effortless. Whether it's a weekend escape or a global adventure, our AI will guide every step of your journey.
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Sign in with Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
  text_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -30,
    paddingTop: 40,
  },
  image: {
    width: '100%',
    height: '60%',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  subText: {
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 20,
    marginTop: 10,
    color: '#666',
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
    marginTop: 50,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
