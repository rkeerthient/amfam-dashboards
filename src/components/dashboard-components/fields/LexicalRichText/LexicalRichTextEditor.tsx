import { useEffect, useRef } from "react";
import { EditorState, EditorThemeClasses } from "lexical";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeNode, CodeHighlightNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { TableNode, TableCellNode, TableRowNode } from "@lexical/table";
import { HashtagNode } from "@lexical/hashtag";
import { HorizontalRuleNode } from "@lexical/react/LexicalHorizontalRuleNode";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import { useFieldGroupsStore } from "../../../util/useDashboardStore";
import DefaultNodeStyling from "./DefaultStyling";
import { ImageNode } from "./imageNode";
import { CompProps } from "../../../../types/Dashboard";

export interface LexicalRichTextEditorProps extends CompProps {
  nodeClassNames?: EditorThemeClasses;
}

const LexicalRichTextEditor = ({
  fieldName,
  nodeClassNames,
}: LexicalRichTextEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const editorStateRef = useRef<EditorState | null>(null);

  const { newValues, fieldValues, setNewValue } = useFieldGroupsStore();

  const currentValue = newValues[fieldName];
  const initialValue = fieldValues[fieldName];

  useEffect(() => {
    if (currentValue === undefined && initialValue) {
      setNewValue(
        fieldName,
        JSON.stringify(initialValue?.json ?? initialValue)
      );
    }
  }, [fieldName, initialValue]);

  const Placeholder = () => (
    <div className="editor-placeholder text-gray-400">
      Enter some rich text...
    </div>
  );

  const onChange = (editorState: EditorState) => {
    editorState.read(() => {
      const json = editorState.toJSON();
      editorStateRef.current = editorState;
      setNewValue(fieldName, { json });
    });
  };

  const getInitialEditorState = () => {
    if (typeof currentValue === "string") return currentValue;
    if (initialValue?.json) return JSON.stringify(initialValue.json);
    return JSON.stringify({
      json: {
        root: {
          children: [
            {
              type: "paragraph",
              children: [],
              indent: 0,
              format: "",
              version: 1,
            },
          ],
          type: "root",
          indent: 0,
          format: "",
          version: 1,
        },
      },
    });
  };

  const config = {
    namespace: "editor",
    editable: true,
    onError: (error: Error) => {
      throw error;
    },
    editorState: getInitialEditorState(),
    theme: nodeClassNames ?? DefaultNodeStyling,
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

  return (
    <div className="flex flex-col w-full text-xs">
      <LexicalComposer initialConfig={config}>
        <ToolbarPlugin />
        <RichTextPlugin
          contentEditable={
            <ContentEditable
              ref={editorRef}
              className="editor-input border rounded-b-md min-h-[100px] px-2 py-1 border-[#dadce0] h-[200px]"
            />
          }
          // placeholder={<Placeholder />}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <OnChangePlugin onChange={onChange} />
        <ListPlugin />
      </LexicalComposer>
    </div>
  );
};

export default LexicalRichTextEditor;
