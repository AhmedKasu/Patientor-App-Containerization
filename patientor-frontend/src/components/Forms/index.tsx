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
  onCancel?: () => void;
  children: (props: FormikProps<Values>) => ReactNode;
}

const CustomForm = <Values extends Record<string, unknown>>({
  initialValues,
  validationSchema,
  onSubmit,
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
                Add
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default CustomForm;
