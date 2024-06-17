export async function fetchAtraso() {
    try {
        const response = await fetch('http://192.168.237.67:5000/api/dados/filtro');

        if (!response.ok) {
            throw new Error(`Erro: ${response.statusText}`);
        }
        console.log(response);
        return await response.json();
    } catch (error) {
        console.error('Erro ao carregar as informações:', error.message);
        throw new Error(error.message || 'Erro ao carregar as informações');
    }
}