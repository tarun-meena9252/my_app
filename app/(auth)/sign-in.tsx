import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { supabase_client } from '../../Services/supabase';
import type { User } from '@supabase/supabase-js';

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null); // State to store the signed-in user
  const router = useRouter();

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Missing fields', 'Please enter both email and password.');
      return;
    }
    setLoading(true);
    const { data, error } = await supabase_client.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      Alert.alert('Sign In Error', error.message);
    } else {
      // Set the user state with the signed-in user data
      setUser(data.user);
      router.replace('/(tabs)');
    }
  };

  useEffect(() => {
    // Check if a user is already signed in when the component mounts
    const session = supabase_client.auth.getSession();
    // If a session exists, set the user state and redirect to the home page
    session.then(({ data }) => {
      if (data?.session?.user) {
        setUser(data.session.user);
        router.replace('/(tabs)'); // Redirect if already signed in
      }
    });
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', padding: 24, justifyContent: 'center' }}>
      <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 8 }}>Let's sign you in</Text>
      <Text style={{ fontSize: 16, color: '#888', marginBottom: 5 }}>Welcome Back !!</Text>
      <Text style={{ fontSize: 16, color: '#888', marginBottom: 32 }}>you've been missed</Text>

      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 15, marginBottom: 6, color: '#222' }}>Email</Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: '#ddd',
            borderRadius: 8,
            padding: 12,
            fontSize: 16,
            backgroundColor: '#fafafa',
          }}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 15, marginBottom: 6, color: '#222' }}>Password</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#ddd', borderRadius: 8, backgroundColor: '#fafafa' }}>
          <TextInput
            style={{
              flex: 1,
              padding: 12,
              fontSize: 16,
              backgroundColor: '#fafafa',
            }}
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={{ paddingHorizontal: 12 }}
          >
            <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={22} color="#888" />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: '#000',
          paddingVertical: 14,
          borderRadius: 8,
          alignItems: 'center',
          marginTop: 8,
          flexDirection: 'row',
          justifyContent: 'center',
        }}
        onPress={handleSignIn}
        disabled={loading}
      >
        {loading && <ActivityIndicator color="#fff" style={{ marginRight: 8 }} />}
        <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Sign in</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: '#fff',
          borderWidth: 1,
          borderColor: '#bbb',
          paddingVertical: 14,
          borderRadius: 8,
          alignItems: 'center',
          marginTop: 12,
        }}
        onPress={() => router.replace('/(auth)/sign-up')}
      >
        <Text style={{ color: '#333', fontSize: 16, fontWeight: 'bold' }}>Create account</Text>
      </TouchableOpacity>
    </View>
  );
}

