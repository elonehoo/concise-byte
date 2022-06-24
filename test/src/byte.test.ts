import {test,expect} from 'vitest'
import conciseByte from '@elonehoo/concise-byte'

test('test to throw error',()=>{
  expect(()=>conciseByte(Number.NaN)).toThrowError(/NaN/)
  expect(()=>conciseByte(Number.POSITIVE_INFINITY)).toThrowError(/Infinity/)
  expect(()=>conciseByte(Number.NEGATIVE_INFINITY)).toThrowError(/Infinity/)
})

test('converts bytes to human readable strings',()=>{
  expect(conciseByte(0)).toBe('0 B')
  expect(conciseByte(0.4)).toBe('0.4 B')
  expect(conciseByte(0.7)).toBe('0.7 B')
  expect(conciseByte(10)).toBe('10 B')
  expect(conciseByte(10.1)).toBe('10.1 B')
  expect(conciseByte(999)).toBe('999 B')
  expect(conciseByte(1001)).toBe('1 kB')
  expect(conciseByte(1e16)).toBe('10 PB')
  expect(conciseByte(1e30)).toBe('1000000 YB')
})

test('supports negative number',()=>{
  expect(conciseByte(-0.4)).toBe('-0.4 B')
  expect(conciseByte(-0.7)).toBe('-0.7 B')
  expect(conciseByte(-10.1)).toBe('-10.1 B')
  expect(conciseByte(-999)).toBe('-999 B')
  expect(conciseByte(-1001)).toBe('-1 kB')
})

test('locale option',()=>{
  expect(conciseByte(-0.4, {locale: 'de'})).toBe('-0,4 B')
  expect(conciseByte(0.4, {locale: 'de'})).toBe('0,4 B')
  expect(conciseByte(1001, {locale: 'de'})).toBe('1 kB')
  expect(conciseByte(10.1, {locale: 'de'})).toBe('10,1 B')
  expect(conciseByte(1e30, {locale: 'de'})).toBe('1.000.000 YB')

  expect(conciseByte(-0.4, {locale: 'en'})).toBe('-0.4 B')
  expect(conciseByte(0.4, {locale: 'en'})).toBe('0.4 B')
  expect(conciseByte(1001, {locale: 'en'})).toBe('1 kB')
  expect(conciseByte(10.1, {locale: 'en'})).toBe('10.1 B')
  expect(conciseByte(1e30, {locale: 'en'})).toBe('1,000,000 YB')

  expect(conciseByte(-0.4, {locale: ['unknown', 'de', 'en']})).toBe('-0,4 B')
  expect(conciseByte(0.4, {locale: ['unknown', 'de', 'en']})).toBe('0,4 B')
  expect(conciseByte(1001, {locale: ['unknown', 'de', 'en']})).toBe('1 kB')
  expect(conciseByte(10.1, {locale: ['unknown', 'de', 'en']})).toBe('10,1 B')
  expect(conciseByte(1e30, {locale: ['unknown', 'de', 'en']})).toBe('1.000.000 YB')

  expect(conciseByte(-0.4, {locale: true})).toBe('-0.4 B')
  expect(conciseByte(0.4, {locale: true})).toBe('0.4 B')
  expect(conciseByte(1001, {locale: true})).toBe('1 kB')
  expect(conciseByte(10.1, {locale: true})).toBe('10.1 B')
  expect(conciseByte(1e30, {locale: true})).toBe('1,000,000 YB')

  expect(conciseByte(-0.4, {locale: false})).toBe('-0.4 B')
  expect(conciseByte(0.4, {locale: false})).toBe('0.4 B')
  expect(conciseByte(1001, {locale: false})).toBe('1 kB')
  expect(conciseByte(10.1, {locale: false})).toBe('10.1 B')
  expect(conciseByte(1e30, {locale: false})).toBe('1000000 YB')

  expect(conciseByte(-0.4, {locale: undefined})).toBe('-0.4 B')
  expect(conciseByte(0.4, {locale: undefined})).toBe('0.4 B')
  expect(conciseByte(1001, {locale: undefined})).toBe('1 kB')
  expect(conciseByte(10.1, {locale: undefined})).toBe('10.1 B')
  expect(conciseByte(1e30, {locale: undefined})).toBe('1000000 YB')
})

