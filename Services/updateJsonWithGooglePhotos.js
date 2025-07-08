import { getGooglePlacePhotoUrl } from './googlePlacePhotoApi';
import { GOOGLE_CLOUD_API_KEY} from '@env';

// Helper to update accommodation_options and itinerary with Google photo URLs
export async function updateJsonWithGooglePhotos(aiJson) {
  await updateAccommodationOptionsWithPhotos(aiJson.accommodation_options);
  await updateItineraryWithPhotos(aiJson.itinerary);
  return aiJson;
}

async function updateAccommodationOptionsWithPhotos(accommodationOptions) {
  if (!Array.isArray(accommodationOptions)) return;
  for (const acc of accommodationOptions) {
    const placeQuery = acc.name + (acc.address ? `, ${acc.address}` : '');
    const url = await getGooglePlacePhotoUrl(placeQuery, GOOGLE_CLOUD_API_KEY);
    if (url) acc.image_url = url;
  }
}

async function updateItineraryWithPhotos(itinerary) {
  if (!itinerary || typeof itinerary !== 'object') return;
  for (const dayKey of Object.keys(itinerary)) {
    const day = itinerary[dayKey];
    await updatePlacesWithPhotos(day.places);
  }
}

async function updatePlacesWithPhotos(places) {
  if (!Array.isArray(places)) return;
  for (const place of places) {
    const placeQuery = place.name + (place.place_details ? `, ${place.place_details}` : '');
    const url = await getGooglePlacePhotoUrl(placeQuery, GOOGLE_CLOUD_API_KEY);
    if (url) place.place_image_url = url;
  }
}

export async function updatePhotoUrl(aiJson) {
  // Try to use 'location', fallback to 'destination'
  const placeQuery = aiJson.location || aiJson.destination;
  if (!placeQuery) return aiJson;
  const url = await getGooglePlacePhotoUrl(placeQuery, GOOGLE_CLOUD_API_KEY);
  if (url) aiJson.photo_url = url;
  return aiJson;
}