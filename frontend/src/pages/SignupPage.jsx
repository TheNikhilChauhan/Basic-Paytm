import { useState } from "react";
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
            label={firstname}
            onChange={(e) => e.target.value}
            placeholder={"Firstname"}
          />
          <Input
            label={lastname}
            onChange={(e) => e.target.value}
            placeholder={"Lastname"}
          />
          <Input
            label={email}
            onChange={(e) => e.target.value}
            placeholder={"Email"}
          />
          <Input
            label={password}
            onChange={(e) => e.target.value}
            placeholder={"Password"}
          />
          <div>
            <Button label={"Register"} />
          </div>
          <BottomWarning
            label={"Already have an account?"}
            buttonText={"Sign In"}
          />
        </div>
      </div>
    </div>
  );
};
