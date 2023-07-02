import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Item from './Item';

function Table({ Nbur }) {
  const [Data, setData] = useState([]);
  const [editedDescription, setEditedDescription] = useState('');

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/articles?Nbur=${Nbur}`);
      const data = response.data;
      setData(data);
      console.log(data);
    } catch (error) {
      console.log('Error:', error);
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
                  placeholder={article.descr[index]}
                />
              </td>
              <td>
                <button onClick={() => handleDescriptionSubmit(article.ArticleId[index])}>Save</button>
                <button  onClick={() => open(article.ArticleId[index])}>Details</button>
                <button onClick={() => deleteItem(article.ArticleId[index])}>Delete</button>
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

  const handleRefresh = () => {
    fetchData();
  };

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [itemId, setitemId]=useState('')


  const open = (articleId) => {
    setShowLogoutModal(true);
    setitemId(articleId)
  };

  const onClose = () => {
    setShowLogoutModal(false);
  };

  return (
    <div>
      <button onClick={handleRefresh}>&#8634;</button>
      <table>
        <thead>
          <tr>
            <th>Article</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{renderItems()}</tbody>
      </table>
      {showLogoutModal && <Item onClose={onClose} itemId ={itemId}/>}

    </div>
  );
}

export default Table;
