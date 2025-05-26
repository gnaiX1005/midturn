const postForm = document.getElementById('postForm');
const nicknameInput = document.getElementById('nickname');
const contentInput = document.getElementById('content');
const postList = document.getElementById('postList');

let posts = JSON.parse(localStorage.getItem('posts') || '[]');

function savePosts() {
  localStorage.setItem('posts', JSON.stringify(posts));
}

function formatDate(timestamp) {
  const d = new Date(timestamp);
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')} ` +
         `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}:${String(d.getSeconds()).padStart(2,'0')}`;
}

function renderPosts() {
  postList.innerHTML = '';
  posts.forEach((post, idx) => {
    const div = document.createElement('div');
    div.className = 'post';
    div.innerHTML = `
      <div class="post-header">
        <div><strong>${escapeHTML(post.nickname)}</strong></div>
        <div>${formatDate(post.timestamp)}</div>
      </div>
      <div class="post-content">${escapeHTML(post.content)}</div>
      <div>
        <span class="post-footer" onclick="likePost(${idx})">❤️ ${post.likes}</span>
      </div>
    `;
    postList.appendChild(div);
  });
}

function escapeHTML(str) {
  return str.replace(/[&<>"']/g, function(m) {
    return ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    })[m];
  });
}

function likePost(idx) {
  posts[idx].likes++;
  savePosts();
  renderPosts();
}

postForm.addEventListener('submit', e => {
  e.preventDefault();
  const nickname = nicknameInput.value.trim();
  const content = contentInput.value.trim();
  if (!nickname || !content) return alert('請填寫暱稱和留言');

  posts.unshift({
    nickname,
    content,
    timestamp: Date.now(),
    likes: 0
  });
  savePosts();
  renderPosts();
  postForm.reset();
});

renderPosts();

window.likePost = likePost;
