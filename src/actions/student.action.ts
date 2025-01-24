"use server";
import { prisma } from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Prisma, Student } from "@prisma/client";

type SearchParams = Promise<{ [key: string]: string | undefined }>;

type GetStudentsResponse = {
  data: Student[];
  count: number;
  p: number;
};

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
