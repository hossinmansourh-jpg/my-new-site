```javascript
// إنشاء شبكة مربعات
const gridContainer = document.getElementById('grid');
const squares = [];
const rows = 4;          // عدد الصفوف
const cols = 4;          // عدد الأعمدة
const defaultColor = '#ddd';

for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++) {
    const square = document.createElement('div');
    square.className = 'square';
    square.style.background = defaultColor;
    square.addEventListener('click', () => {
      square.style.background = randomColor();
    });
    gridContainer.appendChild(square);
    squares.push(square);
  }
}

// دالة لتوليد لون عشوائي
function randomColor() {
  const hex = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += hex[Math.floor(Math.random() * 16)];
  }
  return color;
}

// زر "مسح" لإعادة تعيين الشبكة
document.getElementById('reset').addEventListener('click', () => {
  squares.forEach(square => {
    square.style.background = defaultColor;
  });
});
```