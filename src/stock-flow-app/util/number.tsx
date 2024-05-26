export function formatNumber(number: number): string {
    return number.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
}