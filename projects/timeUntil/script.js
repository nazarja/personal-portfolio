const get = _ => document.querySelector(_);

const calculateDaysRemaining = date => {
  const start = new Date();
  const end = new Date(date);
  const result = Math.floor((end - start) / (1000 * 60 * 60 * 24));
  return result >= 0 ? result : 0;
};

const getLocal = () => {
  const local = localStorage.getItem('countdownCalendar');
  return local ? JSON.parse(local) : null;
};

const setLocal = ({ target: { value: date }}) => {
  localStorage.setItem('countdownCalendar', JSON.stringify(date))
};

const setup = () => {
  setStyles('block', null);
  get('#days').innerText = '';
  const date = new Date().toISOString();
  const today = date.slice(0, 10);
  const twoYears = `${Number(date.slice(0, 4)) + 2}${date.slice(4, 10)}`;
  get('[type="date"]').value = '';
  get('[type="date"]').setAttribute('min', today);
  get('[type="date"]').setAttribute('max',twoYears);
  get('[type="date"]').onchange = event => { setLocal(event), display() };
};

const display = () => {
  setStyles(null,'block');
  const date = new Date(getLocal()).toDateString().split(' ');
  get('#today p').innerText = new Date().toDateString();
  get('#date').innerText = `${date[0]}, ${date[2]} ${date[1]} ${date[3]}`;
  get('#result').innerText = calculateDaysRemaining(getLocal())
  get('#days').innerHTML = `<span>${calculateDaysRemaining(getLocal())}</span> day\'s left..`;
};

const setStyles = (...args) => {
  get('#setup').style.display = args[0] ?? 'none';
  get('#content').style.display = args[1] ?? 'none';
};

(() => {
  getLocal() ? display() : setup();
  get('#reset').onclick = () => setup();
})();


