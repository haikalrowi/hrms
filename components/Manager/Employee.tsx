import { UserContext } from "@/context/Dashboard";
import { Flex, Table } from "@radix-ui/themes";
import { useContext } from "react";

export function ManagerEmployee() {
  const userContext = useContext(UserContext);

  return (
    <Flex direction={"column"}>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {userContext.user?.Manager?.Employee.map((employee) => (
            <Table.Row key={employee.User?.id}>
              <Table.Cell>{employee.User?.name}</Table.Cell>
              <Table.Cell>{employee.User?.email}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Flex>
  );
}
