import { Text, View, TextInput, Pressable, ScrollView, TouchableWithoutFeedback, Keyboard, Alert, } from 'react-native';
import React, {useState} from "react";
import styles, { BOXES_PER_ROW, BOX_WIDTH } from '../../Styles/styles';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';
import { differenceInCalendarDays } from 'date-fns';
import { parseISO } from 'date-fns/parseISO';
import CustomButton from '../../components/CustomButton';
import { useRouter } from 'expo-router';
import Constants from "expo-constants";
const BASE_URL = Constants.expoConfig?.extra?.BASE_URL;


const budgetOptions = ["Cheap", "Moderate", "Luxury"];
const partnerOptions = ["Just Me", "Couple", "Family", "Friends"];
const accomodationOptions = ["Hotel", "Hostel", "Airbnb", "Camping"];

// Icon mappings with relevant colors
const budgetIcons: Record<string, React.ReactNode> = {
  Cheap: <Ionicons name="pricetag-outline" size={28} color="#4CAF50" />, // green
  Moderate: <Ionicons name="pricetags-outline" size={28} color="#FFC107" />, // amber
  Luxury: <MaterialCommunityIcons name="diamond-stone" size={28} color="#2196F3" />, // blue
};

const partnerIcons: Record<string, React.ReactNode> = {
  "Just Me": <Ionicons name="person-outline" size={28} color="#9E9E9E" />, // grey
  "Couple": <Ionicons name="people-outline" size={28} color="#E91E63" />, // pink
  "Family": <MaterialCommunityIcons name="account-group-outline" size={28} color="#3F51B5" />, // indigo
  "Friends": <FontAwesome5 name="user-friends" size={24} color="#FF9800" />, // orange
};

const accomodationIcons: Record<string, React.ReactNode> = {
  Hotel: <Ionicons name="bed-outline" size={28} color="#3F51B5" />, // indigo
  Hostel: <MaterialCommunityIcons name="home-group" size={28} color="#009688" />, // teal
  Airbnb: <FontAwesome5 name="airbnb" size={24} color="#FF5A5F" />, // airbnb red
  Camping: <MaterialCommunityIcons name="tent" size={28} color="#4CAF50" />, // green
};

