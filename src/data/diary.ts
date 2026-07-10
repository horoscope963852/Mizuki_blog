// 日记数据配置
// 用于管理日记页面的数据

export interface DiaryItem {
  id: number;
  content: string;
  date: string;
  images?: string[];
  location?: string;
  mood?: string;
  tags?: string[];
}

// 示例日记数据
const diaryData: DiaryItem[] = [
  /*	{
		id: 1,
		content:
			"The falling speed of cherry blossoms is five centimeters per second!",
		date: "2025-01-15T10:30:00Z",
		images: ["/images/diary/sakura.jpg", "/images/diary/1.webp"],
	},*/
  {
    id: 2,
    content:
      "边实习边考研简直是我这段时间做过最荒诞的白日梦。上班的时候无论做什么都会经常被打断，几乎没有机会安安静静地坐在工位上做点事情；晚上八九点到家随便一下就到了十、十一点，不要说学习了，甚至游戏也有几周没有打开过。周末倒好，心里总惦记着那几百块加班费，时间也总是飞快地溜走，到今天为止考研都还没启动。",
    date: "2026-07-10T15:15:00Z",
    images: ["/images/diary/dog_0710.jpg"],
  },

  {
    id: 1,
    content:
      "给电路板烧录固件的同事说烧录不了，排查半天居然是直流电源的问题。优利德的UDP6731不行，换成6721就可以了。图片分别是6731和6721经过板上的降压电路后电压的纹波，也不知道这种脉冲波形是怎么来的，AI说是电源纹波抑制比不足导致电源纹波进入了后级。",
    date: "2026-07-09T13:22:00Z",
    images: ["/images/diary/UDP6731.jpg", "/images/diary/UDP6721.jpg"],
  },
];

// 获取日记列表（按时间倒序）
export const getDiaryList = (limit?: number) => {
  const sortedData = [...diaryData].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  if (limit && limit > 0) {
    return sortedData.slice(0, limit);
  }

  return sortedData;
};

// 获取所有标签
export const getAllTags = () => {
  const tags = new Set<string>();
  for (const item of diaryData) {
    if (item.tags) {
      for (const tag of item.tags) {
        tags.add(tag);
      }
    }
  }
  return Array.from(tags).sort();
};
