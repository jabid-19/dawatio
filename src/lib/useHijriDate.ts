const HIJRI_MONTHS = [
  "Muharram", "Safar", "Rabi' al-Awwal", "Rabi' al-Thani",
  "Jumada al-Awwal", "Jumada al-Thani", "Rajab", "Sha'ban",
  "Ramadan", "Shawwal", "Dhu al-Qi'dah", "Dhu al-Hijjah"
]

// Islamic epoch in Rata Die (astronomical/tabular civil calendar)
const ISLAMIC_EPOCH_RD = 227015

function gregorianToRD(year: number, month: number, day: number): number {
  const isLeap = (y: number) => (y % 4 === 0 && (y % 100 !== 0 || y % 400 === 0))
  return (
    365 * (year - 1) +
    Math.floor((year - 1) / 4) -
    Math.floor((year - 1) / 100) +
    Math.floor((year - 1) / 400) +
    Math.floor((367 * month - 362) / 12) +
    (month <= 2 ? 0 : isLeap(year) ? -1 : -2) +
    day
  )
}

function islamicYearStart(year: number): number {
  return (
    ISLAMIC_EPOCH_RD - 1 +
    (year - 1) * 354 +
    Math.floor((3 + 11 * year) / 30)
  )
}

function islamicMonthStart(year: number, month: number): number {
  return islamicYearStart(year) + 29 * (month - 1) + Math.floor(month / 2)
}

function rdToIslamic(rd: number): { day: number; month: number; year: number } {
  const year = Math.floor((30 * (rd - ISLAMIC_EPOCH_RD) + 10646) / 10631)
  const month = Math.min(
    12,
    Math.ceil((rd - islamicYearStart(year)) / 29.5)
  )
  const day = rd - islamicMonthStart(year, month) + 1
  return { day, month, year }
}

export function gregorianToHijri(date: Date): { day: number; month: number; year: number; monthName: string } {
  const rd = gregorianToRD(date.getFullYear(), date.getMonth() + 1, date.getDate())
  const { day, month, year } = rdToIslamic(rd)
  return { day, month, year, monthName: HIJRI_MONTHS[month - 1] }
}

export function formatHijriDate(dateString: string): string {
  if (!dateString) return ''
  const parsed = new Date(dateString)
  if (isNaN(parsed.getTime())) return ''
  // Use UTC date parts to avoid timezone shifting the date
  const date = new Date(parsed.getUTCFullYear(), parsed.getUTCMonth(), parsed.getUTCDate())
  const { day, year, monthName } = gregorianToHijri(date)
  return `${day} ${monthName} ${year}`
}
