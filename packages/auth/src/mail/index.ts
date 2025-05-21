import { Resend } from "resend";

const mail = new Resend(process.env.RESEND_API_KEY);
export default mail;
