import { Logo } from "@/components/Logo";
import { IoEye, IoEyeOff } from "react-icons/io5";
import Return from "../assets/svgs/Return.svg";
import { MdEmail } from "react-icons/md";
import { FaUserTie } from "react-icons/fa";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { HiLockClosed } from "react-icons/hi";
import { z } from "zod";

import { useEffect, useState } from "react";
import Link from "next/link";

import useAuthFirebase from "@/hook/useAuthFirebase";

const signUpFormSchema = z
  .object({
    email: z.string().nonempty("O email é obrigatório!").email("Formato de email inválido!"),
    name: z
      .string()
      .nonempty("O nome é obrigatório!")
      .min(2, "O nome precisa ter mais que 2 caracteres!")
      .max(20, "O nome precisa ter menos que 20 caracteres!")
      .transform((value) => value.split(/\s+/g)[0]),
    password: z.string().min(6, "A senha precisa de no mínimo 6 caracteres!"),
    confirmPassword: z.string().min(6, "A senha precisa de no mínimo 6 caracteres!"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas precisam ser iguais!",
    path: ["confirmPassword"],
  });

type SignFormData = z.infer<typeof signUpFormSchema>;

export default function Register() {
  const [stateTooglePassword, setStateTooglePassword] = useState(true);
  const [stateToogleConfirmPassword, setStateToogleConfirmPassword] = useState(true);
  const { signup } = useAuthFirebase();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
    setError,
  } = useForm<SignFormData>({
    resolver: zodResolver(signUpFormSchema),
  });

  useEffect(() => {
    setFocus("email");
  }, [setFocus]);

  // console.log(errors);

  function handleClickEyePassword() {
    setStateTooglePassword(!stateTooglePassword);
  }

  function handleClickEyeConfirmPassword() {
    setStateToogleConfirmPassword(!stateToogleConfirmPassword);
  }

  const handleSignUp: SubmitHandler<SignFormData> = async (values) => {
    try {
      await signup?.(values.email, values.password, values.name);
    } catch (error) {
      setError("root", {
        message: "Registro Inválido. Confira os dados.",
      });
    }
  };

  return (
    <section id="signUp" className="flex h-screen w-full items-center justify-center bg-zinc-900 lg:px-64">
      <div className="hidden gap-16 lg:flex lg:w-6/12 lg:flex-col lg:items-center lg:justify-center">
        <Logo height={14} width={36} />

        <h1 className="text-center text-5xl font-extrabold text-zinc-100">
          Registre em <br /> nossa Plataforma
        </h1>
        <Link href={"/login"} className="text-cyan-500 duration-300 ease-in-out hover:text-cyan-800">
          <Return className="mr-2 inline" />
            Login
        </Link>
      </div>

      <div className="flex flex-col items-center justify-center space-y-4 lg:w-6/12 lg:justify-start">
        <div className="flex flex-col lg:hidden">
          <Logo height={8} width={20} />

          <Link href={"/login"} className="mt-4 text-cyan-500 duration-300 ease-in-out hover:text-cyan-800">
            <Return className="mr-2 inline" />
            Voltar para Login
          </Link>

          <h2 className="mt-2 text-center text-3xl font-extrabold text-zinc-100">Crie sua Conta</h2>
        </div>

        <form onSubmit={handleSubmit(handleSignUp)} className="mx-4 flex w-full max-w-sm flex-col rounded-xl p-6">
          <div className="flex flex-col">
            <div className="relative flex items-center">
              <MdEmail className="absolute left-4 text-cyan-700" />

              <input
                tabIndex={1}
                type="email"
                placeholder="Seu E-mail"
                className="flex-1 rounded-md bg-zinc-800 py-3 pl-10 text-sm text-zinc-300  placeholder:text-zinc-600 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                {...register("email")}
              />
            </div>
            {errors.email && <span className="text-sm text-zinc-300"> {errors.email.message} </span>}
          </div>

          <div className="mt-4 flex flex-col">
            <div className="relative flex items-center">
              <FaUserTie className="absolute left-4 text-cyan-700" />

              <input
                tabIndex={2}
                type="text"
                placeholder="Primeiro nome"
                minLength={2}
                maxLength={20}
                className="flex-1 rounded-md bg-zinc-800 py-3 pl-10 text-sm text-zinc-300  placeholder:text-zinc-600 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                {...register("name")}
              />
            </div>
            {errors.name && <span className="text-sm text-zinc-300"> {errors.name.message} </span>}
          </div>

          <div className="mt-4 flex flex-col">
            <div className="relative flex items-center">
              <HiLockClosed className="absolute left-4 text-cyan-700" />

              <input
                tabIndex={3}
                type={`${stateTooglePassword ? "password" : "text"}`}
                placeholder="Sua Senha"
                autoComplete="off"
                className="flex-1 rounded-md bg-zinc-800 py-3 pl-10 text-sm text-zinc-300  placeholder:text-zinc-600 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                {...register("password")}
              />
              <button type="button" className="absolute right-4 text-cyan-700" onClick={handleClickEyePassword}>
                {stateTooglePassword ? <IoEye /> : <IoEyeOff />}
              </button>
            </div>

            {errors.password && <span className="text-sm text-zinc-300"> {errors.password.message} </span>}
          </div>

          <div className="mt-4 flex flex-col">
            <div className="relative flex items-center">
              <HiLockClosed className="absolute left-4 text-cyan-700" />

              <input
                tabIndex={4}
                type={`${stateToogleConfirmPassword ? "password" : "text"}`}
                placeholder="Confirme sua Senha"
                autoComplete="off"
                className="flex-1 rounded-md bg-zinc-800 py-3 pl-10 text-sm text-zinc-300  placeholder:text-zinc-600 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                {...register("confirmPassword")}
              />
              <button type="button" className="absolute right-4 text-cyan-700" onClick={handleClickEyeConfirmPassword}>
                {stateToogleConfirmPassword ? <IoEye /> : <IoEyeOff />}
              </button>
            </div>

            {errors.confirmPassword && <span className="text-sm text-zinc-300"> {errors.confirmPassword.message} </span>}
          </div>

          <input
            tabIndex={5}
            type="submit"
            value={"Cadastrar"}
            className="mt-6 cursor-pointer rounded-md bg-cyan-500 py-2 text-lg text-zinc-800 opacity-50 duration-200 ease-in-out hover:bg-cyan-600 hover:font-semibold hover:text-black hover:opacity-100"
          />
          {errors.root && <span className="mt-2 text-center text-sm font-semibold text-red-500"> {errors.root?.message} </span>}

          <hr className="mt-7 w-full border-zinc-800" />

          <span className="mt-8 text-center text-sm text-white">
            Ao se registrar, você aceita nossos{" "}
            <Link href={"/register"} className="text-cyan-500" tabIndex={6}>
              termos de uso
            </Link>{" "}
            e a nossa{" "}
            <Link href={"/register"} className="text-cyan-500" tabIndex={7}>
              política de privacidade.
            </Link>
          </span>
        </form>
      </div>
    </section>
  );
}
