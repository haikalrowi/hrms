import { UserContext } from "@/context/Dashboard";
import { managerCreateTask } from "@/lib/action";
import { getTaskResultStatus, joinString } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import {
  Badge,
  Button,
  Dialog,
  Flex,
  Select,
  Table,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import { useContext } from "react";
import { SubmitButton } from "../ui/submit-button";

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
                      {joinString(employee.User.name, employee.User.email)}
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
                  <SubmitButton>Create</SubmitButton>
                </Dialog.Close>
              </Flex>
            </form>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </Flex>
  );
}

function TaskRow(
  task: Prisma.TaskGetPayload<{
    include: { Employee: { include: { User: {} } } };
  }>,
) {
  const employee = joinString(
    task.Employee.User.name,
    task.Employee.User.email,
  );
  const result = getTaskResultStatus(task);

  return (
    <Table.Row key={task.id}>
      <Table.Cell>{task.title}</Table.Cell>
      <Table.Cell>
        <Badge>{result}</Badge>
      </Table.Cell>
      <Table.Cell>
        <Text>{employee}</Text>
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
  );
}

export function ManagerTask() {
  const userContext = useContext(UserContext);

  return (
    <Flex direction={"column"}>
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
          {userContext.user?.Manager?.Task.map((task) => <TaskRow {...task} />)}
        </Table.Body>
      </Table.Root>
    </Flex>
  );
}
