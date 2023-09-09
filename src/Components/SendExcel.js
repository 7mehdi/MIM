import React, {useState} from 'react';
import NavBar from "./navBar";

function Excel (){
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
  
    const handlemail = async (event) => {
      event.preventDefault();
  
      try {
        const response = await fetch(`http://localhost:7000/api/excel/${email}`);
        const data = await response.json();
  
        if (response.ok) {
          setMessage(data.message);
        } else {
          setMessage('An error occurred.');
        }
      } catch (error) {
        setMessage('An error occurred.');
      }
    };
    return (
        <div>
             <NavBar/>
<h1>Email Excel Report</h1>
<form onSubmit={handlemail}>
  <label htmlFor="email">Enter Email:</label>
  <input
    type="email"
    id="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    required
  />
  <button type="submit">Send Email</button>
</form>
<div>{message}</div>
</div>
    )

}
export default Excel;