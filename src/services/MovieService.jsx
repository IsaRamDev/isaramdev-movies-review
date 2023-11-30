const API_KEY = '7b5f4fce466dd57829322bc6ba24bf29';
const BASE_URL = 'https://api.themoviedb.org/3/discover';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w1280';


const getMoviesData = (infoType, searchParams) => {
  const url = new URL (BASE_URL + '/' + infoType);
  url.search = new URLSearchParams({...searchParams, "api_key":API_KEY})

  return fetch(url)
  .then((res) => res.json())
};

const formatCurrentMovies = (data) => {
  let {results} = data;
  let info = results.map(d => {
    return {
      id: d.id, 
      original_title: d.original_title, 
      overview: d.overview, 
      vote_average: d.vote_average, 
      poster_path: IMAGE_URL + d.poster_path
    }
    
  })
    return {info}
}

const getFormattedMoviesData = async () => {
  const formattedCurrentMovies = await getMoviesData ('movie')
  .then(formatCurrentMovies)

  return {...formattedCurrentMovies}
};

export default getFormattedMoviesData;