export function confirmAccountTemplate(email: string, verificationUrl: string) {
  const html = `<p>Dear ${email},</p>
    <p>Welcome to <b>E-Web Movies</b>!</p>
    <p>To confirm your account please 
        <a href="${verificationUrl}">click here</a>.
    </p>
    <p>Alternatively, you can paste the following link in your browser's address bar:</p>
    <p>${verificationUrl}</p>
    <p>Sincerely,</p>
    <p>E-Web Movies Dev-Team</p>
    <p><small>Note: replies to this email address are not monitored.</small></p>`;

  return {
    html: html,
  };
}
