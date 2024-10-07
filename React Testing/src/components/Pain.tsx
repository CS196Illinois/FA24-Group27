import { Fragment } from "react";
import { useState } from "react";
import Wrath from "./Wrath";

function Pain() {
  const [onIndex, setIndex] = useState(-1);
  let choices = [
    "A. I have the most fun working at 4AM!",
    "B. I just woke up.",
    "C. This was not by choice and I was busy all week with CHEM 203",
    "D. AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
  ];

  if (onIndex === 3) {
  }

  return (
    <Fragment>
      <h2>Why am I coding this and learning React at 4AM?</h2>
      <ul className="list-group">
        {choices.map((item, index) =>
          WhichPain(item, index, onIndex, setIndex)
        )}
      </ul>
      {onIndex === 3 && <Wrath />}
      {onIndex !== -1 && onIndex !== 3 && (
        <p>
          <br />
          You are WRONG and you should feel BAD
        </p>
      )}
    </Fragment>
  );
}

function WhichPain(st: string, a: number, n: number, f: Function) {
  if (a == 3) {
    return (
      <li
        className={
          n === a
            ? "list-group-item list-group-item-success"
            : "list-group-item"
        }
        key={st}
        onClick={() => {
          f(a);
        }}
      >
        {st}
      </li>
    );
  }
  return (
    <li
      className={
        n === a ? "list-group-item list-group-item-danger" : "list-group-item"
      }
      key={st}
      onClick={() => {
        f(a);
      }}
    >
      {" "}
      {st}
    </li>
  );
}

export default Pain;
