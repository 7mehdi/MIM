import React, { useEffect, useRef, useState } from 'react';
import FindArt from './findArticle';
import Quagga from 'quagga';

function ScanBarcode({Nbur},{ onData } ) {
  const [scannedBarcode, setScannedBarcode] = useState('');

  const videoRef = useRef("");

  useEffect(() => {
    Quagga.init(
      {
        inputStream: {
          name: 'Live',
          type: 'LiveStream',
          target: videoRef.current,
          constraints: {
            facingMode: 'environment', // or 'user' for front camera
          },
        },
        decoder: {
          readers: ['ean_reader'], // specify the barcode types to be detected
        },
      },
      (err) => {
        if (err) {
          console.error(err);
          return;
        }

        Quagga.start();
      }
    );

    Quagga.onDetected(handleScan);

    return () => {
      Quagga.offDetected(handleScan);
      Quagga.stop();
    };
  }, []);

  const handleScan = (result) => {
    setScannedBarcode(result.codeResult.code);
  };

  return (
    <div>
      <h1>Barcode Scanner</h1>
      <video ref={videoRef} style={{ width: '15rem', height: 'auto' }} />
      {scannedBarcode && <p>Scanned Barcode: {scannedBarcode}</p>}
      { scannedBarcode &&<FindArt Nbur={Nbur} scannedCode={scannedBarcode} />}
    </div>
  );
}

export default ScanBarcode;