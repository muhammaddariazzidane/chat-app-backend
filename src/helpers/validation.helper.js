const mapValidationIssuesToErrors = (issues) => {
  return issues.map((issue) => ({
    name: issue.path.join('.'),
    message: issue.message,
  }));
};

export const handleValidation = async (
  request,
  response,
  functionValidation
) => {
  try {
    const validatedData = await functionValidation(request.body);
    if (!validatedData.success) {
      const {
        error: { issues },
      } = validatedData;
      const errors = mapValidationIssuesToErrors(issues);
      return response
        .status(400)
        .json({ message: 'Validation errors', errors });
    }
    return validatedData;
  } catch (error) {
    console.error('Internal server error:', error);
    return response.status(500).json({ message: error });
  }
};
