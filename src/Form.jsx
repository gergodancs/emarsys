import React from "react";
import { useState } from "react";

const Form = () => {
  const [hour, setHour] = useState(0);
  const [day, setDay] = useState(0);
  const [issue, setIssue] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [resultTime, setResultTime] = useState("");
  const [resultDate, setResultDate] = useState("");
  const [showNoTime, setShowNoTime] = useState(false);
  const [showMinus, setShowMinus] = useState(false);

  const validDate = () => {
    return (
      <div className="result">
        <p>{`Estimated finish date for ${issue} is ${resultTime} and ${resultDate}`}</p>
      </div>
    );
  };
  const noTimeForThis = () => {
    return (
      <div className="result">
        <p>Work harder, no time for this :)</p>
      </div>
    );
  };
  const inCaseMinus = () => {
    return (
      <div className="result">
        <p>Hell yeah, Back to the Future</p>
      </div>
    );
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const d = new Date();
    console.log("aktualis", d);
    const actualHour = d.getHours();
    const plusDays = day * 24;
    const plusHours = actualHour + Number(hour) + plusDays;
    for (let i = 0; i <= plusHours; i++) {
      d.setHours(d.getHours() + 1);
      if (d.getHours === 17) {
        d.setHours(d.getHours + 16);
      }
      if (d.getDay() === 6) {
        let dif = 24 - d.getHours() + 10;
        d.setHours(48 + dif);
      }
      if (d.getDay() === 0) {
        let dif = 24 - d.getHours() + 10;
        d.setHours(24 + dif);
      }
    }
    setResultTime(d.toLocaleTimeString());
    setResultDate(d.toLocaleDateString());
    day < 5 && day > -1
      ? setShowResult(true)
      : day < 0
      ? setShowMinus(true)
      : setShowNoTime(true);

    setHour(0);
    setDay(0);
    validDate();
  };

  return (
    <div className="form__container">
      <form onSubmit={submitHandler}>
        <label>Issue: </label>
        <input
          type="text"
          value={issue}
          onChange={(e) => setIssue(e.target.value)}
        />
        <label>Finish: </label>

        <input
          type="number"
          value={day}
          onChange={(e) => setDay(e.target.value)}
        />
        <label>day</label>

        <input
          type="number"
          min={0}
          max={24}
          value={hour}
          onChange={(e) => setHour(e.target.value)}
        />
        <label>hour</label>

        <button>Add Report</button>
      </form>
      {showResult && validDate()}
      {showNoTime && noTimeForThis()}
      {showMinus && inCaseMinus()}
    </div>
  );
};

export default Form;
