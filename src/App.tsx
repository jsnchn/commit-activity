import { useEffect, useState } from "react";
import { debounce, fetchData } from "./utils";
import "./styles.css";
import ActivityGrid from "./ActivityGrid";
import dummy from "./dummy";
import { isValidActivityData } from "./ActivityDataType";

export default function App() {
  let [username, setUsername] = useState("");
  let [repo, setRepo] = useState("");
  let [activity, setActivity] = useState();
  let [errorMessage, setErrorMessage] = useState("");
  let debounceUsername = debounce((val: string) => setUsername(val), 300);
  let debounceRepo = debounce((val: string) => setRepo(val), 300);

  useEffect(() => {
    if (username !== "" && repo !== "") {
      const url = `https://api.github.com/repos/${username}/${repo}/stats/commit_activity`;
      fetchData(url).then((data) => {
        if (!isValidActivityData(data)) {
          console.error(data.message, url);
          setErrorMessage(data.message);
          setActivity(undefined);
        } else {
          setActivity(data);
          setErrorMessage("");
        }
      });
    }
  }, [username, repo]);

  return (
    <div className="App">
      {errorMessage !== "" && (
        <div className="absolute bottom-0 flex bg-red-500 text-white w-full py-2 px-8 items-center">
          <p className="flex-auto">{errorMessage}</p>
          <button
            className="flex-none bg-red-600 hover:bg-red-700 active:bg-red-300 text-white active:text-black font-bold py-2 px-4 rounded"
            onClick={() => setActivity(dummy)}
          >
            Use dummy data
          </button>
        </div>
      )}
      <h1 className="text-3xl font-bold my-10">
        Commit Activity for&nbsp;
        <input
          className="border-b-2 border-black"
          onChange={(e) => debounceUsername(e.target.value)}
          placeholder="username"
        />
        &nbsp;on&nbsp;
        <input
          className="border-b-2 border-black"
          onChange={(e) => debounceRepo(e.target.value)}
          placeholder="repo"
        />
        .
      </h1>
      {isValidActivityData(activity) && <ActivityGrid activity={activity} />}
    </div>
  );
}
