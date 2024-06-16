export async function fetchDadosFinanceiros(data_inicio, data_fim) {
    try {
        const params = new URLSearchParams({
            data_inicio: data_inicio,
            data_fim: data_fim
        });

        const url = `http://192.168.1.35:5000/api/dados/financeiro?${params.toString()}`;

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Erro ao carregar as informações');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
}
