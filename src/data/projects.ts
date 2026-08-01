// Project data configuration file
// Used to manage data for the project display page

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: "contest" | "personal" | "code" | "other";
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
    id: "1",
    title: "高精度无线传输信号模拟系统",
    description:
      "该系统用于模拟产生无线通信中的直达信号(SD)和多径信号(SM)，并合路输出模拟的无线传输信号(SOut)。同时实现了对载波频率(fc)、信号调制(CW/AM)、多径时延、幅度衰减(α)和相对初相(φ)等关键信道参数的高精度可调。",
    image: "/assets/projects/1.webp",
    category: "contest",
    techStack: ["stm32", "jlc-eeda", "c"],
    status: "completed",
    startDate: "2024-07-29",
    endDate: "2024-08-01",
    featured: true,
    // tags: ["Hardware", "IoT", "Embedded"],
    showImage: true,
  },

  {
    id: "2",
    title: "宽带射频信号自动接收与调制识别系统",
    description:
      "基于超外差接收机原理，针对88MHz至108MHz调频/调幅小信号，设计并制作了一台低功耗、高速度的通信接收机。该系统集成了低噪声放大器、混频器、滤波器和解调模块、功率放大器，实现了对未知信号的自动搜索、识别、解调和带载输出。",
    image: "/assets/projects/2.webp",
    category: "contest",
    techStack: ["stm32", "jlc-eeda", "c"],
    status: "completed",
    startDate: "2025-07-30",
    endDate: "2025-08-02",
    featured: true,
    // tags: ["Hardware", "IoT", "Embedded"],
    showImage: true,
  },

  {
    id: "3",
    title: "智能交互桌面机器人系统",
    description:
      "本项目旨在设计并制作一款集语音交互、听声辨位、触屏操作、肢体动作及无线控制于一体的多功能桌面机器人。系统通过多传感器融合与嵌入式处理，为用户提供自然、生动、智能的人机交互体验。",
    image: "/assets/projects/3.webp",
    category: "contest",
    techStack: ["stm32", "jlc-eeda", "python", "c"],
    status: "completed",
    startDate: "2025-04-11",
    endDate: "2024-07-22",
    featured: false,
    // tags: ["Hardware", "IoT", "Embedded"],
    showImage: true,
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
