export type ActivityWeek = {
  total: number;
  week: number;
  days: number[];
};

export type ActivityData = ActivityWeek[];

export const isValidActivityData = (object?: ActivityData) => {
  if (!Array.isArray(object)) return false;

  const { total, week, days }: ActivityWeek = object[0];

  return (
    typeof total === "number" &&
    typeof week === "number" &&
    Array.isArray(days) &&
    days.reduce((acc, value) => acc && typeof value === "number", true)
  );
};
