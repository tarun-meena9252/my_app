import { GOOGLE_GEMINI_API_KEY, GOOGLE_GEMINI_URL, GOOGLE_GEMINI_MODEL } from '@env';
import AIprompt, { prevResponse } from '../Config/itinerary_prompt';
// import { buildGeminiHistory } from '../Config/make_history'
import { supabase_client } from './supabase';
// import {getGooglePlacePhotoUrl} from './googlePlacePhotoApi'
import {updateJsonWithGooglePhotos, updatePhotoUrl} from './updateJsonWithGooglePhotos'

export async function generateItineraryWithGemini(trip) {

    const prompt = 
    AIprompt
    .replace('{destination}', trip.destination)
    .replace('{days}', trip.days)
    .replace('{startDate}', trip.startDate)
    .replace('{endDate}', trip.endDate)
    .replace('{partner}', trip.partner)
    .replace('{budget}', trip.budget)
    .replace('{accomodation}', trip.accomodation)
    .replace('{accomodation}', trip.accomodation)
    .replace('{days}', trip.days)
    + "\n Reference Response : \n" + prevResponse
    ;

    if (!GOOGLE_GEMINI_API_KEY) {
    throw new Error('GOOGLE_GEMINI_API_KEY is not set');
    }

  const response = await fetch(GOOGLE_GEMINI_URL + GOOGLE_GEMINI_API_KEY
    , {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      model : GOOGLE_GEMINI_MODEL,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch itinerary from Gemini');
  }

  const data = await response.json();

  // Gemini's response format may vary; adjust parsing as needed
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('No itinerary found in Gemini response');
  console.log('Gemini response:', text);

  // Clean and parse the AI response as JSON
  let aiJson;
  try {
    // Remove code block markers and trim whitespace
    let cleaned = text.trim();
    if (cleaned.startsWith('```')) {
      cleaned = cleaned.replace(/^```[a-zA-Z]*\n?/, '').replace(/```$/, '').trim();
    }
    aiJson = JSON.parse(cleaned);
  } catch (e) {
    console.error('Failed to parse AI response as JSON:', e, text);
    throw new Error('Failed to parse AI response as JSON');
  }

  // In your generateItineraryWithGemini function, after parsing aiJson:
  aiJson = await updatePhotoUrl(aiJson);
  aiJson = await updateJsonWithGooglePhotos(aiJson);

  // Assuming aiJson is your parsed Gemini response
  const { accommodation_options, itinerary, photo_url} = aiJson;

  // Get the authenticated user's ID
  const { data: userData, error: userError } = await supabase_client.auth.getUser();
  if (userError || !userData?.user?.id) {
    console.error('Error getting user:', userError);
    return null;
  }
  const auth_id = userData.user.id;

  // Insert into Supabase
  const { apiData, error } = await supabase_client
    .from('trip_details')
    .insert([
      {
        destination: trip.destination,
        days: trip.days,
        budget: trip.budget,
        partner: trip.partner,
        accommodation: trip.accomodation,
        photo_url,
        itinerary: itinerary,
        accommodation_options: accommodation_options,
        auth_id
      },
    ]);

  if (error) {
    console.error('Supabase insert error:', error);
    throw new Error('Failed to insert trip details into Supabase');
  }
  else {
    console.log('Trip details inserted successfully:', apiData);
  }
}