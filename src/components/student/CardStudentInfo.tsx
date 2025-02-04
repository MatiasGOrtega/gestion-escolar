import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { CalendarDays, Edit, Mail, Phone, Syringe } from "lucide-react";
import Image from "next/image";
import { UserSex } from "@prisma/client";
import FormContainer from "../form/FormContainer";

type Student = {
  name: string;
  id: string;
  username: string;
  surname: string;
  email: string | null;
  phone: string | null;
  address: string;
  img: string | null;
  bloodType: string;
  sex: UserSex;
  createdAt: Date;
  parentId: string;
  classId: number;
  gradeId: number;
  birthday: Date;
  class: {
    _count: {
      lessons: number;
    };
    name: string;
    id: number;
    gradeId: number;
    capacity: number;
    supervisorId: string | null;
  };
};

interface CardStudentInfoProps {
  student: Student;
  role: string | undefined;
}

function CardStudentInfo({ student, role }: CardStudentInfoProps) {
  return (
    <Card className="py-6 px-4 rounded-md flex-1 flex gap-2 border-none">
      <Image
        src={student.img || "/avatar-default.png"}
        alt=""
        width={144}
        height={144}
        className="w-36 h-36 rounded-full object-cover"
      />

      <CardContent className="w-2/3 flex flex-col justify-between gap-4">
        <div className="flex items-center gap-4">
          <CardTitle className="text-2xl font-semibold">
            {student.name + " " + student.surname}
          </CardTitle>
          {role === "admin" && (
            <FormContainer table="student" type="update" data={student}>
              <Edit className="w-5 h-5" />
            </FormContainer>
          )}
        </div>
        <p className="text-sm text-gray-500">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit.
        </p>
        <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
          <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
            <Syringe width={16} height={16} />
            <span>{student.bloodType}</span>
          </div>
          <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
            <CalendarDays width={16} height={16} />
            {new Intl.DateTimeFormat("en-GB").format(student.birthday)}
          </div>
          <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
            <Mail width={16} height={16} />
            <span>{student.email || "-"}</span>
          </div>
          <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
            <Phone width={16} height={16} />
            <span>{student.phone || "-"}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default CardStudentInfo;
