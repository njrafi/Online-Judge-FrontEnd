// import { Ace } from "ace-builds";

import React from "react";
// import { render } from "react-dom";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-monokai";

const getModeForLanguage = (language) => {
	switch (language) {
		case "cpp":
			return "c_cpp";
		default:
			return language;
	}
};

// TODO: Let people choose theme
const CodeEditor = (props) => {
	return (
		<AceEditor
			mode={getModeForLanguage(props.language)}
			theme="monokai"
			name="blah2"
			width={"100%"}
			value={props.code}
			// onLoad={this.onLoad}
			onChange={props.codeChanged}
			fontSize={20}
			showPrintMargin={true}
			showGutter={true}
			highlightActiveLine={true}
			setOptions={{
				enableBasicAutocompletion: true,
				enableLiveAutocompletion: true,
				enableSnippets: false,
				showLineNumbers: true,
				tabSize: 4,
			}}
		/>
	);
};

export default CodeEditor;
