"use server";
import { prisma } from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { auth } from "@clerk/nextjs/server";
import { Prisma } from "@prisma/client";

type SearchParams = Promise<{ [key: string]: string | undefined }>;

type DataResultProps = {
  id: number;
  title: string;
  studentName: string;
  studentSurname: string;
  teacherName: string;
  teacherSurname: string;
  score: number;
  className: string;
  startTime: Date;
};

type GetResultsResponse = {
  data: DataResultProps[];
  count: number;
  p: number;
};

export async function getResults(
  searchParams: SearchParams
): Promise<GetResultsResponse> {
  try {
    const { page, ...queryParams } = await searchParams;
    const p = page ? parseInt(page) : 1;
    const { userId, sessionClaims } = await auth();
    const role = (sessionClaims?.metadata as { role?: string })?.role;
    const query: Prisma.ResultWhereInput = {};

    if (queryParams) {
      for (const [key, value] of Object.entries(queryParams)) {
        if (value !== undefined) {
          switch (key) {
            case "studentId":
              query.studentId = value;
              break;
            case "search":
              query.OR = [
                {
                  exam: {
                    title: {
                      contains: value,
                      mode: "insensitive",
                    },
                  },
                },
                {
                  student: {
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

    switch (role) {
      case "admin":
        break;
      case "teacher":
        query.OR = [
          {
            exam: {
              lesson: {
                teacherId: userId!,
              },
            },
          },
          {
            assignment: {
              lesson: {
                teacherId: userId!,
              },
            },
          },
        ];
        break;
      case "student":
        query.studentId = userId!;
        break;
      case "parent":
        query.student = {
          parentId: userId!,
        };
        break;

      default:
        break;
    }

    const [dataRes, count] = await prisma.$transaction([
      prisma.result.findMany({
        where: query,
        include: {
          student: {
            select: {
              name: true,
              surname: true,
            },
          },
          exam: {
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
          },
          assignment: {
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
          },
        },
        take: ITEM_PER_PAGE,
        skip: ITEM_PER_PAGE * (p - 1),
      }),
      prisma.result.count({
        where: query,
      }),
    ]);

    const data = dataRes
      .map((item) => {
        const assessment = item.exam || item.assignment;

        if (!assessment) return null;

        const isExam = "startTime" in assessment;

        return {
          id: item.id,
          title: assessment.title,
          studentName: item.student.name,
          studentSurname: item.student.surname,
          teacherName: assessment.lesson.teacher.name,
          teacherSurname: assessment.lesson.teacher.surname,
          score: item.score,
          className: assessment.lesson.class.name,
          startTime: isExam ? assessment.startTime : assessment.startDate,
        };
      })
      .filter((item) => item !== null) as DataResultProps[];

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
