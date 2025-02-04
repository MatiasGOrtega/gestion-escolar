"use server";
import { prisma } from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { StudentSchema } from "@/schemas/student";
import { clerkClient } from "@clerk/nextjs/server";
import { Prisma, Student } from "@prisma/client";

type SearchParams = Promise<{ [key: string]: string | undefined }>;

type GetStudentsResponse = {
  data: Student[];
  count: number;
  p: number;
};

type CurrentState = { success: boolean; error: boolean };

export async function getStudents(
  searchParams: SearchParams
): Promise<GetStudentsResponse> {
  try {
    const { page, ...queryParams } = await searchParams;
    const p = page ? parseInt(page) : 1;

    const query: Prisma.StudentWhereInput = {};

    if (queryParams) {
      for (const [key, value] of Object.entries(queryParams)) {
        if (value !== undefined) {
          switch (key) {
            case "teacherId":
              query.class = {
                lessons: {
                  some: {
                    teacherId: value,
                  },
                },
              };
              break;
            case "search":
              query.name = {
                contains: value as string,
                mode: "insensitive",
              };
              break;
            default:
              break;
          }
        }
      }
    }

    const [data, count] = await prisma.$transaction([
      prisma.student.findMany({
        where: query,
        include: {
          class: true,
        },
        take: ITEM_PER_PAGE,
        skip: ITEM_PER_PAGE * (p - 1),
      }),
      prisma.student.count({
        where: query,
      }),
    ]);

    return {
      data,
      count,
      p,
    };
  } catch (e) {
    console.error(e);
    return {
      data: [],
      count: 0,
      p: 1,
    };
  }
}

export async function createStudent(
  currentState: CurrentState,
  data: StudentSchema
) {
  console.log(data);
  try {
    const classItem = await prisma.class.findUnique({
      where: { id: data.classId },
      include: { _count: { select: { students: true } } },
    });

    if (classItem && classItem.capacity === classItem._count.students) {
      return { success: false, error: true };
    }
    const client = await clerkClient();

    const user = await client.users.createUser({
      username: data.username,
      password: data.password,
      firstName: data.name,
      lastName: data.surname,
      publicMetadata: { role: "student" },
    });

    await prisma.student.create({
      data: {
        id: user.id,
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email || null,
        phone: data.phone || null,
        address: data.address,
        img: data.img || null,
        bloodType: data.bloodType,
        sex: data.sex,
        birthday: data.birthday,
        gradeId: data.gradeId,
        classId: data.classId,
        parentId: data.parentId,
      },
    });

    // revalidatePath("/list/students");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
}

export async function updateStudent(
  currentState: CurrentState,
  data: StudentSchema
) {
  if (!data.id) {
    return { success: false, error: true };
  }
  try {
    const client = await clerkClient();

    await client.users.updateUser(data.id, {
      username: data.username,
      ...(data.password !== "" && { password: data.password }),
      firstName: data.name,
      lastName: data.surname,
    });

    await prisma.student.update({
      where: {
        id: data.id,
      },
      data: {
        ...(data.password !== "" && { password: data.password }),
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email || null,
        phone: data.phone || null,
        address: data.address,
        img: data.img || null,
        bloodType: data.bloodType,
        sex: data.sex,
        birthday: data.birthday,
        gradeId: data.gradeId,
        classId: data.classId,
        parentId: data.parentId,
      },
    });
    // revalidatePath("/list/students");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
}

export async function deleteStudent(
  currentState: CurrentState,
  data: FormData
) {
  const id = data.get("id") as string;
  try {
    const client = await clerkClient();

    await client.users.deleteUser(id);

    await prisma.student.delete({
      where: {
        id: id,
      },
    });

    // revalidatePath("/list/students");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
}

export async function studentAttendancePercentage(id: string) {
  try {
    const attendance = await prisma.attendance.findMany({
      where: {
        studentId: id,
        date: {
          gte: new Date(new Date().getFullYear(), 0, 1),
        },
      },
    });

    const totalDays = attendance.length;
    const presentDays = attendance.filter((day) => day.present).length;
    const percentage = (presentDays / totalDays) * 100;

    return percentage;
  } catch (error) {
    console.error(error);
    return 0;
  }
}
