export async function fetchExitoAvista(data_inicio, data_fim) {
    try {
        // Construir os parâmetros de consulta
        const params = new URLSearchParams({
            data_inicio: data_inicio,
            data_fim: data_fim
        });

        // Construir a URL completa
        const url = `http://192.168.1.35:5000/api/dados/exito_avista?${params.toString()}`;

        // Fazer a requisição GET
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
