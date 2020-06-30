import {ValidatableMixin} from '@anypoint-web-components/validatable-mixin';
import {ControlStateMixin} from '@anypoint-web-components/anypoint-control-mixins';
import {TemplateResult, CSSResult, LitElement} from 'lit-element';
import {AnypointInput} from '@anypoint-web-components/anypoint-input';
import {Suggestion} from '@anypoint-web-components/anypoint-autocomplete/src/AnypointAutocomplete';

export declare interface AllowedScope {
  label: string;
  description?: string;
}

/**
 * A selector for OAuth 2.0 scope. Provides the UI to enter a scope for OAuth 2.0 settings.
 *
 * #### Example
 *
 * ```html
 * <oauth2-scope-selector></oauth2-scope-selector>
 * ```
 *
 * `allowed-scopes` attribute allows to provide a list of predefined scopes
 * supported by the endpoint. When the list is set, autocomplete is enabled.
 * Autocomplete is supported by `anypoint-autocomplete` element.
 *
 * Setting `preventcustomscopes` dissallows adding a scope that is not defined
 * in the `allowed-scopes` array. This can only work with `allowed-scopes` set
 *
 * #### Example
 *
 * ```html
 * <oauth2-scope-selector preventcustomscopes allowedscopes='["email", "profile"]'></oauth2-scope-selector>
 * ```
 *
 * And in JavaScript
 *
 * ```javascript
 * var selector = document.querySelector('oauth2-scope-selector');
 * selector.allowedScopes = ['profile', 'email'];
 * ```
 *
 * ## Adding scope documentation
 *
 * `allowedScopes` property can be an list of object to present scope description
 * after it is selected. Object in the array has to contain `label` and `description` properties.
 * `label` is scope value.
 *
 * ### Example
 *
 * ```javascript
 * const scopes = [
 *   {
 *     'label': 'user',
 *     'description': 'Grants read/write access to profile info only. Note that this scope includes user:email and user:follow.'
 *   },
 *   {'label': 'user:email', 'description': 'Grants read access to a user\'s email addresses.'},
 *   {'label': 'user:follow', 'description': 'Grants access to follow or unfollow other users.'}
 * ];
 * const selector = document.querySelector('oauth2-scope-selector');
 * selector.allowedScopes = scopes;
 * ```
 *
 * See demo page for example implementation.
 *
 * ## Use with forms
 *
 * The element can be used in a form by using `iron-form` custom element.
 * It's value is reported to the form as any other form input. `name` attribute
 * must be set in order to process the value.
 *
 * ```html
 * <iron-form id="form">
 *   <form>
 *     <oauth2-scope-selector name="scope" required></oauth2-scope-selector>
 *   </form>
 * </iron-form>
 * <script>
 * const form = document.getElementById('form');
 * const values = form.serializeForm();
 * console.log(values); // {"scope": []}
 * </script>
 * ```
 */
export declare class OAuth2ScopeSelector {
  readonly _invalidMessage: any;
  readonly styles: CSSResult;

  /**
   * List of scopes entered by the user. It can be used it pre-select scopes
   * by providing an array with scope values.
   */
  value: string[];

  /**
   * List of available scopes.
   * It can be either list of string or list of object. If this is the
   * list of object then this expects to each object contain a `label`
   * and `description` keys.
   *
   * ### Example
   * ```
   * {
   *   'label': 'user',
   *   'description': 'Grants read/write access to profile info only. '
   * }
   * ```
   * When the description is provided it will be displayed below the name
   * of the scope.
   */
  allowedScopes?: string[]|AllowedScope[];

  /**
   * Returns true if the value is invalid.
   *
   * If `autoValidate` is true, the `invalid` attribute is managed automatically,
   * which can clobber attempts to manage it manually.
   */
  invalid: boolean;

  /**
   * Form input name
   */
  name: string;

  /**
   * Current value entered by the user. This is not a scope and it is not
   * yet in the scopes list. User has to accept the scope before it become
   * available in the scopes list.
   */
  currentValue: string;

  /**
   * Target for `anypoint-autocomplete`
   */
  _inputTarget: AnypointInput;

  /**
   * allowed to be add.
   */
  preventCustomScopes: boolean;

  /**
   * Computed value, true if the `allowedScopes` is a list of objects
   */
  _allowedIsObject: boolean;

  /**
   * Set to true to auto-validate the input value when it changes.
   */
  autoValidate: boolean;

  /**
   * List of scopes to be set as autocomplete source.
   */
  _autocompleteScopes?: Suggestion[];

  /**
   * Set to true to mark the input as required.
   */
  required: boolean;

  /**
   * When set the editor is in read only mode.
   */
  readOnly: boolean;

  /**
   * When set the editor is in disabled mode.
   */
  disabled: boolean;

  /**
   * Enables Anypoint legacy styling
   */
  legacy: boolean;

  /**
   * Enables Material Design outlined style
   */
  outlined: boolean;

  constructor();
  firstUpdated(): void;

  _scopesListTemplate(): TemplateResult;
  render(): TemplateResult;

  _invalidChanged(invalid: boolean): void;

  /**
   * Add currently entered scope value to the scopes list.
   */
  _appendScope(): void;

  /**
   * Remove scope button click handler
   */
  _removeScope(e: PointerEvent): void;

  /**
   * Handler for the `anypoint-autocomplete` selected event.
   */
  _suggestionSelected(e: CustomEvent): void;

  /**
   * Adds a scope to the list. The same as pushing item to the `scopes`
   * array but it will check for duplicates first.
   *
   * @param scope Scope value to append
   */
  add(scope: string): void;

  /**
   * Finds an index if the `scope` in the `allowedScopes` list.
   *
   * @param scope A scope value (label) to find.
   * @returns An index of scope or `-1` if not found.
   */
  _findAllowedScopeIndex(scope: string): number;

  /**
   * A handler for the input's key down event. Handles ENTER press.
   */
  _keyDown(e: KeyboardEvent): void;

  /**
   * Normalizes scopes to use it with autocomplete element.
   *
   * @param scopes List of autocomplete values. Can be list of
   * strings or objects
   * @returns Normalized scopes list for autocomplete.
   */
  _normalizeScopes(scopes: AllowedScope[]): Suggestion[]|undefined;

  /**
   * Compute function for the _allowedIsObject. Check first item of the
   * `allowedScopes` array if it is an object (return `true`) or
   * string (return `false`);
   */
  _computeAllowedIsObject(allowedScopes: string|AllowedScope[]): boolean;

  /**
   * Returns a description for the selected scope.
   *
   * @param scope Scope name
   * @param allowedIsObject True if allowed scopes is an object.
   * @returns Description of the scope or `` (empty string) if the
   * item do not exists.
   */
  _computeItemDescription(scope: string, allowedIsObject: boolean): string;

  /**
   * Returns false if the element is required and does not have a selection,
   * and true otherwise.
   *
   * @returns true if `required` is false, or if `required` is true
   * and the element has a valid selection.
   */
  _getValidity(): boolean;
  _handleAutoValidate(autoValidate: boolean): void;
  _currentValueHandler(e: CustomEvent): void;
}

export declare interface OAuth2ScopeSelector extends ValidatableMixin, ControlStateMixin, LitElement {

}
