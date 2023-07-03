import React, { useState, useEffect } from 'react';
import axios from 'axios';

function GestionDeStock() {
  const [items, setItems] = useState([]);

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
      </tr>
    ));
  };

  return (
    <div>    <h2>Gestion de Stock</h2> 
        
    <div className='stock'>

      <table>
        
              <thead>
                <tr>
                  <th>Article</th>
                  <th>Quantite</th>
                  <th>                <span className='refresh-btn' onClick={handleRefresh}>&#8634;</span>
</th>

                </tr>
              </thead>
            

     <tbody>{renderItems()}</tbody>
      </table>
    </div>
        </div>
      );
}

export default GestionDeStock;
