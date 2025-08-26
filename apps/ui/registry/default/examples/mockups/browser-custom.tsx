import { Browser } from "@/registry/default/ui/mockups/browser"

export default function Component() {
  return (
    <div className="h-[620px]">
      <Browser
        initialUrl="https://www.dalim.in"
        showWindowControls={true}
        showBookmarksBar={true}
        showStatusBar={true}
        enableTabManagement={true}
        enableBookmarks={true}
        enableHistory={true}
        enableDownloads={true}
        enableSettings={true}
        maxTabs={8}
        simulateLoading={true}
        loadingDuration={1500}
      />
    </div>
  )
}
