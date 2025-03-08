const companySchema = {
  name: {
    type: String,
    required: true,
    message: 'A company name is required.'
  },
  status: {
    type: String,
    required: true,
    message: 'Please specify the status (Active or Inactive)',
  },
}

export default companySchema;
