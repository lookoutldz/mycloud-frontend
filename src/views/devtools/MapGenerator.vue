<template>
  <div class="container">
    <div class="grid" @mousedown="startSelection" @mouseup="endSelection" @mousemove="mousemove">
      <div v-for="(row, rowIndex) in grid" :key="rowIndex" class="row">
        <div v-for="(cell, cellIndex) in row" :key="cellIndex" :class="{ cell: true, selected: cell.selected }"></div>
      </div>
    </div>
    <div class="form">
      <div>
        <el-checkbox v-model="isLand" label="is Land" size="large" />
      </div>
      <div>
        <el-button type="primary" @click="printMap">生成 Json</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      grid: [],
      selecting: false,
      selectionStart: { x: 0, y: 0 },
      selectionEnd: { x: 0, y: 0 },
      dynamicKey: '',
      dynamicValue: '',
      areas: [{
        ''
      }]
    };
  },
  methods: {
    initializeGrid() {
      for (let i = 0; i < 10; i++) {
        const row = [];
        for (let j = 0; j < 6; j++) {
          row.push({ selected: false, x: i, y: j, exploreable: false });
        }
        this.grid.push(row);
      }
    },
    startSelection(event) {
      this.selecting = true;
      this.selectionStart = this.getMousePosition(event);
      this.selectionEnd = this.selectionStart;
      console.log(this.selectionStart)
    },
    endSelection(event) {
      this.selecting = false;
      this.selectionEnd = this.getMousePosition(event);
      console.log(this.selectionEnd)
    },
    mousemove(event) {
      if (this.selecting) {
        this.selectionEnd = this.getMousePosition(event);
        this.updateSelection();
      }
    },
    updateSelection() {
      const minX = Math.min(this.selectionStart.x, this.selectionEnd.x);
      const minY = Math.min(this.selectionStart.y, this.selectionEnd.y);
      const maxX = Math.max(this.selectionStart.x, this.selectionEnd.x);
      const maxY = Math.max(this.selectionStart.y, this.selectionEnd.y);

      for (let i = 0; i < this.grid.length; i++) {
        for (let j = 0; j < this.grid[i].length; j++) {
          const cell = this.grid[i][j];
          cell.selected = i >= minX && i <= maxX && j >= minY && j <= maxY;
        }
      }
    },
    getMousePosition(event) {
      const cellSize = 10;
      const x = event.target.getBoundingClientRect().left;
      const y = event.target.getBoundingClientRect().top;
      const cellX = Math.floor(x / cellSize);
      const cellY = Math.floor(y / cellSize);
      return { x: cellX, y: cellY };
    },
    printMap() {

      for (let i = 0; i < this.grid.length; i++) {
        for (let j = 0; j < this.grid[i].length; j++) {
          const cell = this.grid[i][j];
          if (cell.selected) {
          }
          console.log(cell)
        }
      }
    }
  },
  mounted() {
    this.initializeGrid();
  },
};
</script>

<style>
.container {
  display: flex;
}

.grid {
  width: 1200px;
  display: grid;
  grid-template-columns: repeat(10, 10px);
  grid-template-rows: repeat(6, 10px);
  gap: 0;
}

.row {
  display: grid;
}

.cell {
  width: 8px;
  height: 8px;
  border: 1px solid black;
}

.selected {
  background-color: #007bff;
}

.form {
  margin-left: 10px;
  margin-top: 10px;
  width: 200px;
}
</style>
