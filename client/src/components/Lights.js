import { useEffect } from "react";
import axios from "axios";

export default function Lights() {
  useEffect(() => {
    axios.get("http://localhost:4000/api/allligths").then((response) => {
      console.log(response.data);
    });
  }, []);

  return (
    <div class="container">
      <div class="jumbotron">
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
