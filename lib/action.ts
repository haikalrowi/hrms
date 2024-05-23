"use server";

import { cookies } from "next/headers";
import { prisma } from "./prisma";

export async function userLogin(formData: FormData) {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email: formData.get("email") as string,
      Password: { password: formData.get("password") as string },
    },
  });
  cookies().set("userLogin", user.id);
}

export async function userLogout() {
  cookies().delete("userLogin");
}

export async function userContext(id: string) {
  const user = await prisma.user.findUniqueOrThrow({
    where: { id },
    include: {
      Manager: { include: { Employee: {} } },
      Employee: { include: { Manager: {} } },
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
