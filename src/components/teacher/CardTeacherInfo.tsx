import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { CalendarDays, Edit, Mail, Phone, Syringe } from "lucide-react";
import Image from "next/image";
import FormContainer from "../form/FormContainer";
import { Teacher } from "@prisma/client";

interface CardTeacherInfoProps {
  teacher: Teacher;
  role: string | undefined;
}

function CardTeacherInfo({ teacher, role }: CardTeacherInfoProps) {
  return (
    <Card className="py-6 px-4 rounded-md flex-1 flex gap-2 border-none">
      <Image
        src={teacher.img || "/avatar-default.png"}
        alt=""
        width={144}
        height={144}
        className="w-36 h-36 rounded-full object-cover"
      />

      <CardContent className="w-2/3 flex flex-col justify-between gap-4">
        <div className="flex items-center gap-4">
          <CardTitle className="text-2xl font-semibold">
            {teacher.name + " " + teacher.surname}
          </CardTitle>
          {role === "admin" && (
            <FormContainer table="teacher" type="update" data={teacher} >
              <Edit className="w-5 h-5"/>
            </FormContainer>
          )}
        </div>
        <p className="text-sm text-gray-500">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit.
        </p>
        <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
          <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
            <Syringe width={16} height={16} />
            <span>{teacher.bloodType}</span>
          </div>
          <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
            <CalendarDays width={16} height={16} />
            <span>
              {new Intl.DateTimeFormat("en-GB").format(teacher.birthday)}
            </span>
          </div>
          <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
            <Mail width={16} height={16} />
            <span>{teacher.email || "-"}</span>
          </div>
          <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
            <Phone width={16} height={16} />
            <span>{teacher.phone || "-"}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default CardTeacherInfo;
