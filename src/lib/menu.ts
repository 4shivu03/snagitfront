import { Home, Users, User, Shield, Layers, UserCheck } from "lucide-react";

export const menuItems = [
  {
    name: "Dashboard",
    icon: Home,
    path: "/admin",
    roles: ["A"],
  },
  {
    name: "Users",
    icon: Users,
    children: [
      {
        name: "All Users",
        path: "/admin/users",
        icon: User,
        roles: ["A"],
      },
      {
        name: "Role",
        path: "/admin/role",
        icon: Shield,
        roles: ["A"],
      },
      {
        name: "User Approval",
        path: "/admin/sellerapproval",
        icon: UserCheck,
        roles: ["A"],
      },
    ],
  },
  {
    name: "Seller Dashboard",
    icon: Home,
    path: "/seller",
    roles: ["S"],
  },
  {
    name: "Product",
    icon: Layers,
    path: "/seller/products",
    roles: ["S"],
  },
];