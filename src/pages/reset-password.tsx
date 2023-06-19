import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import useAuthFirebase from "@/hook/useAuthFirebase";
import { HiLockClosed } from "react-icons/hi";
import { IoEye, IoEyeOff } from "react-icons/io5";
import router from "next/router";

const forgotPasswordSchema = z.object({
  password: z.string().min(8, "A senha precisa de no mínimo 8 caracteres!"),
});

type SignFormData = z.infer<typeof forgotPasswordSchema>;

export default function Reset() {
  const [stateTooglePassword, setStateTooglePassword] = useState(true);
  const { loading, confirmPassword } = useAuthFirebase();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
    setError,
  } = useForm<SignFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const oobCode = useRef<string | null>(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(router.asPath.split(/\?/)[1]);
    oobCode.current = queryParams.get("oobCode");

    if (!oobCode.current) {
      router.push("/");
    }
  }, []);

  const handleConfirm: SubmitHandler<SignFormData> = async (values) => {
    try {
      await confirmPassword?.(oobCode, values.password);
    } catch (error) {
      setError('root', {
        message: "Senha inválida.Digite outra!",
      });

      router.push("/");
    }
  };

  function handleClickEyePassword() {
    setStateTooglePassword(!stateTooglePassword);
  }

  useEffect(() => {
    setFocus("password");
  }, [setFocus]);

  if (!oobCode.current) {
    return null;
  }

  return (
    <section id="recover" className="flex h-screen w-full items-center justify-center bg-zinc-900 lg:px-64">
      <div className="flex flex-col items-center justify-center  lg:w-6/12 lg:justify-center">
        <h2 className="mt-2 text-center text-2xl font-extrabold text-zinc-100">Digite a nova senha</h2>
        <form onSubmit={handleSubmit(handleConfirm)} className="mx-4 flex w-full max-w-sm flex-col rounded-xl p-6">
          <div className="flex flex-col">
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

          <button
            type="submit"
            className="mt-6 rounded-md bg-yellow-500 py-2 text-lg text-zinc-800 opacity-50 hover:bg-yellow-600 hover:font-semibold hover:text-zinc-950 hover:opacity-100"
          >
            Confirmar
          </button>
          
          {errors.root && <span className="mt-2 text-center text-sm font-semibold text-red-500"> {errors.root?.message} </span>}

          <hr className="mt-7 w-full border-zinc-800" />
        </form>
        <Link href={"/login"} className=" text-sm text-zinc-500 duration-300 ease-in-out hover:text-zinc-800">
          Login
        </Link>
      </div>
    </section>
  );
}
