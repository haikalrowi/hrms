import { UserContext } from "@/context/Dashboard";
import { employeeUpdateAttendance } from "@/lib/action";
import { getAttendanceStatus } from "@/lib/utils";
import { Badge, Button, Container, Table } from "@radix-ui/themes";
import { useContext } from "react";

export function EmployeeAttendance() {
  const userContext = useContext(UserContext);

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
            const attendanceStatus = getAttendanceStatus(attendance);
            return (
              <Table.Row key={attendance.id}>
                <Table.Cell>
                  {attendance.checkInDate.toLocaleString()}
                </Table.Cell>
                <Table.Cell>
                  {attendance.checkOutDate.toLocaleString()}
                </Table.Cell>
                <Table.Cell>
                  {attendanceStatus.checkInStatus === "No status" ? (
                    <Button onClick={checkIn}>Check in</Button>
                  ) : (
                    <Badge>{attendanceStatus.checkInStatus}</Badge>
                  )}
                </Table.Cell>
                <Table.Cell>
                  {attendanceStatus.checkOutStatus &&
                    (attendanceStatus.checkOutStatus === "No status" ? (
                      <Button variant="ghost" onClick={checkOut}>
                        Check out
                      </Button>
                    ) : (
                      <Badge>{attendanceStatus.checkOutStatus}</Badge>
                    ))}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </Container>
  );
}
