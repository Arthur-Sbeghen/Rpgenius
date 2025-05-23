// app/about/page.tsx
'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'

interface TeamMember {
  id: number
  name: string
  role: string
}

export default function AboutPage() {
  const [team, setTeam] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('/api/team')
      .then(res => setTeam(res.data))
      .catch(err => console.error('Erro ao carregar equipe:', err))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Sobre Nós</h1>

      {loading ? (
        <p>Carregando equipe...</p>
      ) : (
        <ul className="space-y-2">
          {team.map(member => (
            <li key={member.id} className="border p-4 rounded shadow">
              <strong>{member.name}</strong> – {member.role}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
