import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/historique.css'
import NavBar from "./navBar";
import Item from './Item';

function Historique() {
  const [data, setData] = useState([]);
  const [timeFilter, setTimeFilter] = useState('');
  const [itemId, setitemId]=useState('')

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/historique", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      const responseData = response.data;

      setData(responseData.results);
      console.log("this is data ", response.data);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Use the appropriate options for formatting
  };

  const handleTimeFilterChange = (event) => {
    setTimeFilter(event.target.value);
  };
  
  const filterResults = (article) => {
    if (timeFilter === '') {
      return true; // No time filter applied, return all results
    }
  
    const currentDate = new Date();
    const articleDate = new Date(article.confirmed_at);
  
    // Calculate the start date based on the selected time filter option
    let startDate;
    if (timeFilter === 'lastWeek') {
      startDate = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
    } else if (timeFilter === 'lastMonth') {
      startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate());
    } else if (timeFilter === 'last6Months') {
      startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 6, currentDate.getDate());
    }
  
    if (startDate) {
      // Filter the articles based on the start date
      return articleDate >= startDate && articleDate <= currentDate;
    }
  
    return true; // If no valid time filter option is selected, return all results
  };
  
  

  const filteredData = data.filter(filterResults);
  const [showLogoutModal, setShowLogoutModal] = useState(false);


  const open = (articleId) => {
    setShowLogoutModal(true);
    setitemId(articleId)
  };

  const onClose = () => {
    setShowLogoutModal(false);
  };


  return (
    <>
      <NavBar />
      <div className="historique">
        <h1>Historique</h1>
        <div>
        <select id="timeFilter" value={timeFilter} onChange={handleTimeFilterChange}>
  <option value="">All Time</option>
  <option value="lastWeek">Last Week</option>
  <option value="lastMonth">Last Month</option>
  <option value="last6Months">Last 6 Months</option>
</select>   </div>

        <div className="hisContainer">
          {console.log(filteredData)}
          {filteredData.map((article, index) => {
            const correspondingArticle = data[index];

            if (correspondingArticle === undefined) {
              return null; // Skip rendering if corresponding article is undefined
            }

            return (

            <div className="hisCard"  onClick={() => open(article.id)} key={index}>
<p>Code: {article.code_barre}</p> <p>Description: {article.description}</p>
                <p>Registered on: {formatDate(article.confirmed_at)}</p>
              </div>
            );
          })}
        </div>
        {showLogoutModal && <Item onClose={onClose} itemId ={itemId}/>}
      </div>
    </>
  );
}

export default Historique;
