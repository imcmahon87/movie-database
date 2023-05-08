import React, {useState, useEffect} from 'react';
import Axios from 'axios';

function App() {
  const [movieData, setMovieData] = useState([]);;

  useEffect(() => {
    Axios.get('http://localhost:3002/getMovies').then((data) => {
      setMovieData(data.data);
    });
  }, []);

  return (
    <div>
      <div>
        {movieData.map((val, key) => {
          return (
            <div key={key}>
              <p>{val.Title}, {val.Genre}, {val.Description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;