document.addEventListener('turbolinks:load', () => {
  if (document.getElementById('rooms-join')) {
    const button = document.getElementById('join_room');
    button.addEventListener('click', (event) => {
      event.preventDefault();

      const token = document.getElementById('token').value;
      window.location.href = `?token=${token}`;
    });
  }
});