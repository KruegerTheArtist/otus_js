<template>
  <div>
    <h3>Редактор кода</h3>
    <textarea ref="codeEditor"></textarea>
    <button @click="submitSolution">Отправить решение</button>
  </div>
</template>

<script>
import * as CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript';

export default {
  mounted() {
    this.codeMirrorEditor = CodeMirror.fromTextArea(this.$refs.codeEditor, {
      lineNumbers: true,
      mode: 'javascript',
      theme: 'material',
    });
  },
  methods: {
    submitSolution() {
      const solutionCode = this.codeMirrorEditor.getValue();
      console.log('Решение:', solutionCode);
    },
  },
  beforeUnmount() {
    if (this.codeMirrorEditor) {
      this.codeMirrorEditor.toTextArea();
    }
  },
};
</script>

<style>
</style>