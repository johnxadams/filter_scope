# Filter Scope App

### Filtering through a telescope

<br>

## FilterScope.vue

- Where everything comes together

### 1. `const products = productsData`

- lokaleJSON Data fetchen, im FilterScope importieren und als `products` weiterverwenden

### 2. `filteredAndSortedProducts()`

- Alle emitten Werte die zur Filterung dienen werden hierin bearbeitet
  - `namesFilter` SearchQuery filterung nach Namen

  - `categoryFilter` Boolean ob und welcher p.category dem emitWert aus dem Dropdown-component entspricht
  - `inStockFilter` eine Vekettung von Tenary Operator um dem inStock Wert zu filtern
    - `stockAvailable -> '', 'true', 'false'`

  - `sortProductsByPrice(A, B)` outsorced Function im sortProductsHelper. Sortiert Produkte Aufsteigen, Absteigend und Default
    - Parameter A - `[Array]` Ergebnis der bisherigenFilterung (names, category, inStock)
    - Parameter B - ausgewählte Sortierung (aufsteigend, absteigend, default)

### 3. `categories()`

- Wir bauen a new Set of Array welches die gemappten Produkt Kategorien enthält

- Den Array, als props passen an Categories.vue, und dann weiter passen zu Dropdown.vue um diesen dort zu rendern

- Durch Pinia mit Sonnenbrille könnte ich mir das Leben hier einfacher machen, durch zentralisierte Logik

### 4. `handleReset()`

- Der ResetFilter.vue funkt ein emit(reset) an den Parent und triggert dadurch handleReset()

- In handleReset werden alle Filterwerte auf ihre Defaults bzw. emptyString zurückgesetzt

## ProductListeItem.vue

- Empfange product als props und Rendere jede einzelne Card
- "Nicht Verfügbar" BADGE darstellung durch `v-if="!product.inStock"`

<br>
<br>

# Filter Section

### Alle Filter Komponenten sortiert im Ordner filter

`src/component/filter`

<br>

## I. SearchBar.vue

### Vue Model Magic

1. Die SearchBar-Component erhält über v-model den aktuellen Wert von searchQuery als modelValue-Prop, der initial ein emptyString ist

2. Im SearchBar-Component wird besagte searchQuery als `modelValue` props weiterverwertet

3. `@input="handleInput"`
   - Wert des modelValue wird an den Parent emitted onUpdate -> ` emit('update:modelValue', event.target.value)`
   - Der emittedValue entspricht dem event.target.value

4. ein setTimeout function for performance

## II. Dropdown.vue

Wiederverwendbare Dropdown Component

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
- Event wird gerufen in `onMounted`

### 5. `focusNextItem()` gerufen durch Pfeiltaste ⬇

- Wenn wir uns bei der letzten `òption` befinden, gehe zum ersten `<li>`
- Ansonsten fokussiere immer den nächsten `<li>`

### 6. `focusPreviousItem()` gerufen durch Pfeiltaste ⬆

- Wenn wir uns bei der ersten `òption` befinden, gehe zum letzten `<li>`
- Ansonsten fokussiere immer den vorherigen `<li>`

<br>

#### Accessability Handler in `Dropdown.vue`

`<button>`

- open dropdown with SPACE `@keydown.space.exact.prevent="toggleVisibility"`
- close dropdown with ESC `@keydown.esc.exact.prevent="toggleVisibility"`
- close dropdown with SHIFT+TAB `@keydown.shift.tab="toggleVisibility"`
- `aria-haspopup="listbox"` -> Hilft Screenreader zu emitteln das es ist um ein MenuList handelt
- `:aria-expanded="open.toString()"` -> Screenreader erwartet ein Boolean welcher sagt ob Dropdown.open true oder false ist.
- `:aria-controls="'dropdown-menu'"` -> verknüft `<button>` mit dem `<ul>` Element, welche `dropdown-menu` als id trägt.
- `:aria-label="accessLabel"` -> accessLabel ist ein props welcher sagt um welchen Dropdown es sich handelt, e.g. Kategorie oder Price Sort Dropdown

<br>

`<li-defaultOption>` and `<li-dropdownOption>`

- select option using ENTER `@keydown.enter.prevent="emitSelectedOption('')"`
- select option using SPACE `@keydown.space.prevent="emitSelectedOption('')"`
- close dropdown with ESC `@keydown.esc.exact.prevent="toggleVisibility"`
- focus next Item with DOWN `@keydown.down.prevent="focusNextItem"`
- focus previous Item with UP `@keydown.up.prevent="focusPreviousItem"`

only `<li> dropdownOption`

- hide dropdown with tab - if we're on the last Item `@keydown.tab.exact="index === dropdownOptions.length - 1 ? toggleVisibility() : null"`

<br>

## III. Categories.vue & PriceSort.vue

Erbt die Funktionalität des Dropdown.vue, und dienen Durchreiche von Props und Emit

### 1. `Categories.vue`

- Als childComponent - empfängt es als props, die Array ausgabe des computed categories()
- Und gibt zurück, das v-model selectedCategory, was uns hilft in der Filterung function

### 3. `PriceSort.vue`

- Als parentComponent - gibt er die hand written dropdownOption als Array an Dropdown.vue
- Als childComponent gibt es zurück, das v-model selectedSort, was uns hilft in der Filterung function

## IV. StockFilter.vue

Eine barrierefreie Radio-Button-Gruppen `role="radiogroup"` präsentieren, um Produkte nach Lagerbestand zu filtern

### Filter optionen

- Alle Produkte
- Verfügbar
- Kein Bestand

Emittet wird option.value, `'emptyString', true, false`, was dem inStock value des product.JSON entspricht.
Im Parent wird der Wert in stockAvailability gespeichert und weiter im der `filteredAndSortedProducts` computed function geprocceessed mit tenary Operator.

Wenn stockAvailability ein emptyString ist, return true, ansonsten wenn stockAvailability true ist, return p.inStock === true für nur verfügbare Produkte, und letztlich wenn nichts der oberen zutrifft, return p.inStock === false, für Produkte ohne Bestand.

<pre>
   const inStockFilter = stockAvailability.value === '' ? true
                       : stockAvailability.value === 'true' ? p.inStock === true
                       : p.inStock === false
</pre>

## V. ResetFilter.vue

- Emit feuer reset zum Parent von wo aus alles States zurückgesetzt werden im `handleReset()`
- Button auch accessable durch SPACE and ENTER
