import React, { useState, useEffect } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons'; // For brand icons
import { fas } from '@fortawesome/free-solid-svg-icons'; // For solid icons
import axios from 'axios';
import Item from './Item';

library.add(fab, fas);

function Table({ Nbur }) {
  const [Data, setData] = useState([]);
  const [editedDescription, setEditedDescription] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [itemId, setItemId] = useState('');

  const open = (articleId) => {
    setShowLogoutModal(true);
    setItemId(articleId);
  };

  const onClose = () => {
    setShowLogoutModal(false);
  };
  const fetchData = async () => {
    try {
      setIsRefreshing(true);
      const response = await axios.get(`http://localhost:8080/api/articles?Nbur=${Nbur}`);
      const data = response.data;
      setData(data);
      console.log(data);
      setIsRefreshing(false);
    } catch (error) {
      console.log('Error:', error);
      setIsRefreshing(false);
    }
  };

  const deleteItem = async (itemId) => {
    try {
      await axios.delete(`http://localhost:8080/api/articles/${itemId}`);
      // Refresh the data after successful deletion
      fetchData();
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const updateDescription = async (itemId, updatedDescription) => {
    try {
      await axios.put(`http://localhost:8080/api/articles/${itemId}`, { description: updatedDescription });
      // Refresh the data after successful update
      fetchData();
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const handleDescriptionChange = (event) => {
    setEditedDescription(event.target.value);
  };

  const handleDescriptionSubmit = (itemId) => {
    // Call the updateDescription function to update the description
    updateDescription(itemId, editedDescription);
    // Clear the editedDescription state
    setEditedDescription('');
  };

  const renderItems = () => {
    return (
      <>
        {Data.length > 0 ? (
          Data.map((article, index) => (
            <tr key={article.ArticleId[index]}>
              <td>{article.decodedArticle.Article} Nº{article.decodedArticle.articleNumber}</td>
              <td>
                <input
                  type="text"
                  value={editedDescription}
                  onChange={handleDescriptionChange}
                  placeholder={article.descr[index] }
                />

              </td>
              <td>         
                <button className='Save' onClick={() => handleDescriptionSubmit(article.ArticleId[index])}>Save</button>

                <span className='Details' onClick={() => open(article.ArticleId[index])}>&#9432;</span>
                <FontAwesomeIcon className="Delete" onClick={() => deleteItem(article.ArticleId[index])}  icon={['fas', 'trash-alt']} />
              </td>
            </tr>
          ))
        ) : (
          <p>Aucun article trouvé</p>
        )}
      </>
    );
  };

  useEffect(() => {
    fetchData();
  }, [Nbur]);

 


 

  return (
    <div className='Table'>
      <table>
        <thead>
          <tr>
            <th>Article</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className={`content ${isRefreshing ? '' : 'fade-in'}`}>{renderItems()}</tbody>
      </table>
      {showLogoutModal && <Item onClose={onClose} itemId={itemId} />}
    </div>
  );
}

export default Table;
