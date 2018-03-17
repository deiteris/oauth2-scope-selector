[![Build Status](https://travis-ci.org/advanced-rest-client/oauth2-scope-selector.svg?branch=stage)](https://travis-ci.org/advanced-rest-client/oauth2-scope-selector)

## OAuth2ScopeSelector component
Tag: `<oauth2-scope-selector>`

### Installation
Using bower:
```
bower install --save advanced-rest-client/oauth2-scope-selector
```

A selector for OAuth 2.0 scope. Provides the UI to enter a scope for OAuth 2.0 settings.

#### Example

```html
<oauth2-scope-selector></oauth2-scope-selector>
```

`allowed-scopes` attribute allows to provide a list of predefined scopes
supported by the endpoint. When the list is set, autocomplete is enabled.
Autocomplete is supported by `paper-autocomplete` element.

Setting `prevent-custom-scopes` dissallows adding a scope that is not defined
in the `allowed-scopes` array. This can only work with `allowed-scopes` set

#### Example

```html
<oauth2-scope-selector prevent-custom-scopes allowed-scopes='["email", "profile"]'></oauth2-scope-selector>
```

And in JavaScript

```javascript
var selector = document.querySelector('oauth2-scope-selector');
selector.allowedScopes = ['profile', 'email'];
```

## Adding scope documentation

`allowedScopes` property can be an list of object to present scope description
after it is selected. Object in the array has to contain `label` and `description` properties.
`label` is scope value.

### Example

```javascript
var scopes = [
  {'label': 'user', 'description': 'Grants read/write access to profile info only. Note that this scope includes user:email and user:follow.'},
  {'label': 'user:email', 'description': 'Grants read access to a user\'s email addresses.'},
  {'label': 'user:follow', 'description': 'Grants access to follow or unfollow other users.'}
];
const selector = document.querySelector('oauth2-scope-selector');
selector.allowedScopes = scopes;
```

See demo page for example implementation.

## Use with forms

The element can be used in a form by using `iron-form` custom element.
It's value is reported to the form as any other form input. `name` attribute
must be set in order to process the value.

```html
<iron-form id="form">
  <form>
    <oauth2-scope-selector name="scope" required></oauth2-scope-selector>
  </form>
</iron-form>
<script>
const form = document.getElementById('form');
const values = form.serializeForm();
console.log(values); // {"scope": []}
</script>
```

## Changes in version 2

- `scopes` property is renamed to `value`
- The element can now work with `iron-form` as a form element.

### Styling
`<oauth2-scope-selector>` provides the following custom properties and mixins for styling:

Custom property | Description | Default
----------------|-------------|----------
`--oauth2-scope-selector` | Mixin applied to the element | `{}`
`--oauth2-scope-selector-label` | Mixin applied to the label element (title of the control) | `{}`
`--oauth2-scope-selector-list-item` | Mixin applied to each selected scope item. Consider setting `paper-item` styles for theming. | `{}`
`--oauth2-scope-selector-item-description-color` | Color of the description of the scope when `allowedScopes` contains description. | `#737373`

### Theming
Use this mixins as a theming option across all ARC elements.

Custom property | Description | Default
----------------|-------------|----------
`--icon-button` | Mixin applied to `paper-icon-buttons`. | `{}`
`--icon-button-hover` | Mixin applied to `paper-icon-buttons` when hovered. | `{}`
`--form-label` | Mixin applied to all labels that are form elements | `{}`
`--hint-trigger-color` | Color of the add and remove scope buttons | `rgba(0, 0, 0, 0.74)`
`--hint-trigger-color` | Color of the add and remove scope buttons when hovered | `rgba(0, 0, 0, 0.84)`

## API
### Component properties (attributes)

#### value
- Type: `Array`
- Default: `[]`
List of scopes entered by the user. It can be used it pre-select scopes
by providing an array with scope values.

#### name
- Type: `string`
Form input name

#### currentValue
- Type: `string`
Current value entered by the user. This is not a scope and it is not
yet in the scopes list. User has to accept the scope before it become
available in the scopes list.

#### inputTarget
- Type: `HTMLElement`
- Read only property
Target for `paper-autocomplete`

#### allowedScopes
- Type: `Array`
List of available scopes.
It can be either list of string or list of object. If this is the
list of object then this expects to each object contain a `label`
and `description` keys.

### Example
```
{
  'label': 'user',
  'description': 'Grants read/write access to profile info only. '
}
```
When the description is provided it will be displayed below the name
of the scope.

#### preventCustomScopes
- Type: `boolean`
allowed to be add.

#### autoValidate
- Type: `boolean`
Set to true to auto-validate the input value when it changes.

#### hasAutocomplete
- Type: `Object`
- Read only property
True if the element has attached autocomplete element.

#### invalid
- Type: `boolean`
- Default: `false`
Returns true if the value is invalid.

If `autoValidate` is true, the `invalid` attribute is managed automatically,
which can clobber attempts to manage it manually.

#### required
- Type: `boolean`
- Default: `false`
Set to true to mark the input as required.


### Component methods

#### append
- Return type: `undefined`
Adds a scope to the list. The same as pushing item to the `scopes`
array but it will check for duplicates first.