export default function CreateScreen() {
  const [destination, setDestination] = useState<string>('');
  const [days, setDays] = useState<string>('');
  const [selectedBudget, setSelectedBudget] = useState<number | null>(null);
  const [selectedPartner, setSelectedPartner] = useState<number | null>(null);
  const [selectedAccomodation, setSelectedAccomodation] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const router = useRouter();

  const generateSuggestions = async (query: string) => {
    if (query.length <= 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    try {
      const data = await GetPlacesAutoComplete(query);
      if (data && data.predictions) {
        setSuggestions(data.predictions.slice(0, 4).map((item: any) => item.description));
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    } catch {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // Hide suggestions when user taps outside
  const handleOutsidePress = () => {
    setShowSuggestions(false);
    Keyboard.dismiss();
  };

  const handleGenerateTrip = async () =>  {
    // Validation
    if (!destination.trim()) {
      Alert.alert('Missing Field', 'Please enter a destination.');
      return;
    }
    if (selectedBudget === null) {
      Alert.alert('Missing Field', 'Please select a budget.');
      return;
    }
    if (selectedPartner === null) {
      Alert.alert('Missing Field', 'Please select who you are traveling with.');
      return;
    }
    if (selectedAccomodation === null) {
      Alert.alert('Missing Field', 'Please select an accommodation type.');
      return;
    }
    if (startDate === null || endDate === null){
      Alert.alert('Missing Field', 'Please select both start and end date.');
      return;
    }

    setIsLoading(true);
    const formData = {
      destination,
      startDate,
      endDate,
      days,
      budget: selectedBudget !== null ? budgetOptions[selectedBudget] : null,
      partner: selectedPartner !== null ? partnerOptions[selectedPartner] : null,
      accomodation: selectedAccomodation !== null ? accomodationOptions[selectedAccomodation] : null,
    };
    console.log('Trip Details:', formData);
    setIsLoading(false);
    const TripDetails = {
      destination,
      startDate,
      endDate,
      days,
      budget: selectedBudget !== null ? budgetOptions[selectedBudget] : '',
      partner: selectedPartner !== null ? partnerOptions[selectedPartner] : '',
      accomodation: selectedAccomodation !== null ? accomodationOptions[selectedAccomodation] : '',
    };

    // Navigate to waiting screen and pass trip details as a string
    router.push({
      pathname: '../Screens/GeneratingTrip',
      params: { tripDetails: JSON.stringify(TripDetails) }
    });
  };

    // Split budgetOptions into rows of BOXES_PER_ROW
  const budgetRows = [];
  for (let i = 0; i < budgetOptions.length; i += BOXES_PER_ROW) {
    budgetRows.push(budgetOptions.slice(i, i + BOXES_PER_ROW));
  }
  const partnerRows = [];
  for (let i = 0; i < partnerOptions.length; i += BOXES_PER_ROW) {
    partnerRows.push(partnerOptions.slice(i, i + BOXES_PER_ROW));
  }
  const accomodationRows = [];
  for (let i = 0; i < accomodationOptions.length; i += BOXES_PER_ROW) {
    accomodationRows.push(accomodationOptions.slice(i, i + BOXES_PER_ROW));
  }

  const GetPlacesAutoComplete = async (query: string) => {
    const response = await fetch(`${BASE_URL}/autocomplete?input=${query}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    if (!data || !data.predictions) {
      throw new Error('Invalid data format');
    }
    return data;
}

// function for calender component
  const onDayPress = (day: { dateString: string }) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(day.dateString);
      setEndDate(null);
    } else if (startDate && !endDate) {
      if (day.dateString > startDate) {
        setEndDate(day.dateString);
      } else {
        setStartDate(day.dateString);
      }
    }
  };

// Helper to generate markedDates for the calendar
  const getMarkedDates = () => {
    if (!startDate) return {};
    if (!endDate) {
      return {
        [startDate]: {
          startingDay: true,
          endingDay: true,
          color: '#000',
          textColor: '#fff',
        },
      };
    }
  // Range selection
  const range: { [key: string]: any } = {};
  let current = new Date(startDate);
  const last = new Date(endDate);
    while (current <= last) {
      const dateStr = current.toISOString().split('T')[0];
      range[dateStr] = {
        color: '#000',
        textColor: '#fff',
        ...(dateStr === startDate ? { startingDay: true } : {}),
        ...(dateStr === endDate ? { endingDay: true } : {}),
      };
      current.setDate(current.getDate() + 1);
    }
  return range;
  };

  React.useEffect(() => {
    if (startDate && endDate) {
      // Calculate days difference (inclusive)
      const daysCount = differenceInCalendarDays(parseISO(endDate), parseISO(startDate)) + 1;
      setDays(daysCount > 0 ? daysCount.toString() : '');
    } else {
      setDays('');
    }
  }, [startDate, endDate]);


  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
      <View style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.mainText}>Tell us your travel preferences</Text>
          <Text style={styles.subText}>Provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.</Text>
        </View>

        <View style={styles.container}>
          <Text style={styles.label}>What is destination of choice</Text>
            <TextInput
              style={styles.input}
              placeholder="destination"
              placeholderTextColor="#aaa"
              keyboardType="default"
              value={destination}
              onChangeText={async (text) => {
                setDestination(text);
                await generateSuggestions(text);
              }}
              onFocus={() => {
                if (suggestions.length > 0) setShowSuggestions(true);
              }}
            />
            {showSuggestions && suggestions.length > 0 && (
              <View style={{
                backgroundColor: '#fff',
                borderColor: '#ccc',
                borderWidth: 1,
                borderRadius: 6,
                marginTop: 2,
                zIndex: 10,
                position: 'absolute',
                width: '100%',
                top: 70, // adjust if needed based on your input height
                left: 0,
              }}>
                {suggestions.map((item) => (
                  <Pressable
                    key={item}
                    onPress={() => {
                      setDestination(item);
                      setShowSuggestions(false);
                      setSuggestions([]);
                      Keyboard.dismiss();
                    }}
                    style={{
                      padding: 12,
                      borderBottomWidth: 1,
                      borderBottomColor: '#eee',
                    }}
                  >
                    <Text>{item}</Text>
                  </Pressable>
                ))}
              </View>
            )}
        </View>

        <View style={styles.container}>
          <Text style={styles.label}>Select your trip dates</Text>
          <Calendar
            onDayPress={onDayPress}
            markingType={'period'}
            markedDates={getMarkedDates()}
            theme={{
              selectedDayBackgroundColor: '#000',
              todayTextColor: '#000',
              arrowColor: '#000',
              textSectionTitleColor: '#000',
              dayTextColor: '#000',
              monthTextColor: '#000',
              textDisabledColor: '#ccc',
            }}
          />
        </View>

        <View style={styles.container}>
          <Text style={styles.label}>What is your Budget?</Text>
          {budgetRows.map((row, rowIdx) => (
            <View
              style={styles.row}
              key={row.map(option => option).join('-')}
            >
              {row.map((option, idx) => {
                const optionIdx = rowIdx * BOXES_PER_ROW + idx;
                return (
                  <Pressable
                    key={option}
                    onPress={() => setSelectedBudget(optionIdx)}
                    style={[
                      styles.box,
                      { width: BOX_WIDTH },
                      selectedBudget === optionIdx && styles.boxSelected,
                    ]}
                  >
                    {budgetIcons[option]}
                    <Text style={styles.boxText}>{option}</Text>
                  </Pressable>
                );
              })}
              {/* Fill empty boxes if row is not full */}
              {row.length < BOXES_PER_ROW &&
                Array.from({ length: BOXES_PER_ROW - row.length }).map((_, i) => (
                  <View key={`empty-${row.map(option => option).join('-')}-${i}`} style={[styles.box, { width: BOX_WIDTH, backgroundColor: "transparent", borderWidth: 0 }]} />
                ))}
            </View>
          ))}
        </View>

        <View style={styles.container}>
          <Text style={styles.label}>Who do you plan on traveling with on your next adventure?</Text>
          {partnerRows.map((row, rowIdx) => (
            <View
              style={styles.row}
              key={row.map(option => option).join('-')}
            >
              {row.map((option, idx) => {
                const optionIdx = rowIdx * BOXES_PER_ROW + idx;
                return (
                  <Pressable
                    key={option}
                    onPress={() => setSelectedPartner(optionIdx)}
                    style={[
                      styles.box,
                      { width: BOX_WIDTH },
                      selectedPartner === optionIdx && styles.boxSelected,
                    ]}
                  >
                    {partnerIcons[option]}
                    <Text style={styles.boxText}>{option}</Text>
                  </Pressable>
                );
              })}
              {/* Fill empty boxes if row is not full */}
              {row.length < BOXES_PER_ROW &&
                Array.from({ length: BOXES_PER_ROW - row.length }).map((_, i) => (
                  <View key={`empty-${row.map(option => option).join('-')}-${i}`} style={[styles.box, { width: BOX_WIDTH, backgroundColor: "transparent", borderWidth: 0 }]} />
                ))}
            </View>
          ))}
        </View>

        <View style={styles.container}>
          <Text style={styles.label}>Which type of accomodation do you want to stay?</Text>
          {accomodationRows.map((row, rowIdx) => (
            <View
              style={styles.row}
              key={row.map(option => option).join('-')}
            >
              {row.map((option, idx) => {
                const optionIdx = rowIdx * BOXES_PER_ROW + idx;
                return (
                  <Pressable
                    key={option}
                    onPress={() => setSelectedAccomodation(optionIdx)}
                    style={[
                      styles.box,
                      { width: BOX_WIDTH },
                      selectedAccomodation === optionIdx && styles.boxSelected,
                    ]}
                  >
                    {accomodationIcons[option]}
                    <Text style={styles.boxText}>{option}</Text>
                  </Pressable>
                );
              })}
              {/* Fill empty boxes if row is not full */}
              {row.length < BOXES_PER_ROW &&
                Array.from({ length: BOXES_PER_ROW - row.length }).map((_, i) => (
                  <View key={`empty-${row.map(option => option).join('-')}-${i}`} style={[styles.box, { width: BOX_WIDTH, backgroundColor: "transparent", borderWidth: 0 }]} />
                ))}
            </View>
          ))}
        </View>

          <View style={{ alignItems: 'center', marginTop: 32, marginBottom: 24 }}>
            <CustomButton
              title={isLoading ? "Generating..." : "Generate Trip"}
              handlePress={handleGenerateTrip}
              style={styles.button}
              textStyle={styles.buttonText}
              isLoading={isLoading}
            />
          </View>      
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}