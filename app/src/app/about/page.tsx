"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { TeamList } from "@/components/TeamList/TeamList";

interface TeamMember {
  id: number;
  name: string;
  role: string;
}

export default function AboutPage() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/team")
      .then((res) => setTeam(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Sobre Nós</h1>
      {loading ? <p>Carregando equipe...</p> : <TeamList team={team} />}
    </div>
  );
}
