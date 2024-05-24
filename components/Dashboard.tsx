"use client";

import { UserContext, UserContextType } from "@/context/Dashboard";
import { userLogout } from "@/lib/action";
import { Box, Button, Flex, Separator, Text } from "@radix-ui/themes";
import { useState } from "react";
import { EmployeeTask } from "./Employee/Task";
import { ManagerEmployee } from "./Manager/Employee";
import { ManagerMain } from "./Manager/Main";
import { ManagerTask } from "./Manager/Task";
import { EmployeeMain } from "./Employee/Main";

export function Dashboard(props: UserContextType) {
  const pages =
    (props.isManager && [
      {
        title: "Main",
        content: <ManagerMain />,
      },
      {
        title: "Task",
        content: <ManagerTask />,
      },
      {
        title: "Employee",
        content: <ManagerEmployee />,
      },
    ]) ||
    (props.isEmployee && [
      {
        title: "Main",
        content: <EmployeeMain />,
      },
      {
        title: "Task",
        content: <EmployeeTask />,
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
          <Separator size={"4"} />
          <Text style={{ color: "var(--gray-11)" }}>{props.user?.email}</Text>
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
