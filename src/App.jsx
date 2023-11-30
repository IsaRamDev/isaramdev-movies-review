import { useEffect, useState } from 'react';
import Cards from './components/Cards';
import Inputs from './components/Inputs';
import getFormattedMoviesData from './services/MovieService';
import Footer from './components/Footer';

function App() {
  const [info, setInfo] = useState([]);
  const [query, setQuery] = useState({query: ''});
  const [zoomedCardId, setZoomedCardId] = useState(null);

  useEffect(() => {
    const fetchMovie = async() => {
      const data = await getFormattedMoviesData({...query});
      setInfo(data.info);
      console.log(data);
    };
    fetchMovie();
  }, [query]);
  
  const handleCardClick = (id) => {
    if (zoomedCardId === id) {
      setZoomedCardId(null);
    } else {
      setZoomedCardId(id);
    }
  };

  if (info.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className=' justify-center flex flex-wrap bg-black'>
      <Inputs setQuery={setQuery} />
      {info.map((movie) => (
        <Cards 
          key={movie.id} 
          id={movie.id}
          title={movie.original_title} 
          poster_path={movie.poster_path} 
          isZoomed={zoomedCardId === movie.id} 
          onCardClick={handleCardClick}
          overview={movie.overview}
          ranking={movie.vote_average}
        />
      ))}
      <Footer/>
    </div>
  );
}

export default App;
