<template>
  <div class="note">
    <h3 class="title">{{ note.title }}</h3>
    <div class="date-and-edit-button">
      <p>{{ note.date }}</p>
      <button class="btn" @click="editNote">Edit</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'NoteItem',
  props: {
    note: Object,
  },
  methods: {
    editNote() {
      this.$emit('editNote', this.note);
    },
  },
};
</script>
<style>
.note {
  background: #f4f4f4;
  margin: 5px;
  padding: 10px 20px;
}

.date-and-edit-button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 100%;
}
.title {
  max-width: 100%;
  word-wrap: break-word;
}
</style>
