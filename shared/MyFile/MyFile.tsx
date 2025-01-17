"use client";

import { forwardRef, useEffect, useState } from "react";
import style from "./MyFile.module.css";
import { TMyFileProps } from "./MyFile.props";
import classNames from "classnames";

const MyFile = forwardRef<HTMLInputElement, TMyFileProps>(function FileInput(
  { className, onChange, files, ...props },
  ref
) {
  // const [file, setFile] = useState<FileList | null>(null);

  return (
    <label className={style.wrap} id="dropcontainer">
      <div className={style.btn}>Загрузить файл</div>
      <input
        {...props}
        className={classNames(style.input, className)}
        type="file"
        onChange={(e) => {
          onChange && onChange(e);
          // setFile(e.currentTarget.files);
        }}
        ref={ref}
      />
      {!!files && Array.from(files).map((f) => <p key={f.name}>{f.name}</p>)}
    </label>
  );
});
export default MyFile;
