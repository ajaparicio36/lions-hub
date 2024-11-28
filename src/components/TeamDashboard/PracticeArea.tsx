import { Button } from "@/components/ui/button";
import { ScrollText, Video } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function PracticeArea() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Practice Area</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Button className="w-full">
          <ScrollText className="mr-2" />
          Scrimmage Logs
        </Button>
        <Button className="w-full">
          <Video className="mr-2" />
          VOD Reviews
        </Button>
      </CardContent>
    </Card>
  );
}
