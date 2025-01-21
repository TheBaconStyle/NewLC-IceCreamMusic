"use client";

import { standardLabelName } from "@/helpers/priceList";
import { releaseFormSchema, TReleaseForm } from "@/schema/release.schema";
import MyButton from "@/shared/MyButton/MyButton";
import { zodResolver } from "@hookform/resolvers/zod";
import classNames from "classnames";
import { motion } from "framer-motion";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ReleaseArea } from "../ReleaseDraft/ReleaseArea";
import { ReleaseDates } from "../ReleaseDraft/ReleaseDates";
import { ReleaseGeneralInfo } from "../ReleaseDraft/ReleaseGeneralInfo";
import { ReleaseGenre } from "../ReleaseDraft/ReleaseGenre";
import { ReleaseIdentification } from "../ReleaseDraft/ReleaseIdentification";
import { ReleaseModeratorComment } from "../ReleaseDraft/ReleaseModeratorComment";
import { ReleasePersons } from "../ReleaseDraft/ReleasePersons";
import { ReleasePlatforms } from "../ReleaseDraft/ReleasePlatform";
import { ReleaseTracks } from "../ReleaseDraft/ReleaseTracks";
import { ReleaseLabel } from "../ReleaseDraft/RleaseLabel";

import FinalCheck from "../SendRelize/FinalCheck/FinalCheck";
import style from "./UpdateRelize.module.css";

export type TUpdateRelease = {
  release?: TReleaseForm;
};

const UpdateRelize = ({ release }: TUpdateRelease) => {
  const formMethods = useForm<TReleaseForm>({
    resolver: zodResolver(releaseFormSchema),
    defaultValues: { labelName: standardLabelName, tracks: [], ...release },
    progressive: true,
    mode: "all",
  });

  const { handleSubmit, watch } = formMethods;

  const releaseData = watch();

  const [isBlocked, setIsBlocked] = useState(false);

  const [tab, setTab] = useState(1);

  return (
    <div className={style["container"]}>
      <div className={style.lineTab}>
        <p
          onClick={() => setTab(1)}
          className={classNames(style.tab, { [style.tabActive]: tab == 1 })}
        >
          1
        </p>
        <p
          onClick={() => setTab(2)}
          className={classNames(style.tab, { [style.tabActive]: tab == 2 })}
        >
          2
        </p>
        <p
          onClick={() => setTab(3)}
          className={classNames(style.tab, { [style.tabActive]: tab == 3 })}
        >
          3
        </p>
      </div>
      <FormProvider {...formMethods}>
        <form className={style.form}>
          <>
            {tab == 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                key={1}
              >
                <div className="col gap30">
                  <ReleaseGeneralInfo />
                  <ReleasePersons />
                  <ReleaseGenre />
                  <ReleaseIdentification />
                  <ReleaseDates />
                  <ReleaseArea />
                  <ReleasePlatforms />
                </div>
              </motion.div>
            )}
            {tab == 2 && (
              <motion.div
                key={2}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <ReleaseTracks />
              </motion.div>
            )}

            {tab == 3 && (
              <motion.div
                key={3}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <FinalCheck release={releaseData} />

                <ReleaseModeratorComment />

                <div className={style.wrap}>
                  <MyButton
                    text="Отправить релиз"
                    view="secondary"
                    type="submit"
                    disabled={isBlocked}
                  />
                </div>
              </motion.div>
            )}
          </>
        </form>
      </FormProvider>
      {/* <pre>{JSON.stringify(releaseData, null, 4)}</pre> */}
      <div className="center gap20">
        {tab != 1 && (
          <p onClick={() => setTab(tab - 1)} className="linkButton">
            Назад
          </p>
        )}
        {tab != 3 && (
          <p onClick={() => setTab(tab + 1)} className="linkButton">
            Дальше
          </p>
        )}
      </div>
    </div>
  );
};
export default UpdateRelize;
