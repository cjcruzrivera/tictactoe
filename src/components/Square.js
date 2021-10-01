function Square(props) {
  var className = "square " + props.classBtn;

  return (
    <button className={className} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

export default Square;
