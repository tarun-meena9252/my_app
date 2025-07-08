import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { supabase_client } from '../../Services/supabase';

export default function SignUpScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async () => {
    if (!name || !email || !password) {
      Alert.alert('Missing fields', 'Please fill all fields.');
      return;
    }
    setLoading(true);
    const { error } = await supabase_client.auth.signUp({
      email,
      password,
      options: {
        data: { name }
      }
    });
    setLoading(false);

    if (error) {
      Alert.alert('Sign Up Error', error.message);
    } else {
      Alert.alert('Success', 'Account created! Please check your email to verify your account.');
      router.replace('/(tabs)');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', padding: 24, justifyContent: 'center' }}>
      <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 16 }}>Sign up</Text>

      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 15, marginBottom: 6, color: '#222' }}>Name</Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: '#ddd',
            borderRadius: 8,
            padding: 12,
            fontSize: 16,
            backgroundColor: '#fafafa',
          }}
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
        />
      </View>

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
        onPress={handleSignUp}
        disabled={loading}
      >
        {loading && <ActivityIndicator color="#fff" style={{ marginRight: 8 }} />}
        <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Create account</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ marginTop: 24, alignItems: 'center' }}
        onPress={() => router.replace('/(auth)/sign-in')}
      >
        <Text style={{ color: '#333', fontSize: 15 }}>
          Already a user? <Text style={{ textDecorationLine: 'underline', fontWeight: 'bold' }}>Sign-in</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}