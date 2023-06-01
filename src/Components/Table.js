import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Table({ Nbur }) {
  const [Data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/articles?Nbur=${Nbur}`);
      const data = response.data;
      setData(data);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [Nbur]);

  const handleRefresh = () => {
    fetchData();
  };

  return (
    <div>
      <button onClick={handleRefresh}>Refresh</button>
      {Data.map((article) => (
        <p>{article.Article} Nº{article.articleNumber}</p>
      ))}
    </div>
  );
}

export default Table;
