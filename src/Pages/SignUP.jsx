import { Link, useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { useState } from "react";
import axios from "axios";

const SignUP = () => {
  const [user, setUser] = useState({ name: "", mail: "", password: "" });
  const [invalidData, setInvalidData] = useState(false);
  const [mailExists, setMailExists] = useState(false);

  const navigate = useNavigate();

  const signUp = (e) => {
    e.preventDefault();
    setInvalidData(!/^[A-Za-z]+$/.test(user.name));
    if (!invalidData) {
      const config = {
        url: "http://localhost:3000/users",
        method: "get",
      };
      axios(config).then((response) => {
        const userExists = response.data.some(
          (person) => user.mail === person.mail
        );
        if (userExists) {
          setMailExists(true);
        } else {
          const config = {
            url: "http://localhost:3000/users",
            method: "post",
            data: user,
          };
          axios(config);
          navigate("/sign-in");
        }
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-[100vh] gap-3">
      <div className="bg-black p-7 rounded-lg text-center text-xl w-[70%] lg:w-[40%]">
        <div className="text-white font-bold">Sign Up</div>
        <div className="text-red-500 text-sm">
          {invalidData && "Username must contain only alphabetical letters"}
        </div>
        <div className="text-red-500 text-sm">
          {mailExists && "User already exists try to sign in"}
        </div>
      </div>
      <form
        onSubmit={signUp}
        className="flex flex-col justify-center items-center bg-[#2A2D3E] gap-5 rounded-lg p-10 w-[70%] lg:w-[40%]"
      >
        <label className="w-full">
          <input
            required
            minLength={3}
            type="text"
            placeholder="Username"
            className="bg-[#3B3F50] text-[#D1D5DB] p-2 rounded-md outline-none w-full"
            value={user.name}
            onChange={(e) => {
              setUser({ ...user, name: e.target.value });
            }}
          />
        </label>
        <label className="w-full">
          <input
            required
            type="email"
            placeholder="Email"
            className="bg-[#3B3F50] text-[#D1D5DB] p-2 rounded-md outline-none w-full"
            value={user.mail}
            onChange={(e) => {
              setUser({ ...user, mail: e.target.value });
            }}
          />
        </label>
        <label className="w-full">
          <input
            required
            minLength={8}
            type="text"
            placeholder="Password"
            className="bg-[#3B3F50] text-[#D1D5DB] p-2 rounded-md outline-none w-full"
            value={user.password}
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
            }}
          />
        </label>
        <Button type="submit" className="bg-blue-800 w-full">
          {" "}
          sign up{" "}
        </Button>
        <p className="text-[#D1D5DB] text-sm">
          Already Have an Account?
          <Link to="/sign-in" className="text-[#4F46E5] hover:underline inline">
            {" "}
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUP;
