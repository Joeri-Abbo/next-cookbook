import React from "react";
import {Card as CardProps} from "../../interfaces/Tags/Card";

const Card = ({tag}: CardProps) => (
    <span className="inline-block rounded-full bg-blue-500 px-2 py-1 text-xs font-bold text-white">
    {tag}
  </span>
);
export default Card;
