import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const {
      firstName,
      lastName,
      organization,
      eventDate,
      email,
      phone,
      message,
    } = await request.json();

    const { data, error } = await resend.emails.send({
      from: `Scoil Rince Celtus Belgium website <${process.env.RESEND_FROM_EMAIL}>`,
      replyTo: email,
      to: [process.env.RESEND_TO_EMAIL!],
      subject: "Nieuwe boeking " + organization,
      template: {
        id: "0f002779-ffdc-4746-abb5-5243599dda4e",
        variables: {
          firstName,
          lastName,
          organization,
          eventDate,
          email,
          phone,
          message,
        },
      },
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
