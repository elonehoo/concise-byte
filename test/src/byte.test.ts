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
