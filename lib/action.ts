"use server";

import { revalidatePath } from "next/cache";
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
      Manager: {
        include: {
          Employee: { include: { User: {} } },
          Task: { include: { Employee: { include: { User: {} } } } },
        },
      },
      Employee: { include: { Manager: {}, Task: {} } },
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

export async function userId() {
  const id = cookies().get("userLogin")?.value;
  const user = await prisma.user.findUniqueOrThrow({ where: { id } });
  return user.id;
}

export async function managerCreateTask(formData: FormData) {
  const currentContext = await userContext(await userId());
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
}

export async function employeeUpdateTaskResult(id: string, result: string) {
  const currentContext = await userContext(await userId());
  await prisma.task.update({
    where: { id, Employee: { id: currentContext.user.Employee?.id } },
    data: { result },
  });
  revalidatePath("/");
}
