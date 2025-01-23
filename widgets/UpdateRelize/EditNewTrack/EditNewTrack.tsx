import { trackPossibleLanguages } from "@/helpers/allLanguages";
import { allRoles } from "@/helpers/allRoles";
import MyCheckbox from "@/shared/MyCheckbox/MyCheckbox";
import MyFile from "@/shared/MyFile/MyFile";
import MyInput from "@/shared/MyInput/MyInput";
import MySelect from "@/shared/MySelect/MySelect";
import MyText from "@/shared/MyText/MyText";
import MyTitle from "@/shared/MyTitle/MyTitle";
import classNames from "classnames";
import style from "../../ReleaseDraft/TrackDraft/TrackItem.module.css";

export default function EditNewTrack() {
  return (
    <div className="wrap">
      <form action="#">
        {/* Track */}
        <div>
          <MyTitle className={style.mt10} Tag={"h3"}>
            Загрузить трек
          </MyTitle>
          <MyText className={classNames(style.subText, style.mb10)}>
            Форматы: jpeg и png Минимальный размер изображения: 3000x3000px{" "}
            <br />
            Максимальный размер изображения: 6000x6000px <br />
            Максимальный размер файла: 30MB
          </MyText>
          <MyFile
          // fileName={
          //   !(ringtone instanceof File)
          //     ? `${trackName}.${ringtone}`
          //     : undefined
          // }
          // files={files}
          // onChange={(e) =>
          //   setValue(
          //     `tracks.${trackIndex}.ringtone`,
          //     Array.from(e.target.files ?? []).at(0)
          //   )
          // }
          />
        </div>
        {/* --- Track --- */}
        {/* Genetal Info */}
        <div>
          <div className={style.desc}>
            <MyTitle Tag={"h3"}>Основная информация</MyTitle>
            <MyText className={style.subText}>
              Укажите название трека, для грамотного отображения на различных
              площадках
            </MyText>
          </div>
          <div className={style.row}>
            <MyInput
              label={"Название трека * "}
              inpLk
              placeholder="Введите название трека"
              tooltip={{
                id: `trackName`,
                text: "Наименование на языках, использующих кириллицу, не должны быть представлены на транслите, если вы планируете отгрузку в Apple Music",
              }}
              type={"text"}
            />
            <MyInput
              label={"Подзаголовок"}
              inpLk
              tooltip={{
                id: `trackSubName`,
                text: "Дополнительное название, например: Deluxe Edition, Remix, Acoustic Version. Если дополнительного названия нет, оставьте поле пустым",
              }}
              placeholder="Введите подзаголовок"
              type={"text"}
            />
          </div>
        </div>
        {/* --- End General Info --- */}
        {/* TrackIdentification */}
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
              label={"ISRC"}
              inpLk
              placeholder="Введите ISRC"
              tooltip={{
                id: `trackName`,
                text: "Международный уникальный код. Его наличие упрощает управление правами, когда видео используется в разных форматах, каналах распространения или продуктах. Если у вас нет этого кода, мы присвоим его самостоятельно",
              }}
              type={"text"}
            />
            <MyInput
              label={"Код партнера"}
              inpLk
              tooltip={{
                id: `trackSubName`,
                text: "Ваш собственный код релиза. Укажите его для получения в финансовых отчетах",
              }}
              placeholder="Введите код партнера"
              type={"text"}
            />
          </div>
        </div>
        {/* --- TrackIdentification --- */}
        {/* TrackRoles */}
        <div className={style.infoItem}>
          <div className={style.desc}>
            <MyTitle Tag={"h3"}>Персоны и роли</MyTitle>
            <MyText className={style.subText}>
              Для Авторов музыки и Авторов слов и Исполнителей необходимо
              указать фактические имена и фамилии, не указывайте псевдонимы
              артистов, групп или проектов.
            </MyText>
            <MyText className={style.subText}>
              <span className="warning">
                Обязательно указать исполнителя, автора музыки и автора текста
              </span>
            </MyText>
          </div>
          {/* {roles.map((role: any, roleIndex) => ( */}
          <div className={"row mb10"}>
            <MyInput
              label={`Персона {1}`}
              placeholder="ФИО персоны"
              inpLk
              type={"text"}
              className="mb0"
            />
            <div className={"w30"}>
              <MySelect
                className={classNames(style.select, "mb0")}
                label={"Выберите роль"}
                options={allRoles}
                // value={allRoles.find((r) => r.value === role.role)}
                // onValueChange={({ value }) => {
                //   // handleChangeRole(roleIndex, { role: value });
                //   setValue(
                //     `tracks.${trackIndex}.roles.${roleIndex}.role`,
                //     value
                //   );
                // }}
              />
            </div>
            <div
              className={style.delete}
              // onClick={() => removeRole(roleIndex)}
            >
              <div className={style.line1}></div>
              <div className={style.line2}></div>
            </div>
          </div>
          {/* ))} */}
          <div
            className={style.btn}
            onClick={() => {
              // handleTrackChange({
              //   roles: [...track.roles, { person: "", role: "" }],
              // });
              // appendRole({ person: "", role: "" });
            }}
          >
            Добавить персону
          </div>
        </div>
        {/* --- TrackRoles --- */}
        {/* TrackRights */}
        <div className={style.infoItem}>
          <div className={style.desc}>
            <MyTitle Tag={"h3"}>Права *</MyTitle>
            <MyText className={style.subText}>
              Укажите долю, если авторов несколько, укажите сумму долей
            </MyText>
            <MyText className={style.subText}>
              Авторское вознаграждение выплачивается в соответствии с указанной
              долей и условиям договора. 
            </MyText>
          </div>
          <div className={style.row}>
            <MyInput
              // {...rightsRegister}
              // ref={rightsRef}
              label={"Авторские права"}
              inpLk
              tooltip={{
                id: `avtorPrava`,
                text: "Укажите долю. Если авторов несколько укажите сумму долей",
              }}
              type="text"
            />
            <MyInput
              label={"Смежные права"}
              value={100.0}
              inpLk
              tooltip={{
                id: `avtorPrava`,
                text: "Релиз может быть доставлен на площадки только при наличии 100%",
              }}
              type={"text"}
            />
          </div>
        </div>
        {/* --- TrackRights --- */}
        {/* TrackAdditionalParameters */}
        <div className={style.infoItem}>
          <div className={style.desc}>
            <MyTitle Tag={"h3"}>Дополнительные параметры</MyTitle>
            <MyText className={style.subText}>
              Укажите дополнительные параметры для трека
            </MyText>
          </div>

          <MyInput
            // {...previewRegister}
            // ref={previewRef}
            label={"Начало предпрослушивания (секунды)"}
            inpLk
            tooltip={{
              id: `startProsl`,
              text: "С выбранной секунды начинается воспроизведение фрагмента: который будет использован на сервисе VK Клипы, в качестве сниппета на VK музыка, проигрываться до покупки на ITunes, использоваться как сниппет на Apple Music и использоваться как официальный звук на TikTik, Likee",
            }}
            placeholder="20:00"
            type={"text"}
          />
          <MyCheckbox
            className={style.check}
            // name={`InstantGratification-${trackIndex}`}
            label={"Instant Gratification"}
            tooltip={{
              id: "InstantGratification",
              text: "Дата, когда открывается возможность прослушать часть треков с альбома (до 50%). Указанная дата должна быть позже даты предзаказа, но не ранее даты старта на площадках. Поддерживают площадки: iTunes, Apple Music, Яндекс Музыка и YouTube Music",
            }}
            // checked={showInstantGratification}
            // onChange={() => {
            //   if (showInstantGratification) {
            //     setValue(
            //       `tracks.${trackIndex}.instant_gratification`,
            //       undefined
            //     );
            //   }
            //   setShowInstantGratification(!showInstantGratification);
            // }}
          />
          {/* {showInstantGratification && (
            <Controller
              control={control}
              // name={`tracks.${trackIndex}.instant_gratification`}
              render={({ field: { value, onChange, ...otherFieldDAta } }) => (
                <MyInput
                  {...otherFieldDAta}
                  value={!!value ? inputDateFormat(value) : undefined}
                  onChange={(e) => onChange(new Date(e.target.value))}
                  className={style.mt30}
                  label={"Выберите дату"}
                  inpLk
                  type={"date"}
                />
              )}
            />
          )} */}
          <MyCheckbox
            // {...register(`tracks.${trackIndex}.focus`)}
            label={"Focus track"}
            tooltip={{
              id: "Focus track",
              text: "Простой способ выделить лучшее из лучшего. Отметьте трек, к которому хотите привлечь внимание слушателя. Поддерживает только VK Музыка",
            }}
          />
        </div>
        {/* --- TrackAdditionalParameters --- */}
        {/* TrackVersion */}
        <div className={style.infoItem}>
          <div className={classNames(style.desc, style.mt30, style.mb20)}>
            <MyTitle Tag={"h3"}>Версия трека</MyTitle>
            <MyText className={style.subText}>
              Укажите версию трека, данный параметр участвует в системах
              рекомендаций площадок
            </MyText>
            <MyText className={style.subText}>
              Также редакции обращают внимание на версию, чтобы разместить трек
              в подходящий тематический плейлист
            </MyText>
          </div>
          <MyCheckbox
            // {...register(`tracks.${trackIndex}.explicit`)}
            label={"Explicit Content"}
            name={`Explicit-Content`}
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
            // {...register(`tracks.${trackIndex}.live`)}
            label={"Live"}
            name={`Live`}
            // checked={!!track.live}
            // onChange={() => handleTrackChange({ live: !!!track.live })}
            tooltip={{
              id: "Live",
              text: "Запись живого выступления, если в названии трека вы уже указали Live, можете не выбирать этот параметр",
            }}
          />
          <MyCheckbox
            // {...register(`tracks.${trackIndex}.cover`)}
            label={"Cover"}
            name={`Cover`}
            // checked={!!track.cover}
            // onChange={() => handleTrackChange({ cover: !!!track.cover })}
            tooltip={{
              id: "Cover",
              text: "Версия трека, исполненная другим артистом",
            }}
          />
          <MyCheckbox
            // {...register(`tracks.${trackIndex}.remix`)}
            label={"Remix"}
            name={`Remix`}
            // checked={!!track.remix}
            // onChange={() => handleTrackChange({ remix: !!!track.remix })}
            tooltip={{
              id: "Remix",
              text: "Альтернативная версия выпущенного ранее трека",
            }}
          />
          <MyCheckbox
            // {...register(`tracks.${trackIndex}.instrumental`)}
            label={"Instrumental"}
            name={`Instrumental`}
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
        {/* --- TrackVersion --- */}
        {/* TrackUseCases */}
        <div className={style.infoItem}>
          <div className={style.desc}>
            <MyTitle className={style.mt10} Tag={"h3"}>
              Язык трека *
            </MyTitle>
            <MyText className={classNames(style.subText, style.mb10)}>
              Укажите язык, на котором исполняется трек, если трек без вокальной
              партии в списке выберите «Без слов»
            </MyText>
            <MySelect
              label={"Язык трека"}
              // value={language}
              // onValueChange={(newLang) => {
              //   setValue(`tracks.${trackIndex}.language`, newLang.value);
              //   setLanguage(newLang);
              // }}
              options={trackPossibleLanguages}
            />
          </div>
        </div>
        {/* --- TrackUseCases --- */}
        {/* RingTone */}
        <div>
          <MyTitle className={style.mt10} Tag={"h4"}>
            Добавление рингтона
          </MyTitle>
          <MyText className={classNames(style.subText, style.mb10)}>
            Формат: .wav, .flac. <br />
            Длина: от 5 до 29.99 сек.
          </MyText>
          <MyFile
          // fileName={
          //   !(ringtone instanceof File)
          //     ? `${trackName}.${ringtone}`
          //     : undefined
          // }
          // files={files}
          // onChange={(e) =>
          //   setValue(
          //     `tracks.${trackIndex}.ringtone`,
          //     Array.from(e.target.files ?? []).at(0)
          //   )
          // }
          />
        </div>
        {/* --- RingTone --- */}
      </form>
    </div>
  );
}
