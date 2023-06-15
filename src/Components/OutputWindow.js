import React from "react";
import './OutputWindow.css';
const OutputWindow = ({ outputDetails }) => {
  const getOutput = () => {
    let statusId = outputDetails?.status?.id;
    if(outputDetails.stdout===null){
      return null
    }
    if (statusId === 6) {
      // compilation error
      return (
        <pre className="outpt" >
          {atob(outputDetails?.compile_output)}
        </pre>
      );
    } else if (statusId === 3) {
      return (
        <pre className="outpt" >
          {atob(outputDetails.stdout) !== null
            ? `${atob(outputDetails.stdout)}`
            : null}
        </pre>
      );
    } else if (statusId === 5) {
      return (
        <pre className="outpt">
          {`Time Limit Exceeded`}
        </pre>
      );
    } else {
      return (
        <pre className="outpt" >
          {atob(outputDetails?.stderr)}
        </pre>
      );
    }
  };
  return (
    <>
      <div className="output-box">
        {outputDetails ? <>{getOutput()}</> : null}
      </div>
    </>
  );
};

export default OutputWindow;