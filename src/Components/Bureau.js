import React,{useState} from "react";
import { Link } from "react-router-dom";

import "../style/App.css";
import Table from "./Table";

function Bureau() {
const[bur, setBur]=useState("");
const handleBurChange = (event) => {
    const inputBur = event.target.value;
     setBur(inputBur);
    
  };
  const [btnClicked, setBtnClicked] = useState(false);
  const [submittedCode, setSubmittedCode] = useState('');
  const handleBtnClick = () => {
    setSubmittedCode(bur);
    setBtnClicked(true);
  };
    return ( 
    
    <div className="Bureau">
<section className="ScanOffice">
  <label for='Bureau'><h4>Numero de bureau:</h4></label>
  <input name="Bureau" type="number" className="BureauInput" value={bur} onChange={handleBurChange} />
  <button className="Confirmbutton" onClick={handleBtnClick}>&#x2713;</button>
  <button className="Add-article"> <Link className="Add-article" to="/Dashboard">Ajouter un article</Link> </button>
</section>
<section className="afficherData">
{btnClicked && submittedCode &&<Table  Nbur={submittedCode}/>}
</section>
</div>
     );
}

export default Bureau;