import { Head, Html, Img, Section, Text } from "@react-email/components";

export default function RelizesReject({
  nameRelize,
  commentModerator,
}: {
  nameRelize: string;
  commentModerator: string;
}) {
  return (
    <Html>
      <Head>
        <title>Отказ в отгрузке релиза</title>
      </Head>
      <Section
        style={{
          backgroundColor: "#121316",
          borderRadius: "5px",
          padding: "20px",
          width: "500px",
        }}
      >
        <Img
          src="https://www.icecreammusic.net/assets/logo.png"
          width="120"
          height="120"
          style={{ margin: " 20px auto 0 auto" }}
        />
        <Text
          style={{
            color: "#FFFFFF",
            fontFamily: "fantasy",
            letterSpacing: "5px",
            textAlign: "center",
          }}
        >
          ICECREAMMUSIC
        </Text>
        <Text
          style={{
            color: "#FFFFFF",
            fontFamily: "monospace",
            letterSpacing: "1px",
            textAlign: "justify",
            padding: "0 20px",
          }}
        >
          К сожалению, релиз &quot;{nameRelize}&quot; не прошел модерацию.
        </Text>
        <Text
          style={{
            color: "#FFFFFF",
            fontFamily: "monospace",
            letterSpacing: "1px",
            textAlign: "justify",
            padding: "0 20px",
            marginTop: "20px",
          }}
        >
          Комментарий от модератора: &quot;{commentModerator}&quot;
        </Text>
      </Section>
    </Html>
  );
}
