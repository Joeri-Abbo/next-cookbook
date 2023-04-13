import React from "react";
import {Card as CardProps} from "../../interfaces/Tags/Card";

const Card = ({tag}: CardProps) => (
    <span className="inline-block bg-blue-500 text-white text-xs font-bold py-1 px-2 rounded-full">
    {tag}
  </span>
);
export default Card;
