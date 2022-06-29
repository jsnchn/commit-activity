export const debounce = (fn: (...args: any[]) => void, delay: number) => {
  let timerId: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn(...args), delay);
  };
};

export const fetchData = async (url: string) => {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.log("error", error);
  }
};
