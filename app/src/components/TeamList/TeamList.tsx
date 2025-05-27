"use client";

import { List, Item } from "./styles";

interface Member {
  id: number;
  name: string;
  role: string;
}

export function TeamList({ team }: { team: Member[] }) {
  return (
    <List>
      {team.map((member) => (
        <Item key={member.id}>
          <strong>{member.name}</strong> – {member.role}
        </Item>
      ))}
    </List>
  );
}
