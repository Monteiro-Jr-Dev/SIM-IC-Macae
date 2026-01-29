import {BASE_URL, commonParams} from  './apiConfig.js';

export const weatherService = {
  // 1. Observações Atuais
  getCurrentObservations: async (stationId) => {
    const url = `${BASE_URL}/observations/current?stationId=${stationId}${commonParams}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }
    const text = await response.text();
    return text ? JSON.parse(text) : { observations: [] };
  },

  // 2. Histórico de 24 horas
  getDailyAll: async (stationId) => {
    const url = `${BASE_URL}/observations/all/1day?stationId=${stationId}${commonParams}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }
    const text = await response.text();
    return text ? JSON.parse(text) : { observations: [] };
  },

  // 3. Histórico por Intervalo de Datas
  getHistoryRange: async (stationId, startDate, endDate) => {
    const url = `${BASE_URL}/history/daily?stationId=${stationId}${commonParams}&startDate=${startDate}&endDate=${endDate}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }
    const text = await response.text();
    return text ? JSON.parse(text) : { observations: [] };
  }
};