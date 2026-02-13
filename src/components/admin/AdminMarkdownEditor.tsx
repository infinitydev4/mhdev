"use client";

import dynamic from "next/dynamic";
import "@uiw/react-md-editor/markdown-editor.css";
import styles from "./AdminMarkdownEditor.module.css";

// Chargement dynamique pour éviter les soucis SSR
const MDEditor = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default),
  { ssr: false },
);

interface AdminMarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  height?: number;
}

export function AdminMarkdownEditor({
  value,
  onChange,
  height = 480,
}: AdminMarkdownEditorProps) {
  return (
    <div data-color-mode="dark" className={styles.editorWrapper}>
      <div className="rounded-2xl overflow-hidden border-0">
        <MDEditor
          value={value}
          onChange={(val) => onChange(val ?? "")}
          textareaProps={{
            placeholder: "# Titre\n\nCommence à écrire ton article…",
          }}
          height={height}
          preview="live"
          visibleDragbar={false}
          className="!bg-transparent !border-0"
        />
      </div>
    </div>
  );
}
