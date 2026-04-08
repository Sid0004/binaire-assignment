import axios from 'axios';

// Mock Data Generator for 10,000 items fallback (Offline Mode)
const generateMockShows = () => {
  const shows = [];
  const categories = ['Action', 'Drama', 'Comedy', 'Sci-Fi', 'Documentary', 'Thriller'];
  
  for (let i = 1; i <= 10000; i++) {
    const category = categories[i % categories.length];
    const year = 1990 + (i % 35);
    
    shows.push({
      id: `mockt${i}`,
      name: `Binaire Original ${i}`,
      type: i % 3 === 0 ? 'Movie' : 'TV Show',
      genres: [category],
      premiered: `${year}-01-01`,
      rating: { average: parseFloat((Math.random() * 5 + 5).toFixed(1)) },
      image: {
        medium: `https://picsum.photos/seed/show${i}/210/295`,
        original: `https://picsum.photos/seed/show${i}/1920/1080`
      },
      summary: `<p>This is a compelling summary for Binaire ${i}.</p>`
    });
  }
  return shows;
};

const MOCK_DB = generateMockShows();
const ITEMS_PER_PAGE = 50;

let nextTitlePageToken = null;

// Normalizer to convert IMDbAPI title format to our standard format
const normalizeImdbTitle = (t) => {
  return {
    id: t.id || t.titleId || Math.random().toString(),
    name: t.title || t.primaryTitle || t.originalTitle || "Unknown Title",
    type: t.titleType || "Movie",
    genres: t.genres || [],
    premiered: t.startYear ? `${t.startYear}-01-01` : "2024-01-01",
    rating: { average: t.averageRating || 8.0 },
    image: {
      medium: t.primaryImage?.url || 'https://via.placeholder.com/210x295?text=No+Image',
      original: t.primaryImage?.url || 'https://via.placeholder.com/1920x1080?text=No+Image'
    },
    summary: t.plot || t.primaryTitle || "No description available."
  };
};

export const fetchShows = async (page = 0) => {
  try {
    if (!navigator.onLine) throw new Error("Offline");

    // Fetch from real IMDbAPI
    const url = nextTitlePageToken && page > 0
      ? `https://api.imdbapi.dev/titles?pageToken=${nextTitlePageToken}`
      : `https://api.imdbapi.dev/titles`;
      
    const response = await axios.get(url, { timeout: 3000 });
    
    if (response.data && response.data.titles) {
      if (response.data.nextPageToken) {
        nextTitlePageToken = response.data.nextPageToken;
      }
      return response.data.titles.map(normalizeImdbTitle);
    }
    
    // If we reach here, data format might have changed, fallback
    throw new Error("Invalid response format");
  } catch (error) {
    console.warn("IMDb API fetch failed, falling back to offline mock database.");
    // Offline / Error fallback
    const startIndex = page * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    if (startIndex >= MOCK_DB.length) return [];
    return MOCK_DB.slice(startIndex, endIndex);
  }
};

export const searchShowsByQuery = async (query) => {
  try {
    if (!query) return [];
    
    if (!navigator.onLine) throw new Error("Offline");
    
    const response = await axios.get(`https://api.imdbapi.dev/search/titles?query=${encodeURIComponent(query)}&limit=20`, { timeout: 3000 });
    
    if (response.data && response.data.titles) {
      return response.data.titles.map(normalizeImdbTitle);
    }
    
    throw new Error("Invalid format");
  } catch (error) {
    console.warn("IMDb API search failed, falling back to offline mock database.");
    const lowerQuery = query.toLowerCase();
    return MOCK_DB.filter(show => 
      show.name.toLowerCase().includes(lowerQuery) || 
      show.id.toLowerCase().includes(lowerQuery)
    ).slice(0, 20);
  }
};
