export const SHELTERS_DATA = [
  {
    id: 1,
    name: 'Сховище «Дніпро-Кіровоград»',
    category: 'сховище',
    lat: 49.031541,
    lng: 33.165796,
    address: 'вул. Заводська, 5а',
    capacity: 850,
    rating: 4.8,
    reviews: 234,
    description: 'Бомбосховище з необхідними умовами для тривалого перебування',
    amenities: ['вода', 'туалет', 'вентиляція', 'світло'],
    accessibility: 'сходи',
    distance: null,
  },
  {
    id: 2,
    name: 'Метро "Золоті Ворота"',
    category: 'метро',
    lat: 50.4515,
    lng: 30.5293,
    address: 'вул. Володимирська, 10',
    capacity: 920,
    rating: 4.7,
    reviews: 189,
    description: 'Глибока станція метро з базовими умовами для тимчасового перебування',
    amenities: ['вода', 'туалет', 'вентиляція', 'світло', 'аптечка'],
    accessibility: 'сходи',
    distance: null,
  },
  {
    id: 3,
    name: 'Метро "Театральна"',
    category: 'метро',
    lat: 50.4523,
    lng: 30.5215,
    address: 'вул. Богдана Хмельницького, 1',
    capacity: 780,
    rating: 4.6,
    reviews: 156,
    description: 'Добре обладнане укриття з якісною вентиляцією та освітленням',
    amenities: ['вода', 'туалет', 'вентиляція', 'світло'],
    accessibility: 'сходи',
    distance: null,
  },
  {
    id: 4,
    name: 'Укриття на вул. Грушевського',
    category: 'укриття',
    lat: 50.4602,
    lng: 30.5246,
    address: 'вул. Грушевського, 25',
    capacity: 450,
    rating: 4.5,
    reviews: 87,
    description: 'Підземне укриття в адміністративному будинку',
    amenities: ['вода', 'туалет', 'вентиляція'],
    accessibility: 'ліфт',
    distance: null,
  },
  {
    id: 5,
    name: 'ОСББ "Успіх 2019"',
    category: 'укриття',
    lat: 50.4789,
    lng: 30.5123,
    address: 'вул. Омеляна Пріцака, 12',
    capacity: 320,
    rating: 4.9,
    reviews: 52,
    description: 'Сучасне укриття з базовим набором необхідних зручностей',
    amenities: ['вода', 'туалет', 'вентиляція', 'світло', 'пандус'],
    accessibility: 'сходи',
    distance: null,
  },
  {
    id: 6,
    name: 'Метро "Палац спорту"',
    category: 'метро',
    lat: 50.4456,
    lng: 30.5087,
    address: 'вул. Басейна, 2а',
    capacity: 1100,
    rating: 4.4,
    reviews: 203,
    description: 'Простора станція метро з великою місткістю',
    amenities: ['вода', 'туалет', 'вентиляція', 'світло', 'медпункт'],
    accessibility: 'ліфт',
    distance: null,
  },
  {
    id: 7,
    name: 'Укриття ЖК "Мегаполіс"',
    category: 'укриття',
    lat: 50.4321,
    lng: 30.5456,
    address: 'вул. Василя Кандинського, 47',
    capacity: 680,
    rating: 4.7,
    reviews: 134,
    description: 'Укриття у сучасному житловому комплексі',
    amenities: ['вода', 'туалет', 'вентиляція', 'світло'],
    accessibility: 'ліфт',
    distance: null,
  },
  {
    id: 8,
    name: 'Метро "Академмістечко"',
    category: 'метро',
    lat: 50.4234,
    lng: 30.5567,
    address: 'просп. Академіка Палладіна, 15',
    capacity: 950,
    rating: 4.5,
    reviews: 178,
    description: 'Надійна станція з хорошою пропускною здатністю',
    amenities: ['вода', 'туалет', 'вентиляція', 'світло'],
    accessibility: 'сходи',
    distance: null,
  },
]

export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return (R * c * 1000).toFixed(0)
}

export const filterShelters = (shelters, searchQuery, selectedCategory = null) => {
  const normalizedQuery = searchQuery.trim().toLowerCase()

  return shelters.filter((shelter) => {
    const matchesSearch =
      !normalizedQuery ||
      shelter.name.toLowerCase().includes(normalizedQuery) ||
      shelter.address.toLowerCase().includes(normalizedQuery)

    const matchesCategory = !selectedCategory || shelter.category === selectedCategory

    return matchesSearch && matchesCategory
  })
}
