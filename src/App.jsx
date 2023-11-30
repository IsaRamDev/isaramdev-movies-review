import { useEffect, useState } from 'react';
import Cards from './components/Cards';
import getFormattedMoviesData from './services/MovieService';

function App() {
  const [info, setInfo] = useState([]);
  const [zoomedCardId, setZoomedCardId] = useState(null);

  useEffect(() => {
    const fetchMovie = async() => {
      const data = await getFormattedMoviesData();
      setInfo(data.info);
      console.log(data);
    };
    fetchMovie();
  }, []);
  
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
    <div className='flex flex-wrap bg-black'>
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
    </div>
  );
}

export default App;
