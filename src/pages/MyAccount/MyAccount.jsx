import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./MyAccount.scss";
import "../../css/fonts.css";
import axios from "axios";
import React, { useCallback } from "react";
import Footer from "../../components/Footer/Footer";
import Cookies from "js-cookie";
import { redirectIfNoToken } from "../../components/RedirectIfNoToken/RedirectIfNoToken";
import Loader from "../../components/loader/Loader";

//Fontawesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPen, faPlus } from "@fortawesome/free-solid-svg-icons";
library.add(faPen, faPlus);

//JSON Files
import cancerstepfile from "../../Json/cancerstep.json";

//regex to check the phone number format
function validatePhoneNumber(phoneNumber) {
  var regex =
    /^\(?([0-9]{2})\)?[-. ]?([0-9]{2})[-. ]?([0-9]{2})[-. ]?([0-9]{2})[-. ]?([0-9]{2})$/;
  if (regex.test(phoneNumber)) {
    return true;
  } else {
    return false;
  }
}

const MyAccount = ({ token, handleToken }) => {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [cancerstep, setCancerStep] = useState();
  const [username, setUserName] = useState();
  const [email, setEmail] = useState();
  const [phonenumber, setPhoneNumber] = useState();
  const [isUpdated, setIsUpdated] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [avatar, setAvatar] = useState();
  const [avatarChoice, setAvatarChoice] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/user`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(response.data);
        if (response.data.account.username && isUpdated === false) {
          setUserName(response.data.account.username);
        }
        if (response.data.email && isUpdated === false) {
          setEmail(response.data.email);
        }
        if (response.data.account.phonenumber && isUpdated === false) {
          setPhoneNumber(response.data.account.phonenumber);
        }
        if (response.data.account.cancerKind && isUpdated === false) {
          setCancerKind(response.data.account.cancerKind);
        }
        if (response.data.account.avatar && isUpdated === false) {
          setAvatar(response.data.account.avatar);
        }
        setIsUpdated(true);
        setIsLoading(false);
      } catch (error) {
        setError(error);
      }
    };
    redirectIfNoToken(token, navigate);
    fetchData();
  }, []);

  const handleSubmit = (event) => {
    setError("");
    setInfo("");
    const phoneIsValid = validatePhoneNumber(phonenumber);
    if (phoneIsValid === true) {
      try {
        const fetchUpdatedData = async () => {
          // Je crée une nouvelle instance du constructeur FormData
          const formData = new FormData();
          // Rajouter 2 paires clef/valeur à mon formdata
          formData.append("avatar", avatar);
          // Création des autres clef/valeur au formData;
          formData.append("email", email);
          formData.append("username", username);
          formData.append("cancerstep", cancerstep);
          formData.append("phonenumber", phonenumber);
          try {
            const response = await axios.post(
              `${import.meta.env.VITE_API_URL}/user/updateuserinfo/`,
              formData,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "multipart/form-data",
                },
              }
            );
            setData(response.data);
            setInfo("Données actualisées");
          } catch (error) {
            if (error.response.data.message === "Ce pseudo est déjà pris") {
              setError("Désolé, ce pseudo est déjà pris");
            }
            if (error.response.data.message === "Ce mail existe déjà") {
              setError("Désolé, ce mail existe déjà");
            }
          }
        };
        fetchUpdatedData();
      } catch (error) {}
    } else {
      setError("Merci de renseigner un numéro de téléphone au bon format");
    }
  };

  const handleLogout = () => {
    handleToken(null);
    navigate("/login");
  };
  return isLoading ? (
    <div>
      <Loader
        visible={true}
        height="80"
        width="80"
        color="#4c548c"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
      />
      <Footer selected=""></Footer>
    </div>
  ) : (
    <div className="containermyaccount">
      <div className="titlemyaccount">
        <h2> Mon Compte</h2>
      </div>
      <p className="coordclass"> Mes coordonnées : </p>
      <div className="pseudoclass">
        <p className="pseudotitle"> Mon pseudo :</p>

        <input
          className="inputaccountpseudo"
          value={username}
          type="text"
          set={username}
          name="inputpseudo"
          color="white"
          // Quand le contenu de mon input change, cette callback est appelée avec l'événement (un objet) en argument
          onChange={(event) => {
            setUserName(event.target.value);
          }}
        />
      </div>
      <div className="emailclass">
        <p className="emailtitle"> Mon email : </p>
        <input
          className="inputaccountemail"
          value={email}
          type="text"
          name="inputaccountemail"
          color="white"
          // Quand le contenu de mon input change, cette callback est appelée avec l'événement (un objet) en argument
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
      </div>
      <div className="phonenumberclass">
        <p className="phonenumbertitle"> Mon numéro de téléphone : </p>
        <input
          className="inputaccountphone"
          value={phonenumber}
          type="text"
          name="inputaccountphone"
          color="white"
          // Quand le contenu de mon input change, cette callback est appelée avec l'événement (un objet) en argument
          onChange={(event) => {
            setPhoneNumber(event.target.value);
          }}
        />
      </div>
      <div className="avatarclass">
        <p className="avatartitle"> Mon avatar :</p>
        {data.account.avatar && avatarChoice === false ? (
          <div className="avatarimgdiv">
            <img
              className="avatarimg"
              src={data.account.avatar.secure_url}
              alt="avatar"
            ></img>
            <label htmlFor="picture-input" style={{ color: "darkgreen" }}>
              <div className="changeavatar">
                <p>+ Modifier ma photo</p>
              </div>
            </label>

            <input
              style={{ display: "none" }}
              id="picture-input"
              type="file"
              onChange={(event) => {
                setAvatarChoice(true);
                setAvatar(event.target.files[0]);
              }}
            />
          </div>
        ) : (
          <div className="addavatardiv">
            {avatar !== undefined && (
              <div className="avatarimgdiv">
                <img
                  className="avatarimg"
                  src={URL.createObjectURL(avatar)}
                  alt="produit"
                />
                <label htmlFor="picture-input">
                  <div className="modifyavatar">
                    <p>+ Modifier ma photo</p>
                  </div>
                </label>
                <input
                  style={{ display: "none" }}
                  id="picture-input"
                  type="file"
                  onChange={(event) => {
                    setAvatar(event.target.files[0]);
                  }}
                />
              </div>
            )}
            {!avatar && (
              <div>
                <label htmlFor="picture-input">
                  <div className="addavatar">
                    <p>+ Ajoute une photo</p>
                  </div>
                </label>

                <input
                  style={{ display: "none" }}
                  id="picture-input"
                  type="file"
                  onChange={(event) => {
                    setAvatar(event.target.files[0]);
                  }}
                />
              </div>
            )}
          </div>
        )}
      </div>
      {data.account.accountype !== "Aidant" && (
        <div className="cancerstepclass">
          <p className="cancersteptitle"> Etape du cancer : </p>
          <select
            className="cancerstepselect"
            onChange={(e) => setCancerStep(e.target.value)}
          >
            {cancerstepfile.results.map((cancer, idx) => {
              return (
                <option value={cancer.cancerstep}>
                  <p className="cancersteptext">{cancer.cancerstep}</p>
                </option>
              );
            })}
          </select>
        </div>
      )}
      <div className="handlebutton">
        <div>
          <button className="buttonSave" onClick={() => handleSubmit()}>
            Enregistrer
          </button>
          <button className="buttonLogout" onClick={() => handleLogout()}>
            Déconnexion
          </button>
          <p className="errorclass"> {error}</p>
          <p className="infoclass"> {info}</p>
        </div>
      </div>
      <Footer selected="compte"></Footer>
    </div>
  );
};

export default MyAccount;
