import React,{useState} from "react";
import Dashboard from "./Dashboard";
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
  <h4>Bureau:</h4>
  <input type="number" value={bur} onChange={handleBurChange} />
  <button onClick={handleBtnClick}>Confirmer</button>
</section>
{btnClicked && submittedCode && <Dashboard  Nbur={submittedCode}/>}
{btnClicked && submittedCode &&<Table Nbur={submittedCode}/>}
</div>
     );
}

export default Bureau;