import { html, fixture, expect, assert } from '@open-wc/testing';

import 'slotted-element/fetch-element.js';

const JSON_URL = new URL('mock/mock.json', import.meta.url).pathname;
describe( 'FetchElement', () =>
{
    it( 'default properties and attributes', async () =>
    {
        const el = await fixture( html`
            <fetch-element></fetch-element>` );
        expect( el.src    ).to.equal(null);
        expect( el.state  ).to.equal(null);
        expect( el.status ).to.equal(null);
    } );

    it( 'not existing / 404 failed promise', async () =>
    {
        const el = await fixture( html`
            <fetch-element src="not-existing.json"></fetch-element>` );

        try{ await el.promise; }
        catch( ex )
        {   expect(el.error                              ).to.equal('network error' );
            expect(el.getAttribute('error' ) ).to.equal('network error' );
            expect(el.status                             ).to.equal('404');
            expect(el.getAttribute('status') ).to.equal('404');
            return;
        }
        assert( 0 );
    } );

    it( 'load json attributes', async () =>
    {   const el = await fixture( html`
            <fetch-element src="${JSON_URL}"></fetch-element>` );
        await el.promise;

        expect(el.error                              ).to.equal(null );
        expect(el.getAttribute('src' )   ).to.equal( JSON_URL );
        expect(el.src                                ).to.equal( JSON_URL );
        expect(el.getAttribute('status') ).to.equal('200');
        expect(el.status                             ).to.equal('200');
        expect(el.getAttribute('state')  ).to.equal('loaded');
        expect(el.state                              ).to.equal('loaded');
    } );

    it( 'render from json string', async () =>
    {   const url = new URL('mock/string.json', import.meta.url).pathname;

        const el = await fixture( html`
            <fetch-element src="${url}"></fetch-element>` );
        await el.promise;

        expect(el.innerText ).to.equal("Hello World" );
    } );
    it( 'render from json number', async () =>
    {   const url = new URL('mock/number.json', import.meta.url).pathname;

        const el = await fixture( html`
            <fetch-element src="${url}"></fetch-element>` );
        await el.promise;

        expect(el.innerText ).to.equal("1.234" );
    } );

    it( 'render from json object', async () =>
    {   const url = new URL('mock/mock.json', import.meta.url).pathname;

        const el = await fixture( html`
            <fetch-element src="${url}"></fetch-element>` );
        await el.promise;
        const titles = [...el.querySelectorAll('th')].map( el=>el.innerText);
        expect(titles).to.include("name" );
        expect(titles).to.include("title" );
        expect(titles).to.include("age" );
        expect(titles).to.include("portrait" );
    } );
    it( 'render from json renderer', async () =>
    {   const url = new URL('mock/mock.json', import.meta.url).pathname;

        const el = await fixture( html`
            <fetch-element src="${url}"></fetch-element>` );
        el.data2Html = data => `<h1>${data.name}</h1>
                                <img src="${data.portrait}" alt="" />
                                `;
        await el.promise;

        expect(el.querySelector('h1') ).to.not.equal(null );
        expect(el.querySelector('h1').innerText ).to.equal('Doc' );
        expect(el.querySelector('img').src ).to.include('mock/doc.png' );
    } );

    it( 'render from html', async () =>
    {   const url = new URL('mock/doc.html', import.meta.url).pathname;

        const el = await fixture( html`
            <fetch-element src="${url}"></fetch-element>` );
        await el.promise;
        expect(el.querySelector('summary') ).to.not.equal(null );
        expect(el.querySelector('summary').innerText ).to.equal('Doc' );
        expect(el.querySelector('img').src ).to.include('mock/doc.png' );
    } );

    it( 'render from html callback', async () =>
    {   const url = new URL('mock/doc.html', import.meta.url).pathname;

        const el = await fixture( html`
            <fetch-element src="${url}"></fetch-element>` );
        el.data2Html = function ()
        {
            this.querySelector('summary').innerText += ' is my favorite';
        } ;
        await el.promise;
        expect(el.querySelector('summary') ).to.not.equal(null );
        expect(el.querySelector('summary').innerText ).to.equal('Doc is my favorite' );
        expect(el.querySelector('img').src ).to.include('mock/doc.png' );
    } );

} );
