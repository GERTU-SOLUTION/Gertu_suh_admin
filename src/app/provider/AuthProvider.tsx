/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useJwt } from "react-jwt";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const token =
    (typeof window != "undefined" && localStorage.getItem("token")) || "";
  const { isExpired } = useJwt(token!);
  const router = useRouter();
  useEffect(() => {
    if (!token || isExpired) {
      router.push("/Login");
    }
  }, [token, isExpired]);

  return children;
};

export default AuthProvider;