test('signed option',()=>{
  expect(conciseByte(42, {signed: true})).toBe('+42 B')
  expect(conciseByte(-13, {signed: true})).toBe('-13 B')
  expect(conciseByte(0, {signed: true})).toBe(' 0 B')
})

test('bits option',()=>{
  expect(conciseByte(0, {bits: true})).toBe('0 b')
  expect(conciseByte(0.4, {bits: true})).toBe('0.4 b')
  expect(conciseByte(0.7, {bits: true})).toBe('0.7 b')
  expect(conciseByte(10, {bits: true})).toBe('10 b')
  expect(conciseByte(10.1, {bits: true})).toBe('10.1 b')
  expect(conciseByte(999, {bits: true})).toBe('999 b')
  expect(conciseByte(1001, {bits: true})).toBe('1 kbit')
  expect(conciseByte(1e16, {bits: true})).toBe('10 Pbit')
  expect(conciseByte(1e30, {bits: true})).toBe('1000000 Ybit')
})

test('binary option',()=>{
  expect(conciseByte(0, {binary: true})).toBe('0 B')
  expect(conciseByte(4, {binary: true})).toBe('4 B')
  expect(conciseByte(10, {binary: true})).toBe('10 B')
  expect(conciseByte(10.1, {binary: true})).toBe('10.1 B')
  expect(conciseByte(999, {binary: true})).toBe('999 B')
  expect(conciseByte(1025, {binary: true})).toBe('1 kiB')
  expect(conciseByte(1001, {binary: true})).toBe('1000 B')
  expect(conciseByte(1e16, {binary: true})).toBe('8.88 PiB')
  expect(conciseByte(1e30, {binary: true})).toBe('827000 YiB')
})

test('bits and binary option',()=>{
  expect(conciseByte(0, {bits: true, binary: true})).toBe('0 b')
  expect(conciseByte(4, {bits: true, binary: true})).toBe('4 b')
  expect(conciseByte(10, {bits: true, binary: true})).toBe('10 b')
  expect(conciseByte(999, {bits: true, binary: true})).toBe('999 b')
  expect(conciseByte(1025, {bits: true, binary: true})).toBe('1 kibit')
  expect(conciseByte(1e6, {bits: true, binary: true})).toBe('977 kibit')
})

test('fractional digits options',()=>{
  expect(conciseByte(1900, {maximumFractionDigits: 1})).toBe('1.9 kB')
  expect(conciseByte(1900, {minimumFractionDigits: 3})).toBe('1.900 kB')
  expect(conciseByte(1911, {maximumFractionDigits: 1})).toBe('1.9 kB')
  expect(conciseByte(1911, {minimumFractionDigits: 3})).toBe('1.911 kB')
  expect(conciseByte(1911, {minimumFractionDigits: 3})).toBe('1.911 kB')
  expect(conciseByte(1019, {maximumFractionDigits: 3})).toBe('1.019 kB')
  expect(conciseByte(1001, {maximumFractionDigits: 3})).toBe('1.001 kB')
  expect(conciseByte(1000, {minimumFractionDigits: 1, maximumFractionDigits: 3})).toBe('1.0 kB')
  expect(conciseByte(3942, {minimumFractionDigits: 1, maximumFractionDigits: 2})).toBe('3.94 kB')
  expect(conciseByte(59_952_784, {maximumFractionDigits: 1})).toBe('60 MB')
  expect(conciseByte(59_952_784, {minimumFractionDigits: 1, maximumFractionDigits: 1})).toBe('60.0 MB')
  expect(conciseByte(4001, {maximumFractionDigits: 3, binary: true})).toBe('3.907 kiB')
  expect(conciseByte(18_717, {maximumFractionDigits: 2, binary: true})).toBe('18.28 kiB')
  expect(conciseByte(18_717, {maximumFractionDigits: 4, binary: true})).toBe('18.2783 kiB')
  expect(conciseByte(32_768, {minimumFractionDigits: 2, maximumFractionDigits: 3, binary: true})).toBe('32.00 kiB')
  expect(conciseByte(65_536, {minimumFractionDigits: 1, maximumFractionDigits: 3, binary: true})).toBe('64.0 kiB')
})
