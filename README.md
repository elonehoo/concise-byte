# concise-byte

<em>Convert bytes to a human readable</em>

## install

```bash
# npm
npm i @elonehoo/concise-byte
# yarn
yarn add @elonehoo/concise-byte
#pnpm
pnpm i @elonehoo/concise-byte
```

## usage

```typescript
import conciseByte from '@elonehoo/concise-byte'

conciseByte(1337)//=> '1.34 kB'

conciseByte(100)//=> '100 B'

// Display with units of bits
conciseByte(1337, {bits: true})//=> '1.34 kbit'

// Display file size differences
conciseByte(42, {signed: true})//=> '+42 B'

// Localized output using German locale
conciseByte(1337, {locale: 'de'}) //=> '1,34 kB'
```
