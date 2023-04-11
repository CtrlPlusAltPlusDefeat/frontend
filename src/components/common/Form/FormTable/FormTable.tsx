import React from 'react';
import { z } from 'zod';
import { Form, FormikProvider, useFormik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { motion, TargetAndTransition } from 'framer-motion';
import ActionButton from '../../ActionButton/ActionButton';
import { getFields } from './FormTable.functions';
import { FormTableProps, SchemaRecord } from '../types';

const defaultAnimation: TargetAndTransition = {
	opacity: 1,
	y: 0,
	transition: {
		duration: 0.6,
		ease: [0.6, -0.05, 0.01, 0.99],
		delay: 0.16
	}
};

const FormTable = <Schema extends z.ZodType<unknown>>({ schema, rows, children, onSubmit, animation, submitButton }: FormTableProps<Schema>) => {
	const defaultValues: Record<string, unknown> = {};
	rows.forEach((row) =>
		row.fields.forEach((input) => {
			const { field } = input;
			defaultValues[field.id] = field.default;
		})
	);

	const formik = useFormik({
		initialValues: defaultValues,
		validationSchema: toFormikValidationSchema(schema),
		onSubmit: (values, formikHelpers) => {
			formik.setSubmitting(false);
			onSubmit(values as SchemaRecord<Schema>, formikHelpers);
		}
	});

	const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

	return (
		<FormikProvider value={formik}>
			<Form autoComplete="off" noValidate onSubmit={handleSubmit}>
				<motion.div
					animate={{
						transition: {
							staggerChildren: 0.65
						}
					}}
				>
					<motion.div className="flex gap-3 flex-col" initial={{ opacity: 0, y: 40 }} animate={animation ?? defaultAnimation}>
						{getFields({ rows, getFieldProps, errors, touched })}
						{children}
						<ActionButton type="submit" state="success" text={isSubmitting ? 'loading...' : submitButton.text} />
					</motion.div>
				</motion.div>
			</Form>
		</FormikProvider>
	);
};

export default FormTable;
