function findMissingFields(data: Record<string, any>, requiredFields: string[]): string[] {
  const missingFields = [];

  for (const field of requiredFields) {
    if (!data[field] && data[field] !== '') {
      missingFields.push(field);
    }
  }

  return missingFields;
}

export { findMissingFields }