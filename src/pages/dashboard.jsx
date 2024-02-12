import React from "react";
import { Sidebar } from "../components/sidebar";
import { ItemsPage } from "../components/items-page";

const Dashboard = () => {
    return (
        <div className="h-screen flex">
            <Sidebar />
            <main className="flex-1 min-w-0 overflow-auto p-6">
                <ItemsPage />
            </main>
        </div>
    );
};

export { Dashboard };
