import { useState, useEffect } from "react";

export default function Logger() {
  const [logs, setLogs] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/logs")
      .then((res) => res.json())
      .then((data) => setLogs(data.docs));
  }, []);
  const logsLast = logs.reverse();
  const number = logs.length;
  return (
    <>
      <h2 className="logger-title">Logger ({number})</h2>
      <div className="logger">
        {logsLast.map((log) => {
          {
            return <p key={log._id}>{log.url}</p>;
          }
        })}
      </div>
    </>
  );
}
