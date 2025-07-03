"use client";

import { ButtonDefault, ButtonSuccess } from "./styles";

export function Button({
  type,
  text,
}: {
  type: "success" | "default";
  text: string;
}) {
  return type === "default" ? (
    <ButtonDefault>{text}</ButtonDefault>
  ) : (
    <ButtonSuccess>{text}</ButtonSuccess>
  );
}
