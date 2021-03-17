import Lights from "./Lights"

function Main() {
  return (
    <>
      <div className="Main">
        <div className="Stream">
          <video className="Content" autoPlay playsInline loop muted>
            <source src="./hamster.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="Info">
          <Lights />
        </div>
      </div>
    </>
  );
}

export default Main;