import { motion } from "framer-motion";
import { MdLogin } from "react-icons/md";
import Balance from "react-wrap-balancer";

import { Link as LinkScrool } from "react-scroll";
import Image from "next/image";
import Link from "next/link";
import { BsChevronRight } from "react-icons/bs";
import { TiChevronRightOutline } from "react-icons/ti";

import { useEffect, useState } from "react";

import { Logo } from "@/components/Logo";
import { TbUser } from "react-icons/tb";
import Button from "@/components/Button";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { MiniLogo } from "@/components/MiniLogo";
import useAuthFirebase from "@/hook/useAuthFirebase";
import { HeroPattern } from "@/components/HeroPattern";
import { Underline, UnderlineTipo2 } from "@/components/Underline";

export default function Home() {
  const [stateDisplay, setStateDisplay] = useState<"flex" | "hidden">("hidden");
  const [stateMenu, setStateMenu] = useState(false);
  const { user } = useAuthFirebase();

  function handleClickButtonTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  function handleClickButtonMenu() {
    setStateMenu(!stateMenu);
  }

  function handleScrollY() {
    window.scrollY > 100 ? setStateDisplay("flex") : setStateDisplay("hidden");
  }

  useEffect(() => {
    document.addEventListener("scroll", handleScrollY);

    return () => {
      document.removeEventListener("scroll", handleScrollY);
    };
  }, []);

  return (
    <>
      <nav className="fixed left-0 right-0 top-0 z-20 flex h-20 w-full items-center justify-between bg-zinc-900 shadow-sm shadow-zinc-950 lg:justify-around">
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

          <li className="relative">
            <a className="cursor-default opacity-30 hover:text-white">Planos</a>

            <div className="free-div absolute bottom-4 left-8 p-1 text-xs  font-bold text-green-500">
              <span className="animate-pulse">FREE</span>
            </div>
          </li>

          <li>
            <a href={"#about"} className="hover:text-white">
              {" "}
              Sobre Nós
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

          {user ? (
            <Button
              className="flex items-center gap-1 hover:text-white"
              Icon={<TbUser className="text-yellow-500" />}
              href={"/dashboard"}
              value={`${user.name}`}
            />
          ) : (
            <Button
              className="flex items-center gap-1 hover:text-white"
              Icon={<TbUser className="text-yellow-500" />}
              href={!user ? "/login" : "/dashboard"}
              value={"Entrar"}
            />
          )}

          <Button
            className="rounded-md border border-yellow-500 px-3 py-1 duration-500 ease-in-out hover:bg-yellow-500 hover:text-white"
            href={!user ? "/register" : "/dashboard"}
            value={"Criar Conta"}
          />
        </ul>
      </nav>

      <ul
        className={`transition-transform duration-300 ease-in-out
          ${stateMenu ? "translate-y-0" : "invisible -translate-y-full"} 
          fixed z-20 mt-20 flex w-full flex-col items-start justify-center gap-4 bg-zinc-900 p-4 text-xl font-semibold text-zinc-200 opacity-90 lg:hidden
          
          `}
      >
        <LinkScrool
          to={"home"}
          onClick={handleClickButtonMenu}
          className="flex w-1/2 cursor-pointer items-center justify-around rounded-md px-4 py-2 duration-300 ease-in-out hover:bg-zinc-900 hover:text-white"
        >
          <span className="flex-1"> Home</span>
          <BsChevronRight className="text-sm tracking-tighter" />
        </LinkScrool>

        <LinkScrool to={""} className="relative flex w-1/2 cursor-default items-center justify-around rounded-md px-4 py-2">
          <span className="flex-1 opacity-30">Planos</span>
          <div className="free-div absolute bottom-4 left-24 p-1 text-sm  font-black text-lime-600">
            <span className="animate-pulse">FREE</span>
          </div>

          {/* <BsChevronRight className="text-sm tracking-tighter" /> */}
        </LinkScrool>

        <LinkScrool
          onClick={handleClickButtonMenu}
          className="flex w-1/2 cursor-pointer items-center justify-around rounded-md px-4 py-2 duration-300 ease-in-out hover:bg-zinc-900 hover:text-white"
          to={"about"}
        >
          <span className="flex-1">Sobre Nós</span>

          <BsChevronRight className="text-sm tracking-tighter" />
        </LinkScrool>

        <LinkScrool
          onClick={handleClickButtonMenu}
          className="flex w-1/2 cursor-pointer items-center justify-around rounded-md px-4 py-2 duration-300 ease-in-out hover:bg-zinc-900 hover:text-white"
          to={"tools"}
        >
          <span className="flex-1"> Ferramentas</span>

          <BsChevronRight className="text-sm tracking-tighter" />
        </LinkScrool>

        <LinkScrool
          onClick={handleClickButtonMenu}
          className="flex w-1/2 cursor-pointer items-center justify-around rounded-md px-4 py-2 duration-300 ease-in-out hover:bg-zinc-900 hover:text-white"
          to={"contact"}
        >
          <span className="flex-1"> Contato</span>

          <BsChevronRight className="text-sm tracking-tighter" />
        </LinkScrool>
      </ul>

      <main className="min-w-[400px]">
        <section
          id="home"
          style={{
            backgroundImage: `url('/images/capaDefault.svg')`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
          }}
          className="flex min-h-screen items-center justify-center bg-zinc-800 pt-20"
        >
          <div className="flex flex-col items-center">
            <h1 className="mt-8 max-w-[720x] text-center text-5xl font-extrabold leading-tight tracking-tight text-zinc-300 max-lg:text-4xl">
              <Balance>
                Potencialize suas{" "}
                <span className="relative">
                  apostas <Underline className="absolute left-[0%] w-full" />
                </span>
                e alcance resultados extraordinários
              </Balance>
            </h1>

            <HeroPattern className="absolute bottom-1/2 left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2" />

            <p className="mt-8 max-w-2xl text-center text-2xl font-normal leading-7 tracking-tight text-zinc-500 max-lg:text-xl">
              <Balance>
                Nossa Plataforma busca explorar diversos mercados esportivos. Ouvimos suas sugestões para aprimorar nossas estratégias.
              </Balance>
            </p>

            <p className="mt-4 max-w-[720x] text-center text-2xl font-bold leading-7 tracking-tight text-zinc-400 max-lg:text-xl">
              <Balance>
                JUNTE-SE AO NOSSO TIME DE{" "}
                <span className="relative">
                  VENCEDORES!!!
                  <UnderlineTipo2 className="absolute left-[0%]  w-full" />
                </span>
              </Balance>
            </p>

            <Button
              className="z-1 relative mt-10 flex items-center rounded-md border-2 border-cyan-300 bg-zinc-400 px-6 py-3 font-bold text-zinc-950 duration-300 ease-in-out hover:border-yellow-300 hover:text-zinc-950 hover:opacity-70 max-lg:px-3 max-lg:py-3"
              href={!user ? "/login" : "/dashboard"}
              value={"BORA PRA CIMA!"}
            >
              <MdLogin className="ml-4 text-2xl" />
            </Button>

            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.8 }}
              className="my-20 mt-4 max-w-[720px] text-center text-xl font-extrabold leading-tight tracking-tight text-zinc-300 max-lg:text-lg"
            >
              <Balance>
                Acesso <span className="animate-pulse font-bold text-green-500">TOTAL</span> à Plataforma:{" "}
                <span className="animate-pulse font-bold text-green-500">GRATUITO!!!</span>
              </Balance>
              <div className="mt-2 max-lg:mt-0"> (Oferta de Lançamento)</div>
            </motion.h2>
          </div>
        </section>

        {/* <section id="plans" className="flex min-h-screen items-center justify-center bg-zinc-900 pt-20">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, hic ipsum? Voluptatum unde provident officia quam magnam
          accusamus. Mollitia omnis illo eligendi veniam itaque facilis neque tempore natus molestiae. Voluptatibus. Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Expedita, hic ipsum? Voluptatum unde provident officia quam magnam accusamus. Mollitia omnis
        </section> */}

        <section id="about" className="flex min-h-screen items-center justify-center bg-blue-400 pt-20">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, hic ipsum? Voluptatum unde provident officia quam magnam
          accusamus. Mollitia omnis illo eligendi veniam itaque facilis neque tempore natus molestiae. Voluptatibus. Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Expedita, hic ipsum? Voluptatum unde provident officia quam magnam accusamus. Mollitia omnis
          illo eligendi veniam itaque facilis neque tempore natus molestiae. Voluptatibus. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Expedita, hic ipsum? Voluptatum unde provident officia quam magnam accusamus. Mollitia omnis illo eligendi
          veniam itaque facilis neque tempore natus molestiae. Voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Expedita, hic ipsum? Voluptatum unde provident officia quam magnam accusamus. Mollitia omnis illo eligendi veniam itaque facilis
        </section>

        <section id="tools" className="flex min-h-screen items-center justify-center bg-gray-400 pt-20">
          Ferramentas
        </section>

        <footer id="contact" className="flex min-h-screen items-center justify-center bg-cyan-400 pt-20">
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
