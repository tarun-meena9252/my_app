export async function getGooglePlacePhotoUrl(destination, apiKey) {
  try {
    // 1. Use the new Places API v1 searchText endpoint
    const searchRes = await fetch('https://places.googleapis.com/v1/places:searchText', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'places.photos'
      },
      body: JSON.stringify({
        textQuery: destination,
        maxResultCount: 1
      })
    });

    const searchData = await searchRes.json();
    console.log('searchData : ', searchData);

    const photoName = searchData?.places?.[0]?.photos?.[0]?.name;
    if (!photoName) return null;

    // 2. Build the direct photo URL using the photo name
    return `https://places.googleapis.com/v1/${photoName}/media?maxWidthPx=800&key=${apiKey}`;
  } catch (error) {
    console.error('Error fetching photo URL:', error);
    return null;
  }
}