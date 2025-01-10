import { useState } from "react";
import axios from "axios";
import { Heading } from "../components/Heading";
import { Input } from "../components/Input";
import { SubHeading } from "../components/SubHeading";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";

export const SignupPage = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className=" bg-gradient-to-r from-gray-800 to-gray-600 h-screen flex justify-center ">
      <div className="flex flex-col justify-center ">
        <div className="bg-black text-white p-8 rounded-lg text-center h-max">
          <Heading label={"Sign Up"} />
          <SubHeading label={"Enter your information to create an account"} />
          <Input
            label={"Firstname"}
            onChange={(e) => setFirstname(e.target.value)}
            placeholder={"Firstname"}
          />
          <Input
            label={"Lastname"}
            onChange={(e) => setLastname(e.target.value)}
            placeholder={"Lastname"}
          />
          <Input
            label={"Email"}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={"Email"}
          />
          <Input
            label={"Password"}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={"Password"}
          />
          <div>
            <Button
              label={"Register"}
              onClick={async () => {
                const response = await axios.post(
                  "http://localhost:5000/api/v1/user/signup",
                  {
                    firstname,
                    lastname,
                    email,
                    password,
                  }
                );
                localStorage.setItem("token", response.data.token);
              }}
            />
          </div>
          <BottomWarning
            label={"Already have an account?"}
            buttonText={"Sign In"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
};
