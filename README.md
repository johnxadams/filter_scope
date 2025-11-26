# Filter Scope App

### Filtering through a telescope

<br>

## FilterScope.vue

- Where everything comes together

### 1. `productStore.products`

- lokaleJSJON Data holen hier von Pinia

### 2. `filteredAndSortedProducts()`

- Alle emitten Werte die zur Filterung dienen werden hierin bearbeitet
  - `namesFilter` SearchQuery filterung nach Namen

  - `categoryFilter` Boolean ob und welcher p.category dem emitWert entspricht
  - `inStockFilter` eine Vekettung von Tenary Operator um dem inStock Wert zu filtern
    - `stockAvailable -> '', 'true', 'false'`

  - `sortProductsByPrice(A, B)` outsorced Function im sortProductsHelper. Sortiert Produkte Aufsteigen, Absteigend und Default
    - A Param - Array der bisherigenFilterung (names, category, inStock)
    - B Param - ausgewählte Sortierung

### 3. `categories()`

- Wir bauen a new Set of Array welches die gemappten Produkt Kategorien enthält

- Den Array, als props passen an Categories.vue, und dann weiter passen zu Dropdown.vue um diesen dort zu rendern

- Durch Pinia mit Sonnenbrille könnte ich mir das Leben hier einfacher machen, durch zentralisierte Logik

### 4. `handleReset()`

- Der ResetFilter.vue funkt ein emit(reset) an den Parent und triggert dadurch handleReset()

- In handleReset werden alle Filterwerte auf ihre Defaults bzw. emptyString zurückgesetzt

## ProductListeItem.vue

- Empfange product als props und Rendere jede einzelne Card

<br>
<br>

# Filter Section

### Alle Filter Komponenten sortiert im Ordner filter

`src/component/filter`

<br>

## SearchBar.vue

### Vue Model Magic

1. Die SearchBar-Component erhält über v-model den aktuellen Wert von searchQuery als modelValue-Prop, der initial ein emptyString ist

2. Im SearchBar-Component wird besagte searchQuery als `modelValue` props weiterverwertet

3. `@input="handleInput"`
   - Wert des modelValue wird an den Parent emitted onUpdate -> ` emit('update:modelValue', event.target.value)`
   - Der emittedValue entspricht dem event.target.value

4. ein setTimeout function for performance

## Dropdown.vue

### Wiederverwendbare Dropdown Component

### 1. `toggleVisibility()`

- Wie der Name verrät.
- `nextTick` präorisiert aufbau des DOMs (in dem Fall den Dropdown-Popup) before firstItem focussiert werden kann
- firstItem ist ein ref des `<li>`

### 2. `displayLabel()`

- Zeige im Dropdown die aktuell ausgewählte Option an

### 3. `emitSelectedOption()`

- Schicke die ausgewählte Dropdown zum Parent
- Schließe anschließend das Dropdown Menu

### 4. `handleClickOutside()`

- `ref="dropdown"` gibt mir zugriff auf root-Element des Dropdowns
- Prüfe ob element existiert und ob der Klick außerhalb des Dropdowns war
- Wenn das der Fall ist - Schließe Dropdown

<br>

#### Accessability Handler

`<button>`

- open dropdown with SPACE `@keydown.space.exact.prevent="toggleVisibility"`
- close dropdown with ESC `@keydown.esc.exact.prevent="toggleVisibility"`
- close dropdown with SHIFT+TAB `@keydown.shift.tab="toggleVisibility"`
- `aria-haspopup="listbox"` -> Hilft Screenreader zu emitteln das es ist um ein MenuList handelt
- `:aria-expanded="open.toString()"` -> Screenreader erwartet ein Boolean welcher sagt ob Dropdown.open true oder false ist.
- `:aria-controls="'dropdown-menu'"` -> verknüft `<button>` mit dem `<ul>` Element, welche `dropdown-menu` als id trägt.
- `:aria-label="accessLabel"` -> accessLabel ist ein props welcher sagt um welchen Dropdown es sich handelt, e.g. Kategorie oder Price Sort Dropdown
