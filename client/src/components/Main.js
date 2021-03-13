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
          <h1>Information</h1>
          <p>Information</p>
          <p>Information</p>
        </div>
      </div>
    </>
  );
}

export default Main;