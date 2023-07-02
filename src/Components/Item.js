import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QRCode from 'qrcode.react';

function Item({ itemId,onClose}) {
  const [Data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, [itemId]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/articles/${itemId}`);
      const data = response.data;
      setData(data);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Use the appropriate options for formatting
  };

  return (
    <div className='ArtContainer'>
      <div className='ArtCard'>
        {Data ? (
          <>
            <h4>Article:</h4>
            <p>{Data.Article} N{Data.articleNumber}</p>
            <h4>Description:</h4>
            <p>{Data.description}</p>
            <h4>Bureau:</h4>
            <p>{Data.bureau}</p>
            <h4>Date d'ajout:</h4>
            <p>{formatDate(Data.confirmed_at)}</p>
            <h4>Ajouté par:</h4>
            <p>{Data.user_name}</p>
            <h4>Code:</h4>
            <p>{Data.code_barre}</p>
            <h4>Code Qr:</h4>
            <QRCode value={Data.code_barre} />
          </>
        ) : (
          <p>Loading...</p>
        )}
        <div className='closeButton' onClick={onClose}>
          X
        </div>
      </div>
    </div>
  );
}

export default Item;
