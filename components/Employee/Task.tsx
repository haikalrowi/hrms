import { UserContext } from "@/context/Dashboard";
import { employeeUpdateTaskResult } from "@/lib/action";
import { getTaskResultStatus } from "@/lib/utils";
import {
  Badge,
  Button,
  Container,
  Dialog,
  Flex,
  Table,
  Text,
  TextArea,
} from "@radix-ui/themes";
import { useContext } from "react";
import { SubmitButton } from "../ui/submit-button";

export function EmployeeTask() {
  const userContext = useContext(UserContext);

  return (
    <Container>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Result</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {userContext.user?.Employee?.Task.map((task) => {
            const updateTaskResult: React.FormEventHandler<
              HTMLFormElement
            > = async (e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              await employeeUpdateTaskResult(
                task.id,
                formData.get("result") as string,
              );
            };
            const result = getTaskResultStatus(task);
            return (
              <Table.Row key={task.id}>
                <Table.Cell>{task.title}</Table.Cell>
                <Table.Cell>
                  <Badge>{result}</Badge>
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
                      <Flex asChild direction={"column"} gap={"2"}>
                        <form onSubmit={updateTaskResult}>
                          <Text>{task.description}</Text>
                          <TextArea
                            placeholder="Result"
                            name="result"
                            defaultValue={task.result ?? undefined}
                          />
                          <Flex justify={"end"} gap={"3"} mt={"2"}>
                            <Dialog.Close>
                              <Button variant="soft" color="gray">
                                Cancel
                              </Button>
                            </Dialog.Close>
                            <Dialog.Close>
                              <SubmitButton>Update task</SubmitButton>
                            </Dialog.Close>
                          </Flex>
                        </form>
                      </Flex>
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
