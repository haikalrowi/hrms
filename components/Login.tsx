"use client";

import { userLogin } from "@/lib/action";
import { Avatar, Card, Container, Flex, TextField } from "@radix-ui/themes";
import { SubmitButton } from "./ui/submit-button";

export function Login() {
  return (
    <Container height={"100dvh"}>
      <Flex
        direction={"column"}
        align={"center"}
        justify={"center"}
        height={"100%"}
      >
        <Card size={"3"}>
          <Flex
            asChild
            direction={"column"}
            gap={"2"}
            width={"calc(var(--space-5)*9)"}
          >
            <form action={userLogin}>
              <Flex justify={"center"} mb={"3"}>
                <Avatar size={"9"} radius="full" fallback="A" />
              </Flex>
              <TextField.Root type="email" placeholder="Email" name="email" />
              <TextField.Root
                type="password"
                placeholder="Password"
                name="password"
              />
              <Flex direction={"column"} mt={"2"}>
                <SubmitButton>Login</SubmitButton>
              </Flex>
            </form>
          </Flex>
        </Card>
      </Flex>
    </Container>
  );
}
