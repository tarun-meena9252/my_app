export const AIprompt = 
`
Generate Travel plan for Location: {destination}, for {days} Days from {startDate} to {endDate} for {partner}, with a {budget} Budget, staying at {accomodation}. Give me the destination photo url, {accomodation} options list with Name, Address, google place image reference, Price, Geo-coordinates, Rating, Descriptions and suggest itinerary with Place Name, Place Details, google place image reference, Geo-coordinates, Ticket pricing, time to travel each of the location for {days} Days with each day plan with time to visit, only generate a JSON format.
` 

export default AIprompt;

export const prevPrompt = AIprompt
  .replace('{destination}', 'Chikkamagaluru, Karnataka, India')
  .replace('{days}', '3 Days')
  .replace('{startDate}', '2025-07-11')
  .replace('{endDate}', '2025-07-13')
  .replace('{partner}', 'Couple')
  .replace('{budget}', 'Moderate')
  .replace('{accomodation}', 'Hostel')
  .replace('{days}', '3 Days');

export const prevResponse = 
`
{
  "location": "Chikkamagaluru, Karnataka, India",
  "duration": "3 Days",
  "startDate": "2025-07-11",
  "endDate": "2025-07-13"
  "budget": "Moderate",
  "travelers": "Couple",
  "accommodation_type": "Hostel",
  "photo_url" "https://example.com/chikkamagaluru.jpg",
  "accommodation_options": [
    {
      "name": "Zostel Chikkamagaluru",
      "address": "Survey No. 80, Belur Main Road, Yelahanka Village, Karnataka 577130",
      "image_url": "https://example.com/zostel_chikkamagaluru.jpg",
      "price": 800,
      "geo_coordinates": [
        13.3156,
        75.7714
      ],
      "rating": 4.5,
      "description": "A popular hostel with dorms and private rooms, common area, and activities. Good for meeting other travellers."
    },
     {
      "name": "Homestay Rooms",
      "address": "near kelagur tea estate , chikkamagaluru, Karnataka 577101",
      "image_url": "https://example.com/hombaystay.jpg",
      "price": 600,
      "geo_coordinates": [
        13.3156,
        75.7714
      ],
      "rating": 3.9,
      "description": "A popular hostel with dorms and private rooms, common area, and activities. Good for meeting other travellers."
    },
    {
      "name": "The Hosteller Chikkamagaluru",
      "address": "Survey No 14/1, Jyothipura Village Mudigere Taluk Chikkamagaluru, Karnataka 577132",
      "image_url": "https://example.com/thehosteller_chikkamagaluru.jpg",
      "price": 750,
      "geo_coordinates": [
        13.1327,
        75.6364
      ],
      "rating": 4.2,
      "description": "Another well-regarded hostel option with comfortable stay and a social atmosphere. Located slightly outside the main town."
    }
  ],
  "itinerary": {
    "day_1": {
      "date": "2025-07-11",
      "theme": "Coffee Plantations and Town Exploration",
      "places": [
        {
          "name": "Mullayanagiri Peak",
          "place_details": "The highest peak in Karnataka, offering panoramic views of the Western Ghats. A relatively easy trek to the top.",
          "place_image_url": "https://example.com/mullayanagiri.jpg",
          "geo_coordinates": [
            13.3865,
            75.7594
          ],
          "ticket_pricing": "Free",
          "time_to_travel_from_hostel": "1 hour",
          "time_to_visit": "2-3 hours",
          "visit_time": "8:00 AM - 11:00 AM"
        },
        {
          "name": "Seethalayanagiri",
          "place_details": "Seethalayanagiri is known for its serene and picturesque beauty. The drive to the top is filled with lush green landscapes and coffee plantations. It's less crowded than Mullayanagiri.",
          "place_image_url": "https://example.com/seethalayanagiri.jpg",
          "geo_coordinates": [
            13.4046,
            75.7640
          ],
          "ticket_pricing": "Free",
          "time_to_travel_from_mullayanagiri": "15 mins",
          "time_to_visit": "1.5-2 hours",
          "visit_time": "11:30 AM - 1:30 PM"
        },
        {
          "name": "Baba Budangiri",
          "place_details": "A mountain range known for its Sufi shrine of Baba Budan and coffee plantations. Offers trekking and scenic views.",
          "place_image_url": "https://example.com/baba_budangiri.jpg",
          "geo_coordinates": [
            13.4137,
            75.7434
          ],
          "ticket_pricing": "Free",
          "time_to_travel_from_Seethalayanagiri": "30 mins",
          "time_to_visit": "2-3 hours",
          "visit_time": "2:00 PM - 5:00 PM"
        }
      ]
    },
    "day_2": {
      "date": "2025-07-12",
      "theme": "Waterfalls and Nature",
      "places": [
        {
          "name": "Jhari Waterfalls (Buttermilk Falls)",
          "place_details": "A beautiful waterfall cascading down rocks. Requires a jeep ride to reach the falls (can be bumpy).",
          "place_image_url": "https://example.com/jhari_waterfalls.jpg",
          "geo_coordinates": [
            13.3786,
            75.7134
          ],
          "ticket_pricing": "Jeep ride charges around INR 800-1200 per jeep (shared)",
          "time_to_travel_from_hostel": "1.5 hours (including jeep ride)",
          "time_to_visit": "2-3 hours",
          "visit_time": "9:00 AM - 12:00 PM"
        },
        {
          "name": "Hirekolale Lake",
          "place_details": "A serene lake offering picturesque views, especially during sunset. A good spot for relaxation and photography.",
          "place_image_url": "https://example.com/hirekolale_lake.jpg",
          "geo_coordinates": [
            13.3497,
            75.7937
          ],
          "ticket_pricing": "Free",
          "time_to_travel_from_jhari_waterfalls": "1 hour",
          "time_to_visit": "1-2 hours",
          "visit_time": "1:00 PM - 3:00 PM"
        },
        {
          "name": "Coffee Plantation Visit (e.g., Kelagur Tea & Coffee Estate)",
          "place_details": "Explore a local coffee plantation, learn about the coffee-making process, and enjoy a fresh cup of coffee.",
          "place_image_url": "https://example.com/coffee_plantation.jpg",
          "geo_coordinates": [
            13.3653,
            75.7666
          ],
          "ticket_pricing": "Varies, typically INR 100-300 per person",
          "time_to_travel_from_hirekolale_lake": "30 mins",
          "time_to_visit": "2-3 hours",
          "visit_time": "3:30 PM - 6:30 PM"
        }
      ]
    },
    "day_3": {
      "date": "2025-07-13",
      "theme": "Temples and Departure",
      "places": [
        {
          "name": "Belur Chennakesava Temple",
          "place_details": "A Hoysala-style temple known for its intricate carvings and architecture. A UNESCO World Heritage Site.",
          "place_image_url": "https://example.com/belur_temple.jpg",
          "geo_coordinates": [
            13.1619,
            75.8623
          ],
          "ticket_pricing": "Free (INR 25 for photography)",
          "time_to_travel_from_hostel": "1.5 hours",
          "time_to_visit": "2-3 hours",
          "visit_time": "9:00 AM - 12:00 PM"
        },
        {
          "name": "Halebidu Temple",
          "place_details": "Another Hoysala temple known for its detailed sculptures and architecture. Located near Belur.",
          "place_image_url": "https://example.com/halebidu_temple.jpg",
          "geo_coordinates": [
            13.2158,
            75.9956
          ],
          "ticket_pricing": "Free (INR 25 for photography)",
          "time_to_travel_from_belur": "30 mins",
          "time_to_visit": "1-2 hours",
          "visit_time": "12:30 PM - 2:30 PM"
        },
        {
          "name": "Departure from Chikkamagaluru",
          "place_details": "Travel to your next destination or back home.",
          "place_image_url": null,
          "geo_coordinates": null,
          "ticket_pricing": "Varies",
          "time_to_travel_from_halebidu": "Depends on your next destination",
          "time_to_visit": null,
          "visit_time": "3:00 PM onwards"
        }
      ]
    }
  }
}
`