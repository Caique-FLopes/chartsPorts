
export async function fetchDadosSimplificados() {
    try {
        const response = await fetch('http://192.168.237.67:5000/api/dados');
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error('Erro ao carregar as informações');
    }
}
