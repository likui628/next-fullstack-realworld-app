import jwt from "jsonwebtoken";
import { headers } from "next/headers";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "token secret key";

const TOKEN_ALG = "HS256";

const TOKEN_PREFIX = "Bearer ";

interface AuthPayload {
  sub: string;
  user: string;
}

export function issueToken(payload: AuthPayload) {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    algorithm: TOKEN_ALG,
    expiresIn: "2d",
  });
}

function verifyToken<T>(token: string) {
  const payload = jwt.verify(token, ACCESS_TOKEN_SECRET, { algorithms: [TOKEN_ALG] });
  return payload as T;
}

export function loadCurrentUser(authorization: string | null) {
  if (!authorization || !authorization.startsWith(TOKEN_PREFIX)) {
    return;
  }
  const token = authorization.split(TOKEN_PREFIX)[1];
  const payload = verifyToken<AuthPayload>(token);
  return payload.sub;
}

export function getUserId() {
  const headersList = headers();
  const token = headersList.get("Authorization");

  return loadCurrentUser(token);
}
