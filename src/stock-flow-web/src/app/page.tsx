import Image from "next/image";
import { Button } from "./components/Button";

export default function Home() {
  return (
    <div>
      <h1 className="text-red-600">Stock Flow</h1>
       <li><a 
        href="https://tailwindcss.com/docs" 
        className="text-sky-600 hover:text-sky-800"
       > Tailwind</a></li>
       <Button text='Acessar' color='indigo'/>
       <Button text='Acessar' color='fuschia'/>
       <Button text='Login'/>
       <Button text='Deletar'/>
     </div>
    
  );
}