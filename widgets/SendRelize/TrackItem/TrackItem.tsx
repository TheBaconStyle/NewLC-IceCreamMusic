"use client";

// TODO ОГРОМНЫЙ ТЕХ. ДОЛГ НЕОБХОДИЫМЫ ПРАВКИ КАК МОЖНО СКОРЕЕ

import { allLanguages } from "@/helpers/allLanguages";
import { allRoles } from "@/helpers/allRoles";
import { TReleaseForm } from "@/schema/release.schema";
import MyCheckbox from "@/shared/MyCheckbox/MyCheckbox";
import MyFile from "@/shared/MyFile/MyFile";
import MyInput from "@/shared/MyInput/MyInput";
import MySelect from "@/shared/MySelect/MySelect";
import IMySelectProps from "@/shared/MySelect/MySelect.props";
import MyText from "@/shared/MyText/MyText";
import MyTextArea from "@/shared/MyTextArea/MyTextArea";
import MyTitle from "@/shared/MyTitle/MyTitle";
import classNames from "classnames";
import { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import style from "./TrackItem.module.css";
import ITrackItem from "./TrackItem.props";

export function TrackItem({ fileName, trackIndex }: ITrackItem) {
  const { register, control } = useFormContext();
  const {
    fields: roles,
    append: appendRole,
    remove: removeRole,
  } = useFieldArray({
    name: `tracks.${trackIndex}.roles`,
    control,
  });
  const [detail, setDetail] = useState(false);
  const [language, setLanguage] = useState<IMySelectProps["value"]>();
  const [addVideo, setAddVideo] = useState(false);
  const [addVideoShot, setAddVideoShot] = useState(false);
  const [addTextSync, setAddTextSync] = useState(false);
  const [addText, setAddText] = useState(false);

  const [showInstantGratification, setShowInstantGratification] =
    useState<boolean>(false);

  const { setValue, watch } = useFormContext<TReleaseForm>();

  // const handleDeleteRole = (idx: number) => {
  //   handleTrackChange({ roles: track.roles.filter((_, i) => i !== idx) });
  // };

  const track = watch(`tracks.${trackIndex}.track`);

  // const handleChangeRole = (
  //   idx: number,
  //   newValue: Partial<{ person: string; role: string }>
  // ) => {
  //   handleTrackChange({
  //     roles: [
  //       ...track.roles.slice(0, idx),
  //       {
  //         ...(track.roles.at(idx) as { person: string; role: string }),
  //         ...newValue,
  //       },
  //       ...track.roles.slice(idx + 1),
  //     ],
  //   });
  // };

  // const handleTrackChange = (
  //   partialTrack: Partial<TReleaseForm["tracks"][number]>
  // ) => {
  //   const oldTracks = Array.from(getValues("tracks"));

  //   const newTrack: TReleaseForm["tracks"][number] = {
  //     ...track,
  //     ...partialTrack,
  //   };

  //   setValue(`tracks.${trackIndex}`, [
  //     ...oldTracks.slice(0, trackIndex),
  //     newTrack,
  //     ...oldTracks.slice(trackIndex + 1),
  //   ]);
  // };

  return (
    <div className={style.wrap}>
      <div className={style.header} onClick={() => setDetail(!detail)}>
        <div
          className={classNames(style.arrow, { [style.arrow_open]: detail })}
        ></div>
        {track.name}
      </div>

      <div className={classNames(style.detail, { [style.open]: detail })}>
        <>
          <div className={style.infoItem}>
            <div className={style.desc}>
              <MyTitle Tag={"h3"}>Основная информация</MyTitle>
              <MyText className={style.subText}>
                Укажите название трека, для грамотного отображения на различных
                площадках
              </MyText>
            </div>
            <div className={style.row}>
              <MyInput
                {...register(`tracks.${trackIndex}.title`)}
                label={"Название трека * "}
                inpLk
                placeholder="Введите название трека"
                tooltip={{
                  id: `trackName-${fileName}`,
                  text: "Наименование на языках, использующих кириллицу, не должны быть представлены на транслите, если вы планируете отгрузку в Apple Music",
                }}
                type={"text"}
              />
              <MyInput
                {...register(`tracks.${trackIndex}.subtitle`)}
                label={"Подзаголовок"}
                inpLk
                tooltip={{
                  id: `trackSubName-${fileName}`,
                  text: "Дополнительное название, например: Deluxe Edition, Remix, Acoustic Version. Если дополнительного названия нет, оставьте поле пустым",
                }}
                placeholder="Введите подзаголовок"
                type={"text"}
              />
            </div>
          </div>
        </>
        <>
          <div className={style.infoItem}>
            <div className={style.desc}>
              <MyTitle Tag={"h3"}>Идентификация</MyTitle>
              <MyText className={style.subText}>
                Укажите код, он необходим для точности в идентификации релиза на
                площадках и отчетности, если у вас нет ISRC, код будет
                сгенерирован автоматически
              </MyText>
            </div>
            <div className={style.row}>
              <MyInput
                {...register(`tracks.${trackIndex}.isrc`)}
                label={"ISRC"}
                inpLk
                placeholder="Введите ISRC"
                tooltip={{
                  id: `trackName-${fileName}`,
                  text: "Международный уникальный код. Его наличие упрощает управление правами, когда видео используется в разных форматах, каналах распространения или продуктах. Если у вас нет этого кода, мы присвоим его самостоятельно",
                }}
                type={"text"}
              />
              <MyInput
                {...register(`tracks.${trackIndex}.partner_code`)}
                label={"Код партнера"}
                inpLk
                tooltip={{
                  id: `trackSubName-${fileName}`,
                  text: "Ваш собственный код релиза. Укажите его для получения в финансовых отчетах",
                }}
                placeholder="Введите код партнера"
                type={"text"}
              />
            </div>
          </div>
        </>
        <>
          <div className={style.infoItem}>
            <div className={style.desc}>
              <MyTitle Tag={"h3"}>Персоны и роли</MyTitle>
              <MyText className={style.subText}>
                Для Авторов музыки и Авторов слов и Исполнителей необходимо
                указать фактические имена и фамилии, не указывайте псевдонимы
                артистов, групп или проектов.
              </MyText>
              <MyText className={style.subText}>
                <span style={{ color: "#fb4444" }}>
                  Обязательно указать исполнителя, автора музыки и автора текста
                </span>
              </MyText>
            </div>
            {roles.map((role: any, roleIndex) => (
              <div key={role.id} className={style.row}>
                <MyInput
                  {...register(
                    `tracks.${trackIndex}.roles.${roleIndex}.person`
                  )}
                  label={`Имя персоны`}
                  placeholder="Введите имя персоны"
                  inpLk
                  type={"text"}
                />
                <div className={style.w30}>
                  <MySelect
                    className={style.select}
                    label={"Выберите роль"}
                    options={allRoles}
                    value={allRoles.find((r) => r.value === role.role)}
                    onValueChange={({ value }) => {
                      // handleChangeRole(roleIndex, { role: value });
                      setValue(
                        `tracks.${trackIndex}.roles.${roleIndex}.role`,
                        value
                      );
                    }}
                  />
                </div>
                <div
                  className={style.delete}
                  onClick={() => removeRole(roleIndex)}
                >
                  <div className={style.line1}></div>
                  <div className={style.line2}></div>
                </div>
              </div>
            ))}
            <div
              className={style.btn}
              onClick={() => {
                // handleTrackChange({
                //   roles: [...track.roles, { person: "", role: "" }],
                // });
                appendRole({ person: "", role: "" });
              }}
            >
              Добавить персону
            </div>
          </div>
        </>
        <>
          <div className={style.infoItem}>
            <div className={style.desc}>
              <MyTitle Tag={"h3"}>Права *</MyTitle>
              <MyText className={style.subText}>
                Укажите долю, если авторов несколько, укажите сумму долей
              </MyText>
              <MyText className={style.subText}>
                Авторское вознаграждение выплачивается в соответствии с
                указанной долей и условиям договора. 
              </MyText>
            </div>
            <div className={style.row}>
              <MyInput
                {...register(`tracks.${trackIndex}.author_rights`)}
                label={"Авторские права"}
                inpLk
                tooltip={{
                  id: `avtorPrava-${fileName}`,
                  text: "Укажите долю. Если авторов несколько укажите сумму долей",
                }}
                type="number"
                min={1}
                max={100}
                // value={track.author_rights}
                // onChange={(e) =>
                //   handleTrackChange({ author_rights: e.target.value })
                // }
              />
              <MyInput
                label={"Смежные права"}
                value={100.0}
                inpLk
                tooltip={{
                  id: `avtorPrava-${fileName}`,
                  text: "Релиз может быть доставлен на площадки только при наличии 100%",
                }}
                type={"text"}
              />
            </div>
          </div>
        </>
        <>
          <div className={style.infoItem}>
            <div className={style.desc}>
              <MyTitle Tag={"h3"}>Дополнительные параметры</MyTitle>
              <MyText className={style.subText}>
                Укажите дополнительные параметры для трека
              </MyText>
            </div>

            <MyInput
              {...register(`tracks.${trackIndex}.preview_start`)}
              label={"Начало предпрослушивания (секунды)"}
              inpLk
              tooltip={{
                id: `startProsl-${fileName}`,
                text: "С выбранной секунды начинается воспроизведение фрагмента: который будет использован на сервисе VK Клипы, в качестве сниппета на VK музыка, проигрываться до покупки на ITunes, использоваться как сниппет на Apple Music и использоваться как официальный звук на TikTik, Likee",
              }}
              placeholder="20:00"
              type={"text"}
            />
            <MyCheckbox
              className={style.check}
              name={`InstantGratification-${fileName}`}
              label={"Instant Gratification"}
              tooltip={{
                id: "InstantGratification",
                text: "Дата, когда открывается возможность прослушать часть треков с альбома (до 50%). Указанная дата должна быть позже даты предзаказа, но не ранее даты старта на площадках. Поддерживают площадки: iTunes, Apple Music, Яндекс Музыка и YouTube Music",
              }}
              checked={showInstantGratification}
              onChange={() => {
                if (showInstantGratification) {
                  // handleTrackChange({ instant_gratification: undefined });
                  setValue(
                    `tracks.${trackIndex}.instant_gratification`,
                    undefined
                  );
                }
                setShowInstantGratification(!showInstantGratification);
              }}
            />
            {showInstantGratification && (
              <MyInput
                {...register(`tracks.${trackIndex}.instant_gratification`)}
                className={style.mt30}
                label={"Выберите дату"}
                inpLk
                type={"date"}
              />
            )}
            <MyCheckbox
              {...register(`tracks.${trackIndex}.focus`)}
              name={`Focus-track-${fileName}`}
              label={"Focus track"}
              // checked={!!track.focus}
              // onChange={() => {
              //   handleTrackChange({ focus: !!!track.focus });
              // }}
              tooltip={{
                id: "Focus track",
                text: "Простой способ выделить лучшее из лучшего. Отметьте трек, к которому хотите привлечь внимание слушателя. Поддерживает только VK Музыка",
              }}
            />
          </div>
        </>
        <>
          <div className={style.infoItem}>
            <div className={classNames(style.desc, style.mt30, style.mb20)}>
              <MyTitle Tag={"h3"}>Версия трека</MyTitle>
              <MyText className={style.subText}>
                Укажите версию трека, данный параметр участвует в системах
                рекомендаций площадок
              </MyText>
              <MyText className={style.subText}>
                Также редакции обращают внимание на версию, чтобы разместить
                трек в подходящий тематический плейлист
              </MyText>
            </div>
            <MyCheckbox
              {...register(`tracks.${trackIndex}.explicit`)}
              label={"Explicit Content"}
              name={`Explicit-Content-${fileName}`}
              // checked={!!track.explicit}
              // onChange={() =>
              //   handleTrackChange({ explicit: !!!track.explicit })
              // }
              tooltip={{
                id: "Explicit Content",
                text: "Версия трека, содержащая ненормативную и потенциально оскорбительную лексику",
              }}
            />
            <MyCheckbox
              {...register(`tracks.${trackIndex}.live`)}
              label={"Live"}
              name={`Live-${fileName}`}
              // checked={!!track.live}
              // onChange={() => handleTrackChange({ live: !!!track.live })}
              tooltip={{
                id: "Live",
                text: "Запись живого выступления, если в названии трека вы уже указали Live, можете не выбирать этот параметр",
              }}
            />
            <MyCheckbox
              {...register(`tracks.${trackIndex}.cover`)}
              label={"Cover"}
              name={`Cover-${fileName}`}
              // checked={!!track.cover}
              // onChange={() => handleTrackChange({ cover: !!!track.cover })}
              tooltip={{
                id: "Cover",
                text: "Версия трека, исполненная другим артистом",
              }}
            />
            <MyCheckbox
              {...register(`tracks.${trackIndex}.remix`)}
              label={"Remix"}
              name={`Remix-${fileName}`}
              // checked={!!track.remix}
              // onChange={() => handleTrackChange({ remix: !!!track.remix })}
              tooltip={{
                id: "Remix",
                text: "Альтернативная версия выпущенного ранее трека",
              }}
            />
            <MyCheckbox
              {...register(`tracks.${trackIndex}.instrumental`)}
              label={"Instrumental"}
              name={`Instrumental-${fileName}`}
              // checked={!!track.instrumental}
              // onChange={() =>
              //   handleTrackChange({ instrumental: !!!track.instrumental })
              // }
              tooltip={{
                id: "Instrumental",
                text: "Версия трека без вокальной партии",
              }}
            />
          </div>
        </>
        <div className={style.infoItem}>
          <div className={classNames(style.desc, style.mt30)}>
            <MyTitle Tag={"h3"}>Виды использования</MyTitle>
            <MyText className={style.subText}>
              Укажите дополнительные виды использования для трека
            </MyText>
            <MyTitle className={style.mt10} Tag={"h4"}>
              Язык трека *
            </MyTitle>
            <MyText className={classNames(style.subText, style.mb10)}>
              Укажите язык, на котором исполняется трек, если трек без вокальной
              партии в списке выберите «Без слов»
            </MyText>
            <MySelect
              label={"Язык трека"}
              value={language}
              onValueChange={(newLang) => {
                // handleTrackChange({ language: newLang.value });
                setValue(`tracks.${trackIndex}.language`, newLang.value);
                setLanguage(newLang);
              }}
              options={[
                { value: "Без слов", label: "Без слов" },
                ...allLanguages,
              ]}
            />

            <>
              <MyCheckbox
                label="Добавить текст трека"
                checked={addText}
                className="w100"
                onChange={() => {
                  if (addText) {
                    // handleTrackChange({ text: null });
                    setValue(`tracks.${trackIndex}.text`, null);
                  }
                  setAddText(!addText);
                }}
                name={`addText-${fileName}`}
              />

              {addText && (
                <>
                  <MyTitle className={style.mt10} Tag={"h4"}>
                    Текст трека
                  </MyTitle>
                  <MyText className={classNames(style.subText, style.mb10)}>
                    Ознакомьтесь с рекомендациями по подготовке и загрузке этого
                    типа контента.
                  </MyText>
                  <MyTextArea
                    {...register(`tracks.${trackIndex}.text`)}
                    label={"Введите текст трека"}
                    // value={String(track.text ?? "")}
                    // onChange={(e) =>
                    //   handleTrackChange({ text: e.target.value })
                    // }
                  />
                </>
              )}
            </>
            <>
              <MyCheckbox
                label="Добавить синхронизацию теста"
                className="w100"
                checked={addTextSync}
                onChange={() => {
                  if (addTextSync) {
                    // handleTrackChange({ text_sync: undefined });
                    setValue(`tracks.${trackIndex}.text_sync`, undefined);
                  }
                  setAddTextSync(!addTextSync);
                }}
                name={`addTextSync-${fileName}`}
              />
              {addTextSync && (
                <>
                  <MyTitle className={style.mt10} Tag={"h4"}>
                    Синхронизированный текст трека
                  </MyTitle>
                  <MyText className={classNames(style.subText, style.mb10)}>
                    Получите дополнительный доход и ещё больше внимания на
                    площадках. Формат: .ttml
                  </MyText>
                  <MyFile
                    onChange={(e) =>
                      // handleTrackChange({
                      //   text_sync: Array.from(e.target.files ?? []).at(0),
                      // })
                      setValue(
                        `tracks.${trackIndex}.text_sync`,
                        Array.from(e.target.files ?? []).at(0)
                      )
                    }
                  />
                </>
              )}
            </>
            <>
              <MyTitle className={style.mt10} Tag={"h4"}>
                Добавление рингтона
              </MyTitle>
              <MyText className={classNames(style.subText, style.mb10)}>
                Формат: .wav, .flac. <br />
                Длина: от 5 до 29.99 сек.
              </MyText>
              <MyFile
                onChange={(e) =>
                  // handleTrackChange({
                  //   ringtone: Array.from(e.target.files ?? []).at(0),
                  // })
                  setValue(
                    `tracks.${trackIndex}.ringtone`,
                    Array.from(e.target.files ?? []).at(0)
                  )
                }
              />
            </>
            <>
              <MyCheckbox
                label="Добавить видео к треку"
                className="w100"
                checked={addVideo}
                onChange={() => {
                  if (addVideo) {
                    // handleTrackChange({ video: undefined });
                    setValue(`tracks.${trackIndex}.video`, undefined);
                  }
                  setAddVideo(!addVideo);
                }}
                name={`addVideo-${fileName}`}
              />
              {addVideo && (
                <>
                  <MyTitle className={style.mt10} Tag={"h4"}>
                    Загрузка видео
                  </MyTitle>
                  <MyText className={classNames(style.subText, style.mb10)}>
                    Формат: .mov, .mp4, .avi
                    <br />
                    Максимальный размер: не более 6 ГБ
                  </MyText>
                  <MyFile
                    onChange={(e) =>
                      // handleTrackChange({
                      //   video: Array.from(e.target.files ?? []).at(0),
                      // })
                      setValue(
                        `tracks.${trackIndex}.video`,
                        Array.from(e.target.files ?? []).at(0)
                      )
                    }
                  />
                </>
              )}
            </>
            <>
              <MyCheckbox
                label="Добавить видео-шот"
                checked={addVideoShot}
                className="w100"
                onChange={() => {
                  console.log("qweqweqwe");
                  if (addVideoShot) {
                    // handleTrackChange({ video_shot: undefined });
                    setValue(`tracks.${trackIndex}.video_shot`, undefined);
                  }
                  setAddVideoShot(!addVideoShot);
                }}
                name={`addVideoShot-${fileName}`}
              />
              {addVideoShot && (
                <>
                  <MyTitle className={style.mt10} Tag={"h4"}>
                    Загрузка видео-шота
                  </MyTitle>
                  <MyText className={classNames(style.subText, style.mb10)}>
                    Формат: .mov, .mp4, .avi
                    <br />
                    Максимальный размер: не более 6 ГБ
                  </MyText>
                  <MyFile
                    onChange={(e) =>
                      // handleTrackChange({
                      //   video_shot: Array.from(e.target.files ?? []).at(0),
                      // })
                      setValue(
                        `tracks.${trackIndex}.video_shot`,
                        Array.from(e.target.files ?? []).at(0)
                      )
                    }
                  />
                </>
              )}
            </>
          </div>
        </div>
      </div>
    </div>
  );
}
