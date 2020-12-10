
import Dashboard from "views/Dashboard.jsx";
import NhaTro from "views/NhaTro.jsx";
import KhuTro from "views/KhuTro.jsx";
import KhachThue from "views/KhachThue.jsx";
import Icons from "views/Icons.jsx";
import DienNuoc from "views/DienNuoc.jsx";
import Upgrade from "views/Upgrade.jsx";
import DichVu from "views/DichVu.jsx";


const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Thống kê",
    icon: "pe-7s-graph",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/khutro",
    name: "Khu Trọ",
    icon: "pe-7s-home",
    component: KhuTro,
    layout: "/admin"
  },
  {
    path: "/phongtro",
    name: "Phòng Trọ",
    icon: "pe-7s-culture",
    component: NhaTro,
    layout: "/admin"
  },
  {
    path: "/khachthue",
    name: "Khách Thuê",
    icon: "pe-7s-user",
    component: KhachThue,
    layout: "/admin"
  },
  {
    path: "/dichvu",
    name: "Dịch Vụ",
    icon: "pe-7s-box2",
    component: DichVu,
    layout: "/admin"
  },
  {
    path: "/icons",
    name: "Hóa đơn",
    icon: "pe-7s-news-paper",
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/diennuoc",
    name: "Điện nước",
    icon: "pe-7s-attention",
    component: DienNuoc,
    layout: "/admin"
  },
  {
    upgrade: true,
    path: "/upgrade",
    name: "Cài Đặt",
    icon: "pe-7s-config",
    component: Upgrade,
    layout: "/admin"
  }
];
export default dashboardRoutes;
