function sendInquiry(articleWithColorNumber: string): void {
  // Here you need to define the email address and the content of the inquiry
  const recipientEmail = "deine-email-adresse@example.com";
  const subject = "Unverbindliche Anfrage für Produkt";
  const body = `Hallo, ich möchte gerne unverbindlich das Produkt ${articleWithColorNumber} anfragen.`;

  // Open the user's default email client with a pre-filled email
  window.location.href = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
}

export default sendInquiry;
