import { Link, useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { useState } from "react";
import axios from "axios";

const SignIN = ({ setName, setLoggedIn }) => {
  const [user, setUser] = useState({ mail: "", password: "" });
  const [mailExists, setMailExists] = useState(true);
  const [worngPass, setWrongPass] = useState(false);

  const navigate = useNavigate();

  const signIn = (e) => {
    e.preventDefault();
    const config = {
      method: "get",
      url: "http://localhost:3000/users",
    };
    let mailFound = false,
      passMatched = false,
      name = "";
    axios(config).then((res) => {
      res.data.forEach((item) => {
        if (item.mail === user.mail) {
          mailFound = true;
          if (item.password === user.password) {
            passMatched = true;
            name = item.name;
          }
        }
      });
      if (!mailFound) setMailExists(mailFound);
      else if (!passMatched) setWrongPass(!passMatched);
      else {
        setName(name);
        setLoggedIn(true);
        navigate("/");
      }
    });
  };
  return (
    <div className="flex flex-col items-center justify-center h-[100vh]  gap-3">
      <div className="bg-black p-7 rounded-lg text-center text-xl w-[70%] lg:w-[40%]">
        <div className="text-white font-bold">Sign in</div>
        <div className="text-red-500 text-sm">
          {!mailExists && "User doesn't exist, try to sign up"}
        </div>
        <div className="text-red-500 text-sm">
          {worngPass && "Wrong password"}
        </div>
      </div>
      <form
        onSubmit={signIn}
        className="flex flex-col justify-center items-center bg-[#2A2D3E] gap-5 rounded-lg p-10 w-[70%] lg:w-[40%]"
      >
        <label className="w-full">
          <input
            required
            type="text"
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
          Sign in{" "}
        </Button>
        <p className="text-[#D1D5DB] text-sm">
          Don't Have an Account?
          <Link to="/sign-up" className="text-[#4F46E5] hover:underline inline">
            {" "}
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignIN;
