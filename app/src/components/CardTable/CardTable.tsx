"use client";

import {
  CardContainer,
  CardImage,
  CardBody,
  CardContent,
  Title,
  System,
  Creator,
} from "./styles";
import { Button } from "../Button/Button";

type CardTableProps = {
  title: string;
  image: string;
  system: string;
  players: number;
  onClick?: () => void;
};

export function CardTable({
  title,
  image,
  system,
  players,
  onClick,
}: CardTableProps) {
  return (
    <CardContainer>
      <CardImage src={image} />
      <CardBody>
        <CardContent>
          <Title>{title}</Title>
          <System>{system}</System>
          <Creator>
            {typeof players === "number"
              ? players === 0
                ? "Sem Jogadores"
                : `${players} Jogador${players > 1 ? "es" : ""}`
              : "-"}
          </Creator>
        </CardContent>
        <Button type="default" text="acessar" onClick={onClick} />
      </CardBody>
    </CardContainer>
  );
}
