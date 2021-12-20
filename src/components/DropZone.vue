<template>
  <div class="dropzone" @drop="dropEvent">
    <label for="file-input">
      <div class="b-span">Перенесите сюда протокол</div>
      <hr />
      <div class="s-span">или нажмите здесь и выберите путь</div>
      <input
        type="file"
        hidden
        id="file-input"
        ref="fileInput"
        @change="fileLoad"
      />
    </label>
  </div>
</template>

<script>
export default {
  name: "drop-zone",
  data() {
    return {
      file: [],
    };
  },
  methods: {
    dropEvent(event) {
      event.preventDefault();
      const file = event.dataTransfer.files[0];
      this.handleFile(file);
    },
    fileLoad() {
      const file = this.$refs.fileInput.files[0];
      this.handleFile(file);
    },
    handleFile(file) {
      const reader = new FileReader();
      reader.readAsText(file, "windows-1251");
      reader.addEventListener("load", () => {
        this.$emit("fileLoad", reader.result);
      });
    },
  },
};
</script>

<style scoped>
.dropzone {
  min-width: 200px;
  max-width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(15deg, #a4c6c0, hsl(191, 15%, 90%));
  color: hsl(207, 88%, 25%);
  opacity: 0.8;
  border: 4px solid hsl(174, 134%, 88%);
  border-radius: 2em;
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
  transition: all 0.5s ease-out;
  animation: puls-shadow 1s infinite alternate;
}
@keyframes puls-shadow {
  from {
    box-shadow: 0 0 2px 2px hsl(168, 15%, 59%);
  }
  to {
    box-shadow: 0 0 30px 12px #a3c6c0;
  }
}
@keyframes puls-stop {
  from {
    box-shadow: 0 0 2px 2px hsl(168, 15%, 59%);
  } 
  to {
    box-shadow: 0 0 33px 14px hsl(171, 39%, 80%);
  }
}
.dropzone:hover {
  /* animation-play-state: paused; */
  /* animation: none; */
  animation: puls-stop 0.5s forwards;
}
.dropzone label {
  padding: 2em;
  border-radius: 2em;
  cursor: pointer;
}
.b-span,
.s-span {
  text-align: center;
  cursor: pointer;
}
.b-span {
  font-size: 1.5em;
}
.s-span {
  font-size: 1.2em;
}
</style>
