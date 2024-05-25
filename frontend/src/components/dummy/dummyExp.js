const dummyExp = {
  data: [
    {
      id: 10,
      title: "another test",
      description: "this is just a test",
      latitude: 29.7604267,
      longitude: -95.3698028,
      image_url: "",
      rating: 5,
      location: "Houston, TX, USA",
      keywords: ["music", "food"],
      user_id: 1,
      createdAt: "2024-05-16T02:33:21.000Z",
      updatedAt: "2024-05-16T02:33:21.000Z",
    },
    {
      id: 11,
      title: "new test experience",
      description: "a fun new experience",
      latitude: 45.515232,
      longitude: -122.6783853,
      image_url: "",
      rating: 5,
      location: "Portland, OR, USA",
      keywords: ["hiking", "pet-friendly"],
      user_id: 1,
      createdAt: "2024-05-16T02:33:58.000Z",
      updatedAt: "2024-05-16T02:33:58.000Z",
    },
    {
      id: 12,
      title: "new test experience",
      description: "a fun new experience",
      latitude: 45.515232,
      longitude: -122.6783853,
      image_url: "",
      rating: 5,
      location: "Portland, OR, USA",
      keywords: ["hiking", "pet-friendly"],
      user_id: 1,
      createdAt: "2024-05-16T02:35:08.000Z",
      updatedAt: "2024-05-16T02:35:08.000Z",
    },
    {
      id: 13,
      title: "just another test",
      description: "yet another test of the creation system",
      latitude: 39.7392358,
      longitude: -104.990251,
      image_url: "",
      rating: 5,
      location: "Denver, CO, USA",
      keywords: ["adventure", "romantic"],
      user_id: 1,
      createdAt: "2024-05-16T02:38:50.000Z",
      updatedAt: "2024-05-16T02:38:50.000Z",
    },
  ],
};

