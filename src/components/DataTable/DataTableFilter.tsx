import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import type { Table, VisibilityState } from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import SearchInput from "../SearchInput";
import DateTimePicker from "../DateTimePicker";

interface DataTableFilterProps<T> {
  searchTerm: string;
  handleFilterChange: (search: string) => void;
  setSelectedDate?: (date: string | null) => void;
  table: Table<T>;
  searchPlaceholder?: string;
  showDatePicker?: boolean;
  showExportButton?: boolean;
  exportButtonText?: string;
  onExportClick?: () => void;
  searchInputClassName?: string;
  columnVisibility?: VisibilityState;
  excludeFromVisibilityToggle?: string[];
  customColumnNames?: Record<string, string>;
}

/**
 * Renders a data table filter component with search, date picker, column visibility,
 * and export functionality.
 *
 * @template T - The type of data in the table.
 * @param {string} searchTerm - The current search term for filtering data.
 * @param {Function} handleFilterChange - Callback to handle changes to the search term.
 * @param {Function} [setSelectedDate] - Optional callback to handle date selection.
 * @param {Table<T>} table - The table instance from @tanstack/react-table.
 * @param {string} [searchPlaceholder="Search..."] - Placeholder text for the search input.
 * @param {boolean} [showDatePicker=false] - Flag to show/hide the date picker.
 * @param {boolean} [showExportButton=false] - Flag to show/hide the export button.
 * @param {string} [exportButtonText="Export"] - Text displayed on the export button.
 * @param {Function} [onExportClick] - Callback for export button click event.
 * @param {string} [searchInputClassName="w-full lg:w-[443px]"] - CSS class for search input.
 * @param {VisibilityState} [columnVisibility] - Current visibility state of columns.
 * @param {string[]} [excludeFromVisibilityToggle=["select", "actions"]] - Column IDs to exclude from visibility toggling.
 * @param {Record<string, string>} [customColumnNames={}] - Custom display names for columns.
 * @returns {JSX.Element} The rendered data table filter component.
 */

export function DataTableFilter<T>({
  searchTerm,
  handleFilterChange,
  setSelectedDate,
  table,
  searchPlaceholder = "Search...",
  showDatePicker = false,
  showExportButton = false,
  exportButtonText = "Export",
  onExportClick,
  searchInputClassName = "w-full lg:w-[443px]",
  columnVisibility,
  excludeFromVisibilityToggle = ["select", "actions"],
  customColumnNames = {},
}: DataTableFilterProps<T>) {
  const getAllColumns = () => {
    return table.getAllColumns().filter((column) => {
      const columnId = column.id;

      // Skip columns that are explicitly excluded
      if (excludeFromVisibilityToggle.includes(columnId)) {
        return false;
      }

      // Skip columns that can't be hidden (if the column def has canHide: false)
      if (column.columnDef.enableHiding === false) {
        return false;
      }

      // Only include columns that have an accessor or id
      return columnId && columnId !== "";
    });
  };

  const toggleColumnVisibility = (columnId: string) => {
    const column = table.getColumn(columnId);
    if (column) {
      column.toggleVisibility();
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getColumnDisplayName = (columnId: string, columnHeader: any) => {
    if (customColumnNames[columnId]) {
      return customColumnNames[columnId];
    }

    if (typeof columnHeader === "string") {
      return columnHeader;
    }

    if (
      columnHeader &&
      typeof columnHeader === "object" &&
      columnHeader.props
    ) {
      if (typeof columnHeader.props.children === "string") {
        return columnHeader.props.children;
      }
    }

    return columnId
      .split(/(?=[A-Z])/) // Split on capital letters
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const filterableColumns = getAllColumns();

  return (
    <div className="p-4">
      <div className="flex flex-col items-center justify-between gap-4 xl:flex-row">
        <div className="flex items-center justify-center gap-3">
          <SearchInput
            value={searchTerm}
            onChange={handleFilterChange}
            placeholder={searchPlaceholder}
            debounceDelay={300}
            className={searchInputClassName}
          />
          {showDatePicker && setSelectedDate && (
            <DateTimePicker
              onDateTimeChange={(dateTime) => {
                setSelectedDate(dateTime ? dateTime.toString() : null);
                console.log("Selected DateTime:", dateTime);
              }}
            />
          )}
        </div>

        {/* Column filter dropdown */}
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="flex items-center gap-2 rounded-full"
                variant="secondary"
              >
                <ChevronDown className="h-4 w-4" />
                Column Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Toggle Columns</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {filterableColumns.map((column) => {
                const columnId = column.id;
                const displayName = getColumnDisplayName(
                  columnId,
                  column.columnDef.header
                );

                return (
                  <DropdownMenuCheckboxItem
                    key={columnId}
                    checked={columnVisibility?.[column.id] ?? true}
                    // checked={column.getIsVisible()}
                    onCheckedChange={() => toggleColumnVisibility(columnId)}
                    onSelect={(event) => event.preventDefault()}
                  >
                    {displayName}
                  </DropdownMenuCheckboxItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
          {showExportButton && (
            <Button
              className="hidden rounded-lg lg:flex lg:self-end"
              onClick={onExportClick}
            >
              {exportButtonText}
            </Button>
          )}
        </div>
      </div>

      <div className="">
        {showExportButton && (
          <Button className="rounded-lg lg:hidden" onClick={onExportClick}>
            {exportButtonText}
          </Button>
        )}
      </div>
    </div>
  );
}
