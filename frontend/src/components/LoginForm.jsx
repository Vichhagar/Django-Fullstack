import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import Logo from "../assets/Logo.png";

export default function LoginForm({route}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegisterRoute = () => {
        navigate("/register");
    }

    const handleSubmit = async e => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post(route, {username, password});
            localStorage.setItem(ACCESS_TOKEN, res.data.access);
            localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
            navigate("/");
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
              alt="Company Logo"
            />
            <h2 className="mt-5 text-center text-4xl font-bold leading-9 tracking-tight text-cs-grey">
              Login
            </h2>
          </div>
  
          <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
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
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    
                  </label>
                  <div className="text-sm">
                    <a href="#" className="font-semibold text-cs-grey hover:text-cs-grey">
                      Forgot password?
                    </a>
                  </div>
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-cs-primary px-3 py-1.5 text-sm font-semibold leading-6 text-cs-white shadow-sm hover:bg-cs-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cs-secondary"
                >
                  Login
                </button>
              </div>
            </form>
  
            <p className="mt-10 text-center text-sm text-cs-gray">
              Not a member yet?
              <a href="#" className="font-semibold leading-6 text-cs-primary hover:text-cs-secondary" onClick={handleRegisterRoute}>
              &nbsp;Register
              </a>
            </p>
          </div>
        </div>
      </>
    )
  }