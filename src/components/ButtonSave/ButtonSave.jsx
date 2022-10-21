import React from "react";
import { Button } from "../Button";
import "./ButtonSave.css";

export function ButtonSave({ children }) {
  return <Button className="button-save">{children}</Button>;
}
