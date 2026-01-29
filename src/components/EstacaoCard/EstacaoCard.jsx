import React, { useState, useEffect } from "react";
import { weatherService } from "../../services/weaterService";
import { calculateHeatIndex as calcularIndiceCalor } from "../../utils/heatIndexCalculator";
import { getCategoriaIndiceCalor } from "../../utils/heatIndexCalculator";

export default function EstacaoCard({ stationId, children }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [semDados, setSemDados] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await weatherService.getCurrentObservations(stationId);

        if (result?.observations.length > 0) {
          const observation = result.observations[0];
          if (
            !observation.metric ||
            !observation.metric.temp ||
            !observation.humidity
          ) {
            setData(null);
            setSemDados(true);
            setLoading(false);
            return;
          }
          const heatIndex = calcularIndiceCalor(
            observation.metric.temp,
            observation.humidity,
          );
          setData({ ...observation, heatIndex });
        } else {
          setData(null);
          console.warn(
            "Nenhuma observação disponível para a estação:",
            stationId,
          );
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [stationId]);

  if (loading) return <p>Carregando dados de Macaé...</p>;

  if (semDados) {
    console.warn("Dados incompletos para a estação:", stationId);
    return null;
  }

  if (!data) {
    console.warn("Nenhum dado disponível para a estação:", stationId);
    return null;
  }

  const categoriaIndiceCalor = getCategoriaIndiceCalor(data.heatIndex);

  return (
    <div>
      <h2>Estação: {children}</h2>
      <p>Temperatura: {data.metric.temp}°C</p>
      <p>Umidade: {data.humidity}%</p>
      <h3 style={{ color: categoriaIndiceCalor.color }}>
        Índice de Calor: {data.heatIndex}°C <br></br>
        {categoriaIndiceCalor.label}
      </h3>
    </div>
  );
}
