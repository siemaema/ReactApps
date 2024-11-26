import { useEffect } from "react";
function Timer({ dispatch, secondsRemain }) {
  const minuts = Math.floor(secondsRemain / 60);
  const seconds = secondsRemain % 60;
  useEffect(() => {
    const id = setInterval(function () {
      dispatch({ type: "tick" });
    }, 1000);

    return () => clearInterval(id);
  }, [dispatch]);
  return (
    <div className="timer">
      {minuts < 10 && "0"}
      {minuts}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
}

export default Timer;
