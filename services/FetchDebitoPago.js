// Função para construir a URL com os parâmetros de consulta
function buildUrl(baseUrl, params) {
    const url = new URL(baseUrl);
    Object.keys(params).forEach(key => {
        if (Array.isArray(params[key])) {
            params[key].forEach(value => url.searchParams.append(key, value));
        } else if (params[key] !== undefined && params[key] !== null) {
            url.searchParams.append(key, params[key]);
        }
    });
    return url;
}

// Função para buscar os dados com filtros
export async function fetchDebitoPago(filtroAtraso = [], dataInicio = null, dataFim = null) {
    const baseUrl = 'http://192.168.237.67:5000/api/dados/debitopago';
    const params = {
        filtro_atraso: filtroAtraso,
        data_inicio: dataInicio,
        data_fim: dataFim
    };
    
    const url = buildUrl(baseUrl, params);
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error('Erro ao carregar as informações');
    }
}