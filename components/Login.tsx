"use client";

import { userLogin } from "@/lib/action";
import { Button, Card, Container, Flex, TextField } from "@radix-ui/themes";

export function Login() {
  return (
    <Flex align={"center"} justify={"center"} height={"100dvh"}>
      <Container size={"1"}>
        <Card asChild size={"3"}>
          <form action={userLogin}>
            <Flex direction={"column"} gap={"1"}>
              <TextField.Root type="email" placeholder="Email" name="email" />
              <TextField.Root
                type="password"
                placeholder="Password"
                name="password"
              />
              <Button type="submit">Login</Button>
            </Flex>
          </form>
        </Card>
      </Container>
    </Flex>
  );
}
