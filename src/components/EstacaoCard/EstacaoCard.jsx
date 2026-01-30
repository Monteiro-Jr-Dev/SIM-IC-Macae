import React, { useState, useEffect } from "react";
import { weatherServiceAPI } from "../../services/weatherServiceAPI";
import { calculateHeatIndex as calcularIndiceCalor } from "../../utils/heatIndexCalculator";
import { getCategoriaIndiceCalor } from "../../utils/heatIndexCalculator";
import { weatherCache } from "../../services/weatherCache";
import { GaugeComponent } from "react-gauge-component";

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
    console.warn("Dados indisponíveis para a estação:", stationId);
    return null;
  }

  return (
    <div>
      <h3>{children}</h3>
      <p>Temperatura: {dadosEstacao.temperatura}°C</p>
      <p>Umidade: {dadosEstacao.umidade}%</p>
      <div style={{width: 300, position:"relative", justifyContent:"center", display:"inline-block"}}>
        <h3 style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "100%", textAlign: "center" }}>
          Índice de Calor: {dadosEstacao.indiceCalor}°C
        </h3>
        <GaugeComponent
          value={dadosEstacao.indiceCalor}
          type="semicircle"
          minValue={10}
          maxValue={65}
          arc={{
            width: 0.2,
            padding: 0.015,
            cornerRadius: 2,
            subArcs: [
              {
                limit: 27,
                color: "#2ecc71",
                showTick: true,
                tooltip: { text: "Normal" },
              },
              {
                limit: 32,
                color: "#f1c40f",
                showTick: true,
                tooltip: { text: "Cuidado" },
              },
              {
                limit: 41,
                color: "#e67e22",
                showTick: true,
                tooltip: { text: "Cuidado Extremo" },
              },
              {
                limit: 54,
                color: "#e74c3c",
                showTick: true,
                tooltip: { text: "Perigo" },
              },
              { color: "#8e44ad", tooltip: { text: "Perigo Extremo" } },
            ],
          }}
          pointer={{
            type: "needle",
            color: "#e0e0e0",
            length: 0.7,
            width: 8,
            maxFps: 30,
            baseColor: "#ffffff",
            strokeWidth: 0.5,
            strokeColor: "#000000",
          }}
          labels={{
            valueLabel: {
              formatTextValue: (e) => "".concat(e.toFixed(1), "\xb0C"),
              style: {
                fontSize: "1px",
                fill: "#e0e0e0",
                fontWeight: "bold",
              },
              offsetY: 58,
              hide: true,
            },
            tickLabels: {
              type: "outer",
              defaultTickValueConfig: {
                formatTextValue: (e) => "".concat(e, "\xb0"),
                style: { fontSize: "10px", fill: "#000" },
              },
              defaultTickLineConfig: { color: "#030303", length: 4, width: 1 },
            },
          }}
          style={{
            width: 300,
            height: 300,
            position: "relative",
            display: "inline-block",
            justifyContent: "center",
          }}
        />
        <h3 style={{ color: dadosEstacao.cor, fontSize: "25px", WebkitTextStrokeWidth: "0.25px", WebkitTextStrokeColor: "#333", position: "absolute", bottom: "20px", left: "50%", transform: "translateX(-50%)", width: "100%", textAlign: "center" }}> {dadosEstacao.categoria}</h3>
      </div>
    </div>
  );
}
