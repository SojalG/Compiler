import React, { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import './Compilerstyle.css';
import profile from './pics/profile.png';
import copy from './pics/copy.png';
import terminal from './pics/terminal.png';
import newlogo3 from './pics/newlogo3.png';
import finale from './pics/finale.png';
import refresh from './pics/refresh.png';
import format from './pics/format.png';
import light from './pics/light_mode.png';
import dark from './pics/dark_mode.png';
import delet from './pics/delete.png';
import { IoMdSend } from 'react-icons/io';
import { MdOutlineKeyboardArrowUp, MdEdit, MdDeleteOutline } from "react-icons/md";
import { SiRobotframework } from "react-icons/si";
import { IoCloseOutline } from "react-icons/io5";
import "tailwindcss";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Prism } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FaCopy } from "react-icons/fa";
import { PiBracketsCurlyBold } from "react-icons/pi";
import { AnimatePresence } from "framer-motion";


const codeSnippets = {
    'Javascript': `// Javascript
console.log("Hello, World!");`,
    'C++': `// C++
#include <iostream>
int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}`,
    'C': `// C
#include <stdio.h>
int main() {
    printf("Hello, World!");
    return 0;
}`,
    'Java': `// Java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
    'Python': `# Python
print("Hello, World!")
`
};

const judge0LangId = {
    Javascript: 63,
    "C++": 54,
    C: 50,
    Java: 62,
    Python: 71
};

const DUMMY_FILES = ['file1.js', 'file2.cpp', 'file3.c', 'file4.js', 'file5.py'];

const Compiler = () => {
    const [selectedLanguage, setSelectedLanguage] = useState('Javascript');
    const [code, setCode] = useState(codeSnippets['Javascript']);
    const [output, setOutput] = useState('');
    const [isRunning, setIsRunning] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [istheme, setIstheme] = useState(false);
    const [isLogout, setIsLogout] = useState(false);
    const [isAIModeOpen, setIsAIModeOpen] = useState(false);
    const textareaRef = useRef(null);
    const FILE_PANEL_WIDTH = 256;
    const AI_PANEL_WIDTH = 384;

    const languageMap = {
        JavaScript: 'javascript',
        'C++': 'cpp',
        C: 'c',
        Java: 'java',
        Python: 'python',
    };


    const handleLanguageChange = (event) => {
        const newLanguage = event.target.value;
        setSelectedLanguage(newLanguage);
        setCode(codeSnippets[newLanguage]);
    };


    const handleEditorChange = (value) => {
        setCode(value);
    }


    const toggleProfileMenu = () => {
        setIsProfileMenuOpen(prev => !prev);
    };


    const handleEditorDidMount = (editor, monaco) => {
        monaco.editor.defineTheme('my-custom-theme', {
            base: 'vs-dark',
            inherit: true,
            rules: [],
            colors: {
                'editor.background': '#21252b',
                'editorGutter.background': '#21252b'
            }
        });
        monaco.editor.setTheme('my-custom-theme');
    };

    const handleLoginToggle = () => {
        setIsLoggedIn(prev => !prev);
    };

    const theme = () => {
        setIstheme(prev => !prev);
    };

    const logout = () => {
        setIsLogout(prev => !prev);
    };

    const toggleAIMode = () => {
        setIsAIModeOpen(prev => !prev);
    };

    const handleClearOutput = () => setOutput('');




    const handleRun = async () => {
        const currentTerminal = output || '';

        setIsRunning(true);
        setOutput(prev => (prev ? prev + '\n' : '') + 'Compiling...\n');

        try {
            const payload = {
                source_code: code,
                language_id: judge0LangId[selectedLanguage],
                stdin: currentTerminal
            };

            const res = await fetch("https://ce.judge0.com/submissions/?base64_encoded=false&wait=true", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            if (!res.ok) {
                const text = await res.text();
                setOutput(prev => prev + `\nError: Judge0 responded with status ${res.status}\n${text}\n`);
                return;
            }

            const data = await res.json();

            let resultText = '\n=== Execution Result ===\n';

            if (data.compile_output) {
                resultText += `Compile Error:\n${data.compile_output}\n`;
            }

            if (data.stderr) {
                resultText += `Runtime Error:\n${data.stderr}\n`;
            }

            if (data.stdout) {
                resultText += `Output:\n${data.stdout}\n`;
            }

            if (!data.compile_output && !data.stderr && !data.stdout) {
                if (data.status && data.status.description) {
                    resultText += `Status: ${data.status.description}\n`;
                } else {
                    resultText += 'No output received.\n';
                }
            }

            setOutput(prev => prev + resultText + '\n');

            setTimeout(() => {
                if (textareaRef.current) {
                    textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
                }
            }, 50);
        } catch (err) {
            setOutput(prev => prev + `\nNetwork/Error: ${err.message}\n`);
        } finally {
            setIsRunning(false);
        }
    };

    const mainContentWidth = isAIModeOpen
        ? `calc(100% - ${FILE_PANEL_WIDTH}px - ${AI_PANEL_WIDTH}px)`
        : `calc(100% - ${FILE_PANEL_WIDTH}px)`;

    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const [question, setQuestion] = useState("");
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState([]);
    const [codeToCopy, setCodeToCopy] = useState("");
    const [copied, setCopied] = useState(false);

    //   const formatCode = (resp) => {
    //     const code = resp.replace(/^```[a-zA-Z]*\n?/, "").replace(/```$/, "");
    //     return (
    //       <Prism language={selectedLanguage} style={oneDark}>
    //         {code}
    //       </Prism>
    //     );
    //   };

    const askAi = async () => {
        console.log(question);
        if (!question.trim()) {
            return;
        }

        const newUserMsg = { role: "user", text: question.toString() };
        // setMessages((prev) => [...prev, newUserMsg]);
        const msgs = [...messages, newUserMsg];
        setMessages(msgs);
        setQuestion("");

        setLoading(true);

        try {
            const prevMsgs = msgs.map((msg) => ({
                role: msg.role === "user" ? "user" : "model",
                parts: [{ text: msg.text || "" }],
            }));

            const currMsg =
                question +
                `No explanation and in ${selectedLanguage} and add comments to explain code at the end of the code only and dont add comment in between the code`;

            const currHistory = [
                ...prevMsgs,
                {
                    role: "user",
                    parts: [{ text: `Current Code ${code}` }],
                },
                {
                    role: "user",
                    parts: [{ text: currMsg }],
                },
            ];

            const res = await model.generateContent({
                contents: currHistory,
            });
            let resp = await res.response.text();

            if (resp.trim().startsWith("```")) {
                resp = resp.trim();

                let code;

                if (resp.includes("```")) {
                    const parts = resp.split("```");
                    code = parts[1].replace(/^[a-zA-Z]+\n/, "").trim();
                } else {
                    code = resp;
                }

                const newAiMsg = {
                    role: "ai",
                    element: (
                        <Prism language={selectedLanguage} style={oneDark}>
                            {code}
                        </Prism>
                    ),
                };
                setCodeToCopy(code);

                setMessages((prev) => [...prev, newAiMsg]);
            } else {
                const newAiMsg = { role: "ai", text: code.toString() };
                setMessages((prev) => [...prev, newAiMsg]);
            }
        } catch (e) {
            const newAiMsg = { role: "ai", text: "⚠️ Error" };
            setMessages((prev) => [...prev, newAiMsg]);
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const chatRef = useRef(null);

    useEffect(() => {
        if (chatRef.current) chatRef.current.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    const editFile = (index) => {
        const newName = prompt("Enter new file name : ");
        if (newName || newName.trim()) {
            const updatedFiles = [...DUMMY_FILES];
            updatedFiles[index] = newName.trim();
            setDUMMY_FILES(updatedFiles);
        }
    };
    const deleteFile = (index) => {
        if (window.confirm(`Delete ${DUMMY_FILES[index]}?`)) {
            const files = DUMMY_FILES.filter((_, i) => i !== index);
            setDUMMY_FILES(files);
        }
    };


    return (
        <div className="app-container">
            <header className="header1">
                <div className="left-header">
                    <span className="left">
                        <img className='imglogo-style' src={newlogo3} />&nbsp;
                        <img className='img-logo' src={finale} />
                    </span>
                </div>
                <div className="right-header">
                    {istheme ? (
                        <button className='button2' title='Theme' onClick={theme}><img className='setting' src={dark} /></button>
                    ) : (
                        <button className='button2' title='Theme' onClick={theme}><img className='setting' src={light} /></button>
                    )}
                    <button
                        title='AI Mode'
                        onClick={toggleAIMode}
                        className={`p-3 mb-4 transition-colors duration-200 ${isAIModeOpen ? 'text-blue-400' : 'text-white-400 hover:text-white'}`}
                    >
                        <SiRobotframework title='AI Mode' className='ai mt-5 cursor-pointer' />
                    </button>
                    {/* <button className='button2' title='Settings'><img className='setting' src={settings} /></button>&nbsp;&nbsp; */}
                    <div className="profile-menu-container">
                        <button className='button2 mt-3' onClick={toggleProfileMenu} title="Profile">
                            <img className='img1' src={profile} />
                        </button>
                        {isProfileMenuOpen && (
                            <div className="profile-dropdown-menu">
                                <a href="/compilein/homepage">
                                    <button className="dropdown-item" >Home</button>
                                </a>

                                {/* <button className="dropdown-item" >Profile</button> */}
                                {/* <button className="dropdown-item" >Account Settings</button> */}
                                {isLogout ? (
                                    <button className="dropdown-item logout-link" type="button" title='Simulate Login' onClick={handleLoginToggle}>Login</button>
                                ) : (
                                    <button className="dropdown-item logout-link" type="button" title='Simulate Login' onClick={handleLoginToggle}>
                                        {isLoggedIn ? 'Logout' : 'Login'}
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </header>

            <hr className="separator" />

            <main className="flex h-[calc(100vh-64px)] overflow-hidden">
                <section className="filesection-login"><br />
                    <div className="filepane-heading1">
                        <b>FILES</b>
                    </div>
                    <hr style={{ width: '105%', marginBottom: '10px' }} />
                    <div style={{ width: '100%', padding: '0 5px' }}>
                        {isLoggedIn ? (
                            <div style={{ marginTop: '15px' }}>
                                <div style={{ color: '#ffffff', marginBottom: '15px', fontSize: '0.9em', fontWeight: 'bold' }}>
                                    YOUR PROJECTS
                                </div>
                                {DUMMY_FILES.map((file, index) => (
                                    <div
                                        key={index}
                                        className="file-item justify-between flex"
                                        onMouseEnter={(e) =>
                                            (e.currentTarget.style.backgroundColor = "#303953")
                                        }
                                        onMouseLeave={(e) =>
                                        (e.currentTarget.style.backgroundColor =
                                            index === 0 ? "#303953ff" : "transparent")
                                        }
                                        onClick={(e) =>
                                            (e.currentTarget.style.backgroundColor = "#334474ff")
                                        }
                                    >
                                        {file}
                                        <div className="flex gap-2 ">
                                            <MdEdit
                                                onClick={() => editFile(index)}
                                                className="hover:bg-slate-500 p-1 text-2xl rounded-2xl"
                                            />
                                            <MdDeleteOutline
                                                onClick={() => deleteFile(index)}
                                                className="hover:bg-slate-500 p-1 text-2xl rounded-2xl"
                                            />
                                        </div>
                                    </div>
                                ))}
                                <br />
                            </div>
                        ) : (
                            <>
                                <div className="leftheading">
                                    <b>Login to view your Files</b><br /><br />
                                </div>
                                <a href="/compilein/loginpage">
                                    <button className="button-2 md:flex md:ml-[60px]" type="button" title='Simulate Login' onClick={handleLoginToggle}>
                                        Login
                                    </button>
                                </a>
                            </>
                        )}
                    </div>
                </section>

                <section>
                    <div className="container"></div>
                </section>

                <section
                    className="editor-section flex-grow flex flex-col bg-[#1e1e1e] transition-all duration-300 min-w-0"
                    style={{ width: mainContentWidth }}
                >
                    <section className="main-content flex-grow flex flex-col h-full">
                        <div className="toolbar flex justify-between items-center bg-[#282c34] p-2 flex-shrink-0 border-b border-gray-700">
                            <div className="left-toolbar">
                                <div className="file-explorer-path">
                                    <span className="path-item">Editor</span>
                                </div>
                            </div>
                            <div className="right-toolbar">
                                <button title='Format Code'><img className='copy' src={format} /></button>&nbsp;&nbsp;&nbsp;
                                <button title='Copy'><img className='copy' src={copy} /></button>&nbsp;&nbsp;
                                <button title='Reset'><img className='copy' src={refresh} /></button>&nbsp;&nbsp;
                                <select id="output-style" onChange={handleLanguageChange} value={selectedLanguage}>
                                    <option>Javascript</option>
                                    <option>C++</option>
                                    <option>C</option>
                                    <option>Java</option>
                                    <option>Python</option>
                                </select>&nbsp;&nbsp;&nbsp;
                                <button className="button-6" type="button" title='Run' onClick={handleRun} disabled={isRunning}>
                                    {isRunning ? 'Running...' : 'Run'}
                                </button>                            </div>
                        </div>
                        <div className="code-editor-area flex-grow overflow-hidden">
                            <div className="code-editor h-full w-full">
                                <Editor
                                    height="100%"
                                    width="100%"
                                    // language={selectedLanguage.toLowerCase()}
                                    language={languageMap[selectedLanguage]}
                                    defaultLanguage='javascript'
                                    theme="vs-dark"
                                    options={{ fontSize: 16 }}
                                    value={code}
                                    onChange={handleEditorChange}
                                    onMount={handleEditorDidMount}
                                />
                            </div>
                        </div>
                    </section>

                    <section>
                        <div className="container2"></div>
                    </section>

                    <section className="main-content-terminal flex-shrink-0 h-60 flex flex-col ">
                        <div className="toolbar-terminal h-10">
                            <div className="left-toolbar1-terminal">
                                <div className="file-explorer-path-terminal">
                                    <img className='terminal' src={terminal} />&nbsp;
                                    <span className="path-item-terminal">Terminal</span>
                                </div>
                            </div>
                            <div className="right-toolbar1-terminal">
                                <button title='Delete'><img className='delete' src={delet} alt="delete" onClick={handleClearOutput} /></button>&nbsp;&nbsp;
                                <button title='Terminal Toggle'><MdOutlineKeyboardArrowUp className='delete cursor-pointer' /></button>
                            </div>
                        </div>
                        <div className="code-editor-area-terminal ">
                            <div className="code-editor-terminal">
                                <textarea
                                    ref={textareaRef}
                                    className='textarea1'
                                    placeholder="Type input here or view output..."
                                    value={output}
                                    onChange={(e) => setOutput(e.target.value)} // allow typing/input and show outputs
                                />
                            </div>
                        </div>
                    </section>
                </section>

                {/* <section className="main-content">
                    <div className="toolbar">
                        <div className="left-toolbar1">
                            <div className="file-explorer-path">
                                <img className='terminal' src={terminal} />&nbsp;
                                <span className="path-item">Terminal</span>
                            </div>
                        </div>
                        <div className="right-toolbar1">
                            <button title='Delete'><img className='delete' src={delet} /></button>&nbsp;&nbsp;
                        </div>
                    </div>
                    <div className="code-editor-area">
                        <div className="code-editor">
                            <textarea placeholder="&nbsp;Output Here..."></textarea>
                        </div>
                    </div>
                </section> */}

                {/* <section className="main-content-ai">
                    <div className="toolbar-ai">
                        <div className="left-toolbar-ai">
                            <div className="file-explorer-path-ai">
                                <SiRobotframework className='delete mt-0.5' />&nbsp;&nbsp;
                                <span className="path-item-ai">AI-Mode</span>
                            </div>
                        </div>
                        <div className="right-toolbar-ai">
                        </div>
                    </div>
                    <div className="code-editor-area-ai">
                        <div className="code-editor-ai">
                            <div className="toolbar-ai-bar mt-165 ml-1.5 mr-1.5">
                                <input type="text" className="input-ai" placeholder="Ask AI..." />
                                <div className="right-toolbar-ai">
                                    <button title='Delete'><IoMdSend title='Send' className='delete cursor-pointer' /></button>&nbsp;&nbsp;
                                </div>
                            </div>
                        </div>
                    </div>
                </section> */}

                <section
                    className="main-content-ai flex-shrink-0 flex flex-col bg-[#21252b] shadow-2xl z-50 transition-all duration-300 border-l border-gray-700 ml-2"
                    style={{
                        width: isAIModeOpen ? `${AI_PANEL_WIDTH}px` : '0px',
                        visibility: isAIModeOpen ? 'visible' : 'hidden',
                        minWidth: isAIModeOpen ? `${AI_PANEL_WIDTH}px` : '0px',
                    }}
                >
                    <div className="toolbar-ai">
                        <div className="left-toolbar-ai">
                            <div className="file-explorer-path-ai flex items-center justify-between">
                                <SiRobotframework className='delete mt-0.5 align-right' />
                                &nbsp;&nbsp;
                                <span className="path-item-ai text-lg font-bold">AI-Mode</span>
                            </div>
                            <button
                                title='Close AI Mode'
                                onClick={toggleAIMode}
                                className="p-1 rounded hover:bg-gray-700 transition-colors cursor-pointer lg:ml-55.5">
                                <IoCloseOutline />
                            </button>
                        </div>
                    </div>
                    <div className="code-editor-area-aix`">
                        <div className="ai-output-area">
                            {messages.map((msg, i) => (
                                <div key={i} className="flex flex-col gap-3 mt-4 mr-2">
                                    {msg.role === "user" ? (
                                        <div className="self-end bg-blue-600 px-4 py-2 rounded-2xl max-w-[80%] shadow text-white">
                                            <p className="text-sm">
                                                <span className="font-bold text-[13px]">YOU:</span>{" "}
                                                {msg.text}
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="self-start bg-slate-800 text-white px-4 py-2 rounded-2xl max-w-[80%]  shadow text-sm ml-2">
                                            <span className="font-bold flex justify-between text-slate-200">
                                                {" "}
                                                <div className="flex gap-3">
                                                    <div className="relative group">
                                                        <button
                                                            title="Get In Editor"
                                                            className="cursor-pointer text-[17px]"
                                                            onClick={() => {
                                                                setCode(codeToCopy);
                                                            }}
                                                        >
                                                            <PiBracketsCurlyBold />
                                                            <span
                                                                className={`absolute -top-8 left-1/2 -translate-x-1/2 text-xs rounded-md px-2 py-1 bg-slate-800 text-white transition-opacity duration-200 pointer-events-none group-hover:opacity-100 opacity-0 w-[90px]`}
                                                            >
                                                                Get In Editor
                                                            </span>
                                                        </button>
                                                    </div>
                                                    <div className="relative group">
                                                        <button
                                                            title="Copy"
                                                            className="cursor-pointer text-[16px]"
                                                            onClick={() => {
                                                                navigator.clipboard.writeText(codeToCopy);
                                                                setCopied(true);
                                                                setTimeout(() => setCopied(false), 800);
                                                            }}
                                                        >
                                                            <FaCopy className='h-3.5 w-3.5'/>
                                                            <span
                                                                className={`absolute -top-8 left-1/2 -translate-x-1/2 text-xs rounded-md px-2 py-1 bg-slate-800 text-white transition-opacity duration-200 pointer-events-none ${copied
                                                                    ? "opacity-100"
                                                                    : "opacity-0 group-hover:opacity-100"
                                                                    }`}
                                                            >
                                                                {copied ? "Copied!" : "Copy"}
                                                            </span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </span>
                                            {msg.element ? msg.element : <p>{msg.text}</p>}
                                        </div>
                                    )}
                                </div>
                            ))}

                            {loading && (
                                <p className="text-gray-300 text-sm mt-3 italic">
                                    Thinking<span className="animate-pulse">...</span>
                                </p>
                            )}
                            <div ref={chatRef}> </div>
                        </div>
                        <div className="toolbar-ai-bar">
                            <input
                                type="text"
                                className="input-ai flex-grow bg-transparent text-white focus:outline-none placeholder-gray-500 text-sm p-1"
                                placeholder="Ask AI..."
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && askAi()}
                            />
                            <button
                                title="Send"
                                className="ml-2 text-blue-400 hover:text-blue-300 transition-colors p-1"
                                onClick={askAi}
                            >
                                <IoMdSend title="Send" className="delete cursor-pointer" />
                            </button>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};
export default Compiler;