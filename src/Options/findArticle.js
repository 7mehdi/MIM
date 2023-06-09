import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FindArt({ scannedCode, Nbur }) {
  const [article, setArticle] = useState('');
  const [artNum, setArtNum] = useState('');
  const [error, setError] = useState('');
  const [invalidCode, setInvalidCode] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [description, setDescription] = useState('');


  useEffect(() => {
    decodeArticleCode(scannedCode);
    setConfirmed(false);
  }, [scannedCode]);
  

  function decodeArticleCode(scannedCode) {
    if (typeof scannedCode === 'string') {
      const [Article, articleNumber] = scannedCode.split('-');
      const decodedArticle = {
        Article: parseInt(Article),
        articleNumber: parseInt(articleNumber),
      };

      const hasLetters = /[a-zA-Z]/.test(scannedCode); // Check if the code contains letters
      setInvalidCode(hasLetters);

      if (invalidCode) {
        setError('Code invalid');
      } else if (!officeItems[Article]) {
        setError('Article non trouvé');
      } else {
        setArticle(decodedArticle.Article);
        setArtNum(articleNumber);
        setError('');
      }
    } else {
      setError('Code invalide');
    }
  }

  function handleConfirmation() {
    const confirmationData = {
      scannedCode,
      Nbur: parseInt(Nbur),
      description: description,
    };

    axios
      .post('http://localhost:8000/api/confirm', confirmationData,{
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        const { success, message } = response.data;
        if (success) {
          setConfirmed(true);
        } else {
          setError(message);
        }
      })
      .catch((error) => {
        setError('An error occurred during confirmation');
      });
  }

  const officeItems = {
    201: 'Ordinateur', // Computer
    101: 'Bureau', // Desk
    102: 'Chaise', // Chair
    202: 'Imprimante', // Printer
    103: 'Tableau blanc', // Whiteboard
    104: 'Armoire', // Cabinet
    203: 'Écran', // Monitor
    204: 'Ordinateur portable', // Laptop
    205: 'Téléphone', // Phone
  };

  return (
    <div className='FindArt'>
      
      {error ? (
        <p>{error}</p>
      ) : (

        <>
          <p>Article: {officeItems[article]}</p>
          <p>Numero d'article: {artNum}</p>
          <p>Bureau: {Nbur}</p>
          {!confirmed ? (<div className='Descrip'>
            <textarea
            className="descriptionInput"
            placeholder="Description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
            <button onClick={handleConfirmation}>Ajouter</button>
          </div>) : (
            <p>
              {officeItems[article]} nº{artNum} ajouté
            </p>
          )}
        </>
      )}
    </div>
  );
}

export default FindArt;
