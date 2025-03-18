function sendInquiry(articleWithColorNumber: string): void {
  // Hier musst du die E-Mail-Adresse und den Inhalt der Anfrage definieren
  const recipientEmail = "deine-email-adresse@example.com";
  const subject = "Unverbindliche Anfrage für Produkt";
  const body = `Hallo, ich möchte gerne unverbindlich das Produkt ${articleWithColorNumber} anfragen.`;

  // Hier kannst du die Anfrage per E-Mail senden
  window.location.href = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
}

export default sendInquiry;
