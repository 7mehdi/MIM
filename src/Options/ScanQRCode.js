import React, { useState, useRef } from 'react';
import QrScanner from 'react-qr-scanner';
import FindArt from './findArticle';

function ScanQRCode({ Nbur, onData }) {
  const [scannedData, setScannedData] = useState('');
  const scannerRef = useRef(null);

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
      <QrScanner
        ref={scannerRef}
        onScan={(data) => handleScan(data?.text)}
        onError={handleError}
        style={{ width: '15rem', height: 'auto' }}
      />
      {scannedData && <p>Scanned Data: {scannedData}</p>}
      {scannedData && <FindArt onData={onData} scannedCode={scannedData} Nbur={Nbur} />}
    </div>
  );
}

export default ScanQRCode;
