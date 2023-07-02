import React from "react";

import NavBar from "./Components/navBar";
import Bureau from "./Components/Bureau";
import "./style/Home.css";
import GestionDeStock from "./Components/GestionStock";
import Graph from "./Components/Graph";

function Home() {
  
  return (
    <div >
     
      <NavBar/>
<div className="Main">
       <Graph/>
      <GestionDeStock/>
      <Bureau/>

</div>

    </div>
  );
}

export default Home;
