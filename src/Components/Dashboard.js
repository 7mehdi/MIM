import React, { useState } from 'react';
import "../style/App.css";
import NavBar from './navBar';
import ScanQRCode from '../Options/ScanQRCode';
import ScanBarcode from '../Options/ScanBarcode';
import EnterCode from "../Options/EnterCode";
import Manual from '../Options/Manual';

function Dashboard() {
  const [selectedOption, setSelectedOption] = useState('');
  const [Nbur, setNbur] = useState('');
  const [btnClicked, setBtnClicked] = useState(false);
  const [submittedCode, setSubmittedCode] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleBurChange = (event) => {
    const inputBur = event.target.value;
    setNbur(inputBur);
  };

  const handleBtnClick = () => {
    setSubmittedCode(Nbur);
    setBtnClicked(true);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // Add any additional logic you need for form submission
  };
  return (
   <>
      <NavBar /> <div className="Dashboard">
      <h4 className="pageTitle">Ajouter un Article</h4>
      <div className='BureauIn'><label htmlFor="Bureau" className="label">Numero de bureau:</label>
      <input
        name="Bureau"
        type="number"
        className="BureauInput"
        value={Nbur}
        onChange={handleBurChange}
      />
      <button className="Confirmbutton" onClick={handleBtnClick}>
        &#x2713;
      </button></div>
      

      {submittedCode && btnClicked && (
        <div className="Dashboard">
          <form onSubmit={handleSubmit}>
            <select
              value={selectedOption}
              onChange={handleOptionChange}
              className="selectOption"
            >
              <option value="" disabled>
                Ajouter avec
              </option>
              <option value="qrCode">Code QR</option>
              <option value="barCode">CodeBar</option>
              <option value="characterCode">Code</option>
              <option value="manuel">Manuel</option>
            </select>

            {selectedOption === 'qrCode' && <ScanQRCode Nbur={Nbur} />}
            {selectedOption === 'barCode' && <ScanBarcode Nbur={Nbur} />}
            {selectedOption === 'characterCode' && <EnterCode Nbur={Nbur} />}
            {selectedOption === 'manuel' && <Manual Nbur={Nbur} />}
          </form>
        </div>
      )}
    </div></>
  );
}

export default Dashboard;
