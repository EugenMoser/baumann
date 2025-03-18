function addThousendSeperator(value: string | number | null) {
  if (!value) return null;
  return Number(value).toLocaleString("de-DE");
}

export default addThousendSeperator;
