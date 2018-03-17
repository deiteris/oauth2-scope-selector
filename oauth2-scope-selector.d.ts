/**
 * DO NOT EDIT
 *
 * This file was automatically generated by
 *   https://github.com/Polymer/gen-typescript-declarations
 *
 * To modify these typings, edit the source file(s):
 *   oauth2-scope-selector.html
 */

/// <reference path="../polymer/types/polymer-element.d.ts" />
/// <reference path="../polymer/types/lib/elements/dom-repeat.d.ts" />
/// <reference path="../polymer/types/lib/elements/dom-if.d.ts" />
/// <reference path="../iron-flex-layout/iron-flex-layout.d.ts" />
/// <reference path="../paper-input/paper-input.d.ts" />
/// <reference path="../paper-icon-button/paper-icon-button.d.ts" />
/// <reference path="../paper-toast/paper-toast.d.ts" />
/// <reference path="../arc-icons/arc-icons.d.ts" />
/// <reference path="../paper-autocomplete/paper-autocomplete.d.ts" />
/// <reference path="../iron-validatable-behavior/iron-validatable-behavior.d.ts" />
/// <reference path="../iron-behaviors/iron-control-state.d.ts" />

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
 * Autocomplete is supported by `paper-autocomplete` element.
 *
 * Setting `prevent-custom-scopes` dissallows adding a scope that is not defined
 * in the `allowed-scopes` array. This can only work with `allowed-scopes` set
 *
 * #### Example
 *
 * ```html
 * <oauth2-scope-selector prevent-custom-scopes allowed-scopes='["email", "profile"]'></oauth2-scope-selector>
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
 * var scopes = [
 *   {'label': 'user', 'description': 'Grants read/write access to profile info only. Note that this scope includes user:email and user:follow.'},
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
 *
 * ## Changes in version 2
 *
 * - `scopes` property is renamed to `value`
 * - The element can now work with `iron-form` as a form element.
 *
 * ### Styling
 * `<oauth2-scope-selector>` provides the following custom properties and mixins for styling:
 *
 * Custom property | Description | Default
 * ----------------|-------------|----------
 * `--oauth2-scope-selector` | Mixin applied to the element | `{}`
 * `--oauth2-scope-selector-label` | Mixin applied to the label element (title of the control) | `{}`
 * `--oauth2-scope-selector-list-item` | Mixin applied to each selected scope item. Consider setting `paper-item` styles for theming. | `{}`
 * `--oauth2-scope-selector-item-description-color` | Color of the description of the scope when `allowedScopes` contains description. | `#737373`
 *
 * ### Theming
 * Use this mixins as a theming option across all ARC elements.
 *
 * Custom property | Description | Default
 * ----------------|-------------|----------
 * `--icon-button` | Mixin applied to `paper-icon-buttons`. | `{}`
 * `--icon-button-hover` | Mixin applied to `paper-icon-buttons` when hovered. | `{}`
 * `--form-label` | Mixin applied to all labels that are form elements | `{}`
 * `--hint-trigger-color` | Color of the add and remove scope buttons | `rgba(0, 0, 0, 0.74)`
 * `--hint-trigger-color` | Color of the add and remove scope buttons when hovered | `rgba(0, 0, 0, 0.84)`
 */
declare class OAuth2ScopeSelector extends Polymer.Element {

  /**
   * List of scopes entered by the user. It can be used it pre-select scopes
   * by providing an array with scope values.
   */
  value: any[]|null|undefined;

  /**
   * Form input name
   */
  name: string|null|undefined;

  /**
   * Current value entered by the user. This is not a scope and it is not
   * yet in the scopes list. User has to accept the scope before it become
   * available in the scopes list.
   */
  currentValue: string|null|undefined;

  /**
   * Target for `paper-autocomplete`
   */
  readonly inputTarget: HTMLElement|null|undefined;

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
  allowedScopes: any[]|null|undefined;

  /**
   * allowed to be add.
   */
  preventCustomScopes: boolean|null|undefined;

  /**
   * Computed value, true if the `allowedScopes` is a list of objects
   */
  readonly _allowedIsObject: boolean|null|undefined;

  /**
   * Set to true to auto-validate the input value when it changes.
   */
  autoValidate: boolean|null|undefined;

  /**
   * List of scopes to be set as autocomplete source.
   */
  readonly _autocompleteScopes: any[]|null|undefined;

  /**
   * True if the element has attached autocomplete element.
   */
  readonly hasAutocomplete: object|null;

  /**
   * Returns true if the value is invalid.
   *
   * If `autoValidate` is true, the `invalid` attribute is managed automatically,
   * which can clobber attempts to manage it manually.
   */
  invalid: boolean|null|undefined;

  /**
   * Set to true to mark the input as required.
   */
  required: boolean|null|undefined;
  ready(): void;
  _invalidChanged(invalid: any): void;

  /**
   * Add currently entered scope value to the scopes list.
   */
  _appendScope(): void;

  /**
   * Remove scope button click handler
   */
  _removeScope(e: any): void;

  /**
   * Handler for the `paper-autocomplete` selected event.
   */
  _suggestionSelected(e: Event|null): void;

  /**
   * Adds a scope to the list. The same as pushing item to the `scopes`
   * array but it will check for duplicates first.
   *
   * @param scope Scope value to append
   */
  append(scope: String|null): void;

  /**
   * Finds an index if the `scope` in the `allowedScopes` list.
   *
   * @param scope A scope value (label) to find.
   * @returns An index of scope or `-1` if not found.
   */
  _findAllowedScopeIndex(scope: String|null): Number|null;

  /**
   * A handler for the input's key down event. Handles ENTER press.
   */
  _keyDown(e: any): void;

  /**
   * Normalizes scopes to use it with autocomplete element.
   *
   * @param scopes List of autocomplete values. Can be list of
   * strings or objects
   * @returns Normalized scopes list for autocomplete.
   */
  _normalizeScopes(scopes: any[]|null): any[]|null;

  /**
   * Computes value for `hasAutocomplete`.
   *
   * @param scopes List of scopes
   * @returns True if scopes are set
   */
  _computeHasAutocomplete(scopes: any[]|null): Boolean|null;

  /**
   * Compute function for the _allowedIsObject. Check first item of the
   * `allowedScopes` array if it is an object (return `true`) or
   * string (return `false`);
   */
  _computeAllowedIsObject(allowedScopes: any): any;

  /**
   * Returns a description for the selected scope.
   *
   * @param allowedIsObject True if allowed scopes is an object.
   * @returns Description of the scope or `` (empty string) if the
   * item do not exists.
   */
  _computeItemDescription(scope: any, allowedIsObject: Boolean|null): String|null;

  /**
   * Returns false if the element is required and does not have a selection,
   * and true otherwise.
   *
   * @returns true if `required` is false, or if `required` is true
   * and the element has a valid selection.
   */
  _getValidity(): boolean;
  _handleAutoValidate(autoValidate: any): void;
}

interface HTMLElementTagNameMap {
  "oauth2-scope-selector": OAuth2ScopeSelector;
}