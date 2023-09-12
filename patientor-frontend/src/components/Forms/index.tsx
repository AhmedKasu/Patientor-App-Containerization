import React, { ReactNode } from 'react';
import { Form, Formik, FormikHelpers, FormikProps } from 'formik';
import { ObjectSchema } from 'yup';
import { Grid, Button } from '@material-ui/core';

interface CustomFormProps<Values> {
  initialValues: Values;
  validationSchema: ObjectSchema<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  onSubmit: (
    values: Values,
    formikHelpers: FormikHelpers<Values>
  ) => void | Promise<void>;
  submitButtonLabel?: string;
  onCancel?: () => void;
  children: (props: FormikProps<Values>) => ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomForm = <Values extends Record<string, any>>({
  initialValues,
  validationSchema,
  onSubmit,
  submitButtonLabel,
  onCancel,
  children,
}: CustomFormProps<Values>) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}>
      {(formikProps) => (
        <Form>
          {children(formikProps)}

          <Grid
            container
            spacing={3}
            style={{ paddingTop: 3 }}
            justifyContent='space-between'>
            <Grid item>
              <Button
                color='secondary'
                variant='contained'
                type='button'
                onClick={onCancel}>
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button
                type='submit'
                variant='contained'
                disabled={!formikProps.dirty || !formikProps.isValid}>
                {submitButtonLabel || 'Add'}
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default CustomForm;
