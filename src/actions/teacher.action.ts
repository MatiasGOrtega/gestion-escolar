"use server";
import { prisma } from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Teacher } from "@prisma/client";

type SearchParams = { [key: string]: string | undefined };

type GetTeachersResponse = {
  data: Teacher[];
  count: number;
  p: number;
};

export async function getTeachers(
  searchParams: SearchParams
): Promise<GetTeachersResponse> {
  try {
    const { page } = searchParams;
    const p = page ? parseInt(page) : 1;

    const [data, count] = await prisma.$transaction([
      prisma.teacher.findMany({
        include: {
          subjects: true,
          classes: true,
        },
        take: ITEM_PER_PAGE,
        skip: ITEM_PER_PAGE * (p - 1),
      }),
      prisma.teacher.count(),
    ]);

    return {
      data,
      count,
      p
    };
  } catch (e) {
    console.error(e);
    return {
      data: [],
      count: 0,
      p: 1
    };
  }
}
