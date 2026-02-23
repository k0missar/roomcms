window.addEventListener('DOMContentLoaded', () => {
  // LOGIN
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

  // FORM БРОНИРОВАНИЕ
  const roomForm = document.querySelector('.js-room-form');
  const rooms = document.querySelector('.js-rooms');

  if (roomForm && rooms) {
    document.addEventListener('click', (event) => {
      const target = event.target;

      const clickedOnTrigger = target.closest('.js-fr');
      const clickedInsideForm = target.closest('.js-form');

      // 1. Открыть форму при клике на .js-fr (кнопка внутри списка комнат)
      if (clickedOnTrigger && rooms.contains(clickedOnTrigger)) {
        roomForm.classList.add('--active');

        const room = target.closest('.js-room')

        const userId = room.dataset.user;
        const roomId = room.dataset.room;
        const roomPrice = room.dataset.price;

        roomForm.querySelector('.js-fr-user-id').value = userId;
        roomForm.querySelector('.js-fr-room-id').value = roomId;
        roomForm.querySelector('.js-fr-price').value = roomPrice;

        const form = document.querySelector('.js-form');
        form.addEventListener('submit', (event) => {
          event.preventDefault();

          const formData = new FormData(form);
          const formBody = Object.fromEntries(formData);
          formBody.meta = {}
          formBody.meta.comment = formBody.comment;
          fetch('/bookings', {
            method: 'POST',
            body: JSON.stringify(formBody),
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then(response => response.json())
            .then(json => {
              window.location.reload();
            }).catch(error => {
            console.log(error)
          })
        })

        return;
      }

      // 2. Закрыть, если форма открыта и клик был вне формы и вне триггера
      if (
        roomForm.classList.contains('--active') &&
        !clickedInsideForm &&
        !clickedOnTrigger
      ) {
        roomForm.classList.remove('--active');
      }
    });
  }

  // ОТМЕНИТЬ БРОНЬ
  const bookingCancelBtn = document.querySelectorAll('.js-booking-cancel');
  if (bookingCancelBtn) {
    bookingCancelBtn.forEach((button) => {
      button.addEventListener('click', (event) => {
        const room = button.closest('.js-room')
        const bookingId = room.dataset.booking;
        fetch('/bookings/' + bookingId, {
          method: 'DELETE',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Ошибка удаления брони');
            }
            return null;
          })
          .then(() => {
            window.location.reload();
          })
          .catch((error) => {
            console.error(error);
          });
        })
      })
  }
})
