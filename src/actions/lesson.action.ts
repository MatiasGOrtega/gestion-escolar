"use server";
import { prisma } from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Lesson, Prisma } from "@prisma/client";

type SearchParams = Promise<{ [key: string]: string | undefined }>;

type GetLessonsResponse = {
  data: Lesson[];
  count: number;
  p: number;
};

export async function getLessons(
  searchParams: SearchParams
): Promise<GetLessonsResponse> {
  try {
    const { page, ...queryParams } = await searchParams;
    const p = page ? parseInt(page) : 1;

    const query: Prisma.LessonWhereInput = {};

    if (queryParams) {
      for (const [key, value] of Object.entries(queryParams)) {
        if (value !== undefined) {
          switch (key) {
            case "classId":
              query.classId = parseInt(value);
              break;
            case "teacherId":
              query.teacherId = value as string;
              break;
            case "search":
              query.OR = [
                {
                  subject: {
                    name: {
                      contains: value,
                      mode: "insensitive",
                    },
                  },
                  teacher: {
                    name: {
                      contains: value,
                      mode: "insensitive",
                    },
                  },
                },
              ];
              break;
            default:
              break;
          }
        }
      }
    }

    const [data, count] = await prisma.$transaction([
      prisma.lesson.findMany({
        where: query,
        include: {
          subject: {
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
          class: {
            select: {
              name: true,
            },
          },
        },
        take: ITEM_PER_PAGE,
        skip: ITEM_PER_PAGE * (p - 1),
      }),
      prisma.lesson.count({
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
