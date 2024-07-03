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

// 採取 greedy 策略，每次分配都分配到所有房間最低的價格，可能不是最佳解
export const getDefaultRoomAllocation = ({ guest, rooms }: Params) => {
  const { adult, child } = guest;
  const result = Array.from(rooms, (room) => {
    return { adult: 0, child: 0, price: 0, capacity: room.capacity };
  });

  // 先分配小孩
  if (child > 0) {
    for (let i = 0; i < child; i++) {
      let price = Number.MAX_SAFE_INTEGER;
      let roomShouldGoTo = -1;
      rooms.forEach((room, index) => {
        const resultPrice = room.roomPrice + room.adultPrice * result[index].adult + room.childPrice * result[index].child;
        const newPrice = resultPrice + room.childPrice;
        // 考慮有小孩的房間要有一個大人
        const hasCapacity = (room.capacity - result[index].child - result[index].adult - 1) > 0;
        if (newPrice < price && hasCapacity) {
          price = newPrice;
          roomShouldGoTo = index;
        }
      });
      // 如果沒被分配到房間，就找第一個有空位的房間給他
      if (roomShouldGoTo < 0) {
        rooms.forEach((room, index) => {
          const hasCapacity = (room.capacity - result[index].child - result[index].adult - 1) > 0;
          if (hasCapacity) {
            roomShouldGoTo = index;
            const resultPrice = room.roomPrice + room.adultPrice * result[index].adult + room.childPrice * result[index].child;
            const newPrice = resultPrice + room.childPrice;
            price = newPrice;
          }
        })
      }
      result[roomShouldGoTo].child++;
      result[roomShouldGoTo].price = price;
    }
  }

  // 再分配大人
  for (let i = 1; i <= adult; i++) {
    let price = Number.MAX_SAFE_INTEGER;
    let roomShouldGoTo = -1;
    rooms.forEach((room, index) => {
      const resultPrice = room.roomPrice + room.adultPrice * result[index].adult + room.childPrice * result[index].child;
      const newPrice = resultPrice + room.adultPrice;
      const hasCapacity = (result[index].capacity - result[index].child - result[index].adult) > 0;
      const isAllChildRoom = result[index].adult === 0 && result[index].child > 0;
      // 遇到有小孩沒大人的情況優先分配
      if (hasCapacity && isAllChildRoom) {
        price = newPrice;
        roomShouldGoTo = index;
      }
      if (newPrice < price && hasCapacity) {
        price = newPrice;
        roomShouldGoTo = index;
      }
    });
    // 如果沒被分配到房間，就找第一個有空位的房間給他
    if (roomShouldGoTo < 0) {
      rooms.forEach((room, index) => {
        const hasCapacity = (room.capacity - result[index].child - result[index].adult) > 0;
        if (hasCapacity) {
          roomShouldGoTo = index;
          const resultPrice = room.roomPrice + room.adultPrice * result[index].adult + room.childPrice * result[index].child;
          const newPrice = resultPrice + room.childPrice;
          price = newPrice;
        }
      })
    }
    result[roomShouldGoTo].adult++;
    result[roomShouldGoTo].price = price;
  }

  return result;
};
