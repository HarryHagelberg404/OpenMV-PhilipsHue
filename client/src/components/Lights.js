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
      </div>
    </div>
  );
}
