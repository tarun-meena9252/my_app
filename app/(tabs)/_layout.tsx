import { Tabs, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

export default function TabLayout() {
  const router = useRouter();

  return (
    <Tabs
        screenOptions={{
        tabBarActiveTintColor: '#000',
        headerStyle: {
        backgroundColor: '#fff',
        borderColor: '#000',
        },
        headerShadowVisible: false,
        headerTintColor: '#000',
        headerTitleStyle: {
          fontSize: 30, // <-- Increase this value for larger font
          fontWeight: 'bold',
          marginLeft: 8,
        },
        tabBarStyle: {
        backgroundColor: '#fff',
        },
     }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'My Trips',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
          ),
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 22 }}
              onPress={() => router.push('/(tabs)/create')}
              accessibilityLabel="Create Trip"
            >
              <Ionicons name="add-circle" size={50} color="#000" />
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen 
        name="create" 
        options={{ 
            title: 'Create',
            tabBarIcon: ({ color, focused }) => (
                <Ionicons name={focused ? 'add-circle' : 'add-circle-outline'} color={color} size={24}/>
            )
       }} />
      <Tabs.Screen 
        name="profile" 
        options={{ 
            title: 'Profile',
            tabBarIcon: ({ color, focused }) => (
                <Ionicons name={focused ? 'person' : 'person-outline'} color={color} size={24}/>
            )
       }} />
    </Tabs>
  );
}
