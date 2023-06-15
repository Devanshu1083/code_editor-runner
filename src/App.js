import React,{ useState } from 'react';
import './App.css';
import Select from 'react-select';
import CodeEditorWindow from './Components/CodeEditorWindow';
import axios from 'axios';
import OutputWindow from './Components/OutputWindow';
import OutputDetails from './Components/OutputDetails';
import {SelectStyle} from './utility/SelectStyle';
import lgo from './lgo.png';
function App() {

	const languages = [
    {
      id: 70,
      name: "Python (2.7.17)",
      label: "Python (2.7.17)",
      value: "python",
    },
    {
      id: 71,
      name: "Python (3.8.1)",
      label: "Python (3.8.1)",
      value: "python",
    },
    {
      id: 75,
      name: "C (Clang 7.0.1)",
      label: "C (Clang 7.0.1)",
      value: "c",
    },
    {
      id: 76,
      name: "C++ (Clang 7.0.1)",
      label: "C++ (Clang 7.0.1)",
      value: "cpp",
    },
    {
      id: 48,
      name: "C (GCC 7.4.0)",
      label: "C (GCC 7.4.0)",
      value: "c",
    },
    {
      id: 52,
      name: "C++ (GCC 7.4.0)",
      label: "C++ (GCC 7.4.0)",
      value: "cpp",
    },
    {
      id: 49,
      name: "C (GCC 8.3.0)",
      label: "C (GCC 8.3.0)",
      value: "c",
    },
    {
      id: 53,
      name: "C++ (GCC 8.3.0)",
      label: "C++ (GCC 8.3.0)",
      value: "cpp",
    },
    {
      id: 50,
      name: "C (GCC 9.2.0)",
      label: "C (GCC 9.2.0)",
      value: "c",
    },
    {
      id: 54,
      name: "C++ (GCC 9.2.0)",
      label: "C++ (GCC 9.2.0)",
      value: "cpp",
    },
    {
      id: 62,
      name: "Java (OpenJDK 13.0.1)",
      label: "Java (OpenJDK 13.0.1)",
      value: "java",
    },
    ];
	const themes = [
        { value: "vs-dark", label: "Dark" },
        { value: "light", label: "Light" },
    ]
	// State variable to set users source code
    const [userCode, setUserCode] = useState("#Enter code here");
 
    // State variable to set editors default language
    const [userLang, setUserLang] = useState(languages[1]);
 
    // State variable to set editors default theme
    const [userTheme, setUserTheme] = useState("vs-dark");
 
    // State variable to set users input
    const [userInput, setUserInput] = useState("");
 
    // State variable to set users output
    const [userOutput, setUserOutput] = useState("");
    
    const [outputDetails,setoutputDetails]=useState(null);
    // Loading state variable to show spinner
    // while fetching data
    const [loading, setLoading] = useState(false);
    
	const onChange = (action, data) => {
		switch (action) {
		  case "code": {
			setUserCode(data);
			break;
		  }
		  default: {
			console.warn("case not handled!", action, data);
		  }
		}
	  };

  const checkStatus = async (token) => {
    const options = {
      method: "GET",
      url: 'https://judge0-ce.p.rapidapi.com/submissions' + "/" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        'X-RapidAPI-Key': '',
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
      },
    };
    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;

      // Processed - we have a result
      if (statusId === 1 || statusId === 2) {
        // still processing
        setTimeout(() => {
          checkStatus(token)
        }, 2000)
        return
      } else {
        setLoading(false);
        setUserOutput(atob(response.data.stdout))
        setoutputDetails(response.data)
        console.log('response.data', response.data)
        return
      }
    } catch (err) {
      console.log("err", err);
      setLoading(false);
    }
  };
	const compile =()=>{
    setLoading(true);

     const formData = {
      language_id: userLang.id,
      // encode source code in base64
      source_code: btoa(userCode),
      stdin: btoa(userInput),
    };
    const options = {
      method: "POST",
      url: 'https://judge0-ce.p.rapidapi.com/submissions',
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        'X-RapidAPI-Key': '',
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
      },
      data: formData,
    };

    axios
      .request(options)
      .then(function (response) {
        console.log("res.data", response.data);
        const token = response.data.token;
        checkStatus(token);
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        setLoading(false);
        console.log(error);
      });
	  }; 

	  const clearOutput=()=>{
      setoutputDetails(null);
      setUserOutput("");
	  }

	  return (
		<div id="home">
    <div id="nav-box">
		<nav id="navbar">
            <Select className='nav-items' 
            options={languages} 
            value={userLang}
            onChange={(e) => setUserLang(e)}
            placeholder={userLang}
            styles={SelectStyle} />

            <Select className='nav-items' 
            options={themes} value={userTheme}
            onChange={(e) => setUserTheme(e.value)}
            placeholder={userTheme} 
            styles={SelectStyle}/>
            <img src={lgo} alt='DEV-L'></img>
		</nav>
    <div className="backgrnd">
    </div>
    </div>
    <div className='windows'>
		<div className='left-container'>
		  <CodeEditorWindow id="editor-box"
		  language={userLang?.value}
		  theme={userTheme}
		  code={userCode}
          onChange={onChange}
		   />
		</div>
		<div className="right-container">
                    <div className='input-label'>
                      INPUT:
                    </div>
                    <div className="input-box">
                        <textarea id="code-inp" onChange=
                            {(e) => setUserInput(e.target.value)}>
                        </textarea>
                    </div>
                    <div className='input-label2'>
                      OUTPUT:
                    </div>
                    {loading ? (
                        <div className="spinner-box">
                          <div class="lds-dual-ring"></div>
                        </div>
                    ) : (
                      <div className="output-box">
                        <OutputWindow outputDetails={outputDetails}></OutputWindow>
                        {outputDetails && <OutputDetails outputDetails={outputDetails} />}
                      </div>              
                    )}
                     <div className="btns">
                            <div >
                               <div className="btn btn-one" onClick={() => compile()}>
                               <span className="box-1" >SUBMIT</span>
                              </div>
                            </div>
                            <div >
                               <div className="btn btn-one" onClick={() => clearOutput()}>
                               <span className="box-1" >CLEAR</span>
                              </div>
                            </div>
                    </div>
          </div>
		 </div>
		</div>
	  )
}

export default App;
