import { useEffect, useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { Room, Star } from "@material-ui/icons";
import axios from "axios";
import "./app.css";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import { axiosInstance } from "./config";
const path = require("path");
function App() {
  const myStorage = window.localStorage;
  // const [currentUser, setCurrentUser] = useState(null);
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [rating, setRating] = useState(0);
  const [newPlace, setNewPlace] = useState(null);
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 46,
    longitude: 17,
    zoom: 4,
  });
  const [currentUsername, setCurrentUsername] = useState(
    myStorage.getItem("user")
  );
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axiosInstance.get("/pins");
        setPins(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getPins();
  }, []);
  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id);
    setViewport({ ...viewport, latitude: lat, longitude: long });
  };
  const handleAddClick = (e) => {
    const [long, lat] = e.lngLat;
    setNewPlace({
      lat,
      long,
    });
  };
  const handleLogout = () => {
    setCurrentUsername(null);
    myStorage.removeItem("user");
  };
  const [showPopup, setShowPopup] = useState(true);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      username: currentUsername,
      title,
      desc,
      rating,
      lat: newPlace.lat,
      long: newPlace.long,
    };
    try {
      const res = await axiosInstance.post("/pins", newPin);
      setPins([...pins, res.data]);
      setShowPopup(null);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="App">
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken="pk.eyJ1Ijoic291cmFiaHBhdG9sZSIsImEiOiJjbDBpMXU5bzgwMDR1M2ptcGh3N2M0YTdhIn0.eZSHAJwxfcQBoroRBTbqsw"
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapStyle="mapbox://styles/sourabhpatole/cl0iddh2h000m14ru0c8zxgmi"
        onDblClick={handleAddClick}
        transitionDuration="100"
      >
        {pins.map((p) => (
          <>
            <Marker
              latitude={p.lat}
              longitude={p.long}
              anchor="bottom"
              onClick={() => setShowPopup(true)}
            >
              <Room
                style={{
                  fontSize: viewport.zoom * 10,
                  cursor: "pointer",
                  color:
                    p.username === currentUsername ? "tomato" : "slateblue",
                }}
                onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
              />
            </Marker>

            {p._id === currentPlaceId && showPopup && (
              <Popup
                latitude={p.lat}
                longitude={p.long}
                anchor="bottom"
                onClose={() => setShowPopup(false)}
              >
                <div className="card">
                  <label>Place</label>
                  <h4 className="place">{p.title}</h4>
                  <label>Review</label>
                  <p className="desc">{p.desc}</p>
                  <label>Rating</label>
                  <div className="stars">
                    {Array(p.rating).fill(<Star className="star" />)}
                  </div>
                  <label>Information</label>
                  <span className="username">
                    Created by <b>{p.username}</b>
                  </span>
                  <span className="date">{p.createdAt}</span>
                </div>
              </Popup>
            )}
          </>
        ))}
        {newPlace && (
          <Popup
            latitude={newPlace.lat}
            longitude={newPlace.long}
            anchor="bottom"
            onClose={() => setShowPopup(false)}
          >
            <div>
              <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input
                  type="text"
                  placeholder="Enter a Title"
                  onChange={(e) => setTitle(e.target.value)}
                />
                <label>Review</label>
                <textarea
                  placeholder="Say us something about this place"
                  onChange={(e) => setDesc(e.target.value)}
                />
                <label>Rating</label>
                <select onChange={(e) => setRating(e.target.value)}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <button className="submitButton" type="submit">
                  Add Pin
                </button>
              </form>
            </div>
          </Popup>
        )}
        {currentUsername ? (
          <button className="button logout" onClick={handleLogout}>
            Log out
          </button>
        ) : (
          <div className="buttons">
            <button className="button login" onClick={() => setShowLogin(true)}>
              Log in
            </button>
            <button
              className="button register"
              onClick={() => setShowRegister(true)}
            >
              Register
            </button>
          </div>
        )}
        {showRegister && <Register setShowRegister={setShowRegister} />}
        {showLogin && (
          <Login
            setShowLogin={setShowLogin}
            setCurrentUsername={setCurrentUsername}
            myStorage={myStorage}
          />
        )}
        {/* <Register /> */}
      </ReactMapGL>
    </div>
  );
}

export default App;
