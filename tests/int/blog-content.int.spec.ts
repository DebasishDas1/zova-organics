import { describe, expect, it } from 'vitest'
import { splitParagraphChildren } from '../../src/components/sections/blogs/BlogContent'

describe('splitParagraphChildren', () => {
  it('splits horizontal rules out of paragraph content', () => {
    const children = [
      { type: 'text', text: 'Before' },
      { type: 'horizontalrule' },
      { type: 'text', text: 'After' },
    ]

    expect(splitParagraphChildren(children)).toEqual([
      { type: 'paragraph', children: [{ type: 'text', text: 'Before' }] },
      { type: 'hr' },
      { type: 'paragraph', children: [{ type: 'text', text: 'After' }] },
    ])
  })
})
