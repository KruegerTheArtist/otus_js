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
      // Отправка решения на сервер или другая логика обработки решения
      console.log('Submitted solution:', solutionCode);
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
/* Add custom styles for the code editor if needed */
</style>