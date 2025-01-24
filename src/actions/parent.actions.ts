"use server";
import { prisma } from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Parent, Prisma } from "@prisma/client";

type SearchParams = Promise<{ [key: string]: string | undefined }>;

type GetParentsResponse = {
  data: Parent[];
  count: number;
  p: number;
};

export async function getParents(
  searchParams: SearchParams
): Promise<GetParentsResponse> {
  try {
    const { page, ...queryParams } = await searchParams;
    const p = page ? parseInt(page) : 1;

    const query: Prisma.ParentWhereInput = {};

    if (queryParams) {
      for (const [key, value] of Object.entries(queryParams)) {
        if (value !== undefined) {
          switch (key) {
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
      prisma.parent.findMany({
        where: query,
        include: {
          students: true,
        },
        take: ITEM_PER_PAGE,
        skip: ITEM_PER_PAGE * (p - 1),
      }),
      prisma.parent.count({
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
