import { html, fixture, expect } from '@open-wc/testing';

import SlottedElement from 'slotted-element/slotted-element.js';

describe('SlottedElement', () => {
    it('Defaults inherited from fetch-element', async () => {
        const el = await fixture(html`<slotted-element></slotted-element>`);

        expect( el.src    ).to.equal(null);
        expect( el.state  ).to.equal(null);
        expect( el.status ).to.equal(null);
    });
    it('Defaults', async () => {
        const el = await fixture(html`<slotted-element></slotted-element>`);
        expect(Object.keys(el.slots).length).to.equal(0);
    });
    it('slot=xxx is read to this.slots ', async () => {
        const el = await fixture(html`<slotted-element><a slot="slot0">link</a><b slot="slot1">hidden</b></slotted-element>`);
        expect(Object.keys(el.slots).length).to.equal(2);
        expect(el.slots['slot0'].tagName).to.equal('A');
        expect(el.slots['slot1'].tagName).to.equal('B');
    });
    it('slot=xxx are hidden in content', async () => {
        const el = await fixture(html`
            <slotted-element>
                <h6>inline HTML with slots 🎉</h6>
                <a slot="slot0">link</a>
                <b slot="slot1">hidden</b>
            </slotted-element>`);
        expect(el.innerText).does.include('inline HTML with slots');
        expect(el.innerText).does.not.include('link');
        expect(el.innerText).does.not.include('hidden');
    });
    it('template defined by ID', async () => {
        const t = document.createElement('div');
        t.innerHTML = `
            <template id="template-with-slots">
                <h6>template HTML with slots 🥳</h6>
                <slot name="slot0" hidden="">
                    Slots are hidden in template when "hidden" attribute is set.
                    Could be shown by slotsAdd() method.
                </slot>
                <slot name="slot1"> slot1 is visible, hide by setting "hidden" attribute </slot>
                <slot name="slot3"></slot>
            </template>
        `;
        document.body.appendChild(t);
        const el = await fixture(html`<slotted-element template="template-with-slots"></slotted-element>`);
        t.remove();

        expect(el.innerText).does.include('template HTML with slots');
        expect(el.innerHTML).does.include('Slots are hidden');
        expect(el.innerText).does.not.include('Slots are hidden');
        expect(el.innerText).does.include('slot1 is visible');
    });

    it('template by ID with slots redefined in body', async () => {
        const t = document.createElement('div');
        t.innerHTML = `
            <template id="template-with-slots2">
                <h6>template by ID, inline HTML redefines slots 🥳</h6>
                <slot name="slot0">slot0 in template would be overridden.  </slot>
                <slot name="slot1">slot1 is defined in template.  </slot>
            </template>
            `;
        document.body.appendChild(t);
        const el = await fixture(html`
            <slotted-element template="template-with-slots2">
                <p slot="slot0">slot0 is overridden in body!</p>
            </slotted-element>
        `);
        t.remove();

        expect(el.innerText).does.include('template by ID, inline HTML redefines slots');
        expect(el.innerText).does.include('slot0 is overridden in body!');
        expect(el.innerText).does.not.include('slot0 in template would be overridden.');
    });

    it('template by getter', async () => {
        window.customElements.define('demo3-element',
         class Demo3Element extends SlottedElement
         {
             get template()
             {
                 return `
                    <h6>${this.nodeName}, inline HTML redefines slots 🥳</h6>
                    <slot name="slot0">slot0 in template would be overridden.  </slot>
                    <slot name="slot1">slot1 is defined in template.  </slot>
                    `;
             }
         });
        const el = await fixture(html`
            <demo3-element>
                <p slot="slot0">slot0 is overridden in body!</p>
            </demo3-element>
        `);

        expect(el.innerText).does.include('inline HTML redefines slots');
        expect(el.innerText).does.include('slot0 is overridden in body!');
        expect(el.innerText).does.not.include('slot0 in template would be overridden.');
        expect(el.innerText).does.include('slot1 is defined in template');
    });

/*
  it('has a default title "Hey there" and counter 5', async () => {
    const el = await fixture(html`<slotted-element></slotted-element>`);

    expect(el.title).to.equal('Hey there');
    expect(el.counter).to.equal(5);
  });

  it('increases the counter on button click', async () => {
    const el = await fixture(html`<slotted-element></slotted-element>`);
    el.shadowRoot.querySelector('button').click();

    expect(el.counter).to.equal(6);
  });

  it('can override the title via attribute', async () => {
    const el = await fixture(html`<slotted-element title="attribute title"></slotted-element>`);

    expect(el.title).to.equal('attribute title');
  });

  it('passes the a11y audit', async () => {
    const el = await fixture(html`<slotted-element></slotted-element>`);

    await expect(el).shadowDom.to.be.accessible();
  });
*/
});
