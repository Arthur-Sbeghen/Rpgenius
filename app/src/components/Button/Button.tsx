"use client";

import { ButtonDefault, ButtonSuccess } from "./styles";

export function Button({
  type,
  text,
  onClick,
}: {
  type: "success" | "default";
  text: string;
  onClick?: () => void;
}) {
  return type === "default" ? (
    <ButtonDefault onClick={onClick}>{text}</ButtonDefault>
  ) : (
    <ButtonSuccess>{text}</ButtonSuccess>
  );
}
