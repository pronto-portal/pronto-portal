import { axiosInstance } from "./axiosInstances";
import Router from "next/router";
const signOut = async () => {
  const res = await axiosInstance.post("/data/signout").then((res) => {
    console.log("RESPONSE RECEIVED: ", res);
    Router.push("/login");
  });

  return res;
};

export default signOut;
