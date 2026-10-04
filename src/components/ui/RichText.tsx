import React from 'react'

/**
 * Minimal renderer for Payload's Lexical rich-text JSON.
 * Handles paragraphs, headings, lists, links, line breaks and basic marks.
 * Sufficient for editorial content (service bodies, bios, articles).
 */

type Node = any

const FORMAT = { BOLD: 1, ITALIC: 2, STRIKE: 4, UNDERLINE: 8, CODE: 16 }

function renderText(node: Node, key: number) {
  let el: React.ReactNode = node.text
  const f = node.format || 0
  if (f & FORMAT.BOLD) el = <strong key={key}>{el}</strong>
  if (f & FORMAT.ITALIC) el = <em key={key}>{el}</em>
  if (f & FORMAT.UNDERLINE) el = <u key={key}>{el}</u>
  if (f & FORMAT.CODE) el = <code key={key}>{el}</code>
  return <React.Fragment key={key}>{el}</React.Fragment>
}

function renderChildren(children: Node[] = []): React.ReactNode {
  return children.map((child, i) => renderNode(child, i))
}

function renderNode(node: Node, key: number): React.ReactNode {
  if (!node) return null
  switch (node.type) {
    case 'text':
      return renderText(node, key)
    case 'linebreak':
      return <br key={key} />
    case 'paragraph':
      return <p key={key}>{renderChildren(node.children)}</p>
    case 'heading': {
      const Tag = (node.tag || 'h2') as keyof React.JSX.IntrinsicElements
      return <Tag key={key}>{renderChildren(node.children)}</Tag>
    }
    case 'list': {
      const Tag = node.listType === 'number' ? 'ol' : 'ul'
      return <Tag key={key}>{renderChildren(node.children)}</Tag>
    }
    case 'listitem':
      return <li key={key}>{renderChildren(node.children)}</li>
    case 'quote':
      return <blockquote key={key}>{renderChildren(node.children)}</blockquote>
    case 'link': {
      const url = node.fields?.url || node.url || '#'
      return (
        <a key={key} href={url} target={node.fields?.newTab ? '_blank' : undefined} rel="noopener noreferrer">
          {renderChildren(node.children)}
        </a>
      )
    }
    default:
      return node.children ? <React.Fragment key={key}>{renderChildren(node.children)}</React.Fragment> : null
  }
}

export default function RichText({ data, className }: { data: any; className?: string }) {
  const root = data?.root
  if (!root?.children?.length) return null
  return <div className={className ?? 'prose'}>{renderChildren(root.children)}</div>
}
