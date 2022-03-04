function Spinner() {
  return (
    <div className="fixed top-0 left-0 bg-black/50 min-w-full h-screen flex justify-center items-center z-30">
      <div id="loading-bar-spinner" className="spinner">
        <div className="spinner-icon"></div>
      </div>
    </div>
  );
}

export default Spinner;
