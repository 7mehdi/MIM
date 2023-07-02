import React, { useState, useEffect } from 'react';
import Bureau from './Bureau'
import axios from 'axios';

function GestionDeStock() {
  const [items, setItems] = useState([]);
  const [refresh, setRefresh] = useState('');

  // Fetch stock items from the server
  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:7000/api/stock');
      const itemsData = response.data;
      setItems(itemsData);
    } catch (error) {
      console.error('Error fetching stock items:', error);
    }
  };
  const handleRefresh = () => {
    fetchItems();
    setRefresh('refresh')
  };


  useEffect(() => {
    fetchItems();
  }, []);

  // Render the stock items
  const renderItems = () => {
    return items.map((item) => (
      <tr key={item.id}>
        <td> {item.item_category}</td>
        <td> {item.real_count}</td>
        <td>{item.theoretical_count}</td>
      </tr>
    ));
  };

  return (
    <div>    <h2>Gestion de Stock</h2> 
        
    <div className='stock'>
      <button onClick={handleRefresh}>&#8634;</button>

      <table>
        
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Quantite</th>
                  <th>theory</th>
                </tr>
              </thead>
            

     <tbody>{renderItems()}</tbody>
      </table>
    </div>
        </div>
      );
}

export default GestionDeStock;
