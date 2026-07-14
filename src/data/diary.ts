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
    id: 4,
    content: "一杯水一支烟，一个波形测一天。下辈子一定要做研发不做测试。",
    date: "2026-07-14T13:09:00Z",
    images: ["/images/diary/260714.jpg"],
  },

  {
    id: 3,
    content:
      "可能是到深圳两个月以来天气最好的一天，天气非常晴朗，太阳高照，气温适宜，没有一点闷热的感觉。睡到十二点起来晒被子，这还是来之后第一次晒被子。想到KFC的大神卡只剩最后一天了，就点了一份双人餐当午饭。后面不会再续了，还是比堂食贵很多：一份常点的四件套堂食是27.9，外送32.9，看来免的外送费都加在了原价里。双人餐实在吃不下剩了四分之一，留到晚上七八点当晚饭吃了。今天没有去公司加班。昨天感觉到无聊的时候心情还蛮低落的，今天突然想到能感觉到无聊对于社畜来说也未免不是一件好事。下午一直在听音乐，今天都还算过得平平淡淡。",
    date: "2026-07-11T15:28:00Z",
    images: ["/images/diary/260711.jpg"],
  },

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
