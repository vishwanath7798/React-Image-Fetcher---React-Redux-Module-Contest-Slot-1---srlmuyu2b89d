import React, { useState, useEffect } from 'react';
import '../styles/App.css';
import { Loader } from './Loader';
import { PhotoFrame } from './PhotoFrame';

const App = () => {
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const [photoData, setPhotoData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        setLoading(true);
        try {
          const response = await fetch(`https://jsonplaceholder.typicode.com/photos/${id}`);
          const data = await response.json();
          setPhotoData(data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      } else {
        setPhotoData(null);
      }
    };

    fetchData();
  }, [id]);

  const handleInputChange = (event) => {
    setId(event.target.value);
  };

  return (
    <div className="app">
      <input type="number" value={id} onChange={handleInputChange} placeholder="Enter a number" />
      {loading ? <Loader /> : photoData && <PhotoFrame url={photoData.url} title={photoData.title} />}
    </div>
  );
};

export default App;
