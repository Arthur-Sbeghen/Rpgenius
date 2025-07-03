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

type CardTableProps = {
  title: string;
  image: string;
  system: string;
  creator: string;
};

export function CardTable({ title, image, system, creator }: CardTableProps) {
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
          <Creator>Criado por {creator}</Creator>
        </CardContent>
        <Button type="default" text="acessar" />
      </CardBody>
    </CardContainer>
  );
}
