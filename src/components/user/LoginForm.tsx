"use client";
import ListErrors from "@/components/common/ListErrors";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { StatusEnum, useFetch } from "@/hooks/useFetch";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { status, loading, data, errors, request } = useFetch();

  const { login } = useAuth();
  const router = useRouter();
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = { user: { email, password } };
    await request("/users/login", "POST", formData);

    if (status === StatusEnum.success) {
      login(data.user.token);
      router.push("/");
    }
  };

  return (
    <>
      <ListErrors errors={errors} />
      <form onSubmit={handleFormSubmit}>
        <fieldset className="form-group">
          <input
            className="form-control form-control-lg"
            type="text"
            name="email"
            placeholder="Email"
            data-testid="input-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
        </fieldset>
        <fieldset className="form-group">
          <input
            className="form-control form-control-lg"
            type="password"
            name="password"
            placeholder="Password"
            data-testid="input-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
        </fieldset>
        <button
          className="btn btn-lg btn-primary pull-xs-right"
          data-testid="btn-submit"
          disabled={loading}
        >
          Sign in
        </button>
      </form>
    </>
  );
};
export default LoginForm;
