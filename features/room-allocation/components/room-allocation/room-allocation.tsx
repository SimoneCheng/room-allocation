'use client';

import { useState } from 'react';
import { NumberInput } from '@/components/number-input';
import { getDefaultRoomAllocation } from '../../utils';

type RoomAllocationProps = {
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

const RoomAllocation = (props: RoomAllocationProps) => {
  const {
    guest,
    rooms
  } = props;
  const [result, setResult] = useState(getDefaultRoomAllocation({ guest, rooms }));
  const totalResultAdult = result.reduce((acc, val) => acc + val.adult, 0);
  const totalResultChild = result.reduce((acc, val) => acc + val.child, 0);
  const remainAdult = guest.adult - totalResultAdult;
  const remainChild = guest.child - totalResultChild;

  return (
    <div>
      <h2 className="text-center bg-green-100 rounded p-3 m-3">
        {`住客人數：${guest.adult}位大人，${guest.child}位小孩／${rooms.length}房`}
      </h2>
      <div className="text-center bg-blue-100 rounded p-3 m-3">
        {`尚未分配人數：${remainAdult} 位大人，${remainChild} 位小孩`}
      </div>
      <div>
        {result.map((room: any, index: any) => {
          const remainCapacity = room.capacity - room.adult - room.child;
          return (
            <div key={index} className="rounded border-2 border-gray-400 m-3 p-3 w-80">
              <p>{`房間 ${index + 1}：${room.adult + room.child} 人`}</p>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div>大人</div>
                  <NumberInput
                    max={remainCapacity === 0 ? room.adult : room.adult + remainAdult}
                    min={0}
                    value={room.adult}
                    onChange={(_, value) => {
                      const newResult = [...result];
                      newResult[index].adult = value ?? 0;
                      setResult(newResult);
                    }}
                  />
                </div>
                <div className="flex items-center justify-between mb-3">
                  <div>小孩</div>
                  <NumberInput
                    max={remainCapacity === 0 ? room.child : room.child + remainChild}
                    min={0}
                    value={room.child}
                    onChange={(_, value) => {
                      const newResult = [...result];
                      newResult[index].child = value ?? 0;
                      setResult(newResult);
                    }}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default RoomAllocation;
