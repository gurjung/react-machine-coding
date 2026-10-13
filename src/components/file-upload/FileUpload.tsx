import React from "react";
import FilePreview from "./FilePreview";

type StatusType = "idle" | "uploading" | "done" | "error";

interface IUploadItem {
  id: string;
  file: File;
  progress: number;
  status: StatusType;
}

export const FileUpload = () => {
  let [items, setItems] = React.useState<IUploadItem[]>([]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.files, "files...");

    const next = Array.from(event.target.files ?? []).map((file) => ({
      id: crypto.randomUUID(),
      file,
      status: "idle" as const,
      progress: 0,
    }));

    setItems((prev) => [...prev, ...next]);
  };

  const hasPending = items.some((item) => item.status === "idle");

  function mockUpload(onProgress: (p: number) => void, onDone: () => void) {
    let progress = 0;

    const timer = setInterval(() => {
      progress = progress + 10;

      onProgress(progress);

      if (progress >= 100) {
        clearInterval(timer);
        onDone();
      }
    }, 300);
  }

  const patch = (id: string, changes: Partial<IUploadItem>) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, ...changes } : i)),
    );
  };

  const startUpload = (id: string) => {
    patch(id, { status: "uploading" });

    //mock upload
    const onProgressCb = (n: number) => {
      patch(id, { progress: n });
    };

    const onDoneCb = () => {
      patch(id, { status: "done" });
    };

    mockUpload(onProgressCb, onDoneCb);
  };

  const onUpload = () => {
    items
      .filter((item) => item.status === "idle")
      .forEach((item) => startUpload(item.id));
  };

  return (
    <div>
      <input type="file" multiple onChange={onChange} />
      <ul>
        {items.map((item) => (
          <>
            <li key={item.id}>{item.file.name}</li>
            <FilePreview file={item.file} />
            <div
              style={{
                width: 200,
                height: 8,
                background: "#e5e7eb",
                // overflow: "hidden", // clips the bar when it is shifted/scaled
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  background: "#4f46e5",
                  transformOrigin: "left", // grow from the left edge
                  transform: `scaleX(${item.progress / 100})`,
                  transition: "transform .3s",
                }}
              />
            </div>

            <span>
              {item.progress}% · {item.status}
            </span>
          </>
        ))}
      </ul>
      <button disabled={!hasPending} onClick={onUpload}>
        upload
      </button>
    </div>
  );
};
