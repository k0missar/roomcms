window.addEventListener('DOMContentLoaded', () => {
  const login = document.querySelector('.login');
  if (login) {
    const form = login.querySelector('.login__form');

    if (form) {
      form.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const formBody = Object.fromEntries(formData);

        fetch('/auth/login', {
          method: 'POST',
          body: JSON.stringify(formBody),
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(response => response.json())
        .then(json => {
          console.log(json)
          if (json.statusCode === 400) {
            login.querySelector('.form__error').style.display = 'block';
          }
          if (json.statusCode === 200) {
            window.location.reload();
          }
        }).catch(error => {
          console.log(error)
        })
      })
    }
  }

  // LOGOUT
  const logoutBtn = document.querySelector('.login__logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (event) => {
      fetch('/auth/logout', {
        method: 'POST',
        credentials: 'same-origin',
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.success) {
            window.location.reload()
          }
        })
        .catch((err) => console.error(err))
    })
  }
})
