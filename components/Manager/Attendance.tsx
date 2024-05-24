import { UserContext } from "@/context/Dashboard";
import { managerCreateAttendance } from "@/lib/action";
import {
  Badge,
  Button,
  Container,
  Dialog,
  Flex,
  Select,
  Table,
  Text,
  TextField,
} from "@radix-ui/themes";
import { useContext } from "react";

function Create() {
  const userContext = useContext(UserContext);

  return (
    <Flex justify={"end"}>
      <Dialog.Root>
        <Dialog.Trigger>
          <Button>Create attendance</Button>
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Title>Create attendance</Dialog.Title>
          <Flex asChild direction={"column"} gap={"2"}>
            <form action={managerCreateAttendance}>
              <Select.Root size={"2"} name="email">
                <Select.Trigger />
                <Select.Content>
                  {userContext.user?.Manager?.Employee.map((employee) => (
                    <Select.Item
                      key={employee.User.id}
                      value={employee.User.email}
                    >
                      {employee.User.name} - ({employee.User.email})
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
              <Flex gap={"2"}>
                <TextField.Root
                  type="datetime-local"
                  placeholder="Check in"
                  name="check-in"
                />
                <Text> - </Text>
                <TextField.Root
                  type="datetime-local"
                  placeholder="Check out"
                  name="check-out"
                />
              </Flex>
              <Flex justify={"end"} gap={"3"} mt={"2"}>
                <Dialog.Close>
                  <Button variant="soft" color="gray">
                    Cancel
                  </Button>
                </Dialog.Close>
                <Dialog.Close>
                  <Button type="submit">Create</Button>
                </Dialog.Close>
              </Flex>
            </form>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </Flex>
  );
}

export function ManagerAttendance() {
  const userContext = useContext(UserContext);

  return (
    <Container>
      <Create />
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Employee</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Check in</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Check out</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {userContext.user?.Manager?.Attendance.map((attendance) => (
            <Table.Row key={attendance.id}>
              <Table.Cell>
                {attendance.Employee.User.name}
                <Text as="span"> - </Text>
                {attendance.Employee.User.email}
              </Table.Cell>
              <Table.Cell>
                {attendance.checkInAt ? (
                  attendance.checkInAt <= attendance.checkInDate ? (
                    <Badge>On time</Badge>
                  ) : (
                    <Badge>Late</Badge>
                  )
                ) : (
                  <Badge>No status</Badge>
                )}
              </Table.Cell>
              <Table.Cell>
                {attendance.checkOutAt ? (
                  attendance.checkOutAt >= attendance.checkOutDate ? (
                    <Badge>On time</Badge>
                  ) : (
                    <Badge>Early</Badge>
                  )
                ) : (
                  <Badge>No status</Badge>
                )}
              </Table.Cell>
              <Table.Cell>
                <Button variant="ghost">Detail</Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Container>
  );
}
