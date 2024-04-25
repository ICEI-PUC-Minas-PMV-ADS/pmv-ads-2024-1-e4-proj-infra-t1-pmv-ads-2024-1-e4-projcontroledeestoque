const colorMap = {
    fuschia: 'fuschia-500',
    indigo: 'indigo-500',
    // Adicione outras cores personalizadas conforme necessário
};

type ButtonProps = {
    text: string;
    color?: keyof typeof colorMap; // Use 'keyof typeof' para garantir que a propriedade de cor seja uma das chaves do mapa de cores
};

export function Button({ text, color }: ButtonProps) {
    // Verifique se a cor está definida no mapa de cores personalizado; caso contrário, use 'violet' como padrão
    const bgColor = color ? `bg-${colorMap[color]}` : 'bg-violet-500';
    const hoverColor = color ? `hover:bg-${colorMap[color]}` : 'hover:bg-violet-700';

    return (
        <button className={`${bgColor} ${hoverColor} text-white py-2 px-4 rounded-full`}>
            {text}
        </button>
    );
}