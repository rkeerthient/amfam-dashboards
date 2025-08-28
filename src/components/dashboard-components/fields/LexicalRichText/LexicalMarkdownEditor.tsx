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
import * as React from "react";
import { ImageNode } from "./imageNode";
import { useRef, useState } from "react";
import {
  $convertFromMarkdownString,
  $convertToMarkdownString,
  TRANSFORMERS,
} from "@lexical/markdown";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";

export interface LexicalMarkdownEditorProps {
  serializedAST: string | object;
  nodeClassNames?: EditorThemeClasses;
  editable?: boolean;
  isContentEdited?: (value: boolean) => void;
  setChangedData?: (value: string | any) => void;
}

const LexicalMarkdownEditor = ({
  serializedAST,
  nodeClassNames,
  editable = false,
  isContentEdited,
  setChangedData,
}: LexicalMarkdownEditorProps) => {
  const editorStateRef = useRef<EditorState | null>(null);
  const [initJson, setInitJson] = useState<any>();
  TRANSFORMERS.push({
    format: ["underline"],
    type: "text-format",
    tag: "++",
  });
  const generateConfig = (editorState: any, theme?: EditorThemeClasses) => {
    return {
      namespace: "",
      editable: editable,
      onError: (error: Error) => {
        throw error;
      },
      editorState: () => $convertFromMarkdownString(editorState, TRANSFORMERS),
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
    };
  };

  const Placeholder = () => (
    <div className="editor-placeholder">Enter some rich text...</div>
  );

  const onChange = (editorState: EditorState) => {
    editorState.read(() => {
      const markdown = $convertToMarkdownString(TRANSFORMERS);
      const json = editorState.toJSON();

      if (!initJson) {
        setInitJson(json);
      }

      const updatedContent = editorState.toJSON();
      const contentEdited =
        JSON.stringify(initJson) !== JSON.stringify(updatedContent);

      if (isContentEdited) {
        isContentEdited(contentEdited);
      }

      if (setChangedData) {
        setChangedData(markdown);
      }
    });
  };

  return (
    <div className={`w-full ${editable && `border`}`}>
      <LexicalComposer
        initialConfig={generateConfig(serializedAST, nodeClassNames)}
      >
        <span className={`${editable ? `block  ` : `hidden`}`}>
          <ToolbarPlugin />
          <hr />
        </span>
        {editable ? (
          <>
            <RichTextPlugin
              contentEditable={
                <ContentEditable className="editor-input h-40" />
              }
              ErrorBoundary={LexicalErrorBoundary}
              placeholder={<div />}
            />
            <OnChangePlugin
              onChange={(editorState) =>
                onChange((editorStateRef.current = editorState))
              }
            />
          </>
        ) : (
          <>
            <RichTextPlugin
              contentEditable={<ContentEditable className="editor-input" />}
              ErrorBoundary={LexicalErrorBoundary}
              placeholder={<Placeholder />}
            />
          </>
        )}
        <ListPlugin />
      </LexicalComposer>
    </div>
  );
};

export default LexicalMarkdownEditor;
