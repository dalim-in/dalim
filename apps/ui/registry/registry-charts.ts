import { type Registry } from "shadcn/registry"

export const charts: Registry["items"] = [
  {
    name: "chart-area-axes",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/chart-area-axes.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-area"],
  },
]
