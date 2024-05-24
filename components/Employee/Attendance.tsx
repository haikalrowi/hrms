import { UserContext } from "@/context/Dashboard";
import { employeeUpdateAttendance } from "@/lib/action";
import { Badge, Button, Container, Table } from "@radix-ui/themes";
import { useContext } from "react";

export function EmployeeAttendance() {
  const userContext = useContext(UserContext);
  const today = new Date();

  return (
    <Container>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Check in</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Check out</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Check in status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Check out status</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {userContext.user?.Employee?.Attendance.map((attendance) => {
            const checkIn = async () => {
              await employeeUpdateAttendance(attendance.id, "checkInAt");
            };
            const checkOut = async () => {
              await employeeUpdateAttendance(attendance.id, "checkOutAt");
            };
            return (
              <Table.Row key={attendance.id}>
                <Table.Cell>
                  {attendance.checkInDate.toLocaleString()}
                </Table.Cell>
                <Table.Cell>
                  {attendance.checkOutDate.toLocaleString()}{" "}
                </Table.Cell>
                <Table.Cell>
                  {attendance.checkInAt ? (
                    attendance.checkInAt <= attendance.checkInDate && (
                      <Badge>On time</Badge>
                    )
                  ) : today <= attendance.checkInDate ? (
                    <Button variant="ghost" onClick={checkIn}>
                      Check in
                    </Button>
                  ) : (
                    <Badge>Late</Badge>
                  )}
                </Table.Cell>
                <Table.Cell>
                  {attendance.checkOutAt
                    ? attendance.checkOutAt >= attendance.checkOutDate && (
                        <Badge>On time</Badge>
                      )
                    : today >= attendance.checkOutDate && (
                        <Button variant="ghost" onClick={checkOut}>
                          Check out
                        </Button>
                      )}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </Container>
  );
}
