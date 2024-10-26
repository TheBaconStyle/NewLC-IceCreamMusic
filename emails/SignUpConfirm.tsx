import { Button, Html, Img, Section, Text } from "@react-email/components";

export type TSignUpConfirm = {
  link: string;
};

export default function SignUpConfirm({ link }: TSignUpConfirm) {
  return (
    <Html>
      <Section
        style={{
          backgroundColor: "rgb(18 19 22)",
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
            textAlign: "center",
          }}
        >
          Чтобы подтвердить свою учетную запись и завершить регистрацию, нажмите
          на кнопку ниже:
        </Text>
        <Button
          style={{
            color: "#FFFFFF",
            fontFamily: "monospace",
            letterSpacing: "1px",
            padding: "5px 10px",
            borderRadius: "3px",
            display: "flex",
            width: "fit-content",
            margin: "30px auto 30px auto",
            backgroundColor: "rgb(84 81 255)",
            border: "1px solid rgb(84 81 255)",
            cursor: "pointer",
          }}
          href={link}
        >
          Подтвердить регистрацию
        </Button>
      </Section>
    </Html>
  );
}

export { SignUpConfirm };
