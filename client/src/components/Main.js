import { useState, useEffect } from "react";
import Lights from "./Lights";
import axios from "axios";

function Main() {
  const [granted, setIsGranted] = useState(false);
  // useEffect(() => {
  //   axios.get("http://localhost:4000/api").then((response) => {
  //     if (response.data.msg === "ON") {
  //       setIsGranted(true);
  //     }
  //     console.log(response.data);
  //   });
  // }, []);

  return (
    <>
      <div className="Main">
        <div className="Stream">
          {/* <video className="Content" autoPlay playsInline loop muted>
            <source src="./hamster.mp4" type="video/mp4" />
          </video> */}
          <img src="http://192.168.0.46:8080" />
        </div>
        <div className="Info">{granted ? <Lights /> : ""}</div>
      </div>
    </>
  );
}

export default Main;
