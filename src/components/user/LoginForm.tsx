"use client";
import ListErrors from "@/components/common/ListErrors";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const { login } = useAuth();
  const router = useRouter();
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const resp = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            email,
            password,
          },
        }),
      });

      const data = await resp.json();
      if (resp.ok) {
        login(data.user.token);
        router.push("/");
      } else {
        setErrors(data.errors);
      }
    } finally {
      setIsLoading(false);
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
            disabled={isLoading}
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
            disabled={isLoading}
          />
        </fieldset>
        <button
          className="btn btn-lg btn-primary pull-xs-right"
          data-testid="btn-submit"
          disabled={isLoading}
        >
          Sign in
        </button>
      </form>
    </>
  );
};
export default LoginForm;
