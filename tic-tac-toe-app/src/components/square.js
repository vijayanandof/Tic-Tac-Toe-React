function Square(props) {
  return (
    <div className="squarebox" onClick={() => props.onClick(props.index)}>
      {props.state}
    </div>
  );
}

export default Square;
