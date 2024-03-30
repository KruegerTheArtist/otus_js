import React, { useRef, useEffect } from 'react';
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/theme/material.css';

const CodeEditor = ({ value, onChange }) => {
    const editorRef = useRef();
    const editorInstanceRef = useRef(null);

    useEffect(() => {
        // Initialize CodeMirror instance if it does not exist
        if (!editorInstanceRef.current) {
            editorInstanceRef.current = CodeMirror(editorRef.current, {
                value: value,
                mode: 'javascript',
                theme: 'material',
                lineNumbers: true,
                lineWrapping: true,
            });

            editorInstanceRef.current.on('change', instance => {
                onChange(instance.getValue());
            });
        }

        // Dispose of the CodeMirror instance when the component unmounts
        return () => {
            if (editorInstanceRef.current && editorInstanceRef.current.toTextArea) {
                editorInstanceRef.current.toTextArea();
                editorInstanceRef.current = null;
            }
        };
    }, [onChange, value]); // Only re-run the effect if onChange or value changes

    // Update the value of the editor if the value prop changes
    useEffect(() => {
        if (editorInstanceRef.current && value !== editorInstanceRef.current.getValue()) {
            editorInstanceRef.current.setValue(value);
        }
    }, [value]);

    return <div ref={editorRef} />;
};

export default CodeEditor;