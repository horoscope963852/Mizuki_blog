// Project data configuration file
// Used to manage data for the project display page

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: "web" | "mobile" | "desktop" | "other";
  techStack: string[];
  status: "completed" | "in-progress" | "planned";
  liveDemo?: string;
  sourceCode?: string;
  visitUrl?: string;
  startDate: string;
  endDate?: string;
  featured?: boolean;
  tags?: string[];
  showImage?: boolean;
}

export const projectsData: Project[] = [
  {
    id: "高精度无线传输信号模拟系统",
    title: "高精度无线传输信号模拟系统",
    description:
      "该系统用于模拟产生无线通信中的直达信号(SD)和多径信号(SM)，并合路输出模拟的无线传输信号(SOut)。同时实现了对载波频率(fc)、信号调制(CW/AM)、多径时延、幅度衰减(α)和相对初相(φ)等关键信道参数的高精度可调。",
    image: "",
    category: "other",
    techStack: ["C", "ESP-IDF", "MQTT"],
    status: "in-progress",
    startDate: "2026-06-01",
    endDate: "2024-06-01",
    featured: true,
    tags: ["Hardware", "IoT", "Embedded"],
    showImage: false, // 暂无图片，与现有无图项目保持一致
  },

  /*  {
    id: "mizuki",
    title: "Mizuki",
    description:
      "A next-gen Material Design 3 blog theme built with Astro, featuring i18n, dark mode, and responsive design.",
    image: "/assets/projects/mizuki.webp",
    category: "web",
    techStack: ["Astro", "TypeScript", "Tailwind CSS", "Svelte"],
    status: "completed",
    sourceCode: "https://github.com/LyraVoid/Mizuki",
    visitUrl: "https://mizuki.mysqil.com",
    startDate: "2024-01-01",
    endDate: "2024-06-01",
    featured: true,
    tags: ["Blog", "Theme", "Open Source"],
  },
  {
    id: "folkpatch",
    title: "FolkPatch",
    description:
      "A kernel-level ROOT solution based on KernelPatch, with polished UI, APM module system, and KPM kernel module support.",
    image: "/assets/projects/folkpatch.webp",
    category: "mobile",
    techStack: ["Kotlin", "Rust", "C++", "Java"],
    status: "in-progress",
    sourceCode: "https://github.com/LyraVoid/FolkPatch",
    visitUrl: "https://fp.mysqil.com",
    startDate: "2024-03-01",
    featured: true,
    tags: ["Android", "Root", "Kernel"],
  },
  {
    id: "folktool",
    title: "FolkTool",
    description:
      "A fast ROOT flashing tool for FolkPatch with a graphical interface and automated operations, simplifying the complex flashing process.",
    image: "",
    category: "desktop",
    techStack: ["Flutter", "Dart", "C++", "CMake"],
    status: "completed",
    sourceCode: "https://github.com/LyraVoid/FolkTool",
    startDate: "2026-02-01",
    endDate: "2026-02-28",
    tags: ["Android", "Tool", "Desktop"],
    showImage: false,
  },
  {
    id: "folkadb",
    title: "FolkADB",
    description:
      "A portable ADB/Fastboot tool written in C, featuring interactive CLI, Tab completion, drag-and-drop module installation, and Shizuku activation.",
    image: "",
    category: "desktop",
    techStack: ["C"],
    status: "completed",
    sourceCode: "https://github.com/LyraVoid/FolkADB",
    startDate: "2025-06-01",
    endDate: "2026-01-01",
    tags: ["Android", "ADB", "CLI"],
    showImage: false,
  },
  {
    id: "folksplash",
    title: "FolkSplash",
    description:
      "A web-based splash.img visualizer for OPPO/Realme/OnePlus devices, supporting unpack, preview, replace, and repack.",
    image: "",
    category: "web",
    techStack: ["React", "TypeScript", "Vite", "Material-UI", "Zustand"],
    status: "completed",
    sourceCode: "https://github.com/LyraVoid/FolkSplash",
    visitUrl: "https://splash.mysqil.com",
    startDate: "2025-09-01",
    endDate: "2025-10-01",
    tags: ["Android", "Tool", "Frontend"],
    showImage: false,
  },*/
];

// Get project statistics
export const getProjectStats = () => {
  const total = projectsData.length;
  const completed = projectsData.filter((p) => p.status === "completed").length;
  const inProgress = projectsData.filter(
    (p) => p.status === "in-progress",
  ).length;
  const planned = projectsData.filter((p) => p.status === "planned").length;

  return {
    total,
    byStatus: {
      completed,
      inProgress,
      planned,
    },
  };
};

// Get projects by category
export const getProjectsByCategory = (category?: string) => {
  if (!category || category === "all") {
    return projectsData;
  }
  return projectsData.filter((p) => p.category === category);
};

// Get featured projects
export const getFeaturedProjects = () => {
  return projectsData.filter((p) => p.featured);
};

// Get all tech stacks
export const getAllTechStack = () => {
  const techSet = new Set<string>();
  projectsData.forEach((project) => {
    project.techStack.forEach((tech) => {
      techSet.add(tech);
    });
  });
  return Array.from(techSet).sort();
};
