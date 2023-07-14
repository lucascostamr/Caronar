import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link, useNavigate} from "react-router-dom";

function LoginIndex() {
  const navigate = useNavigate();
  const [tipoUsuario, setTipoUsuario] = useState(null);
  const [error, setError] = useState(null);
  const [cpf, setCpf] = useState(null);
  // const [password, setPassword] = useState("");
  const [logged, setLogged] = useState(false);
  const [loading, setLoading] = useState(false);
      
  const LoginSubmit = (e) => {
    e.preventDefault();
  
    const request = cpf !== null ? new Request(`http://localhost:3001/api/user/${cpf}`, {
    method: "get",
    headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
    }
    }) : [];

    fetch(request)
      .then((res) => res.json())
      .then((userLoginData) => {

        if (userLoginData !== null) {
          setLogged(true);
        }
      })
      .catch((error) => {
        setError(['Usuario ou senha invalidos']);
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });

    setLoading(true);
  };

  const typeSubmmit = (e) => {
    e.preventDefault();
    console.log(tipoUsuario);
    if (tipoUsuario === "motorista") {
      navigate('/');
    }
  };

  const LoginImage =
    "https://www.iconpacks.net/icons/2/free-car-icon-2897-thumb.png";

  var content =
          <>
              {/* Login Section */}
              <div className="flex flex-col md:flex-1 items-center justify-center">
              <div className="loginWrapper flex flex-col w-full lg:px-36 md:px-8 px-8 md:py-8">
                {/* Login Header Text */}
                <div className="hidden md:block font-medium self-center text-xl sm:text-3xl text-gray-800">
                  Bem vindo de volta!
                </div>
  
                {/* Sparator */}
                <div className="hidden md:block relative mt-10 h-px bg-gray-300">
                  <div className="absolute left-0 top-0 flex justify-center w-full -mt-2">
                    <span className="bg-white px-4 text-xs text-gray-500 uppercase">
                      Login
                    </span>
                  </div>
                </div>
  
                <div className="md:hidden block my-4">
                  <h1 className="text-2xl font-semibold">Login</h1>
                </div>
  
                {/* Login Form */}
                <div className="md:mt-10 mt-4">
                  <form onSubmit={LoginSubmit}>
                    {/* Username */}
                    <div className="flex flex-col mb-3">
                      <div className="relative">
                        <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                          <FontAwesomeIcon icon={faEnvelope} />
                        </div>
  
                        <input
                          id="cpf"
                          type="text"
                          name="cpf"
                          onChange={(e) => setCpf(e.target.value)}
                          className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400"
                          placeholder="CPF"
                        />
                      </div>
                    </div>
  
                    {/* Password */}
                    <div className="flex flex-col mb-6">
                      <div className="relative">
                        <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                          <FontAwesomeIcon icon={faLock} />
                        </div>
  
                        <input
                          id="password"
                          type="password"
                          name="password"
                          // onChange={(e) => setPassword(e.target.value)}
                          className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400"
                          placeholder="Password"
                        />
                      </div>
                    </div>
                    {error !==null && (
                      <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                        {error[0]}
                      </span>
                    )}
                    {/* Forgot Password Link */}
                    <div className="flex items-center mb-6 -mt-2 md:-mt-4">
                      <div className="flex ml-auto">
                        <Link
                          to=""
                          onClick={(e) => {
                            e.preventDefault();
                          }}
                          className="inline-flex font-semibold text-xs sm:text-sm text-emerald-500 hover:text-emerald-700"
                        >
                          Esqueceu a senha?
                        </Link>
                      </div>
                    </div>
  
                    {/* Button Login */}
                    <div className="flex w-full">
                      <button
                        disabled={loading}
                        type="submit"
                        className="flex items-center justify-center focus:outline-none text-white text-sm bg-emerald-500 hover:bg-emerald-700 rounded-lg md:rounded md:py-2 py-3 w-full transition duration-150 ease-in"
                      >
                        <span className="mr-2 md:uppercase">
                          {loading ? "Processing...." : "Login"}
                        </span>
                      </button>
                    </div>
                  </form>
                </div>
  
                {/* Sparator */}
                <div className="relative mt-6 h-px bg-gray-300">
                  <div className="absolute left-0 top-0 flex justify-center w-full -mt-2">
                    <span className="bg-white px-4 text-xs text-gray-500 uppercase">
                      OU
                    </span>
                  </div>
                </div>
  
                {/* Social Button */}
                <div className="flex justify-between w-full mt-6">
                  <button
                    disabled={loading}
                    type="submit"
                    className="flex items-center justify-center focus:outline-none text-slate-500 text-sm bg-slate-200 rounded-lg md:rounded md:py-2 px-3 py-3 w-full transition duration-150 ease-in"
                  >
                    <FontAwesomeIcon icon={faGoogle} />
                    <span className="mr-2 flex-1">Login com Google</span>
                  </button>
                </div>
                <div className="flex justify-between w-full mt-2">
                  <button
                    disabled={loading}
                    type="submit"
                    className="flex items-center justify-center focus:outline-none text-slate-500 text-sm bg-slate-200 rounded-lg md:rounded md:py-2 px-3 py-3 w-full transition duration-150 ease-in"
                  >
                    <FontAwesomeIcon icon={faFacebook} />
                    <span className="mr-2 flex-1">Login com Facebook</span>
                  </button>
                </div>
                {/* End Social Button */}
  
                {/* Register Link */}
                <div className="flex justify-center items-center  my-6 md:mb-0">
                  <Link
                    to="/auth/register"
                    className="inline-flex items-center font-bold text-emerald-500 hover:text-emerald-700 text-xs text-center"
                  >
                    <span>
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
                      </svg>
                    </span>
                    <span className="ml-2">Nao tem uma conta?</span>
                  </Link>
                </div>
                {/* End Register Link */}
              </div>
            </div>
          </>

  if(logged) {
    content =
      <>
          {/* Login Section */}
          <div className="flex flex-col md:flex-1 items-center justify-center">
          <div className="loginWrapper flex flex-col w-full lg:px-36 md:px-8 px-8 md:py-8">
            {/* Login Header Text */}
            <div className="hidden md:block font-medium self-center text-xl sm:text-3xl text-gray-800">
              Voce deseja entrar como:
            </div>

            {/* Sparator */}
            <div className="hidden md:block relative mt-10 h-px bg-gray-300">
              <div className="absolute left-0 top-0 flex justify-center w-full -mt-2">
                <span className="bg-white px-4 text-xs text-gray-500 uppercase">
                  Tipo de Usuario
                </span>
              </div>
            </div>

            <div className="md:hidden block my-4">
              <h1 className="text-2xl font-semibold">Login</h1>
            </div>

            {/* Login Form */}
            <div className="md:mt-10 mt-4">
              <form onSubmit={typeSubmmit}>
                {/* Username */}
                <div className="flex flex-col mb-3">
                  <button
                    type="submit"
                    className="flex items-center justify-center focus:outline-none text-white text-sm bg-emerald-500 hover:bg-emerald-700 rounded-lg md:rounded md:py-2 py-3 w-full transition duration-150 ease-in"
                    onClick={(e) => setTipoUsuario("passageiro")}
                  >
                    <span className="mr-2 md:uppercase">
                      Passageiro
                    </span>
                  </button>
                  
                </div>
                <div className="flex flex-col mb-3">
                  <button
                    type="submit"
                    className="flex items-center justify-center focus:outline-none text-white text-sm bg-emerald-500 hover:bg-emerald-700 rounded-lg md:rounded md:py-2 py-3 w-full transition duration-150 ease-in"
                    onClick={(e) => setTipoUsuario("motorista")}
                  >
                    <span className="mr-2 md:uppercase">
                      Motorista
                    </span>
                  </button>
                 
                </div> 
              </form>
            </div>
            {/* End Register Link */}
          </div>
        </div>
      </>
  }
  return (
    <>
      <div className="flex min-h-screen">
        <div className="flex w-full flex-col md:flex-row">
          {/* Image */}
          <div className="md:bg-emerald-500 md:min-h-screen flex flex-wrap md:w-1/2">
            <div className="items-center text-center flex flex-col relative justify-center mx-auto">
              <img
                src={LoginImage}
                alt="Logo Login"
                className="md:w-72 w-48 mx-auto"
              />
              <div className="md:block hidden text-slate-100">
                <h1 className="font-semibold text-8xl pb-2">
                  Caronar
                </h1>
                <span className="text-2xl">
                  Caronas perto de voce
                </span>
              </div>
            </div>
          </div>
          {content}
        </div>
      </div>
    </>
  );
}

export default LoginIndex;
