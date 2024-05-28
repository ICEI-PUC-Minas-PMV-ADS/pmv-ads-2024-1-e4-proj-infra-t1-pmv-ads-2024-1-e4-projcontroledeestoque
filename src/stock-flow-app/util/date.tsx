export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    // return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}h${date.getMinutes()}`;
    return date.toLocaleDateString('pt-BR', {year: 'numeric', month: '2-digit', day: '2-digit'})
        + ' ' +
        date.toLocaleTimeString('pt-BR', {hour: '2-digit', minute: '2-digit'});
}

export function toLocaleDateString(date: Date): string {
    return date.toLocaleDateString('pt-BR', {year: 'numeric', month: '2-digit', day: '2-digit'});
}