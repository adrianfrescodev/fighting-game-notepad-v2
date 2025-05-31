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
        <option className="bg-card" value="" disabled>
          Font size
        </option>
        <option className="bg-card" value="12px">
          12px
        </option>
        <option className="bg-card" value="16px">
          16px
        </option>
        <option className="bg-card" value="20px">
          20px
        </option>
        <option className="bg-card" value="24px">
          24px
        </option>
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
    <div className="animate-in fade-in border-accent-hover bg-tile flex flex-1 resize-none flex-col overflow-x-hidden rounded-lg border p-1 shadow-[0_0_10px_rgba(0,0,0,0.5)] transition-all duration-300 ease-in">
      <div className="text-text border-border border-b-1 text-center">
        {section.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
      </div>
      <EditorContent
        editor={editor}
        className="editor-container text-text mt-0 flex-1 overflow-x-hidden overflow-y-auto bg-transparent p-3 pr-1 text-base leading-1.5 break-words"
      />
      <NoteBubbleMenu editor={editor} />
    </div>
  );
}
