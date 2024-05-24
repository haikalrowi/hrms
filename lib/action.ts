"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { sign, verify } from "./jwt";
import { prisma } from "./prisma";

export async function userLogin(formData: FormData) {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email: formData.get("email") as string,
    },
    include: { Password: {} },
  });
  const isEqual = bcrypt.compareSync(
    formData.get("password") as string,
    user.Password?.password!,
  );
  if (isEqual) {
    cookies().set("userLogin", await sign({ id: user.id }));
    redirect("/");
  } else notFound();
}

export async function userLogout() {
  cookies().delete("userLogin");
}

export async function userContext() {
  const token = cookies().get("userLogin")?.value;
  const { id } = await verify(token!);
  const user = await prisma.user.findUniqueOrThrow({
    where: { id },
    include: {
      Manager: {
        include: {
          Employee: { include: { User: {} } },
          Task: { include: { Employee: { include: { User: {} } } } },
          Attendance: { include: { Employee: { include: { User: {} } } } },
        },
      },
      Employee: { include: { Manager: {}, Task: {}, Attendance: {} } },
    },
  });
  const isManager = !!(
    user.Manager &&
    (await prisma.manager.findUnique({
      where: { id: user.Manager.id },
    }))
  );
  const isEmployee = !!(
    user.Employee &&
    (await prisma.employee.findUnique({
      where: { id: user.Employee.id },
    }))
  );

  return { isManager, isEmployee, user };
}

export async function managerCreateTask(formData: FormData) {
  const currentContext = await userContext();
  if (currentContext.isManager) {
    const employee = await prisma.user.findUniqueOrThrow({
      where: { email: formData.get("email") as string },
      select: { Employee: {} },
    });
    await prisma.task.create({
      data: {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        Manager: { connect: { id: currentContext.user.Manager?.id } },
        Employee: { connect: { id: employee.Employee?.id } },
      },
    });
    revalidatePath("/");
  } else notFound();
}

export async function managerCreateAttendance(formData: FormData) {
  const currentContext = await userContext();
  if (currentContext.isManager) {
    const employee = await prisma.user.findUniqueOrThrow({
      where: { email: formData.get("email") as string },
      select: { Employee: {} },
    });
    const checkIn = new Date(formData.get("check-in") as string);
    const checkOut = new Date(formData.get("check-out") as string);
    if (checkIn <= checkOut) {
      await prisma.attendance.create({
        data: {
          checkInDate: checkIn,
          checkOutDate: checkOut,
          Manager: { connect: { id: currentContext.user.Manager?.id } },
          Employee: { connect: { id: employee.Employee?.id } },
        },
      });
      revalidatePath("/");
    } else notFound();
  } else notFound();
}

export async function employeeUpdateTaskResult(id: string, result: string) {
  const currentContext = await userContext();
  if (currentContext.isEmployee) {
    await prisma.task.update({
      where: { id, Employee: { id: currentContext.user.Employee?.id } },
      data: { result },
    });
    revalidatePath("/");
  }
}

export async function employeeUpdateAttendance(
  id: string,
  update: "checkInAt" | "checkOutAt",
) {
  const currentContext = await userContext();
  if (currentContext.isEmployee) {
    await prisma.attendance.update({
      where: { id },
      data: {
        checkInAt: update === "checkInAt" ? new Date() : undefined,
        checkOutAt: update === "checkOutAt" ? new Date() : undefined,
      },
    });
    revalidatePath("/");
  } else notFound();
}
