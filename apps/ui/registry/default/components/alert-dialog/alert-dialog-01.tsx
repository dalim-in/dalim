import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertLiquidDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertLiquidDialogTrigger,
} from "@/registry/default/ui/alert-dialog"
import { Button } from "@/registry/default/ui/button"

export default function Component() {
  return (
    <AlertDialog>
      <AlertLiquidDialogTrigger asChild>
        <Button variant="outline">Show Dialog</Button>
      </AlertLiquidDialogTrigger>
      <AlertLiquidDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="">Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertLiquidDialogContent>
    </AlertDialog>
  )
}
