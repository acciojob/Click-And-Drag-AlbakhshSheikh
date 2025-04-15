// Your code here.
const container = document.querySelector('.items');
const items = document.querySelectorAll('.item');

items.forEach(item => {
  item.style.position = 'absolute';
  item.style.cursor = 'grab';

  // Store initial grid position
  const rect = item.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();

  item.style.left = `${rect.left - containerRect.left}px`;
  item.style.top = `${rect.top - containerRect.top}px`;

  let offsetX = 0;
  let offsetY = 0;
  let isDragging = false;

  item.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - item.offsetLeft;
    offsetY = e.clientY - item.offsetTop;
    item.style.zIndex = '1000';
    item.style.cursor = 'grabbing';

    function onMouseMove(e) {
      if (!isDragging) return;

      const containerRect = container.getBoundingClientRect();
      const newX = e.clientX - containerRect.left - offsetX;
      const newY = e.clientY - containerRect.top - offsetY;

      // Enforce boundaries
      const maxX = container.clientWidth - item.offsetWidth;
      const maxY = container.clientHeight - item.offsetHeight;

      item.style.left = `${Math.max(0, Math.min(newX, maxX))}px`;
      item.style.top = `${Math.max(0, Math.min(newY, maxY))}px`;
    }

    function onMouseUp() {
      isDragging = false;
      item.style.zIndex = '';
      item.style.cursor = 'grab';
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
});
