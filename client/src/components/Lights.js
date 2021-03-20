import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Lights() {
  const [lights, setLights] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/api/allligths").then((response) => {
      console.log(response.data);
      setLights(response.data);
    });
  }, []);
  return (
    <div class="container">
      <div class="jumbotron">
        {lights.map((data) => (
          <div>
            <Link to={`/lights/${data.id}`}>
              <h1>Lamp {data.id}</h1>
            </Link>
            <p>Status On/Off: {String(data.on) === "true" ? "On" : "Off"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
