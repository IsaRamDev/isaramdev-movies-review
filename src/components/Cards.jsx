import { useRef } from "react";
import { UilTimes } from '@iconscout/react-unicons'; 

// eslint-disable-next-line react/prop-types
function Cards({ id, title, poster_path, overview, ranking, isZoomed, onCardClick }) {
  const cardRef = useRef(null);

  const handleCardClick = () => {
    onCardClick(id);
    
    if (!isZoomed) {
      setTimeout(() => {
        cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  };

  return (
    <div ref={cardRef}
      className={`relative cursor-pointer ${isZoomed ? 'fixed inset-0 z-50 bg-black flex' : 'max-w-sm m-5 hover:rounded hover:scale-110'}`} 
      onClick={handleCardClick}
    >
      <img 
        src={poster_path} 
        alt={title} 
        className={`${isZoomed ? ' sm:w-2/5 w-1/2 md:my-20 xsm:my-10 my-0 xsm:p-10 p-5 object-contain' : 'hover:rounded hover:scale-110 md:w-72 sm:w-52 xsm:w-36 w-24 md:h-96 sm:h-72 xsm:h-44 h-32 block'}`} 
      />
      {isZoomed && (
        <div className="text-white xsm:my-20 my-10 self-center sm:w-1/2 w-3/5 overflow-auto">
          <UilTimes size={35} className=" cursor-pointer absolute lg:top-40 md:top-37 sm:top-10 top-0 right-5 sm:text-normal text-sm text-white" />
          <h3 className="sm:text-4xl xsm:text-2xl xxsm:text-xl text-sm mb-2 xsm:pb-5 pb-0 font-medium text-amber-200">{title}</h3>
          <p className="sm:text-xl sm:text-normal xxsm:text-sm text-xs xsm:pb-10 pb-2">Ranking: <span className="sm:text-2xl xxsm:text-xl text-sm font-medium text-red-600">{ranking}</span></p>
          <p className='sm:text-base xsm:text-sm text-xs'>{overview}</p>
        </div>
      )}
    </div>
  );
}

export default Cards;
