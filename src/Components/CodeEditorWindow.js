import React, { useState } from "react";
import './CodeEditor.css';
import Editor from "@monaco-editor/react";

const CodeEditorWindow = ({ language, code, theme,onChange }) => {
  const [value, setValue] = useState(code || "");

  const handleEditorChange = (value) => {
    setValue(value);
    onChange("code",value);
  };

  return (
    <div className="code-editr">
      <Editor
        height="82vh"
        width={`95%`}
        language={language || "python"}
        value={value}//the code user enters
        theme={theme}
        defaultValue="# Enter code Here"
        onChange={handleEditorChange}
      />
    </div>
  );
};
export default CodeEditorWindow;