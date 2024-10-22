function fetchRandomUsers() {
  const userList = document.getElementById("user-list");
  const loading = document.getElementById("loading");
  const error = document.getElementById("error");

  userList.innerHTML = "";
  error.style.display = "none";

  // Запрос к API
  fetch("https://randomuser.me/api/?results=10")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Cannot fetch users info");
      }
      return response.json();
    })
    .then((data) => {
      const users = data.results;

      // Loading уже не нужен
      loading.style.display = "none";
      
      // Добавляем пользователей в список
      users.forEach((user) => {
        const li = document.createElement("li");
        li.className = "user-card";
        li.innerHTML = `
                    <img src="${user.picture.medium}" alt="${user.name.first}">
                    <h3>${user.name.first} ${user.name.last}</h3>
                    <p>${user.email}</p>
                `;
        userList.appendChild(li);
      });
    })
    .catch(() => {
      // Если запрос выдал ошибку, выводим сообщение
      loading.style.display = "none";
      error.style.display = "block";
    });
}

window.onload = fetchRandomUsers;