const dummyExp2 = [
  {
      "title": "Skydiving Adventure",
      "description": "Experience the thrill of skydiving with a tandem jump from 13,000 feet, including a 60-second freefall and stunning coastal views.",
      "rating": 4.8,
      "location": "San Diego, CA, USA",
      "keywords": ["adventure", "extreme sports", "outdoor"]
  },
  {
      "title": "Wine Tasting Tour",
      "description": "Explore the famous vineyards of Napa Valley with guided wine tastings, gourmet lunch, and a behind-the-scenes look at winemaking.",
      "rating": 4.9,
      "location": "Napa Valley, CA, USA",
      "keywords": ["food", "drink", "tour"]
  },
  {
      "title": "Hot Air Balloon Ride",
      "description": "Float above the scenic landscapes of New Mexico in a hot air balloon, followed by a traditional champagne toast upon landing.",
      "rating": 4.7,
      "location": "Albuquerque, NM, USA",
      "keywords": ["adventure", "scenic", "outdoor"]
  },
  {
      "title": "Cooking Class with a Master Chef",
      "description": "Learn to cook gourmet dishes with a renowned chef in a hands-on cooking class, including a meal with wine pairings.",
      "rating": 4.9,
      "location": "New York, NY, USA",
      "keywords": ["food", "learning", "interactive"]
  },
  {
      "title": "Scuba Diving Certification",
      "description": "Get certified to scuba dive with a comprehensive course that includes pool sessions, open water dives, and all necessary equipment.",
      "rating": 4.6,
      "location": "Key Largo, FL, USA",
      "keywords": ["adventure", "water sports", "certification"]
  },
  {
      "title": "Broadway Show and Backstage Tour",
      "description": "Enjoy a top Broadway show and go behind the scenes with a guided tour of the theater, meeting cast and crew.",
      "rating": 4.8,
      "location": "New York, NY, USA",
      "keywords": ["entertainment", "theater", "behind-the-scenes"]
  },
  {
      "title": "Historical Walking Tour",
      "description": "Discover Boston's rich history with a guided walking tour of historic sites, including the Freedom Trail and Boston Common.",
      "rating": 4.7,
      "location": "Boston, MA, USA",
      "keywords": ["culture", "history", "walking tour"]
  },
  {
      "title": "Photography Workshop",
      "description": "Enhance your photography skills with a workshop in the beautiful landscapes of Sedona, guided by a professional photographer.",
      "rating": 4.9,
      "location": "Sedona, AZ, USA",
      "keywords": ["learning", "photography", "scenic"]
  },
  {
      "title": "Private Yacht Charter",
      "description": "Sail the stunning waters of Miami on a private yacht, complete with a captain, gourmet lunch, and water sports activities.",
      "rating": 4.9,
      "location": "Miami, FL, USA",
      "keywords": ["luxury", "boating", "exclusive"]
  },
  {
      "title": "Mountain Biking Adventure",
      "description": "Experience the thrill of mountain biking on the famous trails of Moab, with a guided tour and all necessary gear provided.",
      "rating": 4.8,
      "location": "Moab, UT, USA",
      "keywords": ["adventure", "biking", "outdoor"]
  },
  {
    "title": "Safari Wildlife Tour",
    "description": "Embark on a safari adventure through a wildlife reserve, where you'll see lions, elephants, and other exotic animals in their natural habitat.",
    "rating": 4.9,
    "location": "Serengeti, Tanzania",
    "keywords": ["adventure", "wildlife", "nature"]
},
{
    "title": "Mediterranean Cooking Class",
    "description": "Learn to cook authentic Mediterranean dishes with a local chef, including fresh seafood, pastas, and traditional desserts.",
    "rating": 4.8,
    "location": "Santorini, Greece",
    "keywords": ["food", "cooking", "cultural"]
},
{
    "title": "Northern Lights Experience",
    "description": "Witness the breathtaking Northern Lights with a guided tour, complete with warm drinks and stories about the aurora borealis.",
    "rating": 5.0,
    "location": "Reykjavik, Iceland",
    "keywords": ["scenic", "nature", "unique"]
},
{
    "title": "Sailing and Snorkeling Tour",
    "description": "Enjoy a day of sailing and snorkeling in crystal clear waters, exploring vibrant coral reefs and marine life.",
    "rating": 4.7,
    "location": "Great Barrier Reef, Australia",
    "keywords": ["adventure", "water sports", "marine life"]
},
{
    "title": "Paris Art and History Tour",
    "description": "Discover the art and history of Paris with a guided tour of the Louvre, Notre-Dame, and other iconic landmarks.",
    "rating": 4.9,
    "location": "Paris, France",
    "keywords": ["culture", "art", "history"]
},
{
    "title": "Helicopter Tour Over Grand Canyon",
    "description": "Take a thrilling helicopter ride over the Grand Canyon, providing breathtaking views of one of the world's natural wonders.",
    "rating": 4.8,
    "location": "Grand Canyon, AZ, USA",
    "keywords": ["adventure", "scenic", "unique"]
},
{
    "title": "Chocolate Making Workshop",
    "description": "Learn the art of chocolate making with a hands-on workshop, crafting delicious treats from bean to bar.",
    "rating": 4.9,
    "location": "Brussels, Belgium",
    "keywords": ["food", "learning", "interactive"]
},
{
    "title": "Historical Train Journey",
    "description": "Travel back in time with a historical train journey through scenic landscapes, featuring vintage carriages and gourmet dining.",
    "rating": 4.8,
    "location": "Rocky Mountains, Canada",
    "keywords": ["adventure", "history", "scenic"]
},
{
    "title": "Zen Meditation Retreat",
    "description": "Find peace and tranquility with a zen meditation retreat, offering guided sessions, yoga, and nature walks.",
    "rating": 5.0,
    "location": "Kyoto, Japan",
    "keywords": ["wellness", "meditation", "nature"]
},
{
    "title": "Street Food and Night Market Tour",
    "description": "Explore the vibrant street food scene and night markets, tasting local delicacies and learning about the culture from a local guide.",
    "rating": 4.8,
    "location": "Bangkok, Thailand",
    "keywords": ["food", "culture", "tour"]
},
{
  "title": "Jazz Music Tour",
  "description": "Explore the vibrant jazz scene of New Orleans with a guided tour of iconic music venues, complete with live performances.",
  "rating": 4.9,
  "location": "New Orleans, LA, USA",
  "keywords": ["music", "cultural", "tour"]
},
{
  "title": "Alaskan Dog Sledding Adventure",
  "description": "Experience the thrill of dog sledding across the snowy landscapes of Alaska, led by experienced mushers.",
  "rating": 4.8,
  "location": "Anchorage, AK, USA",
  "keywords": ["adventure", "winter sports", "unique"]
},
{
  "title": "Niagara Falls Boat Tour",
  "description": "Get up close to the majestic Niagara Falls with a thrilling boat tour, feeling the mist and power of the waterfalls.",
  "rating": 4.7,
  "location": "Niagara Falls, NY, USA",
  "keywords": ["scenic", "adventure", "nature"]
},
{
  "title": "Hollywood Behind-the-Scenes Tour",
  "description": "Go behind the scenes of Hollywood with a guided tour of famous studios, iconic locations, and celebrity hotspots.",
  "rating": 4.8,
  "location": "Los Angeles, CA, USA",
  "keywords": ["entertainment", "tour", "cultural"]
},
{
  "title": "Mayan Ruins Exploration",
  "description": "Discover the ancient Mayan ruins with a guided tour of Chichen Itza, learning about the history and culture of this fascinating civilization.",
  "rating": 4.9,
  "location": "Yucatán, Mexico",
  "keywords": ["history", "cultural", "tour"]
},
{
  "title": "Broadway Musical Experience",
  "description": "Enjoy a top Broadway musical with premium seating and a backstage tour to meet the cast and crew.",
  "rating": 5.0,
  "location": "New York, NY, USA",
  "keywords": ["entertainment", "theater", "exclusive"]
},
{
  "title": "Kayaking in the Great Lakes",
  "description": "Embark on a kayaking adventure on the Great Lakes, exploring stunning shorelines and hidden coves.",
  "rating": 4.7,
  "location": "Great Lakes, MI, USA",
  "keywords": ["adventure", "water sports", "nature"]
},
{
  "title": "Wine Tasting in the Napa Valley",
  "description": "Savor the finest wines of Napa Valley with a guided wine tasting tour, visiting renowned wineries and enjoying gourmet pairings.",
  "rating": 4.9,
  "location": "Napa Valley, CA, USA",
  "keywords": ["food", "drink", "tour"]
},
{
  "title": "Hot Air Balloon Ride Over the Rockies",
  "description": "Take in breathtaking views of the Rocky Mountains with a serene hot air balloon ride at sunrise.",
  "rating": 4.8,
  "location": "Rocky Mountains, CO, USA",
  "keywords": ["scenic", "adventure", "unique"]
},
{
  "title": "Everglades Airboat Tour",
  "description": "Explore the unique ecosystem of the Everglades with an exhilarating airboat tour, spotting alligators and other wildlife.",
  "rating": 4.7,
  "location": "Everglades, FL, USA",
  "keywords": ["adventure", "nature", "wildlife"]
}
]






export default dummyExp;
