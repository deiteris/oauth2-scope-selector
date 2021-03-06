import { fixture, assert, nextFrame, html } from '@open-wc/testing';
import * as MockInteractions from '@polymer/iron-test-helpers/mock-interactions.js';
import '../oauth2-scope-selector.js';
import { appendScopeHandler, inputTarget } from '../src/OAuth2ScopeSelector.js';

/** @typedef {import('../index').OAuth2ScopeSelector} OAuth2ScopeSelector */

describe('<oauth2-scope-selector>', () => {
  /**
   * @return {Promise<OAuth2ScopeSelector>}
   */
  async function basicFixture() {
    return fixture(html`
      <oauth2-scope-selector></oauth2-scope-selector>
    `);
  }
  /**
   * @return {Promise<OAuth2ScopeSelector>}
   */
  async function allowedFixture() {
    const allowed = ['test'];
    return fixture(html`<oauth2-scope-selector .allowedScopes="${allowed}" preventCustomScopes></oauth2-scope-selector>`);
  }
  /**
   * @return {Promise<OAuth2ScopeSelector>}
   */
  async function valuesFixture() {
    const value = ['test', 'test-2'];
    return fixture(html`<oauth2-scope-selector .value="${value}"></oauth2-scope-selector>`);
  }
  /**
   * @return {Promise<OAuth2ScopeSelector>}
   */
  async function requiredFixture() {
    return fixture(html`<oauth2-scope-selector required></oauth2-scope-selector>`);
  }
  /**
   * @return {Promise<OAuth2ScopeSelector>}
   */
  async function autoValidateFixture() {
    return fixture(html`<oauth2-scope-selector required autoValidate></oauth2-scope-selector>`);
  }
  /**
   * @return {Promise<OAuth2ScopeSelector>}
   */
  async function autoValidateValueFixture() {
    const value = ['test'];
    return fixture(html`<oauth2-scope-selector required autoValidate .value="${value}"></oauth2-scope-selector>`);
  }
  /**
   * @return {Promise<OAuth2ScopeSelector>}
   */
  async function multiFixture() {
    const allowed = [
      {
        label: 'test-label',
        description: 'test-description'
      }
    ];
    return fixture(html `<oauth2-scope-selector .allowedScopes="${allowed}" preventCustomScopes></oauth2-scope-selector>`);
  }

  describe('basic', () => {
    let element = /** OAuth2ScopeSelector */ (null);
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('has empty array by default', () => {
      assert.isArray(element.value, 'value is an array');
      assert.lengthOf(element.value, 0, 'value is empty');
    });

    it('accepts the scope value', () => {
      const input = element[inputTarget];
      input.value = 'test';
      input.dispatchEvent(new CustomEvent('input'));
      MockInteractions.keyDownOn(input, 13, [], 'Enter');
      assert.isArray(element.value, 'value is an array');
      assert.lengthOf(element.value, 1, 'value has 1 item');
    });

    it('clears the input after enter', () => {
      const input = element[inputTarget];
      input.value = 'test';
      input.dispatchEvent(new CustomEvent('input'));
      assert.equal(element.currentValue, 'test');
      MockInteractions.keyDownOn(input, 13, [], 'Enter');
      assert.equal(element.currentValue, '');
    });
  });

  describe('allowed scopes', () => {
    let element = /** OAuth2ScopeSelector */ (null);
    beforeEach(async () => {
      element = await allowedFixture();
    });

    it('Accepts allowed scope', () => {
      const input = element[inputTarget];
      input.value = 'test';
      input.dispatchEvent(new CustomEvent('input'));
      MockInteractions.keyDownOn(input, 13, [], 'Enter');
      assert.lengthOf(element.value, 1, 'value has 1 item');
    });

    it('Does not accept disallowed scope', () => {
      const input = element[inputTarget];
      input.value = 'tes';
      input.dispatchEvent(new CustomEvent('input'));
      MockInteractions.keyDownOn(input, 13, [], 'Enter');
      assert.lengthOf(element.value, 0);
    });
  });

  describe('add()', () => {
    const scope = 'test-scope';
    it('adds a scope', async () => {
      const element = await basicFixture();
      element.add(scope);
      assert.deepEqual(element.value, [scope]);
    });

    it('adds a scope only once', async () => {
      const element = await basicFixture();
      element.add(scope);
      element.add(scope);
      assert.deepEqual(element.value, [scope]);
    });

    it('does not add scope when prevented', async () => {
      const element = await allowedFixture();
      element.add(scope);
      assert.deepEqual(element.value, []);
    });

    it('Informs the user about error', async () => {
      const element = await allowedFixture();
      element.add(scope);
      const toast = element.shadowRoot.querySelector('paper-toast[data-disallowed]');
      // @ts-ignore
      assert.isTrue(toast.opened);
    });
  });

  describe('[appendScopeHandler]()', () => {
    it('Does not append empty scopes', async () => {
      const element = await basicFixture();
      element[appendScopeHandler]();
      assert.deepEqual(element.value, []);
    });
    it('Informs the user about error', async () => {
      const element = await basicFixture();
      element[appendScopeHandler]();
      const toast = element.shadowRoot.querySelector('paper-toast[data-missing-scope]');
      // @ts-ignore
      assert.isTrue(toast.opened);
    });

    it('Appends scope when value is entered', async () => {
      const element = await basicFixture();
      element.currentValue = 'test';
      element[appendScopeHandler]();
      assert.deepEqual(element.value, ['test']);
    });

    it('Clears input when appends scope', async () => {
      const element = await basicFixture();
      element.currentValue = 'test';
      element[appendScopeHandler]();
      assert.equal(element.currentValue, '');
    });
  });

  describe('[removeScopeHandler]()', () => {
    it('Removes the scope', async () => {
      const element = await valuesFixture();
      const button = element.shadowRoot.querySelector('[data-action="remove-scope"]');
      MockInteractions.tap(button);
      assert.lengthOf(element.value, 1);
    });
  });

  describe('allowed scopes as object', () => {
    let element = /** OAuth2ScopeSelector */ (null);
    beforeEach(async () => {
      element = await multiFixture();
    });

    it('Accepts allowed scope', () => {
      const input = element[inputTarget];
      input.value = 'test-label';
      input.dispatchEvent(new CustomEvent('input'));
      MockInteractions.keyDownOn(input, 13, [], 'Enter');
      assert.lengthOf(element.value, 1, 'value has 1 item');
    });

    it('Do not accepts disallowed scope', () => {
      const input = element[inputTarget];
      input.value = 'test';
      input.dispatchEvent(new CustomEvent('input'));
      MockInteractions.keyDownOn(input, 13, [], 'Enter');
      assert.lengthOf(element.value, 0);
    });
  });

  describe('Without validation enabled', () => {
    let element = /** OAuth2ScopeSelector */ (null);
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('Is valid if not required', () => {
      assert.isFalse(element.invalid);
    });

    it('validate() is true', () => {
      assert.isTrue(element.validate());
    });
  });

  describe('Required', () => {
    let element = /** OAuth2ScopeSelector */ (null);
    beforeEach(async () => {
      element = await requiredFixture();
    });

    it('Is not invalid', () => {
      assert.isFalse(element.invalid);
    });

    it('validate() is false', () => {
      assert.isFalse(element.validate());
    });

    it('Invalid is set after validation', () => {
      element.validate();
      assert.isTrue(element.invalid);
    });

    it('Invalid is false when adding value', () => {
      element.validate();
      element.value = ['test'];
      assert.isTrue(element.invalid);
      element.validate();
      assert.isFalse(element.invalid);
    });
  });

  describe('Auto validation', () => {
    it('is valid when default empty', async () => {
      const element = await autoValidateFixture();
      assert.isFalse(element.invalid);
    });

    it('is valid after providing value', async () => {
      const element = await autoValidateFixture();
      element.value = ['test'];
      assert.isFalse(element.invalid);
    });

    it('is invalid when removing the value', async () => {
      const element = await autoValidateValueFixture();
      const button = element.shadowRoot.querySelector('[data-action="remove-scope"]');
      MockInteractions.tap(button);
      await nextFrame();
      assert.isTrue(element.invalid);
    });
  });

  describe('accessibility', () => {
    /**
     * @return {Promise<OAuth2ScopeSelector>}
     */
    async function fullFixture() {
      const value = ['test', 'test-2'];
      return fixture(html`<oauth2-scope-selector name="scope" .value="${value}"></oauth2-scope-selector>`);
    }
    it('is accessible', async () => {
      const element = await fullFixture();
      await assert.isAccessible(element);
    });
  });
});
