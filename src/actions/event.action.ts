"use server";
import { prisma } from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { auth } from "@clerk/nextjs/server";
import { Event, Prisma } from "@prisma/client";

type SearchParams = Promise<{ [key: string]: string | undefined }>;

type GetEventsResponse = {
  data: Event[];
  count: number;
  p: number;
};

export async function getEvents(
  searchParams: SearchParams
): Promise<GetEventsResponse> {
  try {
    const { page, ...queryParams } = await searchParams;
    const p = page ? parseInt(page) : 1;
    const { userId, sessionClaims } = await auth();
    const role = (sessionClaims?.metadata as { role?: string })?.role;
    const query: Prisma.EventWhereInput = {};

    if (queryParams) {
      for (const [key, value] of Object.entries(queryParams)) {
        if (value !== undefined) {
          switch (key) {
            case "search":
              query.title = {
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

    const roleConditions = {
      teacher: {
        lessons: {
          some: {
            teacherId: userId!,
          },
        },
      },
      student: {
        students: {
          some: {
            id: userId!,
          },
        },
      },
      parent: {
        students: {
          some: {
            parentId: userId!,
          },
        },
      },
    };

    query.OR = [
      {
        classId: null,
      },
      {
        class: roleConditions[role as keyof typeof roleConditions] || {},
      },
    ];

    const [data, count] = await prisma.$transaction([
      prisma.event.findMany({
        where: query,
        include: {
          class: true,
        },
        take: ITEM_PER_PAGE,
        skip: ITEM_PER_PAGE * (p - 1),
      }),
      prisma.event.count({
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

export async function getEventsFromCalendar(date: Date) {
  console.log(new Date(date.setHours(0, 0, 0, 0)));
  const events = await prisma.event.findMany({
    where: {
      startTime: {
        gte: new Date(date.setHours(0, 0, 0, 0)),
        lte: new Date(date.setHours(23, 59, 59, 999)),
      },
    },
  });

  return events;
}
