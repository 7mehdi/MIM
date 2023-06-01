import React ,{ useState }from 'react';
import "../style/App.css";

import ScanQRCode from '../Options/ScanQRCode';
import ScanBarcode from '../Options/ScanBarcode';

import EnterCode from "../Options/EnterCode"

function Dashboard({Nbur},{ onData }) { 
    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionChange = (event) => {
      setSelectedOption(event.target.value);
    };
    

    return (
      <div className='Dashboard'>
       
      <main>
      <h4>Inventorier un Article</h4>
      <select value={selectedOption} onChange={handleOptionChange} >
      <option value="" disabled>Ajouter avec</option>
        <option value="qrCode">Code QR</option>
        <option value="barCode">CodeBar</option>
        <option value="characterCode">Code</option>


      </select>

     {selectedOption === 'qrCode' && <ScanQRCode onData={onData} Nbur={Nbur}/>}
      {selectedOption === 'barCode' &&<ScanBarcode onData={onData} Nbur={Nbur}/>}
      {selectedOption === 'characterCode' &&<EnterCode onData={onData} Nbur={Nbur}/>}
</main>
        
      </div>
    );
  }

export default Dashboard;
