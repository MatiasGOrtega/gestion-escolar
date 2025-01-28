"use server";
import { prisma } from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { auth } from "@clerk/nextjs/server";
import { Exam, Prisma } from "@prisma/client";

type SearchParams = Promise<{ [key: string]: string | undefined }>;

type GetExamsResponse = {
  data: Exam[];
  count: number;
  p: number;
};

export async function getExams(
  searchParams: SearchParams
): Promise<GetExamsResponse> {
  try {
    const { page, ...queryParams } = await searchParams;
    const p = page ? parseInt(page) : 1;
    const { userId, sessionClaims } = await auth();
    const role = (sessionClaims?.metadata as { role?: string })?.role;
    const query: Prisma.ExamWhereInput = {};

    query.lesson = {};

    if (queryParams) {
      for (const [key, value] of Object.entries(queryParams)) {
        if (value !== undefined) {
          switch (key) {
            case "classId":
              query.lesson.classId = parseInt(value);
              break;
            case "teacherId":
              query.lesson.teacherId = value;
              break;
            case "search":
              query.lesson.subject = {
                name: {
                  contains: value,
                  mode: "insensitive",
                },
              };
              break;
            default:
              break;
          }
        }
      }
    }

    switch (role) {
      case "admin":
        break;
      case "teacher":
        query.lesson.teacherId = userId!;
        break;
      case "student":
        query.lesson.class = {
          students: {
            some: {
              id: userId!,
            },
          },
        };
        break;
      case "parent":
        query.lesson.class = {
          students: {
            some: {
              parentId: userId!,
            },
          },
        };
        break;
      default:
        break;
    }

    const [data, count] = await prisma.$transaction([
      prisma.exam.findMany({
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
      prisma.exam.count({
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
