import { UserContext } from "@/context/Dashboard";
import { employeeUpdateAttendance } from "@/lib/action";
import { getAttendanceStatus } from "@/lib/utils";
import { Attendance } from "@prisma/client";
import { Badge, Button, Flex, Table } from "@radix-ui/themes";
import { useContext, useState } from "react";

function AttendanceRow(attendance: Attendance) {
  const [checkInPending, setCheckInPending] = useState(false);
  const [checkOutPending, setCheckOutPending] = useState(false);
  const checkIn = async () => {
    setCheckInPending(true);
    await employeeUpdateAttendance(attendance.id, "checkInAt");
    setCheckInPending(false);
  };
  const checkOut = async () => {
    setCheckOutPending(true);
    await employeeUpdateAttendance(attendance.id, "checkOutAt");
    setCheckOutPending(true);
  };
  const attendanceStatus = getAttendanceStatus(attendance);

  return (
    <Table.Row>
      <Table.Cell>{attendance.checkInDate.toLocaleString()}</Table.Cell>
      <Table.Cell>{attendance.checkOutDate.toLocaleString()}</Table.Cell>
      <Table.Cell>
        {attendanceStatus.checkInStatus === "No status" ? (
          <Button variant="ghost" loading={checkInPending} onClick={checkIn}>
            Check in
          </Button>
        ) : (
          <Badge>{attendanceStatus.checkInStatus}</Badge>
        )}
      </Table.Cell>
      <Table.Cell>
        {attendanceStatus.checkOutStatus &&
          (attendanceStatus.checkOutStatus === "No status" ? (
            <Button
              variant="ghost"
              loading={checkOutPending}
              onClick={checkOut}
            >
              Check out
            </Button>
          ) : (
            <Badge>{attendanceStatus.checkOutStatus}</Badge>
          ))}
      </Table.Cell>
    </Table.Row>
  );
}

export function EmployeeAttendance() {
  const userContext = useContext(UserContext);

  return (
    <Flex direction={"column"}>
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
          {userContext.user?.Employee?.Attendance.map((attendance) => (
            <AttendanceRow key={attendance.id} {...attendance} />
          ))}
        </Table.Body>
      </Table.Root>
    </Flex>
  );
}
