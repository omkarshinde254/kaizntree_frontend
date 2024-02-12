import React, { useEffect, useState } from "react";
import { Cross2Icon } from "@radix-ui/react-icons";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { DataTableViewOptions } from "./data-table-view-options";

// import { categories } from "../data/data";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { Plus } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "../ui/dropdown-menu";
import { useToast } from "../toast/use-toast";
import { useGlobalStore } from "../store/globalStore.jsx";

export function DataTableToolbar({ table }) {
    const isFiltered = table.getState().columnFilters.length > 0;
    const [categories, setCategories] = useState([]);
    const [position, setPosition] = useState(0);
    const [sku, setSku] = useState("");
    const [name, setName] = useState("");
    const [tags, setTags] = useState("");
    const [inStock, setInStock] = useState("");
    const [availableStock, setAvailableStock] = useState("");
    const { toast } = useToast();
    const setItemsCnt = useGlobalStore((state) => state.setItemsCnt);

    const onClickSelectCategory = () => {
        // fetch("https://kaizntree-backend.vercel.app/api/inventory/category/list/", {
        fetch("https://kaizntree-backend.vercel.app/api/inventory/category/list/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setCategories(data.data);
            });
        // console.log(categories);
    };

    useEffect(() => {
        onClickSelectCategory();
    }, []);

    const createItemHandler = () => {
        if (sku === "" || name === "" || tags === "" || inStock === "" || availableStock === "") {
            toast({ title: "Please fill in all fields", variant: "destructive" });
            return;
        }
        fetch("https://kaizntree-backend.vercel.app/api/inventory/item/create/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                sku: sku,
                name: name,
                tags: tags,
                category: position,
                in_stock: inStock,
                available: availableStock,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    toast({ title: "Item creation failed" + JSON.stringify(data.error), variant: "destructive" });
                } else {
                    toast({ title: "Item created successfully", variant: "success" });
                }
            });
        setItemsCnt((prev) => prev + 1);
    };
    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
                <Input
                    placeholder="Search"
                    value={table.getColumn("name")?.getFilterValue() ?? ""}
                    onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
                    className="h-8 w-[150px] lg:w-[250px]"
                />
                {table.getColumn("category") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("category")}
                        title="Category"
                        options={categories.map((category) => ({
                            label: category.name,
                            value: category.name.toLowerCase().replace(/ /g, "-"),
                        }))}
                    />
                )}
                {/* {table.getColumn("priority") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("priority")}
                        title="Priority"
                        options={priorities}
                    />
                )} */}
                {isFiltered && (
                    <Button variant="ghost" onClick={() => table.resetColumnFilters()} className="h-8 px-2 lg:px-3">
                        Reset
                        <Cross2Icon className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </div>
            <div className="flex gap-2">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button size="sm" className="flex gap-1" onClick={onClickSelectCategory}>
                            <Plus size={16} />
                            Add Item
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent asChild>
                        <div className="bg-white shadow-md rounded px-8 pt-6 pb-7 mb-4">
                            <div className="mb-1">
                                <Input id="category" type="number" placeholder="Sku" onChange={(e) => setSku(e.target.value)} />
                            </div>
                            <div className="mb-1">
                                <Input id="category" type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <Input id="category" type="text" placeholder="Tag1,Tag2.." onChange={(e) => setTags(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <Input id="category" type="number" placeholder="In Stock" onChange={(e) => setInStock(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <Input id="category" type="number" placeholder="Available Stock" onChange={(e) => setAvailableStock(e.target.value)} />
                            </div>
                            <div className="mb-3 ">
                                <DropdownMenu asChild>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="secondary">Select Category</Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuRadioGroup value={position} onValueChange={(value) => setPosition(value)}>
                                            {categories.map((category, idx) => (
                                                // <DropdownMenuItem key={idx}>{category.name}</DropdownMenuItem>
                                                <DropdownMenuRadioItem key={idx} value={category.name}>
                                                    {category.name}
                                                </DropdownMenuRadioItem>
                                            ))}
                                        </DropdownMenuRadioGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            <div className="flex items-center justify-between">
                                <Button variant="outline" onClick={createItemHandler}>
                                    Create Item
                                </Button>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
                <DataTableViewOptions table={table} />
            </div>
        </div>
    );
}
