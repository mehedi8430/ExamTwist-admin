import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
  type Table as TableType,
  type Updater,
  type VisibilityState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  type ForwardedRef,
} from "react";
import { Skeleton } from "../ui/skeleton.tsx";
import SelectInput, { type SelectOption } from "../SelectInput/index.tsx";
import AppPagination from "../AppPagination/index.tsx";
import { cn } from "@/lib/utils.ts";

export interface DataTableHandle<TData> {
  table: TableType<TData>;
}

// Style customization interface
export interface TableStyles {
  container?: string;
  table?: string;
  header?: {
    row?: string;
    cell?: string;
    wrapper?: string;
  };
  body?: {
    row?: string;
    cell?: string;
    wrapper?: string;
  };
  skeleton?: {
    row?: string;
    cell?: string;
    skeleton?: string;
  };
  noResults?: {
    row?: string;
    cell?: string;
  };
  actions?: {
    cell?: string;
    wrapper?: string;
  };
}

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  filterColumn?: string;
  page: number;
  limit: number;
  total: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  isPagination?: boolean;
  actions?: (row: TData) => React.ReactNode;
  columnVisibility?: VisibilityState;
  setColumnVisibility?: (updater: Updater<VisibilityState>) => void;
  isActionsFixed?: boolean;

  // Customization props
  tableStyles?: TableStyles;
  limitOptions?: SelectOption[];
  noResultsMessage?: string;
  actionsLabel?: string;
  skeletonRows?: number;
}

// Default styles
const defaultTableStyles: Required<TableStyles> = {
  container: "flex w-full flex-col space-y-4",
  table: "",
  header: {
    row: "bg-border/50 hover:bg-border/50 [&_tr]:border-b-0",
    cell: "text-foreground px-2 py-2 text-center sm:px-8 sm:py-3",
    wrapper: "truncate",
  },
  body: {
    row: "hover:bg-muted border-border/30 my-1 border-t text-center last:border-b sm:my-2",
    cell: "px-2 py-2 text-xs sm:px-8 sm:py-3 sm:text-sm",
    wrapper: "truncate",
  },
  skeleton: {
    row: "",
    cell: "p-2 sm:p-4",
    skeleton: "h-4 w-full sm:h-6",
  },
  noResults: {
    row: "",
    cell: "text-muted-foreground h-16 px-2 py-4 text-center text-xs sm:h-24 sm:px-4 sm:py-6 sm:text-sm",
  },
  actions: {
    cell: "w-[60px] px-2 py-2 text-xs sm:px-8 sm:py-3 sm:text-sm",
    wrapper: "flex justify-center",
  },
};

const defaultLimitOptions: SelectOption[] = [
  { value: "10", label: "10" },
  { value: "20", label: "20" },
  { value: "50", label: "50" },
];

