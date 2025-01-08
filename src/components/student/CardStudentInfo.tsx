import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { role } from "@/constants/data";
import {
  CalendarDays,
  Mail,
  Phone,
  Syringe,
} from "lucide-react";
import Image from "next/image";

function CardStudentInfo() {
  return (
    <Card className="py-6 px-4 rounded-md flex-1 flex gap-2 border-none">
      <Image
        src="https://images.pexels.com/photos/5414817/pexels-photo-5414817.jpeg?auto=compress&cs=tinysrgb&w=1200"
        alt=""
        width={144}
        height={144}
        className="w-36 h-36 rounded-full object-cover"
      />

      <CardContent className="w-2/3 flex flex-col justify-between gap-4">
        <div className="flex items-center gap-4">
          <CardTitle className="text-2xl font-semibold">
            Cameron Moran
          </CardTitle>
          {role === "admin" && "HOLA"}
        </div>
        <p className="text-sm text-gray-500">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit.
        </p>
        <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
          <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
            <Syringe width={16} height={16} />
            <span>A+</span>
          </div>
          <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
            <CalendarDays width={16} height={16} />
            <span>January 2025</span>
          </div>
          <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
            <Mail width={16} height={16} />
            <span>user@gmail.com</span>
          </div>
          <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
            <Phone width={16} height={16} />
            <span>+1 234 567</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default CardStudentInfo