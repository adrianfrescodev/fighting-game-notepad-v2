import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { BubbleMenu } from '@tiptap/react';
import Color from '@tiptap/extension-color';
import FontSize from '../../styles/fontsize';

function NoteBubbleMenu({ editor }) {
  if (!editor) return null;
  return (
    <BubbleMenu editor={editor} className="bg-card text-text flex gap-3 rounded border p-2 shadow">
      <button onClick={() => editor.chain().focus().toggleBold().run()}>B</button>
      <button onClick={() => editor.chain().focus().toggleItalic().run()}>I</button>
      <button onClick={() => editor.chain().focus().toggleBulletList().run()}>•</button>
      <button onClick={() => editor.chain().focus().toggleOrderedList().run()}>1.</button>
      <input type="color" onChange={e => editor.chain().focus().setColor(e.target.value).run()} />

      <select
        onChange={e => editor.chain().focus().setFontSize(e.target.value).run()}
        defaultValue=""
      >
        <option value="" disabled>
          Font size
        </option>
        <option value="12px">12px</option>
        <option value="16px">16px</option>
        <option value="20px">20px</option>
        <option value="24px">24px</option>
      </select>

      <button
        onClick={() => {
          editor.chain().focus().clearNodes().unsetAllMarks().run();
        }}
      >
        Reset
      </button>
    </BubbleMenu>
  );
}
export default function NoteEditor({ section, value, onChange }) {
  const editor = useEditor({
    extensions: [StarterKit, Color, FontSize],
    content: value || '',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;
  return (
    <div className="bg-card flex h-full flex-1 flex-col overflow-x-auto rounded border px-3 py-2">
      <NoteBubbleMenu editor={editor} />
      <div className="text-text text-center">{section}</div>
      <EditorContent
        editor={editor}
        className="editor-container text-text h-full w-full cursor-text"
      />
    </div>
  );
}
