import "./NewNavBar.css"
import logo from "../../assets/home/IMG_0734.PNG"
import { Link, NavLink } from "react-router-dom";
import {
  web3ConnectWallet,
} from ".././../../src/backend/web3api";
import metamask from "../../assets/home/icons8-metamask-logo-96.png";
import React, { useEffect, useState } from "react";






function NavBarNew() {




  const apiConnectWallet = async () => {
    let selectedAccount = await web3ConnectWallet();
    setIsConnected(Boolean(selectedAccount));

  };
  const [isConnected, setIsConnected] = useState(false)







  return (

    <div class="wrapper">
      <nav>
        <img className="logo" src={logo} ></img>

        <ul>
          <li>
            <NavLink className="nav-link" to="/" exact>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/my-portfolio" exact>
              My Portfolio
            </NavLink>

          </li>

          <li>
            <NavLink className="nav-link" to="/initial-offering">

              Initial Song Offering
            </NavLink>

          </li>



        </ul>

        <div className="btnwalletandtext">

          <button className="buttonWallet"
            onClick={() => apiConnectWallet()}>
            <img className="metamask" src={metamask}></img>
          </button>
          <span className="connection">
            {/* {isConnected ? (

              <span className="coneectIn">You are now connected</span>
            ) :
              (<span className="coneectOut">Connect to the wallet</span>)
            } */}

          </span>
        </div>




      </nav>
    </div>




  )


}

export default NavBarNew