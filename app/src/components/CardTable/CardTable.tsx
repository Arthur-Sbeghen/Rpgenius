"use client";

import { Trash2 } from "lucide-react";
import {
  CardContainer,
  DeleteButton,
  CardImage,
  CardBody,
  CardContent,
  Title,
  System,
  Creator,
} from "./styles";
import { Button } from "../Button/Button";
import { Player } from "@/app/table/schema";

type CardTableProps = {
  title: string;
  image: string;
  system: string;
  players: Player[];
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
      <DeleteButton>
        <Trash2 size={20} color="red" />
      </DeleteButton>
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
