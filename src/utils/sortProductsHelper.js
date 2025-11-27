/**
 * Sortiert Produkte nach Preis
 * 1param products - Array von Produkten
 * 2param sortOrder - 'Price: Aufsteigend' oder 'Price: Absteigend' oder ''
 * returns {Array} - Sortiertes Array
 */

export function sortProductsByPrice(products, sortOrder) {
  // Wenn kein sortOrder oder leerer String, gib Original zurück
  if (!sortOrder || sortOrder === '') {
    return products
  }

  // Erstelle Kopie, um ogProduct nicht zu mutieren
  const sortedProducts = [...products]

  if (sortOrder === 'Price: Aufsteigend') {
    return sortedProducts.sort((a, b) => a.price - b.price)
  }

  if (sortOrder === 'Price: Absteigend') {
    return sortedProducts.sort((a, b) => b.price - a.price)
  }

  // Fallback: Original zurückgeben
  return products
}
