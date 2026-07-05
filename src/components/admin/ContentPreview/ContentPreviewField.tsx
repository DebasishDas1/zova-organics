// components/admin/ContentPreview.tsx
'use client'

import React from 'react'
import { useFormFields } from '@payloadcms/ui'
import {
  RichText,
  type JSXConvertersFunction,
  type JSXConverters,
} from '@payloadcms/richtext-lexical/react'
import type { DefaultNodeTypes } from '@payloadcms/richtext-lexical'
import type { Media } from '@/payload-types'

const maxWidthBySize: Record<string, string> = {
  full: '100%',
  wide: '800px',
  medium: '560px',
}

// A trimmed-down version of the front-end converters (BlogContent.tsx) —
// same idea, but tolerant of the editor's in-progress state and styled
// with inline styles since Tailwind isn't loaded inside the admin panel.
const previewConverters: JSXConvertersFunction<DefaultNodeTypes> = ({ defaultConverters }) =>
  ({
    ...defaultConverters,
    upload: ({ node }) => {
      const doc = node.value as Media | undefined
      const url =
        doc && typeof doc === 'object'
          ? (doc.url ?? (doc as { thumbnailURL?: string }).thumbnailURL)
          : undefined

      if (!url) {
        return (
          <div
            style={{
              padding: 16,
              background: '#f4f4f5',
              borderRadius: 8,
              color: '#888',
              fontSize: 13,
            }}
          >
            Image not loaded in preview yet
          </div>
        )
      }

      const fields = (node.fields ?? {}) as { caption?: string; size?: string }
      const maxWidth = maxWidthBySize[fields.size ?? 'full']

      return (
        <figure style={{ margin: '24px auto', maxWidth }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={url}
            alt={doc?.alt ?? ''}
            style={{ width: '100%', height: 'auto', borderRadius: 16, display: 'block' }}
          />
          {fields.caption && (
            <figcaption style={{ textAlign: 'center', fontSize: 13, color: '#777', marginTop: 8 }}>
              {fields.caption}
            </figcaption>
          )}
        </figure>
      )
    },
    link: ({ node, nodesToJSX }) => {
      const fields = node.fields as { url?: string; newTab?: boolean }
      return (
        <a
          href={fields.url}
          target={fields.newTab ? '_blank' : undefined}
          style={{ color: '#2563eb' }}
        >
          {nodesToJSX({ nodes: node.children })}
        </a>
      )
    },
  }) as JSXConverters<DefaultNodeTypes>

export function ContentPreviewField() {
  const content = useFormFields(([fields]) => fields?.content?.value)

  return (
    <div style={{ marginTop: 8 }}>
      <p
        style={{
          fontSize: 11,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: '#999',
          margin: '0 0 10px',
          fontWeight: 600,
        }}
      >
        Live preview
      </p>

      <div
        style={{
          border: '1px solid #e4e4e7',
          borderRadius: 12,
          padding: '28px 36px',
          background: '#fff',
          maxHeight: 600,
          overflowY: 'auto',
        }}
      >
        {content ? (
          <div className="content-preview-prose">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <RichText data={content as any} converters={previewConverters} />
          </div>
        ) : (
          <p style={{ color: '#aaa', fontStyle: 'italic', margin: 0 }}>
            Start writing above to see a live preview here.
          </p>
        )}
      </div>

      <style>{`
        .content-preview-prose h2 { font-size: 28px; font-weight: 600; margin: 28px 0 12px; letter-spacing: -0.02em; }
        .content-preview-prose h3 { font-size: 22px; font-weight: 600; margin: 22px 0 10px; letter-spacing: -0.02em; }
        .content-preview-prose h4 { font-size: 18px; font-weight: 600; margin: 18px 0 8px; }
        .content-preview-prose p { font-size: 16px; line-height: 1.7; color: #444; margin: 0 0 14px; }
        .content-preview-prose ul, .content-preview-prose ol { margin: 0 0 14px; padding-left: 22px; }
        .content-preview-prose li { font-size: 16px; line-height: 1.6; margin-bottom: 6px; }
        .content-preview-prose blockquote { border-left: 3px solid #2563eb; background: #f8f8fa; padding: 12px 20px; border-radius: 0 8px 8px 0; margin: 16px 0; }
        .content-preview-prose table { border-collapse: collapse; width: 100%; margin: 16px 0; }
        .content-preview-prose th, .content-preview-prose td { border: 1px solid #e4e4e7; padding: 8px 12px; font-size: 14px; }
        .content-preview-prose code { background: #f4f4f5; padding: 2px 6px; border-radius: 4px; font-size: 13px; }
        .content-preview-prose hr { border: none; border-top: 1px solid #e4e4e7; margin: 24px 0; }
      `}</style>
    </div>
  )
}
