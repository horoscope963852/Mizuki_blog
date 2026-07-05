// 友情链接数据配置
// 用于管理友情链接页面的数据

export interface FriendItem {
  id: number;
  title: string;
  imgurl: string;
  desc: string;
  siteurl: string;
  tags: string[];
}

// 友情链接数据
export const friendsData: FriendItem[] = [
  {
    id: 1,
    title: "信通科协",
    imgurl: "https://img.xtkx.site/2025/10/cropped-LOGO_透明.png",
    desc: "电子科技大学信息与通信工程学院学生创新创业中心",
    siteurl: "https://xtkx.site",
    tags: ["University"],
  },
];

// 获取所有友情链接数据
export function getFriendsList(): FriendItem[] {
  return friendsData;
}

// 获取随机排序的友情链接数据
export function getShuffledFriendsList(): FriendItem[] {
  const shuffled = [...friendsData];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
