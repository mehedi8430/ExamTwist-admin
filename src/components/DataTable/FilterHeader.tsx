import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { Filter } from "lucide-react";
import DateTimePicker from "@/components/DateTimePicker";

interface FilterOption {
  value: string;
  label: string;
}

interface BaseFilterHeaderProps {
  headerText: string;
  filterValue: string | null;
  onFilterChange: (value: string) => void;
}

interface DropdownFilterProps extends BaseFilterHeaderProps {
  type?: "dropdown";
  options: FilterOption[];
  allLabel?: string;
}

interface DateFilterProps extends BaseFilterHeaderProps {
  type: "date";
  onDateTimeChange: (dateTime: Date | null) => void;
  initialDateTime?: Date;
}

type FilterHeaderProps = DropdownFilterProps | DateFilterProps;

export const FilterHeader = (props: FilterHeaderProps) => {
  const { headerText, filterValue, onFilterChange } = props;

  if (props.type === "date") {
    const { onDateTimeChange, initialDateTime } = props;

    return (
      <div className="flex items-center justify-center">
        <span>{headerText}</span>
        <DateTimePicker
          onDateTimeChange={(dateTime) => {
            const isoString = dateTime ? dateTime.toISOString() : "";
            onFilterChange(isoString);
            onDateTimeChange(dateTime ?? null);
          }}
          initialDateTime={initialDateTime}
          trigger={
            <Button variant="ghost" size="sm" className="h-6 px-2">
              <Filter className="size-3.5" />
            </Button>
          }
        />
      </div>
    );
  }

  // Default dropdown behavior
  const { options, allLabel = "All" } = props;

  return (
    <div className="flex items-center justify-center">
      <span>{headerText}</span>
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className="cursor-pointer hover:bg-transparent focus:ring-0 focus:ring-offset-0 focus:outline-none focus-visible:ring-0"
        >
          <Button variant="ghost" size="sm" className="h-6 px-2">
            <Filter className="size-3.5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem
            onClick={() => onFilterChange("")}
            className={`cursor-pointer ${
              filterValue === "" ? "bg-accent" : ""
            }`}
          >
            {allLabel}
          </DropdownMenuItem>
          {options.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onClick={() => onFilterChange(option.value)}
              className={`cursor-pointer ${
                filterValue === option.value ? "bg-accent" : ""
              }`}
            >
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
