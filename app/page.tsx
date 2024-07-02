import { Demo1, Demo2, Demo3 } from '@/features/number-input-demo';
import { RoomAllocation } from '@/features/room-allocation';

export default function Home() {
  return (
    <main className="m-5">
      <h2 className="text-center text-4xl">
        Custom Number Input Demo
      </h2>
      <section className="flex flex-col items-center m-8">
        <h3 className="text-2xl m-5">
          step is int
        </h3>
        <Demo1 />
        <h3 className="text-2xl m-5">
          step is float
        </h3>
        <Demo2 />
        <h3 className="text-2xl m-5">
          disabled
        </h3>
        <Demo3 />
      </section>
      <h2 className="text-center text-4xl">
        Room Allocation
      </h2>
      <section className="flex flex-col items-center m-8">
        <RoomAllocation
          guest={{ adult: 4, child: 2 }}
          rooms={[
            { roomPrice: 1000, adultPrice: 200, childPrice: 100, capacity: 4 },
            { roomPrice: 0, adultPrice: 500, childPrice: 500, capacity: 4 },
          ]}
        />
      </section>
    </main>
  );
}
