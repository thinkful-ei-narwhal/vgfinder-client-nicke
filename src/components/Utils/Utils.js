import React from "react";
import "./Utils.css";
import { format as formatDate } from "date-fns";

export function NiceDate({ date, format = "Do MMMM YYYY" }) {
  return formatDate(date, format);
}

export function Select({ className, ...props }) {
  return <select className={["select", className].join(" ")} {...props} />;
}

export function Option({ className, ...props }) {
  return <option className={["option", className].join(" ")} {...props} />;
}

export function Button({ className, ...props }) {
  return <button className={["Button", className].join(" ")} {...props} />;
}

export function Input({ className, ...props }) {
  return <input className={["Input", className].join(" ")} {...props} />;
}

export function Textarea({ className, ...props }) {
  return <textarea className={["Textarea", className].join(" ")} {...props} />;
}

export function Required({ className, ...props }) {
  return (
    <span className={["Required", className].join(" ")} {...props}>
      &#42;
    </span>
  );
}

export function Section({ className, list, ...props }) {
  const classes = ["Section", list && "Section--list", className]
    .filter(Boolean)
    .join(" ");
  return <section className={classes} {...props} />;
}
