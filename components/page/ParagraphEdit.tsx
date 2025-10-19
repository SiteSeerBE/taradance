import React, { useState, useEffect } from "react";
import MDEditor, { commands } from "@uiw/react-md-editor";
import Paragraph from "./Paragraph";

type props = {
  addParagraph: () => void;
};

type imageAlign = "LEFT" | "RIGHT" | null;

const paragraphEdit: React.FC = (addParagraph) => {
  const [imageAlign, setImageLocation] = useState<imageAlign>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [editMode, setEditMode] = useState<boolean>(true);
  const [disableEditButton, setDisableEditButton] = useState<boolean>(false);

  useEffect(() => {
    if (!editMode) {
      setDisableEditButton(true);
      const timer = setTimeout(() => {
        setDisableEditButton(false);
      }, 1000);

      return () => clearTimeout(timer); // Cleanup timeout on component unmount or editMode change
    } else {
      setDisableEditButton(true); // Reset button state when entering edit mode
    }
  }, [editMode]);

  if (editMode) {
    return (
      <fieldset>
        <label>
          Tekst
          <MDEditor
            commands={[
              commands.title,
              commands.bold,
              commands.italic,
              commands.hr,
              commands.quote,
              commands.divider,
              commands.orderedListCommand,
              commands.unorderedListCommand,
              commands.link,
              commands.table,
              commands.divider,
              commands.help,
            ]}
            onChange={(val) => {
              setContent(val || "");
            }}
            preview="edit"
            value={content}
          />
        </label>
        <button className="button secondary" onClick={() => setEditMode(false)}>
          Opslaan
        </button>
      </fieldset>
    );
  } else {
    return (
      <>
        <Paragraph
          content={content}
          imageAlign={imageAlign}
          imageUrl={imageUrl}
        />
        <button
          className="button secondary"
          disabled={disableEditButton}
          onClick={() => setEditMode(true)}
        >
          Bewerken
        </button>
      </>
    );
  }
};
export default paragraphEdit;
