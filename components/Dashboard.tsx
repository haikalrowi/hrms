"use client";

import { UserContext, UserContextType } from "@/context/Dashboard";
import { userLogout } from "@/lib/action";
import { Box, Button, Flex, Text } from "@radix-ui/themes";
import { useState } from "react";

export function Dashboard(props: UserContextType) {
  const pages =
    (props.isManager && [
      {
        title: "Main",
        content: <div>Manager main</div>,
      },
      {
        title: "Task",
        content: <div>Task</div>,
      },
      {
        title: "Employee",
        content: <div>Employee</div>,
      },
    ]) ||
    (props.isEmployee && [
      {
        title: "Main",
        content: <div>Employee main</div>,
      },
      {
        title: "Task",
        content: <div>Task</div>,
      },
    ]) ||
    [];
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const logout = async () => {
    await userLogout();
  };

  return (
    <UserContext.Provider value={{ ...props }}>
      <Flex height={"100dvh"} gap={"6"} px={"5"} py={"4"}>
        <Flex direction={"column"} gap={"3"} width={"20%"}>
          {pages.map((page, index) => {
            const changePage = () => {
              setCurrentPageIndex(index);
            };
            return (
              <Button
                size={"3"}
                key={index}
                variant="ghost"
                onClick={changePage}
                style={{
                  backgroundColor:
                    index === currentPageIndex ? "var(--accent-a4)" : undefined,
                  justifyContent: "start",
                }}
              >
                {page.title}
              </Button>
            );
          })}
          <Box flexGrow={"1"} />
          <Text>{props.user?.email}</Text>
          <Button
            size={"3"}
            variant="ghost"
            style={{ justifyContent: "start" }}
            onClick={logout}
          >
            Logout
          </Button>
        </Flex>
        <Box width={"80%"}>{pages[currentPageIndex].content}</Box>
      </Flex>
    </UserContext.Provider>
  );
}
