import { useEffect, useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { Room, Star } from "@material-ui/icons";
import axios from "axios";
import "./app.css";
function App() {
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 46,
    longitude: 17,
    zoom: 4,
  });
  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get("/pins");
        setPins(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getPins();
  }, []);
  const handleMarkerClick = (id) => {
    setCurrentPlaceId(id);
  };
  const [showPopup, setShowPopup] = useState(true);
  return (
    <div className="App">
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken="pk.eyJ1Ijoic291cmFiaHBhdG9sZSIsImEiOiJjbDBpMXU5bzgwMDR1M2ptcGh3N2M0YTdhIn0.eZSHAJwxfcQBoroRBTbqsw"
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapStyle="mapbox://styles/sourabhpatole/cl0iddh2h000m14ru0c8zxgmi"
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
                  color: "slateblue",
                  cursor: "pointer",
                }}
                onClick={() => handleMarkerClick(p._id)}
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
                    <Star className="star" />
                    <Star className="star" />
                    <Star className="star" />
                    <Star className="star" />
                    <Star className="star" />
                  </div>
                  <label>Information</label>
                  <span className="username">
                    Created by <b>{p.username}</b>
                  </span>
                  <span className="date">1 hour ago</span>
                </div>
              </Popup>
            )}
          </>
        ))}
      </ReactMapGL>
    </div>
  );
}

export default App;
