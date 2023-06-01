import React, { useState} from 'react';
import "../style/Fom.css"
function Manual({ onFormSubmit }) {
  const [floor, setFloor] = useState('');
  const [office, setOffice] = useState('');
  const [articleNumber, setArticleNumber] = useState('');
  const [category, setCategory] = useState('');
const [btn,setBtn]= useState(false)
  
  const handleFloorChange = (event) => {
    setFloor(event.target.value);
  };

  const handleOfficeChange = (event) => {
    setOffice(event.target.value);
  };

  const handleArticleNumberChange = (event) => {
    setArticleNumber(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handlebtnChange =()=>{
    setBtn(true);
  };


  function generateCode() {

    return `${floor.toString().padStart(3, '0')}-${office.toString().padStart(3, '0')}-${category}-${articleNumber.toString().padStart(3, '0')}`;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const itemDetails = {
      floor,
      office,
      articleNumber,
      category,
    };
    onFormSubmit(itemDetails);
  };


  return (
    <div className='formulaire'>
       
 
      
      <h2>Formulaire de l'article</h2>
      <form onSubmit={handleSubmit}>
        <div>
        <label>
          Étage:
          <input type="number" value={floor} onChange={handleFloorChange} />
        </label>
        </div>
        <div>
        <label>
          Bureau:
          <input type="text" value={office} onChange={handleOfficeChange} />
        </label> </div>  
        <div>  <label>
          Catégorie:
          <select value={category} onChange={handleCategoryChange}>
            <option value="">Sélectionnez une catégorie</option>
            <option value="201">Ordinateur</option>
            <option value="101">Bureau</option>
            <option value="102">Chaise</option>
            <option value="202">Imprimante</option>
            <option value="103">Tableau blanc</option>
            <option value="104">Armoire</option>
            <option value="203">Écran</option>
            <option value="204">Ordinateur portable</option>
            <option value="205">Téléphone</option>
          </select>
        </label></div>
        <div> <label>
          Numéro de l'article:
          <input type="number" value={articleNumber} onChange={handleArticleNumberChange} />
        </label>

        </div>
        <button type="submit" onClick={handlebtnChange}>Générer le code</button>
      </form>


      {floor && office && articleNumber && category && btn &&(
        <div>
          <h3>Code d'article:</h3>
          <p>{generateCode()}</p>
        </div>
      )}
       
    </div>
  );
}

export default Manual;
