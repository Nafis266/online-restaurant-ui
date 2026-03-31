function handleReservation(e) {
  e.preventDefault();

  const name   = document.getElementById('res-name').value;
  const date   = document.getElementById('res-date').value;
  const time   = document.getElementById('res-time').value;
  const guests = document.getElementById('res-guests').value;

  showToast(`Reservation confirmed for ${name} — ${guests} on ${date} at ${time}`);
  e.target.reset();
}
