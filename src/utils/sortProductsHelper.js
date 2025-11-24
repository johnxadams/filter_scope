/**
 * Sortiert Produkte nach Preis
 * 1param products - Array von Produkten
 * 2param sortOrder - 'Price: Low to High' oder 'Price: High to Low' oder ''
 * returns {Array} - Sortiertes Array
 */

export function sortProductsByPrice(products, sortOrder) {
  // Wenn kein sortOrder oder leerer String, gib Original zurück
  if (!sortOrder || sortOrder === '') {
    return products
  }

  // Erstelle Kopie, um ogProduct nicht zu mutieren
  const sortedProducts = [...products]

  if (sortOrder === 'Price: Low to High') {
    return sortedProducts.sort((a, b) => a.price - b.price)
  }

  if (sortOrder === 'Price: High to Low') {
    return sortedProducts.sort((a, b) => b.price - a.price)
  }

  // Fallback: Original zurückgeben
  return products
}
