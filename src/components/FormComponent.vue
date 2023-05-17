<template>
  <div class="form">
    <form @submit="onSubmit" class="form">
      <div class="form-control">
        <label class="title">Title:</label>
        <input
          ref="titleInput"
          v-model="title"
          type="text"
          id="title"
          maxlength="100"
          required
        />
      </div>

      <div class="form-control">
        <label>Text:</label>
        <textarea v-model="text" maxlength="300" required></textarea>
        <p>{{ text.length }}/300</p>
      </div>
      <div class="form-control">
        <label>Date:</label> <input v-model="date" type="date" required />
      </div>

      <button type="submit" class="btn btn-block">Save</button>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    formData: Object,
  },
  data() {
    return {
      title: '',
      text: '',
      date: '',
      isEdit: false,
      id: null,
    };
  },
  watch: {
    formData(newData) {
      if (newData.title === '') {
        return;
      } else {
        this.title = newData.title;
        this.text = newData.text;
        this.date = newData.date;
        this.isEdit = true;
        this.id = newData.id;
      }
    },
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      if (this.text.trim() === '' || this.title.trim() === '') {
        alert('Title and Text can not be empty.');
        return;
      }

      const formData = {
        id: Math.floor(Math.random() * 100000),
        title: this.title,
        text: this.text,
        date: this.date,
      };

      this.isEdit
        ? this.$emit('note-updated', { ...formData, id: this.id })
        : this.$emit('form-submitted', formData);

      // clear the Form
      this.title = '';
      this.text = '';
      this.date = '';
      // reset status
      this.id = null;
      this.isEdit = false;
    },
    focusTitle() {
      this.$refs.titleInput.focus();
    },
  },
};
</script>
<style>
.form {
  margin-bottom: 40px;
}
.form-control {
  margin: 10px 0;
}

.form-control label {
  display: block;
}

.form-control input {
  width: 100%;
  height: 40px;
  padding: 3px 7px;
  font-size: 17px;
}

.form-control textarea {
  width: 100%;
  height: 150px;
  font-size: 17px;
}

.form-control p {
  text-align: right;
  padding-right: 5px;
}
</style>
