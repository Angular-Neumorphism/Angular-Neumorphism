export function getNeoFormFieldPlaceholderConflictError(): Error {
  return Error('Placeholder attribute and child element were both specified.');
}

/** @docs-private */
export function getNeoFormFieldMissingControlError(): Error {
  return Error(
    'neo-form-field must contain a NeoFormFieldControl(MatFormFieldControl).'
  );
}
