import React, { useState } from 'react';
import QrScanner from 'react-qr-scanner';
import FindArt from './findArticle';

function ScanQRCode({ Nbur, onData }) {
  const [scannedData, setScannedData] = useState('');

  const handleReset = () => {
    setScannedData('');
  };

  const handleScan = (data) => {
    if (data) {
      setScannedData(data);
    }
  };

  const handleError = (error) => {
    console.error(error);
  };

 

  return (
    <div>
      {!scannedData &&<QrScanner
        onScan={(data) => handleScan(data?.text)}
        onError={handleError}
        style={{ width: '15rem', height: 'auto' }}
      />}
      {scannedData &&<button onClick={handleReset}>Reset</button>}
      {scannedData && <p>Code : {scannedData}</p>}
      {scannedData && <FindArt onData={onData} scannedCode={scannedData} Nbur={Nbur} />}
    </div>
  );
}

export default ScanQRCode;