function DataTableInner<TData, TValue>(
  {
    columns,
    data,
    isLoading = false,
    page,
    limit,
    total,
    actions,
    onPageChange,
    isPagination = true,
    onLimitChange,
    columnVisibility,
    setColumnVisibility,
    isActionsFixed = false,

    // Customization props with defaults
    tableStyles,
    limitOptions = defaultLimitOptions,
    noResultsMessage = "No results.",
    actionsLabel = "Actions",
    skeletonRows,
  }: DataTableProps<TData, TValue>,
  ref: ForwardedRef<DataTableHandle<TData>>
) {
  const [sorting, setSorting] = useState<SortingState>([]);

  // Merge custom styles with defaults
  const mergedTableStyles = {
    container: cn(defaultTableStyles.container, tableStyles?.container),
    table: cn(defaultTableStyles.table, tableStyles?.table),
    header: {
      row: cn(defaultTableStyles.header.row, tableStyles?.header?.row),
      cell: cn(defaultTableStyles.header.cell, tableStyles?.header?.cell),
      wrapper: cn(
        defaultTableStyles.header.wrapper,
        tableStyles?.header?.wrapper
      ),
    },
    body: {
      row: cn(defaultTableStyles.body.row, tableStyles?.body?.row),
      cell: cn(defaultTableStyles.body.cell, tableStyles?.body?.cell),
      wrapper: cn(defaultTableStyles.body.wrapper, tableStyles?.body?.wrapper),
    },
    skeleton: {
      row: cn(defaultTableStyles.skeleton.row, tableStyles?.skeleton?.row),
      cell: cn(defaultTableStyles.skeleton.cell, tableStyles?.skeleton?.cell),
      skeleton: cn(
        defaultTableStyles.skeleton.skeleton,
        tableStyles?.skeleton?.skeleton
      ),
    },
    noResults: {
      row: cn(defaultTableStyles.noResults.row, tableStyles?.noResults?.row),
      cell: cn(defaultTableStyles.noResults.cell, tableStyles?.noResults?.cell),
    },
    actions: {
      cell: cn(defaultTableStyles.actions.cell, tableStyles?.actions?.cell),
      wrapper: cn(
        defaultTableStyles.actions.wrapper,
        tableStyles?.actions?.wrapper
      ),
    },
  };

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      pagination: {
        pageIndex: page - 1,
        pageSize: limit,
      },
    },
    onSortingChange: setSorting,
    onColumnVisibilityChange: (updater) => setColumnVisibility?.(updater),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    pageCount: Math.ceil(total / limit),
  });

  useImperativeHandle(ref, () => ({ table }), [table]);

  const renderSkeleton = () => {
    const rows = skeletonRows || limit;
    return [...Array(rows)].map((_, rowIndex) => (
      <TableRow
        key={`skeleton-${rowIndex}`}
        className={mergedTableStyles.skeleton.row}
      >
        {columns.map((_, colIndex) => (
          <TableCell
            key={`skeleton-cell-${colIndex}`}
            className={mergedTableStyles.skeleton.cell}
          >
            <Skeleton className={mergedTableStyles.skeleton.skeleton} />
          </TableCell>
        ))}
        {actions && (
          <TableCell
            className={cn(
              mergedTableStyles.actions.cell,
              mergedTableStyles.skeleton.cell
            )}
          >
            <div className={mergedTableStyles.actions.wrapper}>
              <Skeleton className="h-4 w-12 sm:h-6 sm:w-16" />
            </div>
          </TableCell>
        )}
      </TableRow>
    ));
  };

  // Calculate the start and end record numbers for display
  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  const getActionsFixedClasses = (baseClass: string) => {
    return cn(baseClass, {
      "sticky right-0 z-50 bg-border shadow-md": isActionsFixed,
    });
  };

  return (
    <div className={mergedTableStyles.container}>
      {/* Table Container */}
      <Table className={mergedTableStyles.table}>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className={mergedTableStyles.header.row}
            >
              {headerGroup.headers.map((header, i) => (
                <TableHead
                  key={i}
                  className={mergedTableStyles.header.cell}
                  style={{ width: header.column.getSize() }}
                >
                  <div className={mergedTableStyles.header.wrapper}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </div>
                </TableHead>
              ))}
              {actions && (
                <TableHead
                  className={getActionsFixedClasses(
                    cn(
                      "w-[60px] px-2 py-2 text-center sm:px-8",
                      mergedTableStyles.header.cell
                    )
                  )}
                >
                  <div className={mergedTableStyles.header.wrapper}>
                    {actionsLabel}
                  </div>
                </TableHead>
              )}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {isLoading ? (
            renderSkeleton()
          ) : table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className={mergedTableStyles.body.row}
              >
                {row.getVisibleCells().map((cell, i) => (
                  <TableCell
                    key={i}
                    style={{ width: cell.column.getSize() }}
                    className={mergedTableStyles.body.cell}
                  >
                    <div className={mergedTableStyles.body.wrapper}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </div>
                  </TableCell>
                ))}

                {actions && (
                  <TableCell
                    className={getActionsFixedClasses(
                      mergedTableStyles.actions.cell
                    )}
                  >
                    <div className={mergedTableStyles.actions.wrapper}>
                      {actions(row.original)}
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))
          ) : (
            <TableRow className={mergedTableStyles.noResults.row}>
              <TableCell
                colSpan={columns.length + (actions ? 1 : 0)}
                className={mergedTableStyles.noResults.cell}
              >
                {noResultsMessage}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination Section */}
      {isPagination && (
        <div className="flex flex-col items-center justify-between gap-3 px-2 sm:flex-row sm:gap-4 sm:px-4">
          <div className="order-2 flex items-center text-center text-xs text-[#54607A] sm:text-left sm:text-sm">
            <span className="block sm:inline">
              Showing {start} to {end} of {total} results
            </span>
            <span className="mr-2 block sm:ml-1 sm:inline">
              of {total} entries
            </span>
            <SelectInput
              options={limitOptions}
              value={limit.toString()}
              onValueChange={(value) => onLimitChange(Number(value))}
              placeholder="Select limit"
              triggerClassName="bg-transparent shadow-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0"
            />
          </div>
          <div className="order-1">
            <AppPagination
              total={total}
              limit={limit}
              page={page}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export const DataTable = forwardRef(DataTableInner) as <
  TData,
  TValue = unknown
>(
  props: DataTableProps<TData, TValue> & {
    ref?: React.Ref<DataTableHandle<TData>>;
  }
) => ReturnType<typeof DataTableInner>;
