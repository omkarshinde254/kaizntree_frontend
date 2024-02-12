import { Badge } from "../ui/badge";
import { Checkbox } from "../ui/checkbox";

// import { labels, priorities, statuses, categories } from "../data/data";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

export const columns = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
                // className="translate-y-[2px]"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                // className="translate-y-[2px]"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "sku",
        header: ({ column }) => <DataTableColumnHeader column={column} title="SKU" />,
        cell: ({ row }) => <div className="w-[150px]">{row.getValue("sku")}</div>,
        enableSorting: true,
        enableHiding: false,
    },
    {
        accessorKey: "name",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
        cell: ({ row }) => (
            <div variant="link" className="w-[200px]">
                <span className="text-blue-500 border-b border-blue-500 cursor-pointer">{row.getValue("name")}</span>
            </div>
        ),
    },
    {
        accessorKey: "tags",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Tags" />,
        cell: ({ row }) => <div className="w-[200px]">{row.getValue("tags")}</div>,
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        accessorKey: "category",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Category" />,
        // cell: ({ row }) => {
        //     const category = categories.find(
        //         (category) => category.value === row.getValue("category")
        //     )

        //     if (!category) {
        //         return null
        //     }

        //     return (
        //         <div className="flex w-[120px] items-center">
        //             <span className="text-blue-500 border-b border-blue-500 cursor-pointer">{category.label}</span>
        //         </div>
        //     )
        // },
        cell: ({ row }) => <div className="w-[200px]">{row.getValue("category")}</div>,
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        accessorKey: "inStock",
        header: ({ column }) => <DataTableColumnHeader column={column} title="In Stock" />,
        cell: ({ row }) => (
            <div className="w-[120px]">
                <Badge className={"p-1 mr-2"} variant="destructive"></Badge>
                {row.getValue("inStock")}
            </div>
        ),
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        accessorKey: "availableStock",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Available Stock" />,
        cell: ({ row }) => (
            <div className="w-[120px]">
                <Badge className={"p-1 mr-2"} variant={""}></Badge>
                {row.getValue("availableStock")}
            </div>
        ),
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        id: "actions",
        cell: ({ row }) => <DataTableRowActions row={row} />,
    },
];
