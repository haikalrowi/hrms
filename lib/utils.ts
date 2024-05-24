import { Attendance, Task } from "@prisma/client";

type AttendanceStatus = "On time" | "Late" | "No status";

export function joinString(...string: (string | null | undefined)[]) {
  return string.join(" - ");
}

export function getTaskResultStatus(task: Task) {
  return task.result ? "Result available" : "No result";
}

export function getAttendanceStatus(attendance: Attendance) {
  const today = new Date();

  let checkInStatus: AttendanceStatus | undefined;
  if (attendance.checkInAt) {
    if (attendance.checkInAt <= attendance.checkInDate) {
      checkInStatus = "On time";
    } else if (attendance.checkInAt > attendance.checkInDate) {
      checkInStatus = "Late";
    }
  } else if (today <= attendance.checkInDate) {
    checkInStatus = "No status";
  } else if (today > attendance.checkInDate) {
    checkInStatus = "Late";
  }

  let checkOutStatus: AttendanceStatus | undefined;
  if (attendance.checkOutAt) {
    if (attendance.checkOutAt >= attendance.checkOutDate) {
      checkOutStatus = "On time";
    }
  } else if (today >= attendance.checkOutDate) {
    checkOutStatus = "No status";
  }

  return { checkInStatus, checkOutStatus };
}
