"use client";

import { useState } from "react";
import { Part } from "@prisma/client";
import MDEditor, { commands } from "@uiw/react-md-editor";
import { upload } from "@imagekit/react";
import toast from "react-hot-toast";

// Props for a single paragraph editor
type Props = {
  orderId: number;
  content?: string;
  mediaLocation?: number;
  mediaPath?: string;
  setParts: React.Dispatch<React.SetStateAction<Partial<Part>[]>>;
  setIsWaiting: React.Dispatch<React.SetStateAction<boolean>>;
  onRemove?: (orderId: number) => void;
};

function PartUpdateForm({
  orderId,
  content,
  mediaLocation = 1,
  mediaPath,
  setParts,
  setIsWaiting,
  onRemove,
}: Props) {
  // ImageKit upload
  const [progress, setProgress] = useState(0);
  const authenticator = async () => {
    try {
      const response = await fetch("/api/upload-auth");
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Request failed with status ${response.status}: ${errorText}`,
        );
      }
      const data = await response.json();
      const { signature, expire, token, publicKey } = data;
      return { signature, expire, token, publicKey };
    } catch (error) {
      console.error("Authentication error:", error);
      throw new Error("Authentication request failed");
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsWaiting(true);
    setProgress(0);
    try {
      const { signature, expire, token, publicKey } = await authenticator();
      const response = await upload({
        file,
        fileName: file.name,
        folder: "/nieuws",
        publicKey,
        signature,
        expire,
        token,
        onProgress: (event) => {
          setProgress(Math.round((event.loaded / event.total) * 100));
        },
      });
      setParts((prevParts) =>
        prevParts.map((part) =>
          part.orderId === orderId
            ? { ...part, mediaPath: response.url || "" }
            : part,
        ),
      );
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Uploaden van het beeld is mislukt.");
    } finally {
      setIsWaiting(false);
    }
  };

  return (
    <div className="part-update-form">
      <h4>Paragraaf {orderId}</h4>
      <MDEditor
        aria-invalid={false}
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
          setParts((prevParts) =>
            prevParts.map((part) =>
              part.orderId === orderId ? { ...part, content: val || "" } : part,
            ),
          );
        }}
        preview="edit"
        value={content}
      />
      &nbsp;
      <label>
        Beeld
        <fieldset className="grid">
          <input
            autoComplete="off"
            disabled
            value={mediaPath}
            name="media"
            placeholder="Link naar de media"
            type="url"
          />
          <input accept="image/*" onChange={handleFileChange} type="file" />
        </fieldset>
        <progress value={progress} max="100" />
      </label>
      <fieldset>
        <legend>
          <strong>Plaatsing paragraaf {orderId}</strong>
        </legend>

        <div>
          <input
            type="radio"
            id={`part-${orderId}-position-left`}
            name={`part-${orderId}-position`}
            value="1"
            checked={mediaLocation === 0}
            onChange={() =>
              setParts((prevParts) =>
                prevParts.map((part) =>
                  part.orderId === orderId
                    ? { ...part, mediaLocation: 0 }
                    : part,
                ),
              )
            }
          />
          <label htmlFor={`part-${orderId}-position-left`}>Links</label>
        </div>
        <div>
          <input
            type="radio"
            id={`part-${orderId}-position-center`}
            name={`part-${orderId}-position`}
            value="0"
            checked={mediaLocation === 1}
            onChange={() =>
              setParts((prevParts) =>
                prevParts.map((part) =>
                  part.orderId === orderId
                    ? { ...part, mediaLocation: 1 }
                    : part,
                ),
              )
            }
          />
          <label htmlFor={`part-${orderId}-position-center`}>Gecentreerd</label>
        </div>
        <div>
          <input
            type="radio"
            id={`part-${orderId}-position-right`}
            name={`part-${orderId}-position`}
            value="2"
            checked={mediaLocation === 2}
            onChange={() =>
              setParts((prevParts) =>
                prevParts.map((part) =>
                  part.orderId === orderId
                    ? { ...part, mediaLocation: 2 }
                    : part,
                ),
              )
            }
          />
          <label htmlFor={`part-${orderId}-position-right`}>Rechts</label>
        </div>
      </fieldset>
      <button
        className="secondary"
        type="button"
        onClick={() => onRemove && onRemove(orderId)}
      >
        Verwijder paragraaf {orderId}
      </button>
      <hr />
    </div>
  );
}

export default PartUpdateForm;
