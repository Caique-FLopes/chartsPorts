export async function fetchEixoTotal(filtro_atraso = [], data_inicio = '', data_fim = '') {
    try {
        // Construir os parâmetros de consulta
        const params = new URLSearchParams();
        
        if (filtro_atraso.length > 0) {
            filtro_atraso.forEach(item => params.append('filtro_atraso', item));
        }
        
        if (data_inicio) {
            params.append('data_inicio', data_inicio);
        }

        if (data_fim) {
            params.append('data_fim', data_fim);
        }

        // Construir a URL completa
        const url = `http://192.168.1.35:5000/api/dados/eixo_total?${params.toString()}`;

        // Fazer a requisição GET
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error('Erro ao carregar as informações');
    }
}
