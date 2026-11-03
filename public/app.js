const styles = {
  everyday: { name: 'The art of<br>keeping it simple.', kicker: 'LESS EFFORT. MORE YOU.', description: 'Clean lines, easy layers, and pieces that just work together. An everyday look with nothing ordinary about it.', tip: 'Add a simple gold ring. Sometimes, the smallest detail changes everything.', alt: 'Black sleeveless top with cream wide-leg trousers and black flats', palette: ['#252525', '#e5dfcf', '#a3937b'], colors: ['Black', 'Cream', 'Warm taupe'], label: 'THE EVERYDAY PALETTE' },
  tailored: { name: 'A little polish.<br>A lot of possibility.', kicker: 'MAKE YOUR OWN FIRST IMPRESSION.', description: 'A crisp shirt, tailored trousers, and the confidence to make them your own. Put together, without overthinking it.', tip: 'Keep the shirt relaxed. Add a watch or bracelet for an easy finishing touch.', alt: 'Light blue button-down shirt with charcoal tailored trousers and brown loafers', palette: ['#9fb7d0', '#44464b', '#74523e'], colors: ['Light blue', 'Charcoal', 'Brown'], label: 'THE POLISHED PALETTE' },
  'off-duty': { name: 'Out of office.<br>Into your element.', kicker: 'EASY DOES IT.', description: 'Your favorite denim. A good jacket. Sneakers ready for wherever the day takes you. Comfort has a point of view, too.', tip: 'Try an olive layer with a white tee. The contrast does the work for you.', alt: 'Olive bomber jacket with a white T-shirt, loose blue jeans, and gray sneakers', palette: ['#656448', '#8fabbc', '#f3f0e6'], colors: ['Olive', 'Denim blue', 'Off-white'], label: 'THE OFF-DUTY PALETTE' },
  'after-hours': { name: 'A little edge.<br>Your kind of evening.', kicker: 'FOR PLANS WORTH GETTING DRESSED FOR.', description: 'Deep burgundy, a sharp silhouette, and just enough attitude. Turn a few familiar pieces into something unexpected.', tip: 'Let one accessory make the statement. A ring or necklace is all it takes.', alt: 'Burgundy jacket with a black shirt, flowing black trousers, and black shoes', palette: ['#63303a', '#242427', '#afa69b'], colors: ['Burgundy', 'Black', 'Stone'], label: 'THE AFTER-HOURS PALETTE' }
};
const storageKey = 'cut-and-cuff:saved-inspiration';
let storageAvailable = true;
let saved = new Set();
try {
  const stored = JSON.parse(localStorage.getItem(storageKey) || '[]');
  if (Array.isArray(stored)) saved = new Set(stored.filter(key => Object.hasOwn(styles, key)));
} catch { storageAvailable = false; }
let selected = 'everyday';
const tabs = [...document.querySelectorAll('[data-style]')];
const saveButton = document.querySelector('#save-look');
const status = document.querySelector('#save-status');
function updateSave() {
  const isSaved = saved.has(selected);
  saveButton.setAttribute('aria-pressed', String(isSaved));
  saveButton.firstElementChild.textContent = isSaved ? '♥' : '♡';
  document.querySelector('#save-label').textContent = isSaved ? 'Inspiration saved' : 'Save this inspiration';
}
function selectStyle(key, moveFocus = false) {
  const style = styles[key];
  if (!style) return;
  selected = key;
  tabs.forEach(tab => {
    const active = tab.dataset.style === key;
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
    if (active && moveFocus) tab.focus();
  });
  const image = document.querySelector('#studio-image');
  image.src = `./assets/look-${key}.jpg`;
  image.alt = style.alt;
  document.querySelector('#studio-name').innerHTML = style.name;
  document.querySelector('#studio-kicker').textContent = style.kicker;
  document.querySelector('#studio-description').textContent = style.description;
  document.querySelector('#studio-tip').textContent = style.tip;
  document.querySelector('#palette-label').textContent = style.label;
  document.querySelectorAll('.palette [role="img"]').forEach((swatch, index) => {
    swatch.style.setProperty('--swatch', style.palette[index]);
    swatch.setAttribute('aria-label', style.colors[index]);
  });
  document.querySelector('#style-panel').setAttribute('aria-labelledby', `tab-${key}`);
  document.querySelector('#studio-index').textContent = `${String(tabs.findIndex(tab => tab.dataset.style === key) + 1).padStart(2, '0')} / 04`;
  status.textContent = '';
  updateSave();
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectStyle(tab.dataset.style));
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next !== undefined) { event.preventDefault(); selectStyle(tabs[next].dataset.style, true); }
  });
});
saveButton.addEventListener('click', () => {
  const removing = saved.has(selected);
  if (removing) saved.delete(selected); else saved.add(selected);
  try { localStorage.setItem(storageKey, JSON.stringify([...saved])); storageAvailable = true; }
  catch { storageAvailable = false; }
  updateSave();
  status.textContent = removing ? 'Removed from your saved inspiration.' : storageAvailable ? 'Saved in this browser. Come back to this mood whenever you like.' : 'Saved for this visit. Your browser does not allow persistent storage.';
});
updateSave();
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() { menuButton.setAttribute('aria-expanded', 'false'); navigation.classList.remove('is-open'); }
menuButton.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!expanded));
  navigation.classList.toggle('is-open', !expanded);
});
navigation.querySelectorAll('a,button').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') { closeMenu(); menuButton.focus(); }
});
document.addEventListener('click', event => { if (!event.target.closest('.site-header')) closeMenu(); });
document.querySelectorAll('[data-launch]').forEach(button => button.addEventListener('click', () => document.querySelector('#launch-dialog').showModal()));
document.querySelector('[data-privacy]').addEventListener('click', () => document.querySelector('#privacy-dialog').showModal());
document.querySelectorAll('dialog').forEach(dialog => {
  dialog.querySelector('[data-close]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    const bounds = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
  });
});
document.querySelector('#clear-saved').addEventListener('click', () => {
  saved.clear();
  try { localStorage.removeItem(storageKey); } catch { /* In-memory favorites are still cleared. */ }
  updateSave();
  document.querySelector('#privacy-status').textContent = 'Your saved inspiration has been cleared.';
});
document.querySelector('#year').textContent = String(new Date().getFullYear());
