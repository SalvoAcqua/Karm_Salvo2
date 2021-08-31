import React from "react";

//import Footer from "./Footer/navbar";
import Footer from "./Footer/footer";
//import Navbar from "../Navbar/navbar";
import Navbar from "./Navbar/navbar";


function Layout (props) {
       return( 
         <div> 
            <Navbar/>
               {props.children} 
            <Footer/> 
         </div>
      ); 
}
export default Layout;