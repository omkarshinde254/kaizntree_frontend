import React from "react";
import {
    Home,
    LayoutList,
    Layers,
    Hammer,
    Users,
    BadgeDollarSign,
    Truck,
    Factory,
    TicketCheck,
    FileBarChart,
    HelpCircle,
    Blocks,
    LogOut,
    CircleUserRound,
} from "lucide-react";

const Sidebar = () => {
    const logoutHander = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    };
    return (
        <nav className="w-56 flex flex-col border p-2">
            <ul className="items-start mb-auto">
                <li className="flex cursor-pointer my-[0.2rem] p-2 hover:bg-gray-100 rounded-sm items-center">
                    <Home className="mr-2" size={20} /> Home
                </li>
                <li className="flex cursor-pointer my-[0.2rem] p-2 bg-gray-300 hover:bg-gray-200 rounded-sm">
                    <LayoutList className="mr-2" size={20} /> Items
                </li>
                <li className="flex cursor-pointer my-[0.2rem] p-2 hover:bg-gray-100 rounded-sm">
                    <Layers className="mr-2" size={20} /> Stock
                </li>
                <li className="flex cursor-pointer my-[0.2rem] p-2 hover:bg-gray-100 rounded-sm">
                    <Hammer className="mr-2" size={20} /> Build
                </li>
                <li className="flex cursor-pointer my-[0.2rem] p-2 hover:bg-gray-100 rounded-sm">
                    <Users className="mr-2" size={20} /> Customers
                </li>
                <li className="flex cursor-pointer my-[0.2rem] p-2 hover:bg-gray-100 rounded-sm">
                    <BadgeDollarSign className="mr-2" size={20} /> Sales Orders
                </li>
                <li className="flex cursor-pointer my-[0.2rem] p-2 hover:bg-gray-100 rounded-sm">
                    <Truck className="mr-2" size={20} /> Suppliers
                </li>
                <li className="flex cursor-pointer my-[0.2rem] p-2 hover:bg-gray-100 rounded-sm">
                    <Factory className="mr-2" size={20} /> Manufactures
                </li>
                <li className="flex cursor-pointer my-[0.2rem] p-2 hover:bg-gray-100 rounded-sm">
                    <TicketCheck className="mr-2" size={20} /> Purchase Orders
                </li>
                <li className="flex cursor-pointer my-[0.2rem] p-2 hover:bg-gray-100 rounded-sm">
                    <FileBarChart className="mr-2" size={20} /> Reports
                </li>
            </ul>
            <ul className="items-end">
                <li className="flex cursor-pointer my-[0.2rem] p-2 hover:bg-gray-100 rounded-sm">
                    <HelpCircle className="mr-2" size={20} /> Help!
                </li>
                <li className="flex cursor-pointer my-[0.2rem] p-2 hover:bg-gray-100 rounded-sm">
                    <Blocks className="mr-2" size={20} /> Integrations
                </li>

                <li className="flex cursor-pointer my-[0.2rem] p-2 hover:bg-gray-100 rounded-sm" onClick={logoutHander}>
                    <LogOut className="mr-2" size={20} /> Logout
                </li>
                <li className="flex cursor-pointer my-[0.2rem] p-2 hover:bg-gray-100 rounded-sm">
                    <CircleUserRound className="mr-2" size={20} /> My Profile
                </li>
            </ul>
        </nav>
    );
};

export { Sidebar };
