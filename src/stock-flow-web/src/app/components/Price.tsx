export default function Price({ value }: { value: number }) {
  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  const price = formatter.format(value).replace("R$", "");
  const tip = price.split(",")[0];
  const tip2 = price.split(",")[1];
  return (
    <p className="text-zinc-200">
      <span className="text-zinc-400 text-xs"> R$</span>
      {tip}
      <span className="text-zinc-400 text-xs"> {tip2}</span>
    </p>
  );
}
