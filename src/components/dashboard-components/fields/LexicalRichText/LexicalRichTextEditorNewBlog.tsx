import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { ListItemNode, ListNode } from "@lexical/list";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { HashtagNode } from "@lexical/hashtag";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { HorizontalRuleNode } from "@lexical/react/LexicalHorizontalRuleNode";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { EditorState, EditorThemeClasses } from "lexical";
import DefaultNodeStyling from "./DefaultStyling";
import { ImageNode } from "./imageNode";
import { useEffect, useRef, useState } from "react";
import { $convertFromMarkdownString, TRANSFORMERS } from "@lexical/markdown";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";

export interface LexicalRichTextEditorNewBlogProps {
  serializedAST: string | object;
  nodeClassNames?: EditorThemeClasses;
  editable?: boolean;
  isContentEdited?: (value: boolean) => void;
  setChangedData?: (value: string | any) => void;
}

const LexicalRichTextEditorNewBlog = ({
  serializedAST,
  nodeClassNames,
  editable = false,
  setChangedData,
}: LexicalRichTextEditorNewBlogProps) => {
  const editorStateRef = useRef<EditorState | null>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const [newValue, setNewValue] = useState<string | object>(serializedAST);

  const generateConfig = (editorState: any, theme?: EditorThemeClasses) => ({
    namespace: "editor",
    editable: true,
    onError: (error: Error) => {
      throw error;
    },
    editorState,
    theme: theme ?? DefaultNodeStyling,
    nodes: [
      HeadingNode,
      HashtagNode,
      ImageNode,
      ListNode,
      ListItemNode,
      QuoteNode,
      CodeNode,
      CodeHighlightNode,
      TableNode,
      TableCellNode,
      TableRowNode,
      AutoLinkNode,
      LinkNode,
      HorizontalRuleNode,
    ],
  });

  const Placeholder = () => (
    <div className="editor-placeholder">Enter some rich text...</div>
  );

  const onChange = (editorState: EditorState) => {
    editorState.read(() => {
      editorStateRef.current = editorState;
      const updatedValue = JSON.stringify(editorState);
      setNewValue(updatedValue);
      setChangedData?.(updatedValue);
    });
  };

  return (
    <div className="flex flex-col w-full text-xs border">
      <span className="bg-white">
        <LexicalComposer
          initialConfig={generateConfig(serializedAST, nodeClassNames)}
        >
          <ToolbarPlugin />
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                ref={editorRef}
                className="editor-input border rounded-b-md min-h-[100px] px-2 py-1 border-[#dadce0] h-[200px]"
              />
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <OnChangePlugin onChange={onChange} />
          <ListPlugin />
        </LexicalComposer>
      </span>
    </div>
  );
};

export default LexicalRichTextEditorNewBlog;
