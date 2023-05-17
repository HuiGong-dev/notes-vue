<template>
  <div class="container">
    <h1>Hey, {{ username }}</h1>
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
import FormComponent from '../components/FormComponent.vue';
import NoteItem from '../components/NoteItem.vue';

export default {
  name: 'DetailPage',
  mounted() {
    if (!localStorage.getItem('isLoggedIn')) {
      this.$router.path('/login');
    }
  },
  computed: {
    username() {
      return this.$route.params.username;
    },
  },
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
      this.$refs.formComponent.blurTitle();
    },
  },
};
</script>
