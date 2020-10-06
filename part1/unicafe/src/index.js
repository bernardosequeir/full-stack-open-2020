import React, { useState } from "react";
import ReactDOM from "react-dom";

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  if (total !== 0) {
    return (
      <>
        <h1>statistics</h1>
        <table>
          <tbody>
            <tr>
              <td>good</td>
              <td>{good}</td>
            </tr>
            <tr>
              <td>neutral</td>
              <td>{neutral}</td>
            </tr>
            <tr>
              <td>bad</td>
              <td>{bad}</td>
            </tr>
            <tr>
              <td>all</td>
              <td>{total}</td>
            </tr>
            <tr>
              <td>average</td>
              <td>{(good - bad) / total}</td>
            </tr>
            <tr>
              <td>positive</td>
              <td>{(good / total) * 100} %</td>
            </tr>
          </tbody>
        </table>
      </>
    );
  }
  return (
    <>
      <h1>statistics</h1>
      <p>No feedback given</p>
    </>
  );
};

const Button = ({ handler, name }) => {
  return <button onClick={handler}>{name}</button>;
};

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => setGood(good + 1);
  const handleNeutral = () => setNeutral(neutral + 1);
  const handleBad = () => setBad(bad + 1);

  return (
    <div>
      <h1>give feedback</h1>
      <Button handler={handleGood} name="good" />
      <Button handler={handleNeutral} name="neutral" />
      <Button handler={handleBad} name="bad" />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
