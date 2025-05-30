import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
  } from "@/components/ui/sidebar"
  
  export function AppSidebar({teamName}: {teamName: string}) {
    return (
      <Sidebar>
        <SidebarHeader>
        <h2 className="text-lg font-semibold px-4 py-2">{teamName}</h2>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup />
          <SidebarGroup />
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
    )
  }