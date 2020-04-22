import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

//component
import DisplayLogList from "../DisplayLogList/DisplayLogList";
import DisplayTagList from "../DisplayTagList/DisplayTagList";

//service
import Context from "../../context/ContextProvider";
import LogsService from "../../service/log-service";
import TagsService from "../../service/tag-service";

import "./ProfilePage.css";

function ProfilePage() {
  const [active, setActive] = useState("Logs");
  const context = useContext(Context);
  const {
    error,
    logList,
    tagList,

    setError,
    setLogList,
    setTagList,

    clearError,
    clearLogList,
    clearTagList,
  } = context;

  useEffect(() => {
    clearError();
    LogsService.getUsersLogs()
      .then(setLogList)
      .catch((res) => setError(res.error.message));
    TagsService.getUserTags()
      .then(setTagList)
      .catch((res) => setError(res.error.message));

    return () => {
      clearLogList();
      clearTagList();
    };
  }, [0]);

  const displayLogs = () => {
    return logList.map((log, i) => {
      return <DisplayLogList key={i} log={log} />;
    });
  };

  const displayTags = () => {
    return tagList.map((tag, i) => {
      return <DisplayTagList key={i} tag={tag} />;
    });
  };

  return (
    <section className="profile-sect">
      <header className="button-grp">
        <button onClick={() => setActive("Logs")}>Logs</button>
        <button onClick={() => setActive("Tags")}>Tags</button>
      </header>
      <div className="prof-list list">
        <label className="sort">
          Sort by:{" "}
          <select>
            <option>Date created</option>
            <option>Ascending</option>
            <option>Descending</option>
          </select>
        </label>
        {active === "Logs" ? displayLogs() : displayTags()}
      </div>
    </section>
  );
}

export default ProfilePage;
