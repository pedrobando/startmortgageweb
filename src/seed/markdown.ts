import { fromMarkdown } from 'mdast-util-from-markdown'

type Lexical = {
  root: {
    type: 'root'
    children: any[]
    direction: 'ltr' | null
    format: ''
    indent: 0
    version: 1
  }
}

export function mdToPlain(md: string): string {
  return md
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/__(.*?)__/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/(?<!_)_([^_]+)_(?!_)/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/^>\s?/gm, '')
    .replace(/[ \t]+\n/g, '\n')
    .trim()
}

function textNode(value: string, format = 0): any {
  return {
    type: 'text',
    detail: 0,
    format,
    mode: 'normal',
    style: '',
    text: value,
    version: 1,
  }
}

function inlineNodes(nodes: any[], formatMask = 0): any[] {
  const out: any[] = []
  for (const n of nodes) {
    if (n.type === 'text') {
      out.push(textNode(n.value, formatMask))
    } else if (n.type === 'strong') {
      out.push(...inlineNodes(n.children, formatMask | 1))
    } else if (n.type === 'emphasis') {
      out.push(...inlineNodes(n.children, formatMask | 2))
    } else if (n.type === 'inlineCode') {
      out.push(textNode(n.value, formatMask | 16))
    } else if (n.type === 'break') {
      out.push({ type: 'linebreak', version: 1 })
    } else if (n.type === 'link') {
      out.push({
        type: 'link',
        fields: { url: n.url, newTab: false, linkType: 'custom' },
        version: 2,
        children: inlineNodes(n.children, formatMask),
      })
    } else if (n.children) {
      out.push(...inlineNodes(n.children, formatMask))
    }
  }
  return out
}

function walk(node: any): any {
  switch (node.type) {
    case 'heading':
      return {
        type: 'heading',
        tag: `h${Math.min(6, Math.max(1, node.depth))}`,
        version: 1,
        direction: 'ltr',
        format: '',
        indent: 0,
        children: inlineNodes(node.children),
      }
    case 'paragraph':
      return {
        type: 'paragraph',
        version: 1,
        direction: 'ltr',
        format: '',
        indent: 0,
        children: inlineNodes(node.children),
      }
    case 'list':
      return {
        type: 'list',
        listType: node.ordered ? 'number' : 'bullet',
        start: 1,
        tag: node.ordered ? 'ol' : 'ul',
        version: 1,
        direction: 'ltr',
        format: '',
        indent: 0,
        children: node.children.map((li: any, i: number) => ({
          type: 'listitem',
          value: i + 1,
          version: 1,
          direction: 'ltr',
          format: '',
          indent: 0,
          children: li.children.flatMap((c: any) => {
            const w = walk(c)
            return w?.children || []
          }),
        })),
      }
    case 'blockquote':
      return {
        type: 'quote',
        version: 1,
        direction: 'ltr',
        format: '',
        indent: 0,
        children: node.children.flatMap((c: any) => {
          const w = walk(c)
          return w?.children || [w].filter(Boolean)
        }),
      }
    case 'code':
      return {
        type: 'code',
        language: node.lang || 'plain',
        version: 1,
        direction: 'ltr',
        format: '',
        indent: 0,
        children: [textNode(node.value)],
      }
    case 'thematicBreak':
      return null
    default:
      return null
  }
}

export function mdToLexical(md: string): Lexical {
  const tree = fromMarkdown(md)
  const children = tree.children.map(walk).filter(Boolean) as any[]
  return {
    root: {
      type: 'root',
      children,
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }
}
