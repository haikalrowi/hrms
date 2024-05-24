import { UserContext } from "@/context/Dashboard";
import { managerCreateAttendance } from "@/lib/action";
import { getAttendanceStatus, joinString } from "@/lib/utils";
import {
  Badge,
  Button,
  Container,
  DataList,
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
                      {joinString(employee.User.name, employee.User.email)}
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
          {userContext.user?.Manager?.Attendance.map((attendance) => {
            const employee = joinString(
              attendance.Employee.User.name,
              attendance.Employee.User.email,
            );
            const attendanceStatus = getAttendanceStatus(attendance);
            return (
              <Table.Row key={attendance.id}>
                <Table.Cell>
                  <Text>{employee}</Text>
                </Table.Cell>
                <Table.Cell>
                  <Badge>{attendanceStatus.checkInStatus}</Badge>
                </Table.Cell>
                <Table.Cell>
                  {attendanceStatus.checkOutStatus && (
                    <Badge>{attendanceStatus.checkOutStatus}</Badge>
                  )}
                </Table.Cell>
                <Table.Cell>
                  <Dialog.Root>
                    <Dialog.Trigger>
                      <Button variant="ghost">Detail</Button>
                    </Dialog.Trigger>
                    <Dialog.Content>
                      <Dialog.Title>
                        {attendance.Employee.User.name}
                        <Text as="span"> - </Text>
                        {attendance.Employee.User.email}
                      </Dialog.Title>
                      <DataList.Root>
                        <DataList.Item align={"center"}>
                          <DataList.Label minWidth={"88px"}>
                            Check in date
                          </DataList.Label>
                          <DataList.Value>
                            {attendance.checkInDate.toLocaleString()}
                          </DataList.Value>
                        </DataList.Item>
                        <DataList.Item>
                          <DataList.Label minWidth={"88px"}>
                            Check out date
                          </DataList.Label>
                          <DataList.Value>
                            {attendance.checkOutDate.toLocaleString()}
                          </DataList.Value>
                        </DataList.Item>
                        <DataList.Item>
                          <DataList.Label minWidth={"88px"}>
                            Check in at
                          </DataList.Label>
                          <DataList.Value>
                            {attendance.checkInAt?.toLocaleString()}
                          </DataList.Value>
                        </DataList.Item>
                        <DataList.Item>
                          <DataList.Label minWidth={"88px"}>
                            Check out at
                          </DataList.Label>
                          <DataList.Value>
                            {attendance.checkOutAt?.toLocaleString()}
                          </DataList.Value>
                        </DataList.Item>
                      </DataList.Root>
                    </Dialog.Content>
                  </Dialog.Root>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </Container>
  );
}
