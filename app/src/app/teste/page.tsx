// import { SidebarItemType } from "@/components/Sidebar/schema";
import Sidebar from "@/components/Sidebar/Sidebar";

// const sidebarItems: SidebarItemType[] = [
//   {
//     label: "Home",
//     href: "/",
//     iconPath: "",
//   },
//   { label: "Dashboard", href: "/dashboard", iconPath: "" },
//   {
//     label: "Create",
//     iconPath: "",
//     subItems: ["Folder", "Document", "Project"],
//   },
//   {
//     label: "Todo-Lists",
//     iconPath: "",
//     subItems: ["Work", "Private", "Coding", "Gardening", "School"],
//   },
//   { label: "Calendar", href: "/calendar", iconPath: "" },
//   { label: "Profile", href: "/profile", iconPath: "" },
// ];

export default function Layout() {
  return <Sidebar />;
}
