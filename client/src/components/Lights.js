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
<<<<<<< HEAD
    <div className="container">
      <div className="jumbotron">
        {/* <h1>All Lights</h1>
                <br>
                <% lights.forEach((light) => { %>
                    <div class="list-group-item">
                    <a href="/lights/<%= light.id %>" > Light <%= light.id %> </a>
                    <br>
                    Turned On: <%= light.on %>
                    </div>
                <% }) %> */}
=======
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
>>>>>>> eb19d745017596de175cc3f97f401a8eb38d9166
      </div>
    </div>
  );
}
