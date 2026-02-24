import { JSDOM } from 'jsdom';
import fs from 'fs/promises';

async function run() {
  const [htmlTemplate, translationsJs, mainJs, modalsJs] = await Promise.all([
    // minimal HTML with expected anchors and modal roots
    Promise.resolve(`<!doctype html><html><head></head><body>
      <a href="#progetti">progetti</a>
      <a href="#licensing">licensing</a>
      <button data-action="contatti">contatti</button>
      <button data-action="personalizza">personalizza</button>
      <button data-action="termini">termini</button>

      <div id="licensing-modal-root"></div>
      <div id="termini-modal-root"></div>
      <div id="contatti-modal-root"></div>
      <div id="progetti-modal-root"></div>
      <div id="personalizza-modal-root"></div>
    </body></html>`),
    fs.readFile(new URL('../js/translations.js', import.meta.url), 'utf8'),
    fs.readFile(new URL('../js/main.js', import.meta.url), 'utf8'),
    fs.readFile(new URL('../js/modals.js', import.meta.url), 'utf8')
  ]);

  const dom = new JSDOM(htmlTemplate, { runScripts: 'dangerously', resources: 'usable', url: 'http://localhost' });
  const { window } = dom;
  const { document } = window;

  // inject console to window
  window.console = console;

  // Evaluate translations, modals and main in the window context
  const scriptEl1 = document.createElement('script');
  scriptEl1.textContent = translationsJs;
  document.head.appendChild(scriptEl1);

  const scriptEl2 = document.createElement('script');
  scriptEl2.textContent = modalsJs;
  document.head.appendChild(scriptEl2);

  const scriptEl3 = document.createElement('script');
  scriptEl3.textContent = mainJs;
  document.head.appendChild(scriptEl3);

  // Wait a tick for scripts that listen to DOMContentLoaded
  await new Promise(r => setTimeout(r, 200));

  // Dispatch DOMContentLoaded to trigger modal initializations
  const evt = new window.Event('DOMContentLoaded');
  document.dispatchEvent(evt);

  // Ensure updateModalContents exists
  if (typeof window.updateModalContents !== 'function' || typeof window.updateLanguage !== 'function') {
    console.error('Required functions not found in window (updateLanguage/updateModalContents)');
    process.exit(2);
  }

  const langs = ['it','en','de'];
  const results = [];

  for (const lang of langs) {
    window.updateLanguage(lang);
    window.updateModalContents(lang);

    // helper
    const getShadowText = (rootId, selector, prop = 'textContent') => {
      const root = document.getElementById(rootId);
      if (!root || !root.shadowRoot) return null;
      const el = root.shadowRoot.querySelector(selector);
      if (!el) return null;
      return prop === 'innerHTML' ? el.innerHTML.trim() : el.textContent.trim();
    };

    // translations may be a top-level const in the evaluated script; access via eval
    const translationsObj = window.eval('typeof translations !== "undefined" ? translations : null');
    const t = translationsObj && translationsObj[lang] ? translationsObj[lang] : null;
    const checks = [];

    // licensingText in licensing-modal-root [data-modal='licensingText']
    checks.push({
      name: 'licensingText',
      expected: t && t.modal && t.modal.licensingText ? t.modal.licensingText.replace(/\s+/g,' ').trim() : null,
      actual: getShadowText('licensing-modal-root', "[data-modal='licensingText']", 'innerHTML')
    });

    // termsText in termini-modal-root
    checks.push({
      name: 'termsText',
      expected: t && t.modal && t.modal.termsText ? t.modal.termsText.replace(/\s+/g,' ').trim() : null,
      actual: getShadowText('termini-modal-root', "[data-modal='termsText']", 'innerHTML')
    });

    // contacts lines in contatti-modal-root
    checks.push({ name: 'contactsEmail', expected: t && t.modal && t.modal.contactsEmail ? t.modal.contactsEmail.replace(/\s+/g,' ').trim() : null, actual: getShadowText('contatti-modal-root', "[data-modal='contactsEmail']", 'innerHTML') });
    checks.push({ name: 'contactsPhone', expected: t && t.modal && t.modal.contactsPhone ? t.modal.contactsPhone.replace(/\s+/g,' ').trim() : null, actual: getShadowText('contatti-modal-root', "[data-modal='contactsPhone']", 'innerHTML') });
    checks.push({ name: 'contactsLocation', expected: t && t.modal && t.modal.contactsLocation ? t.modal.contactsLocation.replace(/\s+/g,' ').trim() : null, actual: getShadowText('contatti-modal-root', "[data-modal='contactsLocation']", 'innerHTML') });
    checks.push({ name: 'contactsClosing', expected: t && t.modal && t.modal.contactsClosing ? t.modal.contactsClosing.replace(/\s+/g,' ').trim() : null, actual: getShadowText('contatti-modal-root', "[data-modal='contactsClosing']", 'textContent') });

    // projects descriptions in progetti-modal-root
    checks.push({ name: 'project1Desc', expected: t && t.modal && t.modal.project1Desc ? t.modal.project1Desc.trim() : null, actual: getShadowText('progetti-modal-root', "[data-modal='project1Desc']", 'textContent') });
    checks.push({ name: 'project2Desc', expected: t && t.modal && t.modal.project2Desc ? t.modal.project2Desc.trim() : null, actual: getShadowText('progetti-modal-root', "[data-modal='project2Desc']", 'textContent') });

    // personalizza title
    const perRoot = document.getElementById('personalizza-modal-root');
    let personalTitle = null;
    if (perRoot && perRoot.shadowRoot) {
      const el = perRoot.shadowRoot.querySelector("[data-modal='personaliza_title']");
      if (el) personalTitle = el.textContent.trim();
    }
    checks.push({ name: 'personaliza_title', expected: t && t.personaliza && t.personaliza.title ? t.personaliza.title.trim() : null, actual: personalTitle });

    // Evaluate check results
    const pass = checks.every(c => {
      // normalize whitespace for comparison
      const e = c.expected ? c.expected.replace(/\s+/g,' ').trim() : c.expected;
      const a = c.actual ? c.actual.replace(/\s+/g,' ').trim() : c.actual;
      return e === a;
    });

    results.push({ lang, pass, checks });
  }

  console.log(JSON.stringify(results, null, 2));
}

run().catch(err => { console.error(err); process.exit(1); });
