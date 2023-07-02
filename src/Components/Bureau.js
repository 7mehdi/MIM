import React,{useState} from "react";
import Dashboard from "./Dashboard";
import "../style/App.css";
import Table from "./Table";

function Bureau({refresh}) {
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
  <input type="number" className="BureauInput" value={bur} onChange={handleBurChange} />
  <button className="Confirmbutton" onClick={handleBtnClick}>&#x2713;</button>
</section>
<section className="afficherData">
{btnClicked && submittedCode &&<Table  Nbur={submittedCode}/>}
{btnClicked && submittedCode && <Dashboard  Nbur={submittedCode}/>}

</section>
</div>
     );
}

export default Bureau;