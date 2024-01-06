import { render, screen } from '@testing-library/react';
import CreateMappingForm from './CreateMappingForm';

test('renders the form', () => {
  render(<CreateMappingForm />);
  
  const inputElements = screen.getAllByRole('textbox');
  expect(inputElements.length).toBe(2);

  const submitButton = screen.getAllByRole('button');
  expect(submitButton.length).toBe(1);
});

test("can submit with valid arguments", () => {
  const testValues = {
    urlKey: 'FOO',
    url: 'https://foo.com',
    handleSubmit: jest.fn().mockImplementation((e) => e.preventDefault()),
  };

  render(<CreateMappingForm paperFormProps={{onSubmit: testValues.handleSubmit}} urlKeyTextFieldProps={{value: testValues.urlKey}} urlTextFieldProps={{value: testValues.url}} />);

  const submitButton = screen.getByRole('button');

  submitButton.click();
  expect(testValues.handleSubmit).toHaveBeenCalledTimes(1);
});