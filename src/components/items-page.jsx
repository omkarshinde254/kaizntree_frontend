import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import { Workflow, Shapes } from "lucide-react";
import { DataTable } from "./items-data-table/data-table";
import { columns } from "./items-data-table/columns";
// import { tasks as tasksData } from "./data/tasks.js";
// import { categories } from "./data/data.js";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import { Input } from "./ui/input";
import { useToast } from "./toast/use-toast";
import { useGlobalStore } from "./store/globalStore.jsx";

const ItemsPage = () => {
    const [tasks, setTasks] = useState([]);
    const [categoriesCnt, setCategoriesCnt] = useState(0);
    // const [itemsCnt, setItemsCnt] = useState(0);
    const itemsCnt = useGlobalStore((state) => state.itemsCnt);
    const setItemsCnt = useGlobalStore((state) => state.setItemsCnt);
    const [categories, setCategories] = useState("");
    const { toast } = useToast();
    // const jwt = useGlobalStore((state) => state.jwt);
    const baseURL = useGlobalStore((state) => state.baseURL);

    const fetchItems = async () => {
        fetch(baseURL + "api/inventory/item/count/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                // Authorization: "Bearer " + jwt,
            },
            // credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => {
                setItemsCnt(data.data.items_count ? data.data.items_count : 0);
            });
    };

    const fetchCategories = async () => {
        fetch(baseURL + "api/inventory/category/count/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setCategoriesCnt(data.data.categories_count ? data.data.categories_count : 0);
            });
    };

    const fetchTasks = async () => {
        fetch(baseURL + "api/inventory/item/list/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    console.log("Error: " + JSON.stringify(data.error));
                    toast({ title: "Error: " + JSON.stringify(data.error), variant: "destructive" });
                } else {
                    setTasks(data.data);
                }
            });
    };

    useEffect(() => {
        fetchItems();
        fetchCategories();
        fetchTasks();
    }, [itemsCnt]);

    // useEffect(() => {
    // console.log("Categories count: " + categoriesCnt);
    // console.log("Categories count: " + itemsCnt);
    // }, [categoriesCnt]);

    const createCategoryHandler = () => {
        if (categories === "" || categories === "Category") {
            toast({ title: "Please fill in all fields", variant: "destructive" });
            return;
        }
        fetch(baseURL + "api/inventory/category/create/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: categories }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    console.log("Error: " + JSON.stringify(data.error));
                    toast({ title: "Error: " + JSON.stringify(data.error), variant: "destructive" });
                } else {
                    toast({ title: "Category created successfully!", variant: "success" });
                    fetchCategories();
                }
            });
    };

    return (
        <ScrollArea className="flex flex-col p-2">
            <div className="flex gap-2">
                <div className="basis-1/2 flex flex-col justify-center">
                    <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">Item Dashboard</h2>
                    <p className="text-sm text-muted-foreground">All items</p>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button className="mt-4 px-11 w-fit">New Item Category </Button>
                        </PopoverTrigger>
                        <PopoverContent asChild>
                            <div className="bg-white shadow-md rounded px-8 pt-6 pb-7 mb-4">
                                <div className="mb-3">
                                    <Input id="category" type="text" placeholder="Category" onChange={(e) => setCategories(e.target.value)} />
                                </div>
                                <div className="flex items-center justify-between">
                                    <Button variant="outline" onClick={createCategoryHandler}>
                                        Create Category
                                    </Button>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
                <div className="basis-1/2 flex flex-col w-full mx-4 mb-4 text-sm justify-center text-muted-foreground">
                    <div className="flex items-center justify-between px-4">
                        <Workflow size={18} />
                        <span>Total Categories</span>
                        <span>{categoriesCnt}</span>
                    </div>
                    <Separator className="my-4" />
                    <div className="flex items-center justify-between px-4">
                        <Shapes size={18} />
                        <span>Total Items</span>
                        <span>{itemsCnt}</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-col p-2 mt-8 -ml-1">
                <DataTable data={tasks} columns={columns} />
            </div>
        </ScrollArea>
    );
};
export { ItemsPage };
