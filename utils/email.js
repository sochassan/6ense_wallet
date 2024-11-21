import nodemailer from "nodemailer";

const SHARE_PURCHASE_CONFIRMATION_TEMPLATE = (name, shareValue) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title></title>
</head>
<body>

</body>
</html>
`;

const buyShareEmail = (email, name, tokens) => {
  const mailOptions = {
    from: "",//email
    to: email,
    subject: "Welcome ... message",
    html: SHARE_PURCHASE_CONFIRMATION_TEMPLATE(name, tokens),
  };

  let transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "", //email
      pass: "", //passkeys
    },
  });

  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    }
  });
};

export { buyShareEmail };
