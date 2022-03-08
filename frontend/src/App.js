import { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { Room, Star } from "@material-ui/icons";
import "./app.css";
function App() {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 46,
    longitude: 17,
    zoom: 4,
  });
  const [showPopup, setShowPopup] = useState(true);
  return (
    <div className="App">
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken="pk.eyJ1Ijoic291cmFiaHBhdG9sZSIsImEiOiJjbDBpMXU5bzgwMDR1M2ptcGh3N2M0YTdhIn0.eZSHAJwxfcQBoroRBTbqsw"
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapStyle="mapbox://styles/sourabhpatole/cl0iddh2h000m14ru0c8zxgmi"
      >
        <Marker
          longitude={2.294694}
          latitude={48.858093}
          anchor="bottom"
          onClick={() => setShowPopup(true)}
        >
          <Room style={{ fontSize: viewport.zoom * 8, color: "slateblue" }} />
        </Marker>
        {showPopup && (
          <Popup
            longitude={2.294694}
            latitude={48.858093}
            anchor="bottom"
            onClose={() => setShowPopup(false)}
          >
            <div className="card">
              <label>Place</label>
              <h4 className="place">Eiffel Tower</h4>
              <label>Review</label>
              <p className="desc">Beautiful place..I like it</p>
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
                Created by <b>Sourabh</b>
              </span>
              <span className="date">1 hour ago</span>
            </div>
          </Popup>
        )}
      </ReactMapGL>
    </div>
  );
}

export default App;
