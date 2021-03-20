import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import queryString from "query-string";

export default function Light() {
  const [lampLight, setLampLight] = useState(true);
  const [rangeval, setRangeval] = useState(null);
  const [hueVal, setHueVal] = useState(null);
  const [lampValues, setLampValues] = useState([]);
  const [posted, setIsPosted] = useState(false);
  const id = window.location.href;

  useEffect(() => {
    axios.get("http://localhost:4000/api/allligths").then((response) => {
      response.data.forEach((element) => {
        if (element.id === id.substr(-1)) {
          setLampValues(element);
          setRangeval(element.bri);
          setHueVal(element.hue);
          setLampLight(element.on);
          setIsPosted(false);
        }
      });
    });
  }, [posted]);

  const changeColor = (e) => {
    e.preventDefault();
    console.log(rangeval);
    const body = {
      on: lampLight,
      bri: Number(rangeval),
      hue: Number(hueVal),
    };
    axios.post(`http://localhost:4000/api/lights/${id.substr(-1)}`, {
      data: body,
    });
    setIsPosted(true);
  };

  return (
    <div className="container">
      <div className="jumbo1">
        <h1 id="lightid"> Light id här </h1>
        <table className="table">
          <thead>
            <tr>
              <th>Turned On</th>
              <th>Brightness</th>
              <th>Reachable</th>
            </tr>
          </thead>
          <tbody>
            <tr id="row" class="<%= data.class %>">
              <td>{String(lampValues.on) === "true" ? "On" : "Off"}</td>
              <td>{lampValues.bri}</td>
              <td>{String(lampValues.reachable) === "true" ? "Yes" : "No"}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="jumbotron">
        <div className="row">
          <div className="col-md-6">
            <h2> Change Light States </h2>
            <form onSubmit={(e) => changeColor(e)} className="formlight">
              <div>
                <b> Light </b>
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
              </div>
              <b> Brightness </b>
              <div class="row">
                <label> 0 </label>
                <input
                  className="bright-slider"
                  type="range"
                  placeholder=" Brightness"
                  name=" Brightness"
                  max="254"
                  min="0"
                  value={rangeval}
                  onChange={(e) => setRangeval(e.target.value)}
                />
                <label> 254 </label>
              </div>
              <b> Hue </b>
              <div class="row">
                <input
                  className="slider"
                  type="range"
                  placeholder=" Brightness"
                  name=" Brightness"
                  max="65535"
                  min="0"
                  value={hueVal}
                  onChange={(e) => setHueVal(e.target.value)}
                />
              </div>
              <div>
                <input className="formBtn" type="submit" value="Submit" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
