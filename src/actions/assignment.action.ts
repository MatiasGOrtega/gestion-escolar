"use server";
import { prisma } from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Assignment, Prisma } from "@prisma/client";

type SearchParams = Promise<{ [key: string]: string | undefined }>;

type GetAssignmentsResponse = {
  data: Assignment[];
  count: number;
  p: number;
};

export async function getAssignments(
  searchParams: SearchParams
): Promise<GetAssignmentsResponse> {
  try {
    const { page, ...queryParams } = await searchParams;
    const p = page ? parseInt(page) : 1;

    const query: Prisma.AssignmentWhereInput = {};

    if (queryParams) {
      for (const [key, value] of Object.entries(queryParams)) {
        if (value !== undefined) {
          switch (key) {
            case "classId":
              query.lesson = { classId: parseInt(value as string) };
              break;
            case "teacherId":
              query.lesson = { teacherId: value };
              break;
            case "search":
              query.lesson = {
                subject: {
                  name: {
                    contains: value,
                    mode: "insensitive",
                  },
                },
              };
              break;
            default:
              break;
          }
        }
      }
    }

    const [data, count] = await prisma.$transaction([
      prisma.assignment.findMany({
        where: query,
        include: {
          lesson: {
            select: {
              subject: {
                select: {
                  name: true,
                },
              },
              class: {
                select: {
                  name: true,
                },
              },
              teacher: {
                select: {
                  name: true,
                  surname: true,
                },
              },
            },
          },
        },
        take: ITEM_PER_PAGE,
        skip: ITEM_PER_PAGE * (p - 1),
      }),
      prisma.assignment.count({
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
