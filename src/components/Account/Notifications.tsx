import { Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import React from "react";

interface NotificationsProps {
  count?: number;
  onOpen?: () => void;
}

const Notifications = ({ count = 0, onOpen }: NotificationsProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative rounded-full"
          onClick={onOpen}
        >
          <Bell className="h-5 w-5" />
          {count > 0 && (
            <Badge
              className="absolute -right-1 -top-1 h-4 min-w-4 rounded-full px-1 text-xs flex items-center justify-center"
              variant="destructive"
            >
              {count > 99 ? "99+" : count}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 mr-4">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Notifications</h4>
            <p className="text-sm text-muted-foreground">
              {count === 0
                ? "No new notifications"
                : `You have ${count} unread notification${
                    count !== 1 ? "s" : ""
                  }`}
            </p>
          </div>
          {/* Add your notifications list here */}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Notifications;
