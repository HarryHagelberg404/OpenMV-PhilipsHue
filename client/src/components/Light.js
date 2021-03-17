import { useState } from "react";
import axios from "axios";

// $("#btn").on("click", function () {
//   var lightid = $("#lightid").text();
//   var res = lightid.split(" ");
//   var id = res[2];
//   var onstate = $("input[type=radio]:checked").val();
//   if (onstate == "false") {
//     onstate = false;
//   } else {
//     onstate = true;
//   }
//   var bright = $("input[type=range]").val();
//   bright = parseInt(bright);

//   var body = {
//     on: onstate,
//     bri: bright,
//   };
//   $.ajax({
//     type: "POST",
//     url: "/lights/" + id,
//     data: JSON.stringify({ data: body }),
//     contentType: "application/json; charset=utf-8",
//     dataType: "json",
//     success: function (resultData) {
//       //console.log(resultData);
//     },
//   });
// });

export default function Light() {
  const [lampLight, setLampLight] = useState(true);
  const changeColor = (e) => {
    console.log(lampLight, e.target.value);
    e.preventDefault();
    const body = {
      on: lampLight,
      bri: 240,
    };
    axios.post(`http://localhost:4000/api/lights/1`, { data: body });
    console.log("hej");
  };
  return (
    <div class="container">
      <div class="jumbo1">
        <h1 id="lightid"> Light id här </h1>
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
            <form>
              <b> State: </b>
              <input
                type="radio"
                name="state"
                value="true"
                checked
                onChange={() => setLampLight(true)}
              />
              <label> On </label>
              <input
                type="radio"
                name="state"
                value="false"
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
                    id="rangeslt"
                    type="range"
                    min="0"
                    max="254"
                    step="1"
                    value="254"
                  />
                </div>
                <div class="col-md-1">
                  <label> 254 </label>
                </div>
              </div>
              <input
                type="submit"
                value="Submit"
                onClick={(e) => changeColor(e)}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
