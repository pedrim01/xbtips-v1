import { Logo } from "@/components/Logo";
import { IoEye, IoEyeOff } from "react-icons/io5";
import {IoLogoGoogle} from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { HiLockClosed } from "react-icons/hi";
import { z } from "zod";

import { useEffect, useState } from "react";
import Link from "next/link";
import Button from "@/components/Button";

const signInFormSchema = z.object({
  email: z.string().nonempty("O email é obrigatório!").email("Formato de email inválido!"),
  password: z.string().min(6, "A senha precisa de no mínimo 6 caracteres!"),
});

type SignFormData = z.infer<typeof signInFormSchema>;

export default function Signup() {
  const [stateTooglePassword, setStateTooglePassword] = useState(true);

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

  // console.log(errors);

  function handleClickEyePassword() {
    setStateTooglePassword(!stateTooglePassword);
  }

  const handleSignIn: SubmitHandler<SignFormData> = (values) => {
    console.log(values);
  };

  return (
    <section id="signIn" className="flex h-screen w-full items-center justify-center bg-zinc-900 lg:px-64">
      <div className="hidden gap-16 lg:flex lg:w-6/12 lg:flex-col lg:items-center lg:justify-center">
        <Logo height={14} width={36} />
        <h1 className="text-center text-5xl font-extrabold text-zinc-100">
          Faça seu Login <br /> na Plataforma
        </h1>
      </div>

      <div className="flex flex-col items-center justify-center space-y-4 lg:w-6/12 lg:flex-row lg:justify-start">
        <div className="lg:hidden">
          <Logo height={8} width={20} />
        </div>

        <form onSubmit={handleSubmit(handleSignIn)} className="mx-4 flex w-full max-w-sm flex-col rounded-xl p-6">
          <div className="flex flex-col">
            <div className="relative flex items-center">
              <MdEmail className="absolute left-4 text-yellow-700" />

              <input
                type="email"
                placeholder="E-mail"
                className="flex-1 rounded-md bg-zinc-800 py-3 pl-10 text-sm text-zinc-300  placeholder:text-zinc-600 focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500"
                {...register("email")}
              />
            </div>
            {errors.email && <span className="text-sm text-zinc-300"> {errors.email.message} </span>}
          </div>

          <div className="mt-4 flex flex-col">
            <div className="relative flex items-center">
              <HiLockClosed className="absolute left-4 text-yellow-700" />

              <input
                type={`${stateTooglePassword ? "password" : "text"}`}
                placeholder="Senha"
                autoComplete="off"
                className="flex-1 rounded-md bg-zinc-800 py-3 pl-10 text-sm text-zinc-300  placeholder:text-zinc-600 focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500"
                {...register("password")}
              />
              <button type="button" className="absolute right-4 text-yellow-700" onClick={handleClickEyePassword}>
                {stateTooglePassword ? <IoEye /> : <IoEyeOff />}
              </button>
            </div>

            {errors.password && <span className="text-sm text-zinc-300"> {errors.password.message} </span>}
          </div>

          <Link href={"/"} className="mt-2 text-sm text-yellow-700">
            Esqueci minha Senha
          </Link>

          <button
            type="submit"
            className="mt-6 rounded-md bg-yellow-500 py-2 text-lg text-zinc-800 opacity-50 hover:bg-yellow-600 hover:font-semibold hover:text-zinc-950 hover:opacity-100"
          >
            Entrar
          </button>

          <span className="mt-8 text-center text-sm text-white">
            Não tem uma conta?{" "}
            <Link href={"/signup"} className="text-yellow-500">
              Cadastre-se
            </Link>
          </span>

          <hr className="mt-7 w-full border-zinc-800" />

          <div className="mt-8 flex items-center text-start text-base text-white">
            Ou entre com
            <Button
              className="ml-8 flex-1 flex bg-zinc-800 items-center justify-center rounded-md border border-yellow-500 px-3 py-2 font-semibold duration-500 ease-in-out hover:bg-yellow-500 hover:text-white"
              Icon={<IoLogoGoogle className="text-yellow-700 mr-2" />}
              href={"/"}
              value={"GOOGLE"}
            />
          </div>
        </form>
      </div>
    </section>
  );
}
