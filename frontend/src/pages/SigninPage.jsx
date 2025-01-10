import { Heading } from "../components/Heading";
import { Input } from "../components/Input";
import { SubHeading } from "../components/SubHeading";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import { useState } from "react";

export const SinginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className=" bg-gradient-to-r from-gray-800 to-gray-600 h-screen flex justify-center ">
      <div className="flex flex-col justify-center ">
        <div className="bg-black text-white p-8 rounded-lg text-center h-max">
          <Heading label={"Sign In"} />
          <SubHeading label={"Enter your credentials to access your account"} />

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
            <Button label={"Login"} />
          </div>
          <BottomWarning
            label={"Don't have an account?"}
            buttonText={"Sign Up"}
          />
        </div>
      </div>
    </div>
  );
};
