import React, { useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';

export interface RichTextEditorProps {
  initialContent?: string;
  placeholder?: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  initialContent = '',
  placeholder = 'Start typing...',
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: placeholder,
      }),
    ],
    content: initialContent,
    editorProps: {
      attributes: {
        class: 'prose focus:outline-none w-full h-full',
      },
    },
  });

  const focusEditor = useCallback(() => {
    editor?.chain().focus().run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div
      className='rich-text-editor w-full h-full cursor-text'
      onClick={focusEditor}
    >
      <EditorContent editor={editor} />
    </div>
  );
};
