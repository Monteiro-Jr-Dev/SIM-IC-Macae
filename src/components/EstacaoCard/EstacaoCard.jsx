import React, { useState, useEffect } from "react";
import { weatherServiceAPI } from "../../services/weatherServiceAPI";
import { calculateHeatIndex as calcularIndiceCalor } from "../../utils/heatIndexCalculator";
import { getCategoriaIndiceCalor } from "../../utils/heatIndexCalculator";
import { weatherCache } from "../../services/weatherCache";

export default function EstacaoCard({ stationId, children }) {
  const [dadosEstacao, setDadosEstacao] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function buscarDadosEstacao() {
      try {
        // Busca dados da estação
        const telemetria = await weatherCache.getLeituraInstantanea(stationId);

        if (telemetria?.temperatura && telemetria?.umidade) {
          // Calcula índice de calor e categoriza
          const indiceCalor = calcularIndiceCalor(
            telemetria.temperatura,
            telemetria.umidade,
          );
          setDadosEstacao({ ...telemetria, ...indiceCalor });
        } else {
          setDadosEstacao(null);
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    }

    buscarDadosEstacao();
  }, [stationId]);

  if (loading) return <p>Carregando dados de Macaé...</p>;

  if (!dadosEstacao) {
    return null;
  }

  return (
    <div>
      <h2>{children}</h2>
      <p>Temperatura: {dadosEstacao.temperatura}°C</p>
      <p>Umidade: {dadosEstacao.umidade}%</p>
      <h3 style={{ color: dadosEstacao.cor }}>
        Índice de Calor: {dadosEstacao.indiceCalor}°C <br></br>
        {dadosEstacao.categoria}
      </h3>
    </div>
  );
}
