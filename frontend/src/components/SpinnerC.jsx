function SpinnerC({ size }) {
  return (
    <div className="absolute top-0 left-0 bg-black/50 w-full h-full flex justify-center items-center z-[100]">
      <div id="loading-bar-spinner" className="spinner ">
        <div className="spinner-icon"></div>
      </div>
    </div>
  );
}

export default SpinnerC;
