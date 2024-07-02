type Params = {
  guest: {
    adult: number;
    child: number;
  };
  rooms: {
    roomPrice: number;
    adultPrice: number;
    childPrice: number;
    capacity: number;
  }[];
}

export const getDefaultRoomAllocation = ({ guest, rooms }: Params) => {
  const { adult, child } = guest;
  const totalGuests = adult + child;

  // 創建一個 DP 表格
  const dp = Array(totalGuests + 1)
    .fill(null)
    .map(() => Array(rooms.length + 1).fill(Infinity));
  const allocation: any[][] = Array(totalGuests + 1)
    .fill(null)
    .map(() => Array(rooms.length + 1).fill(null).map(() => []));

  // 初始化
  dp[0][0] = 0;

  // 填 DP 表格
  for (let i = 1; i <= totalGuests; i++) {
    for (let j = 1; j <= rooms.length; j++) {
      const room = rooms[j - 1];
      for (let a = 0; a <= Math.min(i, room.capacity, adult); a++) {
        const c = Math.min(i - a, room.capacity - a);
        if (c > child) continue;
        if (c > 0 && a === 0) continue; // 確保有 child 的房間至少有一個 adult

        const price = room.roomPrice + a * room.adultPrice + c * room.childPrice;
        const newPrice = dp[i - a - c][j - 1] + price;

        if (newPrice < dp[i][j]) {
          dp[i][j] = newPrice;
          allocation[i][j] = [...allocation[i - a - c][j - 1], { adult: a, child: c, price, capacity: room.capacity }];
        }
      }
    }
  }

  // 找到最佳解
  return allocation[totalGuests][rooms.length];
};
