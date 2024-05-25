"use client";

import { UserContext, UserContextType } from "@/context/Dashboard";
import { userLogout } from "@/lib/action";
import { Box, Button, Flex, Separator, Text } from "@radix-ui/themes";
import { useState } from "react";
import { EmployeeAttendance } from "./Employee/Attendance";
import { EmployeeMain } from "./Employee/Main";
import { EmployeeTask } from "./Employee/Task";
import { ManagerAttendance } from "./Manager/Attendance";
import { ManagerEmployee } from "./Manager/Employee";
import { ManagerMain } from "./Manager/Main";
import { ManagerTask } from "./Manager/Task";

export function Dashboard(props: UserContextType) {
  const pages =
    (props.isManager && [
      { title: "Main", content: <ManagerMain /> },
      { title: "Task", content: <ManagerTask /> },
      { title: "Attendance", content: <ManagerAttendance /> },
      { title: "Employee", content: <ManagerEmployee /> },
    ]) ||
    (props.isEmployee && [
      { title: "Main", content: <EmployeeMain /> },
      { title: "Task", content: <EmployeeTask /> },
      { title: "Attendance", content: <EmployeeAttendance /> },
    ]) ||
    [];
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [pending, setPending] = useState(false);
  const logout = async () => {
    setPending(true);
    await userLogout();
    setPending(false);
  };

  return (
    <UserContext.Provider value={{ ...props }}>
      <Flex height={"100dvh"} gap={"6"} px={"5"} py={"4"}>
        <Box width={"20%"}>
          <Flex direction={"column"} gap={"3"} height={"100%"}>
            {pages.map((page, index) => {
              const changePage = () => {
                setCurrentPageIndex(index);
              };
              return (
                <Button
                  key={index}
                  size={"3"}
                  variant="ghost"
                  onClick={changePage}
                  style={{
                    backgroundColor:
                      index === currentPageIndex
                        ? "var(--accent-a4)"
                        : undefined,
                    justifyContent: "start",
                  }}
                >
                  {page.title}
                </Button>
              );
            })}
            <Box flexGrow={"1"} />
            <Text color="gray">{props.user?.email}</Text>
            <Separator size={"4"} />
            <Button
              size={"3"}
              variant="ghost"
              loading={pending}
              style={{ justifyContent: "start" }}
              onClick={logout}
            >
              Logout
            </Button>
          </Flex>
        </Box>
        <Box width={"80%"}>{pages[currentPageIndex].content}</Box>
      </Flex>
    </UserContext.Provider>
  );
}
