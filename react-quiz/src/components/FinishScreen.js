function FinishScreen({ points, totalPoints, highscore, dispatch }) {
  const percentage = (points / totalPoints) * 100;

  let emoji;

  if (percentage === 100) emoji = "⭐";
  if (percentage >= 80 && percentage < 100) emoji = "👌";
  if (percentage >= 50 && percentage < 80) emoji = "👍";
  if (percentage >= 30 && percentage < 50) emoji = "😒";
  if (percentage >= 0 && percentage < 30) emoji = "😡";
  return (
    <>
      <div className="result">
        <span>you Scored</span>
        <strong>
          {points} out of {totalPoints} ({Math.ceil(percentage)}%) {emoji}
        </strong>
      </div>
      <p className="highscore">(Highscore : {highscore}points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart
      </button>
    </>
  );
}

export default FinishScreen;
