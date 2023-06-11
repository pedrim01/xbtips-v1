import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [stateDisplay, setStateDisplay] = useState<"flex" | "hidden">("hidden");

  function handleClickButtonTop() {
    window.scrollTo(0, 0);
  }

  function handleScrollY() {
    window.scrollY > 10 ? setStateDisplay("flex") : setStateDisplay("hidden");
  }

  useEffect(() => {
    document.addEventListener("scroll", handleScrollY);

    return () => {
      document.removeEventListener("scroll", handleScrollY);
    };
  }, [stateDisplay, setStateDisplay]);

  return (
    <>
      <nav className="z-1 fixed left-0 right-0 top-0 w-full bg-gray-300">
        <ul className="mr-4 flex justify-end gap-4">
          <li><a href={"#about"}>Sobre</a></li>
          <li><a href={"#plans"}>Planos</a></li>
          <li><a href={"#tools"}>Ferramentas</a></li>
          <li><a href={"#contact"}>Contato</a></li>
        </ul>
      </nav>

      <main>
        <section id="signIn" className="h-screen bg-green-400 pt-5">
          Login
        </section>

        <section id="about" className="min-h-screen bg-red-400 pt-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, hic ipsum? Voluptatum unde provident officia quam magnam
          accusamus. Mollitia omnis illo eligendi veniam itaque facilis neque tempore natus molestiae. Voluptatibus. Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Expedita, hic ipsum? Voluptatum unde provident officia quam magnam accusamus. Mollitia omnis
        </section>

        <section id="plans" className="min-h-screen bg-blue-400 pt-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, hic ipsum? Voluptatum unde provident officia quam magnam
          accusamus. Mollitia omnis illo eligendi veniam itaque facilis neque tempore natus molestiae. Voluptatibus. Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Expedita, hic ipsum? Voluptatum unde provident officia quam magnam accusamus. Mollitia omnis
          illo eligendi veniam itaque facilis neque tempore natus molestiae. Voluptatibus. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Expedita, hic ipsum? Voluptatum unde provident officia quam magnam accusamus. Mollitia omnis illo eligendi
          veniam itaque facilis neque tempore natus molestiae. Voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Expedita, hic ipsum? Voluptatum unde provident officia quam magnam accusamus. Mollitia omnis illo eligendi veniam itaque facilis
        </section>

        <section id="tools" className="min-h-screen bg-gray-400 pt-5">
          Ferramentas
        </section>

        <footer id="contact" className="min-h-screen bg-cyan-400 pt-5">
          Contato
        </footer>
      </main>

      <button className={`${stateDisplay} z-2 fixed bottom-5 right-5 bg-white text-black`} onClick={handleClickButtonTop}>
        Topo
      </button>
    </>
  );
}
