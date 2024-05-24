import * as jose from "jose";

const secret = new TextEncoder().encode(
  process.env.POSTGRES_PASSWORD ?? "661169503544",
);
const alg = "HS256";

type Payload = { id: string };

export async function sign(payload: Payload) {
  const token = new jose.SignJWT(payload);
  return token.setProtectedHeader({ alg }).sign(secret);
}

export async function verify(token: string) {
  const { payload } = await jose.jwtVerify<Payload>(token, secret);
  return payload;
}
