import React, { useState } from "react";
import FindArt from "./findArticle";

function EnterCode({Nbur},{ onData }) {
  const [code, setCode] = useState('');
  const [btnClicked, setBtnClicked] = useState(false);
  const [submittedCode, setSubmittedCode] = useState('');


  const handleCodeChange = (event) => {
    const inputCode = event.target.value;
     setCode(inputCode);
    
  };

  const handleBtnClick = () => {
   

    setSubmittedCode(code);
    setBtnClicked(true);
  };

  return (
    <div>
      Saisissez le code de l'article:
      <input type="text" value={code} onChange={handleCodeChange} />
      <button onClick={handleBtnClick}>Confirmer</button>
      
      {btnClicked && <FindArt onData={onData} scannedCode={submittedCode} Nbur={Nbur}/>}
    </div>
  );
}

export default EnterCode;
