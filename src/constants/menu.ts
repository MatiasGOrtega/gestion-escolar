export const menuMainItems = [
  {
    icon:"/icon/home.svg",
    label: "Home",
    href: "/",
    visible: ["admin", "teacher", "student", "parent"],
  },
  {
    icon: "/icon/teacher.svg",
    label: "Teachers",
    href: "/list/teachers",
    visible: ["admin", "teacher"],
  },
  {
    icon: "/icon/student.svg",
    label: "Students",
    href: "/list/students",
    visible: ["admin", "teacher"],
  },
  {
    icon: "/icon/parent.svg",
    label: "Parents",
    href: "/list/parents",
    visible: ["admin", "teacher"],
  },
  {
    icon: "/icon/subject.svg",
    label: "Subjects",
    href: "/list/subjects",
    visible: ["admin"],
  },
  {
    icon: "/icon/class.svg",
    label: "Classes",
    href: "/list/classes",
    visible: ["admin", "teacher"],
  },
  {
    icon: "/icon/lesson.svg",
    label: "Lessons",
    href: "/list/lessons",
    visible: ["admin", "teacher"],
  },
  {
    icon:"/icon/exam.svg",
    label: "Exams",
    href: "/list/exams",
    visible: ["admin", "teacher", "student", "parent"],
  },
  {
    icon: "/icon/assignment.svg",
    label: "Assignments",
    href: "/list/assignments",
    visible: ["admin", "teacher", "student", "parent"],
  },
  // {
  //   icon: "/icon/result.svg",
  //   label: "Results",
  //   href: "/list/results",
  //   visible: ["admin", "teacher", "student", "parent"],
  // },
  {
    icon: "/icon/attendance.svg",
    label: "Attendance",
    href: "/list/attendance",
    visible: ["admin", "teacher", "student", "parent"],
  },
  {
    icon: "/icon/calendar.svg",
    label: "Events",
    href: "/list/events",
    visible: ["admin", "teacher", "student", "parent"],
  },
  {
    icon: "/icon/message.svg",
    label: "Messages",
    href: "/list/messages",
    visible: ["admin", "teacher", "student", "parent"],
  },
  {
    icon: "/icon/announcement.svg",
    label: "Announcements",
    href: "/list/announcements",
    visible: ["admin", "teacher", "student", "parent"],
  },
]

export const menuOtherItems = [
  {
    icon: "/icon/profile.svg",
    label: "Profile",
    href: "/profile",
    visible: ["admin", "teacher", "student", "parent"],
  },
  {
    icon: "/icon/setting.svg",
    label: "Settings",
    href: "/settings",
    visible: ["admin", "teacher", "student", "parent"],
  },
  {
    icon: "/icon/logout.svg",
    label: "Logout",
    href: "/logout",
    visible: ["admin", "teacher", "student", "parent"],
  },
]