import { Button } from "@/registry/default/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@dalim/core/ui/sheet";
import { Menu } from "lucide-react"; 
import { NavMenu } from "./nav-menu";
import { DalimLogo } from "@dalim/core/components/logo";

export const NavigationSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <DalimLogo />
        <NavMenu orientation="vertical" className="mt-12" />
      </SheetContent>
    </Sheet>
  );
};