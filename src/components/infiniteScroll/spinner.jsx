const Spinner = (props) => {
  const { referrence } = props;
  return (
    <div ref={referrence} className="spinner">
      <div className="rotateSpinner">|</div>
      Loading
    </div>
  );
};

export { Spinner };
