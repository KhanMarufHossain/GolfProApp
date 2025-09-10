// Community service with dummy data.
let _posts = [
  {
    id: 'post-1',
    user: { id: 'u1', name: 'John Blake', avatar: require('../../assets/man.png') },
    createdAt: new Date().toISOString(),
    text: 'Played East Potomac today — windy but beautiful! #golf',
    image: require('../../assets/golffield1.jpg'),
    likes: 12,
    liked: false,
    comments: [
      { id: 'c1', user: { id: 'u2', name: 'Chris' }, text: 'Nice round!', createdAt: new Date().toISOString() },
    ],
  },
  {
    id: 'post-2',
    user: { id: 'u3', name: 'Amelia', avatar: require('../../assets/man.png') },
    createdAt: new Date().toISOString(),
    text: 'New PB on hole 7! ⛳️',
    image: require('../../assets/golfField.png'),
    likes: 5,
    liked: true,
    comments: [],
  },
];

export async function fetchFeed() {
  return { ok: true, data: JSON.parse(JSON.stringify(_posts)) };
}

export async function createPost({ user, text, image }) {
  const newPost = {
    id: 'post-' + Date.now(),
    user: user || { id: 'me', name: 'You', avatar: require('../../assets/man.png') },
    createdAt: new Date().toISOString(),
    text: text || '',
    image: image || null,
    likes: 0,
    liked: false,
    comments: [],
  };
  _posts = [newPost, ..._posts];
  return { ok: true, data: newPost };
}

export async function likePost(postId) {
  _posts = _posts.map((p) => {
    if (p.id !== postId) return p;
    const liked = !p.liked;
    return { ...p, liked, likes: p.likes + (liked ? 1 : -1) };
  });
  const p = _posts.find((x) => x.id === postId);
  return { ok: true, data: p };
}

export async function addComment(postId, { user, text }) {
  const comment = { id: 'c-' + Date.now(), user: user || { id: 'me', name: 'You' }, text, createdAt: new Date().toISOString() };
  _posts = _posts.map((p) => (p.id === postId ? { ...p, comments: [...p.comments, comment] } : p));
  const p = _posts.find((x) => x.id === postId);
  return { ok: true, data: { post: p, comment } };
}
