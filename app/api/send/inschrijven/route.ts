import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const {
      firstName,
      lastName,
      birthdate,
      email,
      phone,
      experience,
      message,
    } = await request.json();

    const { data, error } = await resend.emails.send({
      from: `Scoil Rince Celtus Belgium website <${process.env.RESEND_FROM_EMAIL}>`,
      replyTo: email,
      to: [process.env.RESEND_TO_EMAIL!],
      subject: "Nieuwe inschrijving " + firstName + " " + lastName,
      template: {
        id: "4175ec1f-ecef-44c1-8e25-e34c3d306892",
        variables: {
          firstName,
          lastName,
          birthdate,
          email,
          phone,
          experience,
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
