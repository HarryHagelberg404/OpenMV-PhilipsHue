import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import queryString from "query-string";

export default function Light() {
  const [lampLight, setLampLight] = useState(true);
  const [rangeval, setRangeval] = useState(null);
  const id = window.location.href;

  const changeColor = (e) => {
    e.preventDefault();
    console.log(rangeval);
    const body = {
      on: lampLight,
      bri: Number(rangeval),
    };
    axios.post(`http://localhost:4000/api/lights/${id.substr(-1)}`, {
      data: body,
    });
    console.log("hej");
  };
  return (
    <div class="container">
      <div class="jumbo1">
        <h1 id="lightid"> Light {id.substr(-1)} </h1>
        <table class="table">
          <thead>
            <tr>
              <th>Turned On</th>
              <th>Brightness</th>
              <th>Reachable</th>
            </tr>

            <tbody>
              <tr id="row" class="<%= data.class %>">
                <td> STATUS PÅ LAMPAN</td>
                <td>brightness styrka</td>
                <td>NÅBAR</td>
              </tr>
            </tbody>
          </thead>
        </table>
      </div>

      <div class="jumbotron">
        <div class="row">
          <div class="col-md-6">
            <h2> Change Light States </h2>
            <form onSubmit={(e) => changeColor(e)}>
              <b> State: </b>
              <input
                name="On"
                type="radio"
                value="true"
                checked={true === lampLight}
                onChange={() => setLampLight(true)}
              />
              <label> On </label>
              <input
                name="Off"
                type="radio"
                value="false"
                checked={false === lampLight}
                onChange={() => setLampLight(false)}
              />
              <label> Off </label>
              <b> Brightness: </b>
              <div class="row">
                <div class="col-md-1">
                  <label> 0 </label>
                </div>
                <div class="col-md-3">
                  <input
                    type="range"
                    placeholder=" Brightness"
                    name=" Brightness"
                    max="254"
                    min="0"
                    onChange={(e) => setRangeval(e.target.value)}
                  />
                </div>
                <div class="col-md-1">
                  <label> 254 </label>
                </div>
              </div>
              <input type="submit" value="Submit" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
