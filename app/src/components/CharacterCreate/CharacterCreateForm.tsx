import React, { useState } from "react";
import { DiceRoller } from "./DiceRoller";

// Props: recebe o JSON do sistema e função de submit
export function CharacterCreateForm({
  systemConfig,
  onSubmit,
}: {
  systemConfig: any;
  onSubmit: (form: any) => void;
}) {
  // Inicializa o estado do formulário com fallback se vier vazio
  const [form, setForm] = useState(() => {
    if (!systemConfig) return null;

    // Se vier string, tenta converter para objeto
    if (typeof systemConfig === "string") {
      try {
        const parsed = JSON.parse(systemConfig);
        if (
          parsed.system_variables &&
          typeof parsed.system_variables === "string"
        ) {
          try {
            parsed.system_variables = JSON.parse(parsed.system_variables);
          } catch {}
        }
        return parsed.system_variables || parsed;
      } catch (e) {
        return null;
      }
    }

    if (systemConfig.system_variables) {
      if (typeof systemConfig.system_variables === "string") {
        try {
          return JSON.parse(systemConfig.system_variables);
        } catch {
          return null;
        }
      }
      return systemConfig.system_variables;
    }

    return systemConfig;
  });

  const handleChange = (section: string, key: string, value: any) => {
    setForm((prev: any) => {
      const updated = { ...prev };
      if (section === "stats" || section === "attributes") {
        updated[section][key].value = value;
      } else if (section === "background") {
        updated[section].types[key].value = value;
      }
      return updated;
    });
  };

  // Renderiza campos de stats
  const renderStats = () => (
    <fieldset>
      <legend>Stats</legend>
      <pre>{JSON.stringify(form.stats, null, 2)}</pre>
      {form.stats && typeof form.stats === "object" ? (
        Object.entries(form.stats).map(([key, stat]: any) =>
          typeof stat === "object" && stat.value !== undefined ? (
            <div key={key}>
              <label>
                {key} {stat.description && `- ${stat.description}`}
              </label>
              <input
                type={stat.input || "number"}
                value={stat.value}
                onChange={(e) => handleChange("stats", key, e.target.value)}
              />
              {stat.modifiers && stat.modifiers.fisico && (
                <DiceRoller expression={stat.modifiers.fisico} />
              )}
            </div>
          ) : null
        )
      ) : (
        <div style={{ color: "red" }}>
          Nenhum stat disponível para este sistema.
        </div>
      )}
    </fieldset>
  );

  // Renderiza atributos
  const renderAttributes = () => (
    <fieldset>
      <legend>Atributos</legend>
      {form.attributes && typeof form.attributes === "object" ? (
        Object.entries(form.attributes).map(([key, attr]: any) => (
          <div key={key}>
            <label>
              {key} - {attr.description}
            </label>
            <input
              type={attr.input || "number"}
              value={attr.value}
              min={attr["min-value"] || 0}
              max={attr["max-value"] || 5}
              onChange={(e) => handleChange("attributes", key, e.target.value)}
            />
            {attr.modifier && attr.modifier.effect && (
              <DiceRoller expression={attr.modifier.effect} />
            )}
          </div>
        ))
      ) : (
        <div style={{ color: "red" }}>
          Nenhum atributo disponível para este sistema.
        </div>
      )}
    </fieldset>
  );

  // Renderiza antecedentes
  const renderBackground = () => (
    <fieldset>
      <legend>Antecedentes</legend>
      {form.background &&
      form.background.types &&
      typeof form.background.types === "object" ? (
        Object.entries(form.background.types).map(([key, bg]: any) => (
          <div key={key}>
            <label>
              {key} - {bg.description}
            </label>
            <input
              type={bg.input || "number"}
              value={bg.value}
              min={bg["min-value"] || 0}
              max={bg["max-value"] || 5}
              onChange={(e) => handleChange("background", key, e.target.value)}
            />
          </div>
        ))
      ) : (
        <div style={{ color: "red" }}>
          Nenhum antecedente disponível para este sistema.
        </div>
      )}
    </fieldset>
  );

  // Renderiza skills
  const renderSkills = () => (
    <fieldset>
      <legend>Skills</legend>
      {form.skills && Array.isArray(form.skills.types) ? (
        form.skills.types.map((skill: any, idx: number) => (
          <div key={idx} style={{ marginBottom: 8 }}>
            <strong>{skill.name}</strong>
            <div>{skill.description}</div>
            {skill.manobras && Array.isArray(skill.manobras) && (
              <ul>
                {skill.manobras.map((m: any, i: number) => (
                  <li key={i}>
                    <strong>{m.name}:</strong> {m.description}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))
      ) : (
        <div style={{ color: "red" }}>Nenhuma skill disponível.</div>
      )}
    </fieldset>
  );

  // Renderiza tormentos
  const renderTorment = () => (
    <fieldset>
      <legend>Tormentos</legend>
      {Array.isArray(form.torment) ? (
        form.torment.map((tor: any, idx: number) => (
          <div key={idx} style={{ marginBottom: 8 }}>
            <strong>{tor.name}</strong>
            <ul>
              {tor.values &&
                Object.entries(tor.values).map(([k, v]: any) => (
                  <li key={k}>
                    {k}: {v}
                  </li>
                ))}
            </ul>
          </div>
        ))
      ) : (
        <div style={{ color: "red" }}>Nenhum tormento disponível.</div>
      )}
    </fieldset>
  );

  // Renderiza montaria
  const renderMount = () => (
    <fieldset>
      <legend>Montaria</legend>
      {form.mount && form.mount.attributes ? (
        <>
          <div>
            Possui montaria: {form.mount.has_mount === "1" ? "Sim" : "Não"}
          </div>
          <div>Nível: {form.mount.level}</div>
          <div>Valor padrão: {form.mount.default_value}</div>
          <div style={{ marginTop: 8 }}>
            <strong>Atributos da montaria:</strong>
            {Object.entries(form.mount.attributes).map(([key, attr]: any) => (
              <div key={key}>
                {key}: {attr.value}{" "}
                {attr.description && `- ${attr.description}`}
              </div>
            ))}
          </div>
        </>
      ) : (
        <div style={{ color: "red" }}>Nenhuma montaria disponível.</div>
      )}
    </fieldset>
  );

  const renderReputation = () => (
    <fieldset>
      <legend>Reputação</legend>
      {form.reputation ? (
        <div>
          Valor: {form.reputation.value}
          <br />
          Máximo: {form.reputation["max-value"]}
          <br />
          Mínimo: {form.reputation["min-value"]}
        </div>
      ) : (
        <div style={{ color: "red" }}>Nenhuma reputação disponível.</div>
      )}
    </fieldset>
  );

  if (!form) {
    return (
      <div
        style={{
          color: "#fff",
          background: "#8a2be2",
          padding: "32px",
          borderRadius: "12px",
          textAlign: "center",
          margin: "32px auto",
          maxWidth: "500px",
          boxShadow: "0 2px 16px #0002",
        }}
      >
        <h2>Dados do sistema não disponíveis</h2>
        <p>
          Não foi possível carregar o formulário para este sistema.
          <br />
          Verifique se a mesa está configurada corretamente.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form);
      }}
    >
      <h2>Criar Ficha</h2>
      {renderStats()}
      {renderAttributes()}
      {renderBackground()}
      {renderSkills()}
      {renderTorment()}
      {renderMount()}
      {renderReputation()}
      <button type="submit">Criar Ficha</button>
    </form>
  );
}
