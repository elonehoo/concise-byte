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
