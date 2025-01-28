import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import Image from "next/image";
import { menuMainItems, menuOtherItems } from "@/constants/menu";
import { currentUser } from "@clerk/nextjs/server";

async function AppSidebar() {
  const user = await currentUser();
  const role = user?.publicMetadata.role as string;

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                href="/"
                className="flex items-center justify-center xl:justify-start h-10 gap-2"
              >
                <Image
                  src="/academic-cap.svg"
                  alt="logo"
                  width={32}
                  height={32}
                />
                <span>Colegio Papulo</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>MENU</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuMainItems.map((item) => {
                if (item.visible.includes(role)) {
                  return (
                    <SidebarMenuItem key={item.label}>
                      <SidebarMenuButton asChild>
                        <Link href={item.href}>
                          <Image
                            src={item.icon}
                            alt={item.label}
                            width={20}
                            height={20}
                          />
                          <span className="ml-4">{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                }
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>OTHERS</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuOtherItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild>
                    <Link href={item.href}>
                      <Image
                        src={item.icon}
                        alt={item.label}
                        width={20}
                        height={20}
                      />
                      <span className="ml-4">{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export default AppSidebar;
