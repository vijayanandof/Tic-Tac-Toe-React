function Square(props) {
  return (
    <div className="squarebox" onClick={() => props.onClick(props.index)}>
      { typeof props.state === 'number' ? "" : props.state}
    </div>
  );
}

export default Square;
