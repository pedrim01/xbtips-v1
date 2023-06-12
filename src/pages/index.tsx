import { SubmitHandler, useForm } from "react-hook-form";
import { TiChevronRightOutline } from "react-icons/ti";
import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const signInFormSchema = z.object({
  email: z.string().nonempty("O email é obrigatório!").email("Formato de email inválido!"),
  password: z.string().min(6, "A senha precisa de no mínimo 6 caracteres!"),
});

type SignFormData = z.infer<typeof signInFormSchema>;

export default function Home() {
  const [stateDisplay, setStateDisplay] = useState<"flex" | "hidden">("hidden");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm<SignFormData>({
    resolver: zodResolver(signInFormSchema),
  });

  useEffect(() => {
    setFocus("email");
  }, [setFocus]);

  console.log(errors);

  const handleSignIn: SubmitHandler<SignFormData> = (values) => {
    console.log(values);
  };

  function handleClickButtonTop() {
    window.scrollTo(0, 0);
    window.location.href = "/";
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
      <nav className="z-1 fixed left-0 right-0 top-0 flex h-12 w-full justify-end bg-zinc-800 shadow-sm shadow-zinc-950">
        <ul className="mr-4 flex items-center justify-end gap-4 text-zinc-400">
          <li>
            <a href={"#about"} className="hover:text-zinc-100">
              Sobre
            </a>
          </li>
          <li>
            <a href={"#plans"} className="hover:text-zinc-100">
              {" "}
              Planos
            </a>
          </li>
          <li>
            <a href={"#tools"} className="hover:text-zinc-100">
              Ferramentas
            </a>
          </li>
          <li>
            <a href={"#contact"} className="hover:text-zinc-100">
              Contato
            </a>
          </li>
        </ul>
      </nav>

      <main>
        <section id="signIn" className="flex h-screen w-full items-center justify-center bg-zinc-900 pt-5">
          <div className="flex justify-center md:w-5/12 md:justify-end">
            <form onSubmit={handleSubmit(handleSignIn)} className="mx-4 flex w-full max-w-sm flex-col rounded-xl p-6">
              <div className="flex flex-col">
                <label htmlFor="email" className="font-medium text-zinc-400">
                  Email
                </label>
                <input
                  type="email"
                  className="rounded-md bg-zinc-800 p-3 text-sm text-zinc-300  focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500"
                  {...register("email")}
                />

                {errors.email && <span className="text-sm text-zinc-300"> {errors.email.message} </span>}
              </div>

              <div className="mt-4 flex flex-col">
                <label htmlFor="password" className="font-medium text-zinc-400">
                  Senha
                </label>
                <input
                  type="password"
                  className="rounded-md bg-zinc-800 p-3 text-sm text-zinc-300  focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500"
                  {...register("password")}
                />
                {errors.password && <span className="text-sm text-zinc-300"> {errors.password.message} </span>}
              </div>

              <button
                type="submit"
                className="mt-6 rounded-md bg-yellow-500 py-2 text-lg text-zinc-800 hover:bg-yellow-600 hover:font-semibold hover:text-zinc-950"
              >
                Entrar
              </button>
            </form>
          </div>

          <div className="hidden md:flex md:w-7/12 md:justify-center">
            <img src="https://source.unsplash.com/ramdom" alt="Img da Tela de Auth" className="h-full w-full object-cover" />
          </div>
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
