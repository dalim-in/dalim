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
        <Button variant="outline">Liquid Glass</Button>
      </AlertLiquidDialogTrigger>
      <AlertLiquidDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="">Did you like Liquid Glass?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>No</AlertDialogCancel>
          <AlertDialogAction className="bg-green-500">Absolutely! Yes</AlertDialogAction>
        </AlertDialogFooter>
      </AlertLiquidDialogContent>
    </AlertDialog>
  )
}
