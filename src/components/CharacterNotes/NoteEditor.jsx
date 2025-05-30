
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { BubbleMenu } from '@tiptap/react'
import Color from '@tiptap/extension-color'
import FontSize from "../../styles/fontsize";



function NoteBubbleMenu({ editor }) {
  if (!editor) return null;
  return (
    <BubbleMenu editor={editor} className="bg-card text-text border p-2 rounded shadow flex gap-3">
      <button onClick={() => editor.chain().focus().toggleBold().run()}>B</button>
      <button onClick={() => editor.chain().focus().toggleItalic().run()}>I</button>
      <button onClick={() => editor.chain().focus().toggleBulletList().run()}>•</button>
      <button onClick={() => editor.chain().focus().toggleOrderedList().run()}>
      1.
      </button>
      <input
        type="color"
        onChange={e => editor.chain().focus().setColor(e.target.value).run()}
      />

      <select
        onChange={e => editor.chain().focus().setFontSize(e.target.value).run()}
        defaultValue=""
      >
        <option value="" disabled>Font size</option>
        <option value="12px">12px</option>
        <option value="16px">16px</option>
        <option value="20px">20px</option>
        <option value="24px">24px</option>
      </select>

      <button
        onClick={() => {
          editor.chain().focus().clearNodes().unsetAllMarks().run()
        }}
      >
        Reset
      </button>
    </BubbleMenu>
  );
}
export default function NoteEditor({section, value, onChange }) {
  const editor = useEditor({
    extensions: [StarterKit,
    Color, FontSize],
    content: value || "",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;
  return (
    <div className="border rounded py-2 px-3 bg-card flex-1 h-full overflow-x-auto flex flex-col">
        <NoteBubbleMenu editor={editor} />
        <div className="text-text text-center">{section}</div>
      <EditorContent editor={editor} className="h-full w-full cursor-text editor-container text-text"/>
    </div>
  );
}