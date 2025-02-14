"use client";
import MyText from "@/shared/MyText/MyText";
import style from "./FAQItem.module.css";
import IFAQItem from "./FAQItem.props";
import { useState } from "react";
import classNames from "classnames";

const FAQItem = ({ answer, question }: IFAQItem) => {
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  return (
    <div
      className={classNames("wrap", style.wrapper)}
      onClick={() => setShowAnswer(!showAnswer)}
    >
      <MyText className={"styleValue"}>{question}</MyText>
      {showAnswer && (
        <>
          <hr className={"mt10"} />
          <MyText className={"styleValue mt10"}>{answer}</MyText>
        </>
      )}
    </div>
  );
};
export default FAQItem;
