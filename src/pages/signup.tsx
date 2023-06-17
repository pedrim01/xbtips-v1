import { Logo } from "@/components/Logo";
import { IoEye, IoEyeOff } from "react-icons/io5";
import Return from '../assets/svgs/Return.svg'
import { MdEmail } from "react-icons/md";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { HiLockClosed } from "react-icons/hi";
import { z, ZodType } from "zod";

import { useEffect, useState } from "react";
import Link from "next/link";

import useAuthFirebase from "@/hook/useAuthFirebase";

const signUpFormSchema = z
  .object({
    email: z.string().nonempty("O email é obrigatório!").email("Formato de email inválido!"),
    password: z.string().min(6, "A senha precisa de no mínimo 6 caracteres!"),
    confirmPassword: z.string().min(6, "A senha precisa de no mínimo 6 caracteres!"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas precisam ser iguais!",
    path: ["confirmPassword"],
  });

type SignFormData = z.infer<typeof signUpFormSchema>;

export default function SignUp() {
  const [stateTooglePassword, setStateTooglePassword] = useState(true);
  const [stateToogleConfirmPassword, setStateToogleConfirmPassword] = useState(true);
  const { signup } = useAuthFirebase();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
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
      
      console.log(values);
      await signup?.(values.email,values.password)
    } catch (error) {
      console.log(error)
      alert ("User created failed")
      alert(error); 
    }
  };

  return (
    <section id="signUp" className="flex h-screen w-full items-center justify-center bg-zinc-900 lg:px-64">
      <div className="hidden gap-16 lg:flex lg:w-6/12 lg:flex-col lg:items-center lg:justify-center">
        <Logo height={14} width={36} />

        <h1 className="text-center text-5xl font-extrabold text-zinc-100">
          Registre em <br /> nossa Plataforma
        </h1>
        <Link href={"/signin"} className="text-cyan-500 hover:text-cyan-800 ease-in-out duration-300">
          <Return className='inline mr-2' />
          Voltar para Login
        </Link>
      </div>

      <div className="flex flex-col items-center justify-center space-y-4 lg:w-6/12 lg:justify-start">
        <div className="flex flex-col lg:hidden">
          <Logo height={8} width={20} />
          
          <Link href={"/signin"} className="mt-4 text-cyan-500 hover:text-cyan-800 ease-in-out duration-300">
            <Return className='inline mr-2' />
            Voltar para Login
          </Link>
          
          <h2 className="mt-2 text-center text-3xl font-extrabold text-zinc-100">Crie sua Conta</h2>
          
        </div>

        <form onSubmit={handleSubmit(handleSignUp)} className="mx-4 flex w-full max-w-sm flex-col rounded-xl p-6">
          
          <div className="flex flex-col">
          
            <div className="relative flex items-center">
              <MdEmail className="absolute left-4 text-cyan-700" />

              <input
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
              <HiLockClosed className="absolute left-4 text-cyan-700" />

              <input
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

          <button
            type="submit"
            className="mt-6 rounded-md bg-cyan-500 py-2 text-lg text-zinc-800 opacity-50 duration-200 ease-in-out hover:bg-cyan-600 hover:font-semibold hover:text-black hover:opacity-100"
          >
            Cadastrar
          </button>

          <hr className="mt-7 w-full border-zinc-800" />

          <span className="mt-8 text-center text-sm text-white">
            Ao se registrar, você aceita nossos{" "}
            <Link href={"/signup"} className="text-cyan-500">
              termos de uso
            </Link>{" "}
            e a nossa{" "}
            <Link href={"/signup"} className="text-cyan-500">
              política de privacidade.
            </Link>
          </span>
        </form>
      </div>
    </section>
  );
}
