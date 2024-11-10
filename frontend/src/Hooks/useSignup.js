import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../Context/AuthContext";

export const useSignup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signup = async ({
    fullName,
    userName,
    password,
    confirmPassword,
    gender,
  }) => {
    const success = handleInputError({
      fullName,
      userName,
      password,
      confirmPassword,
      gender,
    });

    if (!success) {
      return;
    }
    setIsLoading(true);

    try {
      const payload = {
        fullName,
        userName,
        password,
        confirmPassword,
        gender,
      };

      const res = await fetch(`/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      //LocalStorage
      localStorage.setItem("chat-user", JSON.stringify(data));

      //context
      setAuthUser(data);

      console.log(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, signup };
};

let handleInputError = ({
  fullName,
  userName,
  password,
  confirmPassword,
  gender,
}) => {
  // Check all the fields are filled
  if (!fullName || !userName || !password || !confirmPassword || !gender) {
    toast.error("Please fill in all fields");
    return false;
  }

  // Check Password and Confirm Password are same or not
  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }

  // Checking the password length
  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }

  // If all the conditions are fullfilled the function continues...
  return true;
};
