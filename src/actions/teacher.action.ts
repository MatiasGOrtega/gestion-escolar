"use server";
import { prisma } from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Prisma, Teacher } from "@prisma/client";

type SearchParams = Promise<{ [key: string]: string | undefined }>;

type GetTeachersResponse = {
  data: Teacher[];
  count: number;
  p: number;
};

export async function getTeachers(
  searchParams: SearchParams
): Promise<GetTeachersResponse> {
  try {
    const { page, ...queryParams } = await searchParams;
    const p = page ? parseInt(page) : 1;

    const query: Prisma.TeacherWhereInput = {};

    if (queryParams) {
      for (const [key, value] of Object.entries(queryParams)) {
        if (value !== undefined) {
          switch (key) {
            case "classId":
              query.lessons = {
                some: {
                  classId: parseInt(value),
                },
              };
              break;
            case "search":
              query.name = {
                contains: value,
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
      prisma.teacher.findMany({
        where: query,
        include: {
          subjects: true,
          classes: true,
        },
        take: ITEM_PER_PAGE,
        skip: ITEM_PER_PAGE * (p - 1),
      }),
      prisma.teacher.count({
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
