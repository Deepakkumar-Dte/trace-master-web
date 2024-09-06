"use client";

import * as React from "react";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import {
  DayPicker,
  SelectSingleEventHandler,
  SelectMultipleEventHandler,
} from "react-day-picker";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Label } from "./label";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

export type CalendarProps = Partial<React.ComponentProps<typeof DayPicker>>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export type DatePickerProps = React.ComponentProps<typeof DayPicker> & {
  wrapperProps?: React.HTMLAttributes<HTMLDivElement>;
  label?: string;
  onSelect?: SelectSingleEventHandler | SelectMultipleEventHandler;
  required?: boolean;
  format?: string;
  value?: Date | string;
  labelProps?: typeof LabelPrimitive.Root;
};

function DatePicker({
  wrapperProps,
  label = "",
  onSelect,
  format: formatStr = "yyy-mm-dd",
  required = false,
  labelProps,
  value = new Date(),
}: DatePickerProps) {
  return (
    <div
      {...wrapperProps}
      className={`gap-y-2 flex flex-col  ${wrapperProps?.className}`}
    >
      {label && (
        <Label className="text-[12px] font-semibold" {...labelProps}>
          {label} {required && <span className="text-[red]">*</span>}
        </Label>
      )}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !value && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value ? (
              format(
                typeof value === "string" ? new Date(value) : value,
                formatStr
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={typeof value === "string" ? new Date(value) : value}
            onSelect={onSelect as any}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
DatePicker.displayName = "DatePicker";

export { Calendar, DatePicker };
