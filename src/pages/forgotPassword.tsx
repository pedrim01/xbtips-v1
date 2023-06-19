import { MdEmail } from "react-icons/md";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import swal from 'sweetalert';
import { useEffect, useState } from "react";
import Link from "next/link";
import useAuthFirebase from "@/hook/useAuthFirebase";

const forgotPasswordSchema = z.object({
  email: z.string().nonempty("O email é obrigatório!").email("Formato de email inválido!"),
});

type SignFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPassword() {
  const { recoverPassword } = useAuthFirebase();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setFocus,
    
  } = useForm<SignFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  useEffect(() => {
    setFocus("email");
  }, [setFocus]);
  const [msg,setMsg] = useState('')
  const handleRecover: SubmitHandler<SignFormData> = async (values) => {
    try {
      await recoverPassword?.(values.email);
      swal("Verifique sua Caixa de Entrada ou seu Lixo Eletrônico para encontrar o e-mail de recuperação da senha!")
    } catch (error) {
      setError("root", {
        message: "Email não cadastrado!",
      });
    }
  };

  return (
    <section id="recover" className="flex h-screen w-full items-center justify-center bg-zinc-900 lg:px-64">
      <div className="flex flex-col items-center justify-center  lg:w-6/12 lg:justify-center">
        <h2 className="mt-2 text-center text-2xl font-extrabold text-zinc-100">Recuperar Senha</h2>
        <form onSubmit={handleSubmit(handleRecover)} className="mx-4 flex w-full max-w-sm flex-col rounded-xl p-6">
          <div className="flex flex-col">
            <div className="relative flex items-center">
              <MdEmail className="absolute left-4 text-zinc-700" />

              <input
                type="email"
                placeholder="Digite seu e-mail"
                className="flex-1 rounded-md bg-zinc-800 py-3 pl-10 text-sm text-zinc-300  placeholder:text-zinc-600 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
                {...register("email")}
              />
            </div>
            {errors.email && <span className="text-sm text-zinc-300"> {errors.email.message} </span>}
          </div>

          <button
            type="submit"
            className="mt-6 rounded-md bg-yellow-500 py-2 text-lg text-zinc-800 opacity-50 hover:bg-yellow-600 hover:font-semibold hover:text-zinc-950 hover:opacity-100"
          >
            Recuperar
          </button>

         

          {errors.root && <span className="mt-2 text-center text-sm font-semibold text-red-500"> {errors.root?.message} </span>}

          <hr className="mt-7 w-full border-zinc-800" />
        </form>
        <Link href={"/login"} className=" text-sm text-zinc-500 duration-300 ease-in-out hover:text-zinc-800">
          Voltar
        </Link>
      </div>
    </section>
  );
}
