'use client'

import { List, Item } from './styles'

export function TeamList({ team }: { team: { id: number; name: string; role: string }[] }) {
  return (
    <List>
      {team.map(member => (
        <Item key={member.id}>
          <strong>{member.name}</strong> – {member.role}
        </Item>
      ))}
    </List>
  )
}
