function Square({index, state, onClick}) {
  return (
    <div className="squarebox" onClick={() =>onClick(index)}>
      { typeof state === 'number' ? "" : state}
    </div>
  );
}

export default Square;
