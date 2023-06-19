import { TiChevronRightOutline } from "react-icons/ti";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { TbUser } from "react-icons/tb";
import Button from "@/components/Button";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { MiniLogo } from "@/components/MiniLogo";
import useAuthFirebase from "@/hook/useAuthFirebase";

export default function Home() {
  const [stateDisplay, setStateDisplay] = useState<"flex" | "hidden">("hidden");
  const [stateMenu, setStateMenu] = useState(false);
  const {user} = useAuthFirebase()

  function handleClickButtonTop() {
    window.scrollTo(0, 0);
    window.location.href = "/";
  }
  function handleClickButtonMenu() {
    setStateMenu(!stateMenu);
  }

  function handleScrollY() {
    window.scrollY > 10 ? setStateDisplay("flex") : setStateDisplay("hidden");
  }

  useEffect(() => {
    document.addEventListener("scroll", handleScrollY);

    return () => {
      document.removeEventListener("scroll", handleScrollY);
    };
  }, [stateDisplay]);

  return (
    <>
      <nav className="z-2 fixed left-0 right-0 top-0 flex h-20 w-full items-center justify-between bg-zinc-800 shadow-sm shadow-zinc-950 lg:justify-around">
        <Link className="hidden lg:block" href={"/"}>
          <Logo />
        </Link>

        <div className="ml-2 flex gap-2 lg:hidden">
          <MiniLogo />
          <div className="border-r-1 h-8 border border-zinc-700 py-2 text-white"></div>
          <button type="button" className="flex items-center gap-2" onClick={handleClickButtonMenu}>
            <HiOutlineMenuAlt2 className="text-3xl text-zinc-400" />
          </button>
        </div>

        <ul className="text-md hidden items-center justify-center gap-10 text-zinc-400 lg:flex">
          <li>
            <a href={"#home"} className="hover:text-white">
              Home
            </a>
          </li>

          <li>
            <a href={"#about"} className="hover:text-white">
              Sobre
            </a>
          </li>

          <li>
            <a href={"#plans"} className="hover:text-white">
              {" "}
              Planos
            </a>
          </li>
          <li>
            <a href={"#tools"} className="hover:text-white">
              Ferramentas
            </a>
          </li>
          <li>
            <a href={"#contact"} className="hover:text-white">
              Contato
            </a>
          </li>
        </ul>

        <ul className="mr-2 flex items-center gap-4 text-sm text-zinc-400 lg:mr-0 lg:gap-8">
          {/* <Button
            className="flex items-center gap-1 hover:text-white lg:hidden"
            Icon={<TbUser className="text-2xl text-yellow-500" />}
            href={"/login"}
          /> */}

          {user ? <Button
            className="flex items-center gap-1 hover:text-white"
            Icon={<TbUser className="text-yellow-500" />}
            href={"/dashboard"}
            value={`${user.name}`}
          /> : <Button
          className="flex items-center gap-1 hover:text-white"
          Icon={<TbUser className="text-yellow-500" />}
          href={!user ? "/login" : "/dashboard"}
          value={"Entrar"}
        /> }
          

          <Button
            className="rounded-md border border-yellow-500 px-3 py-1 duration-500 ease-in-out hover:bg-yellow-500 hover:text-white"
            href={!user ? "/register" : "/dashboard"}
            value={"Criar Conta"}
          />
        </ul>
      </nav>

      <ul
        className={`
          ${stateMenu ? "fixed flex w-full" : "hidden"} 
          mt-20 flex-col items-start justify-center gap-4 bg-zinc-800 p-4 text-xl font-semibold text-zinc-400 lg:hidden`}
      >
        <li onClick={handleClickButtonMenu}>
          <a href={"#home"} className="hover:text-white">
            Home
          </a>
        </li>

        <li onClick={handleClickButtonMenu}>
          <a href={"#about"} className="hover:text-white">
            Sobre
          </a>
        </li>

        <li onClick={handleClickButtonMenu}>
          <a href={"#plans"} className="hover:text-white">
            {" "}
            Planos
          </a>
        </li>
        <li onClick={handleClickButtonMenu}>
          <a href={"#tools"} className="hover:text-white">
            Ferramentas
          </a>
        </li>
        <li onClick={handleClickButtonMenu}>
          <a href={"#contact"} className="hover:text-white">
            Contato
          </a>
        </li>
      </ul>

      <main>
        <section id="home" className="flex min-h-screen items-center justify-center bg-green-400 pt-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, hic ipsum? Voluptatum unde provident officia quam magnam
          accusamus. Mollitia omnis illo eligendi veniam itaque facilis neque tempore natus molestiae. Voluptatibus. Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Expedita, hic ipsum? Voluptatum unde provident officia quam magnam accusamus. Mollitia omnis
        </section>

        <section id="about" className="flex min-h-screen items-center justify-center bg-red-400 pt-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, hic ipsum? Voluptatum unde provident officia quam magnam
          accusamus. Mollitia omnis illo eligendi veniam itaque facilis neque tempore natus molestiae. Voluptatibus. Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Expedita, hic ipsum? Voluptatum unde provident officia quam magnam accusamus. Mollitia omnis
        </section>

        <section id="plans" className="flex min-h-screen items-center justify-center bg-blue-400 pt-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, hic ipsum? Voluptatum unde provident officia quam magnam
          accusamus. Mollitia omnis illo eligendi veniam itaque facilis neque tempore natus molestiae. Voluptatibus. Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Expedita, hic ipsum? Voluptatum unde provident officia quam magnam accusamus. Mollitia omnis
          illo eligendi veniam itaque facilis neque tempore natus molestiae. Voluptatibus. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Expedita, hic ipsum? Voluptatum unde provident officia quam magnam accusamus. Mollitia omnis illo eligendi
          veniam itaque facilis neque tempore natus molestiae. Voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Expedita, hic ipsum? Voluptatum unde provident officia quam magnam accusamus. Mollitia omnis illo eligendi veniam itaque facilis
        </section>

        <section id="tools" className="flex min-h-screen items-center justify-center bg-gray-400 pt-2">
          Ferramentas
        </section>

        <footer id="contact" className="flex min-h-screen items-center justify-center bg-cyan-400 pt-2">
          Contato
        </footer>
      </main>

      <button
        className={`${stateDisplay} z-2 fixed bottom-7 right-7 rounded-full bg-yellow-500 text-4xl text-black hover:bg-yellow-600 hover:font-semibold hover:text-zinc-950`}
        onClick={handleClickButtonTop}
      >
        <TiChevronRightOutline className="-rotate-90" />
      </button>
    </>
  );
}
