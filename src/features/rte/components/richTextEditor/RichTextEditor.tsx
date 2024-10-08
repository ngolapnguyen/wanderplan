import React, { useCallback, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';

export interface RichTextEditorProps {
  initialContent?: string;
  placeholder?: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  initialContent = '<p></p>',
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
        class: 'prose focus:outline-none w-full h-full p-2 overflow-auto',
      },
    },
  });

  const focusEditor = useCallback(() => {
    editor?.chain().focus().run();
  }, [editor]);

  useEffect(() => {
    if (editor) {
      editor.commands.focus('end');
    }
  }, [editor]);

  if (!editor) {
    return <div>Loading editor...</div>;
  }

  return (
    <div
      className='w-full h-full cursor-text rounded-md overflow-hidden'
      onClick={focusEditor}
    >
      <EditorContent editor={editor} className='h-full' />
    </div>
  );
};
