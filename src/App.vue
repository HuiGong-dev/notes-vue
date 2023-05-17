<template>
  <div class="container">
    <FormComponent
      ref="formComponent"
      @form-submitted="handleFormSubmit"
      @note-updated="handleNoteUpdate"
      :formData="formData"
    />
    <div :key="note.id" v-for="note in notes">
      <NoteItem :note="note" @editNote="handleEditNote" />
    </div>
  </div>
</template>

<script>
import FormComponent from './components/FormComponent.vue';
import NoteItem from './components/NoteItem.vue';

export default {
  name: 'App',
  data() {
    return {
      notes: [],
      formData: { title: '', text: '', date: '' },
    };
  },
  components: {
    FormComponent,
    NoteItem,
  },
  methods: {
    handleFormSubmit(formData) {
      this.notes = [...this.notes, formData];
    },
    handleEditNote(noteData) {
      this.formData = noteData;
      this.$refs.formComponent.focusTitle();
    },
    handleNoteUpdate(updatedNote) {
      this.notes.map((note) => {
        if (note.id === updatedNote.id) {
          note.text = updatedNote.text;
          note.title = updatedNote.title;
          note.date = updatedNote.date;
        }
        return note;
      });
      this.formData = { title: '', text: '', date: '' };
    },
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Poppins', sans-serif;
}

.container {
  max-width: 500px;
  margin: 30px auto;
  overflow: auto;
  min-height: 300px;
  border: 1px solid steelblue;
  padding: 30px;
  border-radius: 5px;
}

.btn {
  display: inline-block;
  background: #000;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
}

.btn:focus {
  outline: none;
}

.btn:active {
  transform: scale(0.98);
}

.btn-block {
  display: block;
  width: 100%;
}
</style>
