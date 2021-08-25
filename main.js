
function initTextSet(id) {
  document.getElementById(id).value = localStorage.getItem(id) || '';
  updateValue(id, localStorage.getItem(id) || '');
}

function updateValue(id, value = '') {
  localStorage.setItem(id, value)
  document.getElementById(`${id}-count`).innerText = `${value.length}文字`;
}

function copyText(id) {
  document.getElementById(id).select();
  document.execCommand("copy");
}

function renderTweetBlock(id) {
  const div = document.createElement('div');
  div.id = `${id}-block`;
  div.className = 'tweet-block';
  div.innerHTML = `
    <button class="del-button" onclick="removeTweetBlock('${id}')">×</button>
    <textarea id="${id}" onkeyup="updateValue('${id}', this.value)" cols="80" rows="20"></textarea>
    <p>
      <button onclick="copyText('${id}')">copy</button>
      <span id="${id}-count" class="count">0文字</span>
    </p>
  `;
  document.getElementById('tweet-block-area').appendChild(div);
}

function addTweetBlock() {
  const date = new Date();
  const id = date.toISOString();
  localStorage.setItem(id, '');
  renderTweetBlock(id);
}

function removeTweetBlock(id) {
  document.getElementById(`${id}-block`).remove();
  localStorage.removeItem(id);
}

function init() {
  Object.keys(localStorage).sort().map((key) => {
    renderTweetBlock(key);
    initTextSet(key);
  })
  if (Object.keys(localStorage).length === 0) {
    addTweetBlock();
  }
}
init();
