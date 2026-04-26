import { describe, it, expect } from 'vitest'
import { mdToLexical, mdToPlain } from './markdown'

describe('mdToPlain', () => {
  it('strips markdown', () => {
    expect(mdToPlain('# Hello\n\nThis is **bold** text.')).toBe('Hello\n\nThis is bold text.')
  })
  it('strips italic and inline code', () => {
    expect(mdToPlain('This *is* `code`.')).toBe('This is code.')
  })
  it('preserves link text', () => {
    expect(mdToPlain('See [the docs](https://x.com/y)')).toBe('See the docs')
  })
})

describe('mdToLexical', () => {
  it('returns a Lexical root with paragraph children', () => {
    const out = mdToLexical('Hello world')
    expect(out.root.type).toBe('root')
    expect(out.root.children[0].type).toBe('paragraph')
  })
  it('handles headings', () => {
    const out = mdToLexical('# H1\n\n## H2\n\n### H3')
    const tags = out.root.children
      .filter((c: any) => c.type === 'heading')
      .map((c: any) => c.tag)
    expect(tags).toEqual(['h1', 'h2', 'h3'])
  })
  it('handles unordered lists', () => {
    const out = mdToLexical('- a\n- b')
    const list = out.root.children.find((c: any) => c.type === 'list')
    expect(list).toBeTruthy()
    expect((list as any).listType).toBe('bullet')
    expect((list as any).children).toHaveLength(2)
  })
  it('handles ordered lists', () => {
    const out = mdToLexical('1. one\n2. two')
    const list = out.root.children.find((c: any) => c.type === 'list')
    expect((list as any).listType).toBe('number')
  })
  it('extracts bold and italic into format flags', () => {
    const out = mdToLexical('A **bold** and *italic* phrase.')
    const para = out.root.children[0]
    const formats = (para as any).children.map((c: any) => c.format ?? 0)
    expect(formats).toContain(1) // bold
    expect(formats).toContain(2) // italic
  })
})
