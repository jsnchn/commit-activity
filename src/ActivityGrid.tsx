import { ActivityData } from "./ActivityDataType";

interface ActivityGridProps {
  activity?: ActivityData;
}

export default function ActivityGrid(props: ActivityGridProps) {
  return (
    <div>
      <div className="inline-block text-xs text-end align-top">
        <div className="h-4 mt-0.5">Sunday</div>
        <div className="h-4 mt-0.5">Monday</div>
        <div className="h-4 mt-0.5">Tuesday</div>
        <div className="h-4 mt-0.5">Wednesday</div>
        <div className="h-4 mt-0.5">Thursday</div>
        <div className="h-4 mt-0.5">Friday</div>
        <div className="h-4 mt-0.5">Saturday</div>
      </div>
      {props.activity?.map((week, i) => {
        return (
          <div key={i} className="inline-block">
            {week.days.map((day, i) => {
              let readableDate = new Date(
                week.week * 1000 + 86400000 * (i + 1)
              ).toLocaleDateString("en-us", {
                weekday: "long",
                year: "numeric",
                month: "short",
                day: "numeric"
              });
              return (
                <div
                  key={i}
                  className={`relative group w-4 h-4 m-0.5 rounded border border-gray-400 bg-green-${Math.min(
                    day * 100,
                    900
                  )}`}
                >
                  <span className="inline-block w-max absolute bottom-0 -translate-y-3/4 left-1/2 -translate-x-1/2 invisible z-10 py-2 px-3 text-sm text-white bg-gray-700 rounded-lg shadow-sm opacity-0 transition-opacity duration-200 tooltip group-hover:visible group-hover:opacity-100">
                    {day} commits on {readableDate}
                    <div className="w-6 overflow-hidden inline-block absolute bottom-0 translate-y-full left-1/2 -translate-x-1/3">
                      <div className=" h-3 w-3 bg-gray-700 -rotate-45 transform origin-top-left"></div>
                    </div>
                  </span>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

/**
 * {
    total: 2,
    week: 1625356800,
    days: [0, 2, 0, 0, 0, 0, 0]
  },
 */
