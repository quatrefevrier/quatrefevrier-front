import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../App.scss";
import "./welcome.scss";
import logo from "../../assets/logo.svg";

import { Link } from "react-router-dom";

const Welcome = ({ token }) => {
  const navigate = useNavigate();
  const [swip, setSwip] = useState(false);
  const [launching, setLaunching] = useState(true);
  useEffect(() => {
    setTimeout(() => setLaunching(false), 2000);
  }, []);
  return launching ? (
    <main className="container startPage" style={{ justifyContent: "center" }}>
      <img src={logo} alt="logo" />
    </main>
  ) : token ? (
    navigate("/reception")
  ) : !swip ? (
    <main className="container startPage">
      <div className="top">
        <span style={{ backgroundColor: "#ef787c" }}></span>
        <span></span>
      </div>
      <div>
        <h1>Bienvenue sur Quatre Février</h1>
        <p>
          L'application sécurisée dédiée aux patient.e.s atteint.e.s de cancer
          et à leurs proches aidant.e.s.
        </p>
      </div>
      <div className="bottom">
        <p>Continuons ensemble:</p>
        {/* <button onClick={() => setType("patient")}>
          Je suis un.e patient.e
        </button> */}
        <button onClick={() => setSwip(true)}>Suivant</button>
      </div>
    </main>
  ) : (
    <main className="container startPage">
      <div className="top">
        <span></span>
        <span style={{ backgroundColor: "#ef787c" }}></span>
      </div>
      <div>
        <h1>Protégeons vos informations</h1>
        <p>
          Rejoignez Quatre février et échangez avec des personnes qui vous
          comprennent réellement.
        </p>
      </div>
      <div className="bottom">
        <Link to="/signup">Créer un compte</Link>
        <Link to="/login">J'ai déjà un compte</Link>
      </div>
    </main>
  );
};
export default Welcome;
