const API_KEY = '7b5f4fce466dd57829322bc6ba24bf29';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w1280';


const getMoviesData = (infoType, searchParams) => {
  const url = new URL (BASE_URL + '/' + infoType);
  url.search = new URLSearchParams({...searchParams, "api_key":API_KEY})

  return fetch(url)
  .then((res) => res.json())
};

const formatCurrentMovies = (data) => {
  let { results } = data;
  // Filtra primero los resultados donde 'poster_path' es null
  let filteredResults = results.filter(d => d.poster_path !== null);
  let info = filteredResults.map(d => {
    return {
      id: d.id, 
      original_title: d.original_title, 
      overview: d.overview, 
      vote_average: d.vote_average, 
      poster_path: IMAGE_URL + d.poster_path
    }
  });
  return { info };
}

const getFormattedMoviesData = async (searchParams) => {
  let formattedMovies;

  const isValidQuery = searchParams && searchParams.query && searchParams.query.trim() !== '';
  if (isValidQuery) {
    const searchResults = await getMoviesData('search/movie', { query: searchParams.query.trim() })
      .then(formatCurrentMovies);
    if (searchResults.info.length > 0) {
      formattedMovies = searchResults;
    } else {
      formattedMovies = await getMoviesData('discover/movie')
        .then(formatCurrentMovies);
    }
  } else {
    formattedMovies = await getMoviesData('discover/movie')
      .then(formatCurrentMovies);
  }

  return formattedMovies;
};


export default getFormattedMoviesData;