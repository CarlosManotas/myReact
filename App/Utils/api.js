const api = {
  getBio(username){
    username = username.toLowerCase().trim();
    let url = `https://api.github.com/users/${username}`;
    return fetch(url).then((res) => res.json());
  },
  getRepos(username , pageId){
    if(!pageId){
      pageId=1;
    }
    username = username.toLowerCase().trim();
    let url = `https://api.github.com/users/${username}/repos?page=${pageId}&per_page=50`;
    return fetch(url).then((res) => res.json());
  },
  getNotes(username, token){
    username = username.toLowerCase().trim();
    const url = `https://gateway.user.space/main/classes/${username}`;
    return fetch(url,{
      method:'POST',
      headers: { "Authorization" : `Bearer ${token}`, "Content-Type" : "text/plain"},
      body:JSON.stringify({
        where:{},
        limit:10,
        order:"-createdAt,-createdAt",
        _method:"GET"
      })
    }).then(res=>res.json()).then(res=>res.results);
  },
  addNote(username,note, token){
    username = username.toLowerCase().trim();
    const url = `https://gateway.user.space/main/classes/${username}`;
    return fetch(url,{
      method:'POST',
      headers: { "Authorization" : `Bearer ${token}`, "Content-Type" : "text/plain"},
      body:JSON.stringify({note})
    }).then(res=>res.json());
  },
};

export default api;
