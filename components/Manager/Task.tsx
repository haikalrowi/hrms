import { UserContext } from "@/context/Dashboard";
import { managerCreateTask } from "@/lib/action";
import {
  Badge,
  Button,
  Container,
  Dialog,
  Flex,
  Select,
  Table,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import { useContext } from "react";

function Create() {
  const userContext = useContext(UserContext);

  return (
    <Flex justify={"end"}>
      <Dialog.Root>
        <Dialog.Trigger>
          <Button>Create task</Button>
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Title>Create task</Dialog.Title>
          <Flex asChild direction={"column"} gap={"2"}>
            <form action={managerCreateTask}>
              <Select.Root size={"2"} name="email">
                <Select.Trigger />
                <Select.Content>
                  {userContext.user?.Manager?.Employee.map((employee) => (
                    <Select.Item
                      key={employee.User.id}
                      value={employee.User.email}
                    >
                      {employee.User.name} - {employee.User.email}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
              <TextField.Root type="text" placeholder="Title" name="title" />
              <TextArea placeholder="Description" name="description" />
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

export function ManagerTask() {
  const userContext = useContext(UserContext);

  return (
    <Container>
      <Create />
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Result</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Employee</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {userContext.user?.Manager?.Task.map((task) => (
            <Table.Row key={task.id}>
              <Table.Cell>{task.title}</Table.Cell>
              <Table.Cell>
                {task.result ? (
                  <Badge>Result available</Badge>
                ) : (
                  <Badge>No result</Badge>
                )}
              </Table.Cell>
              <Table.Cell>
                {task.Employee.User.email} - ({task.Employee.User.name})
              </Table.Cell>
              <Table.Cell>
                <Dialog.Root>
                  <Dialog.Trigger>
                    <Button size={"2"} variant="ghost">
                      Detail
                    </Button>
                  </Dialog.Trigger>
                  <Dialog.Content>
                    <Dialog.Title>{task.title}</Dialog.Title>
                    <Flex direction={"column"} gap={"2"}>
                      <Text>{task.description}</Text>
                      <TextArea
                        placeholder="Result"
                        defaultValue={
                          task.result ?? "The employee has not created a result"
                        }
                        readOnly
                      />
                    </Flex>
                  </Dialog.Content>
                </Dialog.Root>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Container>
  );
}
