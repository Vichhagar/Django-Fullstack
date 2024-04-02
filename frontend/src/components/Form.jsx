import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../style/Form.css";
import Loading from "./Loading";
import Logo from "../assets/Logo.png";

export default function Form({route, method}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = method === "login" ? "Login" : "Register";

    const handleRegisterRoute = () => {
        navigate("/register");
    }

    const handleLoginRoute = () => {
        navigate("/login")
    }

    const handleSubmit = async e => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post(route, {username, password});
            if(method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/");
            } else {
                navigate("/login");
            }
        } catch (error) {
            alert(error);
        } finally {
            setLoading(false);
        }
    }

    return (
      <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src={Logo}
              alt="Your Company"
            />
            <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-cs-grey">
              { method === "login" ? "Login to your account" : "Register new user" }
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Username
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-cs-primary placeholder:text-cs-grey focus:ring-2 focus:ring-inset focus:ring-cs-secondary sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  <div className="text-sm">
                    <a href="#" className="font-semibold text-cs-grey hover:text-cs-grey">
                      {/* {method === "login" && "Forgot password?"} */}
                    </a>
                  </div>
                </div>
                <div className="mt-1">
                  <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-cs-primary placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cs-secondary sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-cs-primary px-3 py-1.5 text-sm font-semibold leading-6 text-cs-white shadow-sm hover:bg-cs-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cs-secondary"
                >
                  { name }
                </button>
              </div>
            </form>
  
            <p className="mt-10 text-center text-sm text-cs-gray">
            { method === "login" ? "Not a member yet?" : "Already have an account" }
              {' '}
              <a href="#" className="font-semibold leading-6 text-cs-primary hover:text-cs-secondary" onClick={method === "login" ? handleRegisterRoute : handleLoginRoute}>
              { method === "login" ? "Register" : "Login" }
              </a>
            </p>
          </div>
        </div>
      </>
    )
  }