const validateField = async (field, value, schema, context) => {
  const schemaField = schema[field];

  if (!schemaField) {
    throw new Error(`Field "${field}" is not defined in the schema.`);
  }

  const { required, message, validate } = schemaField;

  if (required && !value) return message;

  if (validate.custom) {
    const validationResponse = await validate.custom(value, context);
    if (validationResponse) {
      return validationResponse.message;
    }
  };

  if (validate.regex && !validate.regex.test(value)) return validate.message;

  return null;
};

const validationMessage = async (data, schema, context) => {
  const errors = {};
  await Promise.allSettled(
    Object.keys(schema).map(async (field) => {
      const message = await validateField(field, data[field], schema, context);
      if (message) {
        errors[field] = message
      }
    })
  )

  return Object.keys(errors).length > 0 ? errors : null;
};

export default validationMessage;
