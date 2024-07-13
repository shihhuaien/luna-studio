import {
    Body,
    Button,
    Container,
    Head,
    Hr,
    Html,
    Img,
    Preview,
    Section,
    Text,
} from "@react-email/components";
import * as React from "react";


const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";


export const EmailTemplate = ({ result }) => (
    <Html>
        <Head />
        <Preview>
            The sales intelligence platform that helps you uncover qualified leads.
        </Preview>
        <Body style={main}>
            <Container style={container}>
                <Img
                    src={'https://i.imgur.com/V6MIPNH.png'}
                    width="170"
                    height="50"
                    alt="Koala"
                    style={logo}
                />
                <Text style={paragraph}>Hi 今天過得好嗎！</Text>
                <Text style={paragraph}>
                    感謝妳的預約和支持♫好期待為妳接出美麗睫毛呀♫
                    為維護服務品質，請在兩日內完成訂金匯款，匯款完成請於下方按鈕進入官方LINE提供匯款帳號後五碼。
                </Text>
                <Text style={paragraph}>
                    訂金可折抵當日消費
                </Text>
                <Text style={paragraph}>
                    匯款資訊:
                </Text>
                <Text style={paragraph}>
                    台新銀行[812] 28881005563386
                </Text>
                <Text style={paragraph}>
                    玉山銀行[808] 0026971135116
                </Text>
                <Text style={paragraph}>
                    訂金金額: NT$300
                </Text>
                <Text style={paragraph}>
                    *取消預約或改期請在服務日前三天透過官方LINE通知，三天前通知取消可全額退訂，逾期將沒收訂金且不可改期。
                </Text>
                <Section style={btnContainer}>
                    <Button style={buttonGreen} href="https://lin.ee/s7dBTpi">
                        我已匯款完成 回傳後五碼以完成預約
                    </Button>
                </Section>
                <Text style={paragraph}>
                </Text>
                <Section style={btnContainer}>
                    <Button style={buttonBlue} href="https://luna-studio.vercel.app/">
                        官網查詢預約紀錄
                    </Button>
                </Section>

                <Text style={paragraph}>
                    Best,
                    <br />
                    您的美睫師LUNA
                </Text>
                <Hr style={hr} />
                <Text style={footer}>
                    即時客服、諮詢或修改預約請加入官方LINE"@086iowrg”或email 至helen10222@gmail.com
                </Text>
            </Container>
        </Body>
    </Html>
);

export default EmailTemplate;

const main = {
    backgroundColor: "#ffffff",
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
    margin: "0 auto",
    padding: "20px 0 48px",
};

const logo = {
    margin: "0 auto",
};

const paragraph = {
    fontSize: "16px",
    lineHeight: "26px",
};

const btnContainer = {
    textAlign: "center",
};

const buttonBlue = {
    backgroundColor: "#5F51E8",
    borderRadius: "20px",
    color: "#fff",
    fontSize: "16px",
    textDecoration: "none",
    textAlign: "center",
    display: "block",
    padding: "12px",
};

const hr = {
    borderColor: "#cccccc",
    margin: "20px 0",
};

const footer = {
    color: "#8898aa",
    fontSize: "12px",
};

const buttonGreen = {
    backgroundColor: '#4CAF50', // 綠色
    borderRadius: "20px",
    color: "#fff",
    fontSize: "16px",
    textDecoration: "none",
    textAlign: "center",
    display: "block",
    padding: "12px",
};